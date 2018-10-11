from sqlalchemy import *
from sqlalchemy.orm import (scoped_session, sessionmaker, relationship,
                            backref)
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///database.sqlite3', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
# We will need this for querying
Base.query = db_session.query_property()

class Family(Base):
    __tablename__ = 'family'
    id = Column(Integer, primary_key=True)
    name_botanical = Column(String)
    name_common = Column(String)
    eol_id = Column(Integer)

class Species(Base):
    __tablename__ = 'species'
    id = Column(Integer, primary_key=True)
    name_botanical = Column(String)
    name_common = Column(String)
    family_botanical_name = Column(String, ForeignKey('family.name_botanical'))
    native = Column(String)
    eol_id = Column(Integer)
    eol_image = Column(String)
    family = relationship(Family)

class Tree(Base):
    __tablename__ = 'trees'
    tree_id = Column(Integer, primary_key=True)
    name_botanical = Column(String, ForeignKey('species.name_botanical'))
    name_common = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    address = Column(String)
    street = Column(String)
    species = relationship(Species)
