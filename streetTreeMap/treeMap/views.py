from django.http import HttpResponse

with open('treeMap/templates/leaflet.html') as leaf:
    html = leaf.read()

def leaflet(request):
    return HttpResponse(html)
