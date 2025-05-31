from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/languages", response_model=schemas.LanguageOut)
def create_language(language: schemas.LanguageCreate, db: Session = Depends(get_db)):
    return crud.create_language(db, language)

@router.get("/languages", response_model=list[schemas.LanguageOut])
def get_languages(db: Session = Depends(get_db)):
    return crud.get_languages(db)
