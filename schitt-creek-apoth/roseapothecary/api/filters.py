from django_filters import rest_framework as filters
from .models import CustomerInfo, CustomerOrders, Products

class CustomerInfoFilter(filters.FilterSet):
    # this adds filters to the api
    class Meta:
        model = CustomerInfo
        fields = {
            "customer_type", 
            "product_preference", 
            "favourite_scent"
        }
        
class CustomerOrdersFilter(filters.FilterSet):
    class Meta:
        model = CustomerOrders
        fields = {
            "order_time", 
            "bill_split", 
            "product_ordered"
        }
        
class ProductsFilter(filters.FilterSet):
    class Meta:
        model = Products
        fields = {
            "price", 
            "category", 
            "artisanal_flair",
            "date_last_stocked",
            "shelf_life"
        }