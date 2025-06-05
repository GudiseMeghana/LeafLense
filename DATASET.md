# DATASET.md

## Dataset Documentation for Leaf-Lense

### Sources
- **Custom Dataset:** Images collected by the Leaf-Lense team (retailers, local markets, farms).
- **Open Datasets:**
  - [Fruits 360](https://www.kaggle.com/datasets/moltean/fruits)
  - [Vegetable Image Dataset](https://www.kaggle.com/datasets/kritikseth/vegetable-image-dataset)
  - [PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)
  - [Open Images Dataset](https://storage.googleapis.com/openimages/web/index.html) (filtered for produce)

### Classes
- 10–15 leafy vegetables (e.g., spinach, lettuce, kale, coriander, etc.)
- 5–10 fruits (e.g., apple, banana, orange, etc.)
- Other vegetables (e.g., tomato, brinjal, carrot, etc.)

### Preprocessing
- Images resized to 224x224 pixels
- Augmentation: rotation, flip, brightness, zoom
- Train/validation/test split: 70/15/15

### Labeling
- Each image labeled with class name (English)
- Local names added for Indian languages (Telugu, Hindi, Tamil, Kannada)
- SKU/barcode mapping for select items

### Usage
- Used for training MobileNetV2 (fine-tuned)
- Test set used for model evaluation (see `model_evaluation.md`)

### License
- Open datasets: original dataset license applies
- Custom images: CC BY-NC-SA 4.0 (non-commercial, attribution)

---

For questions or requests, contact the Leaf-Lense team (see README).
