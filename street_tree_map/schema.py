import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType
from .models import db_session, Tree as TreeModel


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

schema = graphene.Schema(query=Query)
