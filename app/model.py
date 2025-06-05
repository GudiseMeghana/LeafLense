from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)        # e.g., "Tomato"
    local_name = Column(String, nullable=True)            # e.g., "Tamatar"
    sku = Column(String, nullable=True)                   # e.g., barcode or SKU code

    tags = relationship("Tag", back_populates="item")
    barcodes = relationship("Barcode", back_populates="item")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'local_name': self.local_name,
            'sku': self.sku
        }


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"))
    language = Column(String)
    value = Column(String)  # translated/localized name

    item = relationship("Item", back_populates="tags")

    def to_dict(self):
        return {
            'id': self.id,
            'item_id': self.item_id,
            'language': self.language,
            'value': self.value
        }


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

    def to_dict(self):
        return {
            'id': self.id,
            'item_id': self.item_id,
            'code': self.code
        }


class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String, index=True)  # e.g., 'item', 'tag', 'barcode'
    entity_id = Column(Integer, index=True)
    action = Column(String)  # e.g., 'create', 'update', 'delete'
    timestamp = Column(DateTime, default=datetime.utcnow)
    user = Column(String, nullable=True)  # Optional: username or user id
    details = Column(JSON)  # JSON snapshot of the change