from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    sku = models.CharField(max_length=50, unique=True)
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    stock = models.IntegerField(default=0)
    minimum_order_quantity = models.IntegerField(default=1)
    
    tags = models.JSONField(default=list)
    
    weight = models.FloatField(null=True, blank=True)
    width = models.FloatField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    depth = models.FloatField(null=True, blank=True)
    
    warranty_information = models.CharField(max_length=255, null=True, blank=True)
    shipping_information = models.CharField(max_length=255, null=True, blank=True)
    availability_status = models.CharField(max_length=50, default="In Stock")
    return_policy = models.CharField(max_length=255, null=True, blank=True)
    
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    images = models.JSONField(default=list) 
    
    barcode = models.CharField(max_length=50, null=True, blank=True)
    qr_code = models.TextField(null=True, blank=True) 
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def dimensions(self):
        return {
            "width": self.width,
            "height": self.height,
            "depth": self.depth
        }

    def __str__(self):
        return self.title
    
class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    reviewer_name = models.CharField(max_length=100)
    reviewer_email = models.EmailField()
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reviewer_name} - {self.rating}★"

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False, null=True, blank=False)
    transection_id = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return str(self.id)

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField(default=1, null=True, blank=True)

    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total        

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    address = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=200, null=True)
    province = models.CharField(max_length=200, null=True)
    zipcode = models.CharField(max_length=200, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address