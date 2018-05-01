from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse

# Create your models here.

class Family(models.Model):
  family = models.CharField(max_length=100, unique=True, verbose_name="Family")

class Genus(models.Model):
  genus = models.CharField(max_length=100, unique=True, verbose_name="genus")
  family = models.ForeignKey(Family,on_delete=models.SET_NULL, null=True)

class Species(models.Model):
  common_name = models.CharField(max_length=255,unique=True, verbose_name="Common Name")
  species = models.CharField(max_length=100, unique=True, verbose_name="Species")
  genus = models.ForeignKey(Genus,on_delete=models.SET_NULL, null=True)
  images = models.ForeignKey(Tree_images, on_delete=models.SET_NULL, null=True)
  #iucn status ???? ie endangered, threatened, etc.

class Tree_images(models.Model):
  image = models.FileField()

class Tree_context(models.Model):
  native = models.BooleanField()
  invasive = models.BooleanField()
  species = models.ForeignKey(Species,on_delete=models.SET_NULL, null=True)
  water_needs = models.ForeignKey(Water_needs,on_delete=models.SET_NULL, null=True)

class Water_needs(models.Model):
  irrigation_needs = models.CharField(max_length=30)
  summer_needs = models.CharField(max_length=30)
  winter_needs = models.CharField(max_length=30)

class Trees(models.Model):
  context = models.ForeignKey(Tree_context, on_delete=models.SET_NULL, null=True)
  latitude = models.DecimalField(max_digits=12, decimal_places=9)
  longitude = models.DecimalField(max_digits=12, decimal_places=9)
  street_number = models.IntegerField()
  street_name = models.CharField(max_length=100)
  stree_view_image = models.CharField(max_length=100)
  max_diameter = models.DecimalField(max_digits=6, decimal_places=3)
  min_diameter = models.DecimalField(max_digits=6, decimal_places=3)
  max_height = models.DecimalField(max_digits=6, decimal_places=3)
  min_height = models.DecimalField(max_digits=6, decimal_places=3)

  def __str__(self):
    return self.common_name+"("+self.species.common_name+")"

