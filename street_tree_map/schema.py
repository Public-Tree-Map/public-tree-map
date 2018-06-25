import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, Tree as TreeModel


class Tree(SQLAlchemyObjectType):
    class Meta:
        model = TreeModel


class Query(graphene.ObjectType):
    all_trees = graphene.List(Tree)

    def resolve_all_trees(self, info, **kwargs):
        return Tree.objects.all()

schema = graphene.Schema(query=Query)
