from pydantic import BaseModel
from typing import List, Optional


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
        orm_mode = True


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
        orm_mode = True


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
        orm_mode = True


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
        orm_mode = True