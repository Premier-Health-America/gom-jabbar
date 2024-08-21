import os
import csv
from django.core.management.base import BaseCommand
from faker import Faker
from api.models import Products
from django.core.exceptions import ValidationError

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

        product_data = []
        with open(file_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                product_data.append(row)

        valid_categories = {choice[0] for choice in Products._meta.get_field('category').choices}

        for row in product_data:
            name = row.get('product_name')
            category = row.get('category')

            if not name or not category:
                self.stdout.write(self.style.WARNING(f'Missing product_name or category in row: {row}'))
                continue

            # Check if the product already exists
            if Products.objects.filter(product_name=name).exists():
                self.stdout.write(self.style.WARNING(f'Product with name "{name}" already exists. Skipping.'))
                continue

            # Validate category
            if category not in valid_categories:
                self.stdout.write(self.style.ERROR(f'Invalid category "{category}" in row: {row}'))
                continue

            try:
                Products.objects.create(
                    product_name=name,
                    price=fake.random_number(digits=2),
                    category=category,
                    artisanal_flair=fake.random_int(min=1, max=10),
                    date_last_stocked=fake.date_between(start_date='-2y', end_date='today'),
                    shelf_life=fake.date_between(start_date='today', end_date='+2y')
                )
            except ValidationError as e:
                self.stdout.write(self.style.ERROR(f'Validation error for product "{name}": {e}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error creating product "{name}": {e}'))

        self.stdout.write(self.style.SUCCESS('Successfully seeded products'))

