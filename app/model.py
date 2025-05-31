from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)        # e.g., "Tomato"
    local_name = Column(String, nullable=True)            # e.g., "Tamatar"
    sku = Column(String, nullable=True)                   # e.g., barcode or SKU code

    tags = relationship("Tag", back_populates="item")
    barcodes = relationship("Barcode", back_populates="item")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"))
    language = Column(String)
    value = Column(String)  # translated/localized name

    item = relationship("Item", back_populates="tags")


class Language(Base):
    __tablename__ = "languages"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)  # e.g., 'en', 'fr'
    name = Column(String)


class Barcode(Base):
    __tablename__ = "barcodes"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"))
    code = Column(String, unique=True, index=True)

    item = relationship("Item", back_populates="barcodes")