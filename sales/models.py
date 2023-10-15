from django.db import models

# Create your models here.
class Sale(models.Model):
    ID = models.AutoField(primary_key=True)
    Bed = models.IntegerField()
    Bath = models.IntegerField()
    Acre_lot = models.FloatField()
    City = models.CharField(max_length=50)
    State = models.CharField(max_length=50)
    Zip_code = models.IntegerField()
    House_size = models.FloatField()
    Prev_sold_date = models.CharField(max_length=50)
    Price = models.IntegerField()

    Year = models.IntegerField()


    def __str__(self):
        return self.City
