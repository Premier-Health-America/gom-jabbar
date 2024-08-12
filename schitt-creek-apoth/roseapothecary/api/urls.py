from django.urls import path
from . import views

# This file creates the different paths for the api
urlpatterns = [
    path("customer-info/", views.CustomerInfoListCreate.as_view(), name="customer-info-view-create"),
    path("customer-orders/", views.CustomerOrdersListCreate.as_view(), name="customer-orders-view-create"),
    path("products/", views.ProductsListCreate.as_view(), name="product-view-create"),
    path("customer-info/<int:pk>/", views.CustomerInfoRetrieveUpdateDestroy.as_view(), name="update_customer_info"),
    path("customer-orders/<int:pk>/", views.CustomerOrdersRetrieveUpdateDestroy.as_view(), name="update_customer_order"),
    path("products/<int:pk>/", views.ProductsRetrieveUpdateDestroy.as_view(), name="update_product")
]
