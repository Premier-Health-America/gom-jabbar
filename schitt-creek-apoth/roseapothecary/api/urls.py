from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"products", views.ProductsViewSet)
router.register(r"customer-info", views.CustomerInfoViewSet)
router.register(r"customer-orders", views.CustomerOrdersViewSet)

# This file creates the different paths for the api
urlpatterns = [
    # path("", include(prod_router.urls)),
    # path(
    #     "customer-info/",
    #     views.CustomerInfoListCreate.as_view(),
    #     name="customer-info-view-create",
    # ),
    # path(
    #     "customer-orders/",
    #     views.CustomerOrdersListCreate.as_view(),
    #     name="customer-orders-view-create",
    # ),
    # path("products/", views.ProductsListCreate.as_view(), name="product-view-create"),
    # path(
    #     "customer-info/<uuid:pk>/",
    #     views.CustomerInfoRetrieveUpdateDestroy.as_view(),
    #     name="update_customer_info",
    # ),
    # path(
    #     "customer-orders/<uuid:pk>/",
    #     views.CustomerOrdersRetrieveUpdateDestroy.as_view(),
    #     name="update_customer_order",
    # ),
    # path(
    #     "products/<int:pk>/",
    #     views.ProductsRetrieveUpdateDestroy.as_view(),
    #     name="update_product",
    # ),
]
