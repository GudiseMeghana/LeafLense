# Leaf-Lense: Vegetable & Fruit Classifier API

This project is a FastAPI-based backend for classifying images of vegetables and fruits using a fine-tuned MobileNetV2 Keras model. It also provides CRUD endpoints for managing items and tags in a PostgreSQL database.

---

## Features
- **/identify**: Upload an image and get the predicted class and probabilities.
- **/items**: CRUD operations for items (vegetables/fruits).
- **/tags**: CRUD operations for tags associated with items.

---

## Setup

### 1. Install Requirements
```bash
pip install -r requirements.txt
```

### 2. Database Setup
- Ensure PostgreSQL is running and a database named `vegscanner` exists.
- Update the connection string in `app/database.py` if needed.

### 3. Model File
- Place your trained Keras model at `model/vegetable_mobilenetv2_finetuned.h5`.

### 4. Run the API
```bash
uvicorn app.main:app --reload
```

---

## API Documentation

Interactive docs available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### /identify
- **POST** `/identify`
- **Description:** Upload an image to classify.
- **Request:**
    - `file`: image file (form-data)
- **Response:**
```json
{
  "prediction": "banana",
  "probabilities": [0.01, 0.95, 0.01, ...]
}
```

### /items
- **GET** `/items` — List all items
- **POST** `/items` — Create a new item
- **Request Body Example:**
```json
{
  "name": "banana"
}
```

### /tags
- **POST** `/tags` — Create a new tag for an item
- **GET** `/items/{item_id}/tags` — List tags for an item

---

## Project Structure
```
Leaf-Lense/
├── app/
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── model.py
│   ├── schemas.py
│   └── routes/
│       ├── identify.py
│       ├── items.py
│       └── tag.py
├── model/
│   └── vegetable_mobilenetv2_finetuned.h5
├── requirements.txt
└── class_map.json
```

---

## Notes
- The `/identify` endpoint expects images sized for MobileNetV2 (224x224 RGB).
- The model must match the class order in `class_names` in `identify.py`.
- For database endpoints, see the interactive docs for schemas and details.

---

## License
MIT
