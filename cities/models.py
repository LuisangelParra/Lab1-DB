from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class City(models.Model):
    ID = models.AutoField(primary_key=True)
    RegionID = models.IntegerField()
    SizeRank = models.IntegerField()
    RegionName  = models.CharField(max_length=50)
    FipsCode = models.IntegerField(null=True)
    StateName = models.CharField(max_length=50)
    State = models.CharField(max_length=50)

    January = models.CharField(max_length=50, null=True)
    February = models.CharField(max_length=50, null=True)
    March = models.CharField(max_length=50, null=True)
    April = models.CharField(max_length=50, null=True)
    May = models.CharField(max_length=50, null=True)
    June = models.CharField(max_length=50, null=True)
    July = models.CharField(max_length=50, null=True)
    August = models.CharField(max_length=50, null=True)
    Septembe = models.CharField(max_length=50, null=True)
    October = models.CharField(max_length=50, null=True)
    November = models.CharField(max_length=50, null=True)
    December = models.CharField(max_length=50, null=True)

    Average = models.CharField(max_length=50, null=True)

    Year = models.IntegerField()


    def __str__(self):
        return self.RegionName
    