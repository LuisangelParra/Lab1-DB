from django.shortcuts import render
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import SaleSerializer
from .models import Sale

# Create your views here.
class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields  = ['ID', 'Bed', 'Bath', 'City', 'State', 'House_size', 'Prev_sold_date', 'Price', 'Year']