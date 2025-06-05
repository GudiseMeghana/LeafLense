# API Testing Guide for Leaf-Lense

This guide explains how to test each section of your API using the Swagger UI (recommended), curl, or Postman. It covers how to add data and how to check/retrieve it. The API and web UI are both styled for light and dark mode, and the endpoints support all the latest features.

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
  "name": "banana",
  "local_name": "బనానా",   // optional, for multilingual support
  "sku": "BNN-001"        // optional, for barcode/inventory
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

## 6. POS/Barcode POST Simulation (Simulate a POS Scan)

You can simulate a barcode scan (like a POS system would do) by POSTing a barcode to the API. This is useful for testing how your system would handle a real barcode scan event.

### Using Swagger UI
- Go to `/barcodes` (POST)
- Click "Try it out"
- Enter:
```json
{
  "code": "1234567890123",
  "item_id": 1
}
```
- Click "Execute"
- The response will show the barcode entry linked to the item.

### Using curl
```sh
curl -X POST "http://127.0.0.1:8000/barcodes" \
     -H "Content-Type: application/json" \
     -d '{"code": "1234567890123", "item_id": 1}'
```

**Expected Response:**
```json
{
  "id": 1,
  "code": "1234567890123",
  "item_id": 1
}
```

You can now GET `/items/{item_id}/barcodes` to verify the barcode is linked to the item.

---

## 7. Using the Web UI
- The web UI (React) supports all the above features with a modern, responsive design.
- You can upload images, manage items/tags/languages/barcodes, and use the light/dark mode toggle.
- The About page shows the team, GitHub links, and project details.

---

## Tips
- You can use curl or Postman for all these endpoints as well. The Swagger UI shows the curl command for each request.
- Always add data (POST) before trying to retrieve it (GET), or you will get empty lists.
- For more details on request/response formats, see the interactive docs at `/docs`.
- For a step-by-step UI walkthrough, see the README and About page in the web app.
