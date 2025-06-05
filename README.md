# 🥬 Leaf-Lense: AI Vegetable & Fruit Classifier Web App & API

A modern, full-stack platform for identifying fruits and vegetables using AI, and managing multilingual metadata and barcodes. Built with **FastAPI**, **PostgreSQL**, and **React + Material-UI**. Designed for retailers, farmers, and developers who want a seamless, professional produce recognition and management experience.

---

## ✨ Features
- **AI Image Classification:** Upload or capture an image to instantly identify fruits/vegetables with confidence scores.
- **Items Management:** Add, edit, delete, and search produce items.
- **Multilingual Tags:** Assign and manage tags in multiple languages for each item.
- **Barcode Integration:** Link barcodes to items for POS and inventory use.
- **Language Management:** Add and manage supported languages for tags.
- **Modern UI:** Responsive, glassmorphic design with light/dark mode, glowing effects, and smooth navigation.
- **Team Section:** Meet the creators with animated avatars and GitHub links.
- **Scroll-to-Top:** Glassy floating button for easy navigation.
- **API Docs:** Interactive OpenAPI docs at `/docs`.
- **Dockerized:** One-command deployment for backend and frontend.
- **Audit Log:** Track all item/tag changes with a full history (see API docs).
- **POS/Barcode Simulation:** Easily test barcode POSTs for POS/inventory workflows.
- **/tag Endpoint Alias:** Use `/tag` as a shortcut for tagging operations.

---

## 📸 Screenshots

![Home Page](screenshots/home.png)
*Home page with hero, features, and navigation*

![Identify Page](screenshots/identify.png)
*AI-powered image identification with confidence bar*

![Items Management](screenshots/items.png)
*Manage produce items: add, edit, delete, search*

![Tags Management](screenshots/tags.png)
*Multilingual tags for each item*

![Barcodes Management](screenshots/barcodes.png)
*Link and manage barcodes for POS/inventory*

![Languages Management](screenshots/languages.png)
*Add and manage supported languages*

---

## 🚀 Quick Start (Development)

### Backend (FastAPI)
# Ensure your local PostgreSQL is running and your .env or config uses host 'localhost' (not 'db') for DATABASE_URL.
# Example:
# DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/leaflense

```bash
cd Leaf-Lense
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```
- Backend: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Frontend: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Deployment (Docker)

### Backend
```bash
docker build -t leaf-lense-backend .
docker run -p 8000:8000 --env-file .env leaf-lense-backend
```

### Frontend
```bash
cd frontend
docker build -t leaf-lense-frontend .
docker run -p 3000:80 leaf-lense-frontend
```

### One-command Local Deployment (Docker Compose)
```bash
docker-compose up --build
```
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs)
- Frontend: [http://localhost:3000](http://localhost:3000)

### Cloud Deployment (Render, Railway, AWS EC2)
- Push your repo to GitHub.
- On Render/Railway: create a new web service, connect your repo, set build/start commands as in Dockerfile, and add environment variables from `.env.example`.
- On AWS EC2: install Docker, clone your repo, and run `docker-compose up --build`.

---

## 📖 API Documentation
- Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- OpenAPI spec: [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json)
- See [API_TEST_GUIDE.md](API_TEST_GUIDE.md) for step-by-step API testing and POS/barcode simulation examples.

---

## 🧪 Sample API Usage

### curl
```bash
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
- See API guide for POS simulation details.

---

## ⚙️ Environment Variables
See `.env.example` for required variables for PostgreSQL connection.

---

## 🗺️ Project Structure
```text
Leaf-Lense/
├── app/                # FastAPI backend (main.py, routes, models, schemas, database)
├── frontend/           # React frontend (src/pages, components, theme, Dockerfile)
├── model/              # Trained AI models (h5 files)
├── requirements.txt    # Python dependencies
├── docker-compose.yml  # Multi-container orchestration
├── Dockerfile          # Backend Dockerfile
├── README.md           # This file
├── API_TEST_GUIDE.md   # API usage/testing guide
├── project explanation.md # Project overview for non-devs
├── screenshots/        # UI screenshots for documentation
└── ...
```

---

## 💡 UI/UX Highlights
- **Light/Dark Mode:** Toggle in the navbar, with all pages styled for both themes.
- **Team Section:** About page features team avatars, GitHub links, and tooltips.
- **Glassmorphic Design:** Modern, soft backgrounds and glowing effects.
- **Scroll-to-Top:** Floating button for easy navigation.
- **Responsive:** Works beautifully on desktop and mobile.
- **Polished UI:** Consistent theme, modern cards, empty state messages, and accessibility improvements across all pages.

---

## 👥 Meet the Team

| Name         | GitHub                                      |
|--------------|---------------------------------------------|
| Meghana      | [GudiseMeghana](https://github.com/GudiseMeghana)         |
| Pruthan      | [JPruthan](https://github.com/JPruthan)                 |
| Sankrishna   | [sankrishna2004](https://github.com/sankrishna2004)     |
| Rithvika     | [Punnamrithvika](https://github.com/Punnamrithvika)     |
| Vaagdevi     | [vaagdevi-challa](https://github.com/vaagdevi-challa)   |
| Vishwajitha  | [VISHWAJITHA28](https://github.com/VISHWAJITHA28)       |

- See the About page for animated avatars, GitHub links, and tooltips for each contributor.

---

## 📚 Usage Guide
- See [API_TEST_GUIDE.md](API_TEST_GUIDE.md) for step-by-step API testing and POS simulation.
- Use the web UI for a professional, user-friendly experience.

---

## 📝 About the Project
Leaf-Lense is a full-stack AI-powered produce recognition and management system. It combines:
- **FastAPI** for a robust backend and API
- **PostgreSQL** for reliable data storage
- **React + Material-UI** for a beautiful, responsive frontend
- **Docker** for easy deployment

See [`project explanation.md`](project%20explanation.md) for a non-technical overview.

---

## 📄 License
MIT License
