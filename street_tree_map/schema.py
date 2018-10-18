import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .models import db_session, Family as FamilyModel, Species as SpeciesModel, Tree as TreeModel


class Family(SQLAlchemyObjectType):
    class Meta:
        model = FamilyModel

class Species(SQLAlchemyObjectType):
    class Meta:
        model = SpeciesModel

class Tree(SQLAlchemyObjectType):
    class Meta:
        model = TreeModel


class Query(graphene.ObjectType):
    all_trees = graphene.List(Tree,
            maxLat=graphene.Float(),
            minLat=graphene.Float(),
            maxLon=graphene.Float(),
            minLon=graphene.Float()
            )

    def resolve_all_trees(self, info, **kwargs):
        query = Tree.get_query(info)
        max_lat = kwargs.get('maxLat')
        min_lat = kwargs.get('minLat')
        max_lon = kwargs.get('maxLon')
        min_lon = kwargs.get('minLon')
        if max_lat:
            query = query.filter(TreeModel.latitude <= max_lat)
        if min_lat:
            query = query.filter(TreeModel.latitude >= min_lat)
        if max_lon:
            query = query.filter(TreeModel.longitude <= max_lon)
        if min_lon:
            query = query.filter(TreeModel.longitude >= min_lon)

        return query.all()
    
    all_families = graphene.List(Family)

    def resolve_all_families(self, info, **kwargs):
        query = Family.get_query(info)
        return query.all()

    all_species = graphene.List(Species)

    def resolve_all_species(self, info, **kwargs):
        query = Species.get_query(info)
        return query.all()

schema = graphene.Schema(query=Query)
