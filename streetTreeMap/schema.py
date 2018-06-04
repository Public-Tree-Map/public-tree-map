import graphene
import treeMap.schema

class Query(treeMap.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)
