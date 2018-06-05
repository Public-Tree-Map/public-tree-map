from django.db import models

class Tree(models.Model):
  latitude = models.DecimalField(max_digits=12, decimal_places=9)
  longitude = models.DecimalField(max_digits=12, decimal_places=9)
  common_name = models.CharField(max_length=255, verbose_name="Common Name")
  botanical_name = models.CharField(max_length=255, verbose_name="Botanical Name")
