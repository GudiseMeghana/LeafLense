# API Testing Guide for Leaf-Lense

This guide explains how to test each section of your API using the Swagger UI (recommended), curl, or Postman. It covers how to add data and how to check/retrieve it.

---

## 1. /identify (Image Classification)

### Add/Test
- Go to [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Find `/identify` (POST)
- Click "Try it out"
- Upload an image file (e.g., a photo of a banana)
- Click "Execute"

**Expected Response:**
```json
{
  "prediction": "banana",
  "probabilities": [0.01, 0.95, 0.01, ...]
}
```

---

## 2. /items (Items Table)

### Add an Item
- In Swagger UI, find `/items` (POST)
- Click "Try it out"
- Enter:
```json
{
  "name": "banana"
}
```
- Click "Execute"

### Check Items
- In Swagger UI, find `/items` (GET)
- Click "Try it out" and "Execute"
- You should see a list of items, including the one you just added.

---

## 3. /tags (Tags Table)

### Add a Tag
- First, make sure you have an item (see above).
- In Swagger UI, find `/tags` (POST)
- Click "Try it out"
- Enter (replace `item_id` with your actual item ID):
```json
{
  "item_id": 1,
  "language": "en",
  "value": "Banana"
}
```
- Click "Execute"

### Check Tags for an Item
- In Swagger UI, find `/items/{item_id}/tags` (GET)
- Click "Try it out"
- Enter the item ID (e.g., `1`)
- Click "Execute"
- You should see a list of tags for that item.

---

## 4. /languages (Languages Table)

### Add a Language
- In Swagger UI, find `/languages` (POST)
- Click "Try it out"
- Enter:
```json
{
  "code": "en",
  "name": "English"
}
```
- Click "Execute"

### Check Languages
- In Swagger UI, find `/languages` (GET)
- Click "Try it out" and "Execute"
- You should see a list of languages.

---

## 5. /barcodes (Barcodes Table)

### Add a Barcode
- First, make sure you have an item (see above).
- In Swagger UI, find `/barcodes` (POST)
- Click "Try it out"
- Enter:
```json
{
  "code": "1234567890123",
  "item_id": 1
}
```
- Click "Execute"

### Check Barcodes for an Item
- In Swagger UI, find `/items/{item_id}/barcodes` (GET)
- Click "Try it out"
- Enter the item ID (e.g., `1`)
- Click "Execute"
- You should see a list of barcodes for that item.

---

## Tips
- You can use curl or Postman for all these endpoints as well. The Swagger UI shows the curl command for each request.
- Always add data (POST) before trying to retrieve it (GET), or you will get empty lists.
- For more details on request/response formats, see the interactive docs at `/docs`.
