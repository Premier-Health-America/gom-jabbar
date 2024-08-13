from django.shortcuts import render
from rest_framework import generics
from django.db.models import Count

from .models import CustomerOrders, CustomerInfo, Products
from .serializers import (CustomerInfoSerializer, CustomerOrdersSerializer, ProductsSerializer)

# Create your views here.
class CustomerInfoListCreate(generics.ListCreateAPIView):
    # This api, ListCreateAPIView allows for GET and POST requests to made for table
    queryset = CustomerInfo.objects.all()
    serializer_class = CustomerInfoSerializer

class CustomerOrdersListCreate(generics.ListCreateAPIView):
    queryset = CustomerOrders.objects.all()
    serializer_class = CustomerOrdersSerializer

class ProductsListCreate(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class CustomerInfoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    # access a single customer's info to update and/or delete the customer info
    queryset = CustomerInfo.objects.all()
    serializer_class = CustomerInfoSerializer
    lookup_field = "pk" # this represents a primary key lookup

class CustomerOrdersRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomerOrders.objects.all()
    serializer_class = CustomerOrdersSerializer
    lookup_field = "pk"

class ProductsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    lookup_field = "pk"