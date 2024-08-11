from django.db import models

# Create your models here.
class CustomerInfo(models.Model):
    class CustomerType(models.TextChoices):
        # to enforce unique choice for the Customer Type
        OUT_OF_TOWN = 'OT'
        IN_TOWN = 'IT'
        ROSE_FAMILY = 'RF'

    customer_type = models.CharField(max_length=2, choices=CustomerType.choices)
    product_preference = models.TextField(max_length=100)
    favourite_scent = models.TextField(max_length=100)

class CustomerOrders(models.Model)


