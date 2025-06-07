import streamlit as st
from transformers import AutoModelForImageClassification, AutoImageProcessor
from PIL import Image
import torch
import io

st.set_page_config(page_title="Fruit & Veggie Detector", layout="centered")

def local_css():
    st.markdown("""
        <style>
        body {
            background: linear-gradient(135deg, #e0f7fa, #e8f5e9);
        }
        .main {
            background-color: rgba(255, 255, 255, 0.85);
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        img {
            border-radius: 0.5rem;
        }
        </style>
    """, unsafe_allow_html=True)

local_css()

@st.cache_resource
def load_model():
    model = AutoModelForImageClassification.from_pretrained("jazzmacedo/fruits-and-vegetables-detector-36")
    processor = AutoImageProcessor.from_pretrained("jazzmacedo/fruits-and-vegetables-detector-36")
    return model, processor

model, processor = load_model()

with st.container():
    st.markdown('<div class="main">', unsafe_allow_html=True)
    st.title("🥦🍎 Fruit & Vegetable Detector")
    st.write("Upload an image or use your camera to identify fruits or vegetables.")

    # Choose between upload and camera
    option = st.radio("Select input method:", ("Upload Image", "Use Camera"))

    image = None

    if option == "Upload Image":
        uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
        if uploaded_file is not None:
            image = Image.open(uploaded_file).convert("RGB")

    elif option == "Use Camera":
        camera_image = st.camera_input("Take a picture")
        if camera_image is not None:
            image = Image.open(io.BytesIO(camera_image.getvalue())).convert("RGB")

    if image:
        st.image(image, caption="Input Image", use_column_width=True)

        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            logits = model(**inputs).logits
            predicted = logits.argmax(-1).item()

        id2label = model.config.id2label
        id2label = {int(k): v for k, v in id2label.items()}

        if predicted in id2label:
            label = id2label[predicted]
            st.success(f"✅ Detected: **{label.capitalize()}**")
        else:
            st.error(f"❌ Predicted index {predicted} not found in id2label mapping.")
    
    st.markdown('</div>', unsafe_allow_html=True)