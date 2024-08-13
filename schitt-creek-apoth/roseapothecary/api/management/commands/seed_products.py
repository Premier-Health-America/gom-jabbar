import os
import csv
from django.core.management.base import BaseCommand
from faker import Faker
from api.models import Products
import datetime

class Command(BaseCommand):
    help = 'Seed the database with product data'

    def add_arguments(self, parser):
        parser.add_argument('--file', type=str, help='Path to the file containing product names')

    def handle(self, *args, **kwargs):
        fake = Faker()
        file_path = kwargs['file']

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'File {file_path} does not exist'))
            return

        product_names = {}
        reader = csv.DictReader(open(file_path))
        for row in reader:
            product_names = dict(row)

        for name, category in product_names.items():
            Products.objects.create(
                product_name=name,
                price=fake.random_number(digits=2),
                category=category,
                artisanal_flair=fake.random_int(min=1, max=10),
                date_last_stocked=fake.date_between(start_date='-2y', end_date='today'),
                shelf_life=fake.date_between(start_date='today', end_date='+2y')
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded products'))
