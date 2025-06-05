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

@router.delete("/languages/{language_id}")
def delete_language(language_id: int, db: Session = Depends(get_db)):
    success = crud.delete_language(db, language_id)
    if not success:
        raise HTTPException(status_code=404, detail="Language not found")
    return {"ok": True}
