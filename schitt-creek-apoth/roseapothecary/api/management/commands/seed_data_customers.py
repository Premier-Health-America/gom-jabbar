import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from faker import Faker
from django.utils import timezone
from api.models import Products, CustomerInfo, CustomerOrders


class Command(BaseCommand):
    help = 'Seed the database with customer and order data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        now = timezone.now()
        two_years_ago = now - timedelta(days=730)  # Roughly 2 years ago

        # Generate customers
        customers = []
        for _ in range(10000):
            customer = CustomerInfo.objects.create(
                name=fake.name(),
                customer_type=random.choice([CustomerInfo.CustomerType.OUT_OF_TOWN,
                                             CustomerInfo.CustomerType.IN_TOWN,
                                             CustomerInfo.CustomerType.ROSE_FAMILY]),
                favourite_scent=fake.word()
            )
            customers.append(customer)

        # Fetch all products to use in orders
        products = list(Products.objects.all())

        # Generate orders
        order_count = 0  # Counter for total orders created
        for customer in customers:
            order_count += 1
            num_orders = random.randint(2, 14)  # Random number of orders per customer between 2 and 14
            for _ in range(num_orders):
                order_time = fake.date_time_between(start_date=two_years_ago, end_date=now)

                # Assign a random number of customers to this order
                num_customers_in_order = random.randint(1, 5)
                # Create the order
                order = CustomerOrders.objects.create(
                    order_time=order_time,
                    customer_mood=fake.sentence(),
                    number_customers=num_customers_in_order,  # Number of customers in the order
                    bill_split=random.choice([CustomerOrders.TypeOfBillSplit.PER_GROUP,
                                              CustomerOrders.TypeOfBillSplit.PER_PERSON,
                                              CustomerOrders.TypeOfBillSplit.PER_RATIO]),
                    customer_feedback=fake.text(max_nb_chars=500)
                )

                # Assign a number of customers to this order using the num_customers_in_order
                customers_for_order = random.sample(customers, num_customers_in_order)
                order.customer_id.set(customers_for_order)

                # Assign random products to this order
                num_products = random.randint(1, 8)  # Number of products per order
                products_for_order = random.sample(products, num_products)
                order.product_ordered.set(products_for_order)

                order_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {order_count} orders for customers'))



