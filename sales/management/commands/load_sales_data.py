from django.core.management.base import BaseCommand
from sales.models import Sale
import csv
import os
import math


class Command(BaseCommand):
    help = 'Carga datos en la base de datos'
    def handle(self, *args, **options):
        # Aquí puedes escribir la lógica para cargar datos en tus modelos
        current_dir = os.getcwd()
        print(current_dir)
        with open('Data\\House_sales_data.csv', 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)
            
            for row in reader:
                #Verify if month is not null

                #Create City object  
                Sale.objects.create(
                    Bed = int(row[1]),
                    Bath = int(row[2]),
                    Acre_lot = float(row[3]),
                    City = row[4],
                    State = row[5],
                    Zip_code = int(row[6]),
                    House_size = row[7],
                    Prev_sold_date = row[8],
                    Price = int(float(row[9])),
                    Year = int(row[10])
                )
