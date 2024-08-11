from django.shortcuts import render
from rest_framework import generics
from .models import CustomerOrders, CustomerInfo, Products
from .serializers import (CustomerInfoSerializer, CustomerOrdersSerializer, ProductsSerializer)

# Create your views here.
class CustomerInfoListCreate(generics.ListCreateAPIView):
    queryset = CustomerInfo.objects.all()
    serializer_class = CustomerInfoSerializer

class CustomerOrdersListCreate(generics.ListCreateAPIView):
    queryset = CustomerOrders.objects.all()
    serializer_class = CustomerOrdersSerializer

class ProductsListCreate(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer