from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from typing import Any


# -----------------
# Tag Schemas
# -----------------
class TagBase(BaseModel):
    language: str
    value: str


class TagCreate(TagBase):
    item_id: int


class TagOut(TagBase):
    id: int
    item_id: int

    class Config:
        from_attributes = True


# -----------------
# Item Schemas
# -----------------
class ItemBase(BaseModel):
    name: str
    local_name: Optional[str] = None
    sku: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class ItemOut(ItemBase):
    id: int
    tags: List[TagOut] = []

    class Config:
        from_attributes = True


# -----------------
# Language Schemas
# -----------------
class LanguageBase(BaseModel):
    code: str
    name: str


class LanguageCreate(LanguageBase):
    pass


class LanguageOut(LanguageBase):
    id: int

    class Config:
        from_attributes = True


# -----------------
# Barcode Schemas
# -----------------
class BarcodeBase(BaseModel):
    code: str
    item_id: int


class BarcodeCreate(BarcodeBase):
    pass


class BarcodeOut(BarcodeBase):
    id: int

    class Config:
        from_attributes = True


# -----------------
# Audit Log Schemas
# -----------------
class AuditLogBase(BaseModel):
    entity_type: str
    entity_id: int
    action: str
    timestamp: datetime
    user: str | None = None
    details: Any


class AuditLogCreate(BaseModel):
    entity_type: str
    entity_id: int
    action: str
    user: str | None = None
    details: Any


class AuditLogOut(AuditLogBase):
    id: int

    class Config:
        from_attributes = True