from rest_framework.pagination import LimitOffsetPagination
from rest_framework.pagination import PageNumberPagination

# Defining this pagination class
class MyLimitOffsetPagination(LimitOffsetPagination):
    pass

class MyOrdersCursorPagination(PageNumberPagination):
    # 100 records will be shown per page
    page_size = 99
    page_size_query_param = 'page_size'
    
    # Ordering the records 
    # ordering = 'order_id'
    
    max_page_size = 1000
    page_query_param = 'p'
    
class MyInfoCursorPagination(PageNumberPagination):
    # 100 records will be shown per page
    page_size = 99
    page_size_query_param = 'page_size'
    # Ordering the records 
    # ordering = 'customer_id'
    
    max_page_size = 1000
    page_query_param = 'p'
    
class MyProductsCursorPagination(PageNumberPagination):
    # 100 records will be shown per page
    page_size = 10
    page_size_query_param = 'page_size'
    # Ordering the records 
    # ordering = 'product_id'
    
    max_page_size = 100
    page_query_param = 'p'
    
    
    
    