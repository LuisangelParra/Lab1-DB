from django.core.management.base import BaseCommand
from cities.models import City
import csv
import os
import math


class Command(BaseCommand):
    help = 'Carga datos en la base de datos'
    def handle(self, *args, **options):
        # Aquí puedes escribir la lógica para cargar datos en tus modelos
        current_dir = os.getcwd()
        print(current_dir)
        with open('Data\\Housing_data.csv', 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)
            
            for row in reader:
                #Verify if month is not null
                sum = 0
                num = 0
                for i in range(6,18):
                    if row[i] == '':
                        sum = sum + 0
                        num = num + 0
                        row[i] = None
                    else:
                        sum = sum + round(float(row[i]),2)
                        num = num + 1
                        row[i] = round(float(row[i]),2)

                #Calculate average
                if num == 0:
                    average = 0
                else:
                    average = round(sum/num,2)
            
                if row[3] == '':
                    row[3] = 0

                #Create City object  
                City.objects.create(RegionID = row[0], SizeRank = row[1], RegionName = row[2], FipsCode =  int(float(row[3])), StateName = row[4], State = row[5], January = row[6], February = row[7], March = row[8], April = row[9], May = row[10], June = row[11], July = row[12], August = row[13], Septembe = row[14], October = row[15], November = row[16], December = row[17], Average = average, Year = row[18])
