import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType
from models import db_session, Tree as TreeModel


class Tree(SQLAlchemyObjectType):
    class Meta:
        model = TreeModel


class Query(graphene.ObjectType):
    all_trees = graphene.List(Tree)

    def resolve_all_trees(self, info, **kwargs):
        query = Tree.get_query(info)
        return query.all()

schema = graphene.Schema(query=Query)
