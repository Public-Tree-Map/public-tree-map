from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse

# Create your models here.

class Family(models.Model):
  family = models.CharField(max_length=100, unique=True, verbose_name="Family")

class Genus(models.Model):
  genus = models.CharField(max_length=100, unique=True, verbose_name="genus")

class Species(models.Model):
  species = models.CharField(max_length=100, unique=True, verbose_name="Species")

class Replacement_Species(models.Model):
  species =  models.ForeignKey(Species, on_delete=models.SET_NULL)
  replacements = models.ManyToManyField(Species)

class Tree_images(models.Model):
  image = models.FileField()

class Tree_name(models.Model):
  common_name = models.CharField(max_length=100,unique=True, verbose_name="Common Name")
  native = models.BooleanField()
  invasive = models.BooleanField()
  images = models.ForeignKey(Tree_images, on_delete=models.SET_NULL)
  family = models.ForeignKey(Family,on_delete=models.SET_NULL)
  genus = models.ForeignKey(Genus,on_delete=models.SET_NULL)
  species = models.ForeignKey(Species,on_delete=models.SET_NULL)
  #iucn status ????

class Water_needs(models.Model):
  irrigation_needs = models.CharField(max_length=30)
  summer_needs = models.CharField(max_length=30)
  winter_needs = models.CharField(max_length=30)
  
class Prune_date(models.Model):
  last_prune = models.DateField()

class Trees(models.Model):
  common_name = models.ForeignKey(Tree_name, on_delete=models.SET_NULL)
  latitude = models.DecimalField(max_digits=12, decimal_places=9)
  longitude = models.DecimalField(max_digits=12, decimal_places=9)
  street_number = models.IntegerField()
  street_name = models.CharField(max_length=100)
  stree_view_image = models.CharField(max_lenth=100)
  diameter = models.IntegerField()
  height = models.IntegerField()
  next_prune = models.DateField()
  last_prune = models.ForeignKey(Prune_date, on_delete=models.SET_NULL)

  def __str__(self):
    return self.common_name+"("+self.common_name+")"

