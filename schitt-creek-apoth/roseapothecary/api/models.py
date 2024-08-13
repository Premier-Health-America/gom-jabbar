import uuid

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

'''
This file contains the models to create the tables and fields for the relevant data storage
'''

class Products(models.Model):
    product_id = models.AutoField(db_column='product_id',primary_key=True)
    product_name = models.CharField(max_length=256)
    price = models.FloatField()
    artisanal_flair = models.IntegerField(
        validators=[
            MaxValueValidator(10),
            MinValueValidator(1)
        ]
     ) # this rates from 1 to 10
    date_last_stocked = models.DateField()
    shelf_life = models.DateField()

    def __str__(self):
        return self.product_name

class CustomerInfo(models.Model):
    customer_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=128, db_index=True)

    class CustomerType(models.TextChoices):
        # to enforce unique choice for the Customer Type
        OUT_OF_TOWN = 'OT'
        IN_TOWN = 'IT'
        ROSE_FAMILY = 'RF'

    customer_type = models.CharField(max_length=2, choices=CustomerType.choices, db_index=True)
    product_preference = models.ManyToManyField(Products, db_index=True)
    favourite_scent = models.TextField(max_length=100)

    def __str__(self):
        # return self.name
        # this is a string representation of an instance of the CustomerInfo model
        return str(self.customer_id)

class CustomerOrders(models.Model):
    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer_id = models.ManyToManyField(CustomerInfo, db_index=True)
    order_time = models.DateTimeField()
    product_ordered = models.ManyToManyField(Products, db_index=True)
    customer_mood = models.TextField(max_length=128)
    number_customers = models.PositiveIntegerField(default=0, null=False)

    class TypeOfBillSplit(models.TextChoices):
        # to enforce unique choice for the makeup of the bill split
        PER_GROUP = 'PG'
        PER_PERSON = 'PP'
        PER_RATIO = 'PR' # need to be percentage wise

    bill_split = models.CharField(max_length=2, choices=TypeOfBillSplit.choices, db_index=True)
    customer_feedback = models.TextField(max_length=500, blank=True)

    # def save(self, *args, **kwargs):
    #     self.number_customers = len(self.customer_id)
    #     return super(CustomerOrders, self).save(*args, **kwargs)

    def __str__(self):
        # return self.product_ordered
        return str(self.order_id)




