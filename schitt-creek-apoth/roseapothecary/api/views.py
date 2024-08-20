from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status, viewsets, filters
from rest_framework.response import Response

from .mypaginations import MyLimitOffsetPagination, MyOrdersCursorPagination, MyInfoCursorPagination, MyProductsCursorPagination
from .models import CustomerOrders, CustomerInfo, Products
from .filters import CustomerInfoFilter
from .serializers import (
    CustomerInfoSerializer,
    CustomerOrdersSerializer,
    ProductsSerializer,
)


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
    # pagination_class = MyProductsCursorPagination
    
    def delete(self, request, *args, **kwargs):
        # this deletes all the contents of the Products Table
        Products.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class CustomerInfoViewSet(viewsets.ModelViewSet):
    queryset = CustomerInfo.objects.all()
    serializer_class = CustomerInfoSerializer
    pagination_class = MyInfoCursorPagination
    filter_backends = [DjangoFilterBackend]
    # filter_backends = [filters.SearchFilter]
    filterset_class = CustomerInfoFilter
    # search_fields = ["name", "customer_type", "product_preference", "favourite_scent"]
    # ordering_fields = ["name", "customer_type", "product_preference", "favourite_scent"]
    # ordering = ['name']
    def delete(self, request, *args, **kwargs):
        # this deletes all the contents of the Customer Info Table
        CustomerInfo.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CustomerOrdersViewSet(viewsets.ModelViewSet):
    queryset = CustomerOrders.objects.all()
    serializer_class = CustomerOrdersSerializer
    # pagination_class = MyOrdersCursorPagination
    
    def delete(self, request, *args, **kwargs):
        # this deletes all the contents of the Customer Orders Table
        CustomerOrders.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    




