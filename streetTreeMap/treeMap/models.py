from django.db import models

class Tree(models.Model):
  latitude = models.DecimalField(max_digits=12, decimal_places=9)
  longitude = models.DecimalField(max_digits=12, decimal_places=9)
  common_name = models.CharField(max_length=255, verbose_name="Common Name", null=True)
  botanical_name = models.CharField(max_length=255, verbose_name="Botanical Name", null=True)
  min_height = models.CharField(max_length=255, verbose_name="Minimum Height (feet)", null=True)
  max_height = models.CharField(max_length=255, verbose_name="Maximum Height (feet)", null=True)
  min_dbh = models.DecimalField(max_digits=12, decimal_places=1, verbose_name="Minimum Diameter at Breast Height (inches)", null=True)
  max_dbh = models.DecimalField(max_digits=12, decimal_places=1, verbose_name="Maximum Diameter at Breast Height (inches)", null=True)
  address = models.CharField(max_length=255, verbose_name="Street Address", null=True)
  street = models.CharField(max_length=255, verbose_name="Street Name", null=True)
