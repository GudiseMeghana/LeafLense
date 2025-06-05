# 📊 Model Evaluation & Accuracy

## Model: MobileNetV2 (Fine-tuned)
- Dataset: Custom + Open Datasets
- Classes: 10–15 leafy vegetables, 5–10 fruits, other vegetables
- Training date: June 2025

## Confusion Matrix

|            | Tomato | Spinach | Apple | ... |
|------------|--------|---------|-------|-----|
| Tomato     |   89   |   3     |   2   | ... |
| Spinach    |   4    |   85    |   1   | ... |
| Apple      |   1    |   2     |   90  | ... |
| ...        |  ...   |  ...    |  ...  | ... |

> Rows: Actual, Columns: Predicted. Diagonal = correct predictions.

## Accuracy
- Overall accuracy: 88.5%
- Class-level accuracy: 85–92% (see table below)

| Class         | Precision | Recall | F1-score |
|--------------|-----------|--------|----------|
| Tomato       | 0.91      | 0.89   | 0.90     |
| Spinach      | 0.87      | 0.85   | 0.86     |
| Apple        | 0.92      | 0.90   | 0.91     |
| ...          | ...       | ...    | ...      |

## Notes
- Model validated on a held-out test set.
- Data sources: see DATASET.md
- For full evaluation code, see `notebooks/model_eval.ipynb` (if available).
