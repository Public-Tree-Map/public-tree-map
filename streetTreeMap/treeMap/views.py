from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

with open('treeMap/templates/leaflet.html') as leaf:
    html = leaf.read()

@csrf_exempt
def leaflet(request):
    return HttpResponse(html)
