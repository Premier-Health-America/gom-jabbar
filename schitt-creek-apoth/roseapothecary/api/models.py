from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

'''
This file contains the models to create the tables and fields for the relevant data storage
'''
class CustomerInfo(models.Model):
    customer_id = models.AutoField(db_column='customer_id', primary_key=True)
    name = models.CharField(max_length=128)

    class CustomerType(models.TextChoices):
        # to enforce unique choice for the Customer Type
        OUT_OF_TOWN = 'OT'
        IN_TOWN = 'IT'
        ROSE_FAMILY = 'RF'

    customer_type = models.CharField(max_length=2, choices=CustomerType.choices)
    product_preference = models.TextField(max_length=100)
    favourite_scent = models.TextField(max_length=100)

    def __str__(self):
        # this is a string representation of the an instance of the CustomerInfo model
        return self.name

class CustomerOrders(models.Model):
    customer_id = models.AutoField(db_column='customer_id', primary_key=True)
    order_time = models.DateTimeField(auto_now_add=True)
    product_ordered = models.CharField(max_length=128)
    customer_mood = models.TextField(max_length=100)
    number_customers = models.PositiveIntegerField()

    class TypeOfBillSplit(models.TextChoices):
        # to enforce unique choice for the makeup of the bill split
        PER_GROUP = 'PG'
        PER_PERSON = 'PP'
        PER_RATIO = 'PR' # need to be percentage wise

    bill_split = models.CharField(max_length=2, choices=TypeOfBillSplit.choices)
    customer_feedback = models.TextField(max_length=500, blank=True)

    def __str__(self):
        return self.product_ordered

class Products(models.Model):
    product_id = models.AutoField(db_column='product_id',primary_key=True)
    product_name = models.CharField(max_length=120)
    price = models.FloatField()
    artisanal_flair = models.IntegerField(
        validators=[
            MaxValueValidator(10),
            MinValueValidator(1)
        ]
     ) # this rates from 1 to 10
    date_last_stocked = models.DateField(auto_now_add=True)
    shelf_life = models.DateField()

    def __str__(self):
        return self.product_name


