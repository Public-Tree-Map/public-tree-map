from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse

class Tree(models.Model):
  latitude = models.DecimalField(max_digits=12, decimal_places=9)
  longitude = models.DecimalField(max_digits=12, decimal_places=9)
