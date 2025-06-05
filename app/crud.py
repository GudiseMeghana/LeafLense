import json
from sqlalchemy.orm import Session
from app import model, schemas
from sqlalchemy.exc import SQLAlchemyError

# -------------------------------
# Item CRUD
# -------------------------------
def get_item_by_name(db: Session, name: str):
    return db.query(model.Item).filter(model.Item.name == name).first()

def get_item(db: Session, item_id: int):
    return db.query(model.Item).filter(model.Item.id == item_id).first()

def get_items(db: Session):
    return db.query(model.Item).all()

def create_item(db: Session, item: schemas.ItemCreate, user: str = None):
    try:
        db_item = model.Item(**item.dict())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        # Audit log (serialize only safe fields)
        create_audit_log(db, 'item', db_item.id, 'create', db_item.to_dict(), user)
        return db_item
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def update_item(db: Session, item_id: int, item: schemas.ItemCreate, user: str = None):
    db_item = db.query(model.Item).filter(model.Item.id == item_id).first()
    if not db_item:
        return None
    old_data = db_item.to_dict()
    db_item.name = item.name
    db_item.local_name = item.local_name
    db_item.sku = item.sku
    db.commit()
    db.refresh(db_item)
    # Audit log
    create_audit_log(db, 'item', db_item.id, 'update', {'old': old_data, 'new': db_item.to_dict()}, user)
    return db_item

def delete_item(db: Session, item_id: int, user: str = None):
    try:
        db_item = db.query(model.Item).filter(model.Item.id == item_id).first()
        if not db_item:
            return False
        old_data = db_item.to_dict()
        db.delete(db_item)
        db.commit()
        # Audit log
        create_audit_log(db, 'item', item_id, 'delete', old_data, user)
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise e

# -------------------------------
# Tag CRUD
# -------------------------------
def create_tag(db: Session, tag: schemas.TagCreate, user: str = None):
    # Defensive: check if item exists
    item = db.query(model.Item).filter(model.Item.id == tag.item_id).first()
    if not item:
        raise ValueError("Item does not exist for tag")
    try:
        db_tag = model.Tag(**tag.dict())
        db.add(db_tag)
        db.commit()
        db.refresh(db_tag)
        # Audit log
        create_audit_log(db, 'tag', db_tag.id, 'create', db_tag.to_dict(), user)
        return db_tag
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def get_tags_for_item(db: Session, item_id: int):
    return db.query(model.Tag).filter(model.Tag.item_id == item_id).all()

def delete_tag(db: Session, tag_id: int, user: str = None):
    try:
        db_tag = db.query(model.Tag).filter(model.Tag.id == tag_id).first()
        if not db_tag:
            return False
        old_data = db_tag.to_dict()
        db.delete(db_tag)
        db.commit()
        # Audit log
        create_audit_log(db, 'tag', tag_id, 'delete', old_data, user)
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise e

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

def delete_language(db: Session, language_id: int):
    db_language = db.query(model.Language).filter(model.Language.id == language_id).first()
    if not db_language:
        return False
    db.delete(db_language)
    db.commit()
    return True

# -------------------------------
# Barcode CRUD
# -------------------------------
def create_barcode(db: Session, barcode: schemas.BarcodeCreate, user: str = None):
    # Defensive: check if item exists
    item = db.query(model.Item).filter(model.Item.id == barcode.item_id).first()
    if not item:
        raise ValueError("Item does not exist for barcode")
    try:
        db_barcode = model.Barcode(**barcode.dict())
        db.add(db_barcode)
        db.commit()
        db.refresh(db_barcode)
        # Audit log
        create_audit_log(db, 'barcode', db_barcode.id, 'create', db_barcode.to_dict(), user)
        return db_barcode
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def get_barcodes_for_item(db: Session, item_id: int):
    return db.query(model.Barcode).filter(model.Barcode.item_id == item_id).all()

def delete_barcode(db: Session, barcode_id: int, user: str = None):
    try:
        db_barcode = db.query(model.Barcode).filter(model.Barcode.id == barcode_id).first()
        if not db_barcode:
            return False
        old_data = db_barcode.to_dict()
        db.delete(db_barcode)
        db.commit()
        # Audit log
        create_audit_log(db, 'barcode', barcode_id, 'delete', old_data, user)
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise e

# -------------------------------
# Audit Log CRUD
# -------------------------------
def create_audit_log(db: Session, entity_type: str, entity_id: int, action: str, details: dict, user: str = None):
    db_log = model.AuditLog(
        entity_type=entity_type,
        entity_id=entity_id,
        action=action,
        details=json.loads(json.dumps(details, default=str)),
        user=user
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log