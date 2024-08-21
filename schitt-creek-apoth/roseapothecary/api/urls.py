from django.urls import path, include
from rest_framework import routers
from . import views

# This creates a router that routes to the different api endpoints
router = routers.DefaultRouter()
router.register(r"products", views.ProductsViewSet)
router.register(r"customer-info", views.CustomerInfoViewSet)
router.register(r"customer-orders", views.CustomerOrdersViewSet)

