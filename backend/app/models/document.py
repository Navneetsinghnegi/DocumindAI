from sqlalchemy import Column,String,Integer,DateTime,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Document(Base):
    __tablename__ = "documents"

    id=Column(UUID(as_uuid=True),default=uuid.uuid4, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"),nullable=False)
    filename = Column(String, nullable=False)
    status = Column(String, default="uploaded")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="documents")