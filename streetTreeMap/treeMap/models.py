from django.db import models

class Tree(models.Model):
  latitude = models.DecimalField(max_digits=12, decimal_places=9)
  longitude = models.DecimalField(max_digits=12, decimal_places=9)
  common_name = models.CharField(max_length=255, verbose_name="Common Name")
  botanical_name = models.CharField(max_length=255, verbose_name="Botanical Name")
  min_height = models.CharField(max_length=255, verbose_name="Minimum Height (feet)")
  max_height = models.CharField(max_length=255, verbose_name="Maximum Height (feet)")
  min_dbh = models.DecimalField(max_digits=12, decimal_places=1, verbose_name="Minimum Diameter at Breast Height (inches)")
  max_dbh = models.DecimalField(max_digits=12, decimal_places=1, verbose_name="Maximum Diameter at Breast Height (inches)")
  address = models.CharField(max_length=255, verbose_name="Street Address")
  street = models.CharField(max_length=255, verbose_name="Street Name")
