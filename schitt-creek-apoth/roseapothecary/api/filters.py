import django_filters
from django.db import models as django_models
from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import CustomerInfo

class CustomerInfoFilter(filters.FilterSet):
    class Meta:
        model = CustomerInfo
        fields = {
            "customer_type", 
            "product_preference", 
            "favourite_scent"
        }

    # filter_overrides = {
    #     django_models.DateTimeField: {
    #         'filter_class': django_filters.IsoDateTimeFilter
    #     },
    # }