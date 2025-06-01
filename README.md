# Leaf-Lense: Vegetable & Fruit Classifier API & Web App

A professional web platform for identifying fruits and vegetables using AI, and managing multilingual metadata and barcodes. Built with FastAPI, PostgreSQL, and React.

---

## Features
- 🌱 **Image Classification**: Upload an image and get the predicted class and probabilities.
- 📦 **Items Management**: CRUD operations for items (vegetables/fruits).
- 🏷️ **Tags**: Multilingual tags for each item.
- 🌐 **Languages**: Manage supported languages.
- 🏷️ **Barcodes**: Assign barcodes to items.
- 🖥️ **Modern UI**: Responsive, user-friendly React frontend.
- 📝 **API Docs**: Interactive docs at `/docs`.
- 🐳 **Dockerized**: Easy deployment for backend and frontend.

---

## Screenshots

> Add screenshots of the landing page, identify page, and items/tags/barcodes pages here for a professional README.

---

## Quick Start (Development)

### Backend (FastAPI)
```zsh
cd Leaf-Lense
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (React)
```zsh
cd frontend
npm install
npm start
```

- Backend: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Frontend: [http://localhost:3000](http://localhost:3000)

---

## Deployment (Docker)

### Backend
```zsh
docker build -t leaf-lense-backend .
docker run -p 8000:8000 --env-file .env leaf-lense-backend
```

### Frontend
```zsh
cd frontend
docker build -t leaf-lense-frontend .
docker run -p 3000:80 leaf-lense-frontend
```

---

## 🚀 Deployment

### One-command local deployment (Docker Compose)

```zsh
docker-compose up --build
```
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs)
- Frontend: [http://localhost:3000](http://localhost:3000)

### Cloud deployment (Render, Railway, AWS EC2)
- Push your repo to GitHub.
- On Render/Railway: create a new web service, connect your repo, set build/start commands as in Dockerfile, and add environment variables from `.env.example`.
- On AWS EC2: install Docker, clone your repo, and run `docker-compose up --build`.

---

## 📖 API Documentation
- Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- OpenAPI spec: [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)

---

## 🧪 Sample API Usage

### curl
```sh
curl -X POST "http://localhost:8000/identify" -F "file=@/path/to/image.jpg"
curl -X POST "http://localhost:8000/barcodes" -H "Content-Type: application/json" -d '{"code":"1234567890123","item_id":1}'
```

### Python
```python
import requests
with open("image.jpg", "rb") as f:
    res = requests.post("http://localhost:8000/identify", files={"file": f})
print(res.json())
```

### JavaScript (fetch)
```js
const formData = new FormData();
formData.append('file', fileInput.files[0]);
fetch('http://localhost:8000/identify', { method: 'POST', body: formData })
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🏷️ Simulate Barcode Scanner
- Use `/barcodes` endpoint with curl, Postman, or your POS app to POST a barcode.

---

## Environment Variables
See `.env.example` for required variables for PostgreSQL connection.

---

## Usage Guide
- See [API_TEST_GUIDE.md](API_TEST_GUIDE.md) for step-by-step API testing.
- Use the web UI for a professional, user-friendly experience.

---

## About
Project by [Meghana Gudise](https://github.com/GudiseMeghana/LeafLense)

MIT License
