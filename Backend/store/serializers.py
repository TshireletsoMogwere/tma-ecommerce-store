from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Customer, Review, Product

class CustomerRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.pop('confirm_password', None)

        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")

        if password:
            try:
                validate_password(password)
            except ValidationError as e:
                raise serializers.ValidationError(str(e))

        email = data.get('email')
        if email:
            if User.objects.filter(email=email).exists():
                raise serializers.ValidationError("This email is already in use.")

        return data

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        user = User.objects.create_user(username=username, email=email, password=password)
        customer = Customer.objects.create(user=user, **validated_data)
        return customer

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Perform any additional validation if needed
        # For example, check if the email exists in the database

        return data
    

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['rating', 'comment', 'date', 'reviewer_name', 'reviewer_email']


class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    dimensions = serializers.SerializerMethodField()
    meta = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'category', 'brand', 'sku',
            'price', 'discount_percentage', 'rating', 'stock',
            'tags', 'weight', 'dimensions',
            'warranty_information', 'shipping_information', 'availability_status',
            'return_policy', 'minimum_order_quantity', 'meta',
            'images', 'thumbnail', 'reviews'
        ]

    def get_dimensions(self, obj):
        return {
            "width": obj.width,
            "height": obj.height,
            "depth": obj.depth
        }

    def get_meta(self, obj):
        return {
            "createdAt": obj.created_at,
            "updatedAt": obj.updated_at,
            "barcode": obj.barcode,
            "qrCode": obj.qr_code
        }