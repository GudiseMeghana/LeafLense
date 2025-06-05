# Leaf-Lense Project Explanation

## What is Leaf-Lense?
Leaf-Lense is a web application that helps you identify fruits and vegetables from photos. It also lets you manage a database of items, tags (like “organic” or “imported”), languages, and barcodes. It’s built for teams or businesses that want to use AI to recognize produce and keep track of related info.

---

## How does it work?

- **Frontend (User Interface):**  
  - Made with React and Material-UI (MUI) for a modern, stylish look.
  - You can upload a photo or use your camera to identify a fruit or vegetable.
  - You can view, add, edit, or delete items, tags, languages, and barcodes.
  - The design uses dark mode, glass-like panels, and neon highlights for a professional feel.

- **Backend (Server/API):**  
  - Built with FastAPI (a Python web framework).
  - Handles requests from the frontend, like image uploads or database changes.
  - Uses a trained AI model to predict what’s in a photo.
  - Stores all data in a PostgreSQL database (items, tags, languages, barcodes).
  - Provides API endpoints for all features (identify, CRUD for items/tags/languages/barcodes).

- **Database:**  
  - PostgreSQL stores all the information about items, tags, languages, and barcodes.

---

## Main Features

- **Image Recognition:**  
  Upload or capture a photo, and the app tells you what fruit or vegetable it is.

- **CRUD Management:**  
  You can Create, Read, Update, and Delete:
  - Items (fruits/vegetables)
  - Tags (labels for items, in different languages)
  - Languages (for multilingual support)
  - Barcodes (link barcodes to items)

- **Barcode Support:**  
  You can add barcodes to items, making it easy to scan and identify them in stores.

- **Modern UI:**  
  The app looks clean and modern, with easy navigation and feedback messages.

- **API Documentation:**  
  The backend provides interactive docs at `/docs` so developers can test the API easily.

- **Dockerized:**  
  The whole project can be started with one command using Docker Compose. This sets up the backend, frontend, and database together.

---

## How do you use it?

- **For Users:**  
  - Open the web app.
  - Go to the Identify page to upload a photo or use your camera.
  - See the prediction and related info.
  - Use the Items, Tags, Languages, and Barcodes pages to manage the database.

- **For Developers:**  
  - Clone the repo.
  - Start the backend and frontend (with Docker or manually).
  - Use the API endpoints for custom integrations.
  - See the README for setup and usage instructions.

---

## Who is it for?

- Grocery stores, markets, or anyone who needs to identify produce and manage related data.
- Developers who want to build on top of a ready-made produce recognition API.

---

## Why is it special?

- Combines AI image recognition with a full-featured management system.
- Easy to deploy and use.
- Modern, attractive design.
- Supports multiple languages and barcodes.

---

If you want more details about any part (like how the AI works, or how to add new items), just check the README or ask for more info!
