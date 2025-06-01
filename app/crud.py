from sqlalchemy.orm import Session
from app import model, schemas

# -------------------------------
# Item CRUD
# -------------------------------
def get_item_by_name(db: Session, name: str):
    return db.query(model.Item).filter(model.Item.name == name).first()

def get_item(db: Session, item_id: int):
    return db.query(model.Item).filter(model.Item.id == item_id).first()

def get_items(db: Session):
    return db.query(model.Item).all()

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = model.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db: Session, item_id: int, item: schemas.ItemCreate):
    db_item = db.query(model.Item).filter(model.Item.id == item_id).first()
    if not db_item:
        return None
    db_item.name = item.name
    db_item.local_name = item.local_name
    db_item.sku = item.sku
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int):
    db_item = db.query(model.Item).filter(model.Item.id == item_id).first()
    if not db_item:
        return False
    db.delete(db_item)
    db.commit()
    return True

# -------------------------------
# Tag CRUD
# -------------------------------
def create_tag(db: Session, tag: schemas.TagCreate):
    db_tag = model.Tag(**tag.dict())
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

def get_tags_for_item(db: Session, item_id: int):
    return db.query(model.Tag).filter(model.Tag.item_id == item_id).all()

# -------------------------------
# Language CRUD
# -------------------------------
def create_language(db: Session, language: schemas.LanguageCreate):
    db_language = model.Language(**language.dict())
    db.add(db_language)
    db.commit()
    db.refresh(db_language)
    return db_language

def get_languages(db: Session):
    return db.query(model.Language).all()

# -------------------------------
# Barcode CRUD
# -------------------------------
def create_barcode(db: Session, barcode: schemas.BarcodeCreate):
    db_barcode = model.Barcode(**barcode.dict())
    db.add(db_barcode)
    db.commit()
    db.refresh(db_barcode)
    return db_barcode

def get_barcodes_for_item(db: Session, item_id: int):
    return db.query(model.Barcode).filter(model.Barcode.item_id == item_id).all()