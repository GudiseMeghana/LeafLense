from fastapi import FastAPI
from app.routes import identify, tag, items, language, barcode
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Vegetable Scanner API")

app.include_router(identify.router)
app.include_router(tag.router)
app.include_router(items.router)
app.include_router(language.router)
app.include_router(barcode.router)