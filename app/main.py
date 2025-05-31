from fastapi import FastAPI
from app.routes import identify, tag, items, language, barcode
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Vegetable Scanner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(identify.router)
app.include_router(tag.router)
app.include_router(items.router)
app.include_router(language.router)
app.include_router(barcode.router)