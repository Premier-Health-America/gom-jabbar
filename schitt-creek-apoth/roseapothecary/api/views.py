from django_filters.rest_framework import DjangoFilterBackend
from django.core.paginator import EmptyPage, PageNotAnInteger
from django.shortcuts import render

from django_tables2 import RequestConfig, SingleTableView, MultiTableMixin
from django_filters.views import FilterView
from django.views.generic.list import ListView
from django.views.generic.base import TemplateView
import requests
from rest_framework import generics, status, viewsets
from rest_framework.response import Response


from .mypaginations import MyOrdersPagePagination, MyInfoPagePagination, MyProductsPagePagination
from .models import CustomerOrders, CustomerInfo, Products
from .filters import CustomerInfoFilter, CustomerOrdersFilter, ProductsFilter
from .serializers import (
    CustomerInfoSerializer,
    CustomerOrdersSerializer,
    ProductsSerializer,
)
from .tables import CustomerOrdersTable, ProductsTable, CustomerInfoTable, CustomerOrders

class CustomerInfoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    # access a single customer's info to update and/or delete the customer info
    queryset = CustomerInfo.objects.all()
    serializer_class = CustomerInfoSerializer
    lookup_field = "pk"  # this represents a primary key lookup


class CustomerOrdersRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomerOrders.objects.all()
    serializer_class = CustomerOrdersSerializer
    lookup_field = "pk"


class ProductsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    lookup_field = "pk"


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    pagination_class = MyProductsPagePagination
    
    def delete(self, request, *args, **kwargs):
        # this deletes all the contents of the Products Table
        Products.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class CustomerInfoViewSet(viewsets.ModelViewSet):
    queryset = CustomerInfo.objects.all()
    serializer_class = CustomerInfoSerializer
    pagination_class = MyInfoPagePagination
    filter_backends = [DjangoFilterBackend]
    # filter_backends = [filters.SearchFilter]
    filterset_class = CustomerInfoFilter
    search_fields = ["name", "customer_type", "product_preference", "favourite_scent"]
    ordering_fields = ["name", "customer_type", "product_preference", "favourite_scent"]
    ordering = ['name']
    def delete(self, request, *args, **kwargs):
        # this deletes all the contents of the Customer Info Table
        CustomerInfo.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CustomerOrdersViewSet(viewsets.ModelViewSet):
    queryset = CustomerOrders.objects.all()
    serializer_class = CustomerOrdersSerializer
    pagination_class = MyOrdersPagePagination
    
    def delete(self, request, *args, **kwargs):
        # this deletes all the contents of the Customer Orders Table
        CustomerOrders.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
     

def multi_tables(request):
    # View to render index.html with the three tables
    config = RequestConfig(request)
    table1 = CustomerInfoTable(CustomerInfo.objects.all(), prefix="1-")  # prefix specified
    table2 = CustomerOrdersTable(CustomerOrders.objects.all(), prefix="2-")  # prefix specified
    table3 = ProductsTable(Products.objects.all(), prefix="3-")
    config.configure(table1)
    config.configure(table2)
    config.configure(table3)
    

    return render(request, 'index.html', {
        'table1': table1,
        'table2': table2,
        'table3': table3,
    })