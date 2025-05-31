from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/tags", response_model=schemas.TagOut)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db)):
    item = crud.get_item(db, tag.item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.create_tag(db, tag)

@router.get("/items/{item_id}/tags", response_model=list[schemas.TagOut])
def get_tags_for_item(item_id: int, db: Session = Depends(get_db)):
    return crud.get_tags_for_item(db, item_id)