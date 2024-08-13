from rest_framework import serializers
from .models import (CustomerInfo, CustomerOrders, Products)

'''
Create a serializer for each model to convert these models to Python data types
to be rendered into JSON file(s).
'''
class CustomerInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerInfo
        fields = ["customer_id", "name", "customer_type", "product_preference", "favourite_scent"]

class CustomerOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerOrders
        fields = ["order_id", "customer_id", "order_time", "product_ordered", "customer_mood", "number_customers",
                  "bill_split", "customer_feedback"]

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ["product_id", "product_name", "price", "category","artisanal_flair", "date_last_stocked",
                  "shelf_life"]
