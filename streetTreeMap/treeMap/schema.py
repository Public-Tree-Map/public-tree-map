import graphene
from graphene_django.types import DjangoObjectType
from .models import Tree

class TreeType(DjangoObjectType):
    class Meta:
        model = Tree

class Query(object):
    all_trees = graphene.List(TreeType)

    def resolve_all_trees(self, info, **kwargs):
        return Tree.objects.all()
