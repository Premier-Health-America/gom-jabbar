from django.urls import path
from . import views

urlpatterns = [
    path("customer-info/", views.CustomerInfoListCreate.as_view(), name="customer-info-view-create"),
    path("customer-orders/", views.CustomerOrdersListCreate.as_view(), name="customer-orders-view-create"),
    path("products/", views.ProductsListCreate.as_view(), name="product-view-create")
]
