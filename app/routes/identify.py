from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import io
import tensorflow as tf

router = APIRouter()


# Load your trained Keras model
model = tf.keras.models.load_model("model/vegetable_mobilenetv2_finetuned.h5")

# Class labels (must match your trained model’s output)
class_names = [
    'apple', 'banana', 'beetroot', 'carrot', 'chilli pepper', 'garlic',
    'ginger', 'grapes', 'jalepeno', 'lemon', 'lettuce', 'mango',
    'onion', 'orange', 'pear', 'pineapple', 'potato', 'spinach', 'tomato'
]


@router.post("/identify")
async def identify(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0  # Normalize to [0, 1]
        if image_array.shape[-1] == 4:
            image_array = image_array[..., :3]  # Remove alpha channel if present
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

        predictions = model.predict(image_array)
        predicted_index = int(np.argmax(predictions[0]))
        predicted_class = class_names[predicted_index]
        probabilities = predictions[0].tolist()

        return JSONResponse(content={
            "prediction": predicted_class,
            "probabilities": probabilities
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))