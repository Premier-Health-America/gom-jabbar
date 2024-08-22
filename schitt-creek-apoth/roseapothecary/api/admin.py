# from django.contrib import admin
# from .models import CustomerInfo, CustomerOrders, Products
#
# # Register your models here.
#
# class CustomerInfoAdmin(admin.ModelAdmin):
#     list_display = ["customer_id", "name", "customer_type", "product_preference", "favourite_scent"]
#
# class CustomerOrdersAdmin(admin.ModelAdmin):
#     fields = ["customer_id"]
#     list_display = ["get_customers","order_time", "product_ordered", "customer_mood", "number_customers",
#                   "bill_split", "customer_feedback"]
#
#     def get_customers(self, obj):
#         return "\n".join([c.customer_ids for c in obj.customer_id.all()])
#
# class ProductsAdmin(admin.ModelAdmin):
#     list_display = ["product_id", "product_name", "price", "artisanal_flair", "date_last_stocked",
#                   "shelf_life"]
#
# admin.site.register(CustomerInfo, CustomerInfoAdmin)
# admin.site.register(CustomerOrders, CustomerOrdersAdmin)
# admin.site.register(Products, ProductsAdmin)
