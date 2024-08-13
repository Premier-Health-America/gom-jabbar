from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .mypaginations import MyLimitOffsetPagination

from .models import CustomerOrders, CustomerInfo, Products
from .serializers import (CustomerInfoSerializer, CustomerOrdersSerializer, ProductsSerializer)

# Create your views here.
class CustomerInfoListCreate(generics.ListCreateAPIView):
    # This api, ListCreateAPIView allows for GET and POST requests to made for table
    queryset = CustomerInfo.objects.all()
    serializer_class = CustomerInfoSerializer
    pagination_class = MyLimitOffsetPagination # to enable pagination

class CustomerOrdersListCreate(generics.ListCreateAPIView):
    queryset = CustomerOrders.objects.all()
    serializer_class = CustomerOrdersSerializer
    pagination_class = MyLimitOffsetPagination  # to enable pagination
    # CustomerOrders.objects.values('customer_id').annotate(number_customers=Count('customer_id')).order_by()

class ProductsListCreate(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    pagination_class = MyLimitOffsetPagination  # to enable pagination
    def delete(self, request, *args, **kwargs):
        # this deletes all the contents of the Products Table
        Products.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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