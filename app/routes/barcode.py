from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/barcodes", response_model=schemas.BarcodeOut)
def create_barcode(barcode: schemas.BarcodeCreate, db: Session = Depends(get_db)):
    return crud.create_barcode(db, barcode, user=None)

@router.get("/items/{item_id}/barcodes", response_model=list[schemas.BarcodeOut])
def get_barcodes_for_item(item_id: int, db: Session = Depends(get_db)):
    return crud.get_barcodes_for_item(db, item_id)

@router.delete("/barcodes/{barcode_id}")
def delete_barcode(barcode_id: int, db: Session = Depends(get_db)):
    success = crud.delete_barcode(db, barcode_id, user=None)
    if not success:
        raise HTTPException(status_code=404, detail="Barcode not found")
    return {"ok": True}
