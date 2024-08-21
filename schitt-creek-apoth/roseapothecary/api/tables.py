import django_tables2 as tables
from .models import CustomerInfo, CustomerOrders, Products

'''
Create tables to be rendered to the frontend
'''

class CustomerInfoTable(tables.Table):
    class Meta:
        model = CustomerInfo
        include = ("name", "customer_type", "product_preference", "favourite_scent")
        exclude = ("customer_id", )
        orderable = True
class CustomerOrdersTable(tables.Table):
    class Meta:
        model = CustomerOrders
        include = ("order_id", "customer_id", "order_time", "product_ordered", "customer_mood", "number_customers",
                  "bill_split", "customer_feedback")
        orderable = True

class ProductsTable(tables.Table):
    class Meta:
        model = Products
        include = ("product_name", "price", "category","artisanal_flair", "date_last_stocked",
                  "shelf_life")
        exclude = ("product_id", )
        orderable = True