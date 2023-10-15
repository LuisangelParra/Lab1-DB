from rest_framework import serializers
from .models import Sale

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ('ID', 'Bed', 'Bath', 'City', 'State', 'House_size', 'Prev_sold_date', 'Price', 'Year')