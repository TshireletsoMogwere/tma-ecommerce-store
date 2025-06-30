from django.shortcuts import render
from django.http import JsonResponse
import json
import datetime
from .models import *
from .utils import cookieCart, cartData, guestOrder
from django.http import JsonResponse
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework import status
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .models import Customer
from .serializers import CustomerRegistrationSerializer, UserLoginSerializer, ProductSerializer
from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import *
from django.urls import reverse_lazy
from rest_framework.views import APIView
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Product
from django.views.decorators.csrf import csrf_exempt
from .forms import EditAccountForm


def index(request):
     products = Product.objects.all()
     data = cartData(request)

     cartItems = data['cartItems']
     order = data['order']
     items = data['items']

     context = {'products': products, 'items':items, 'order':order, 'cartItems': cartItems}
     return render(request, 'store/index.html', context)

def user_login(request):
    template_name = 'login.html'
    error = None 
    errors = None  
    
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.POST)
        if serializer.is_valid():
            user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
            if user:
                login(request, user)
                if user.is_staff:
                    return redirect('admin:index')
                else:
                    return redirect('index')
            else:
                error = 'Invalid email or password'
        else:
            errors = serializer.errors
    else:
        serializer = UserLoginSerializer() 

    return render(request, template_name, {'form': serializer, 'error': error, 'errors': errors})

class CustomerRegistrationView(TemplateView):
    template_name = 'register.html'

    def post(self, request, *args, **kwargs):
        serializer = CustomerRegistrationSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            
            return HttpResponseRedirect(reverse_lazy('index'))  
        else:
            
            return render(request, self.template_name, {'serializer': serializer})

def aboutUs(request):
     data = cartData(request)

     cartItems = data['cartItems']
     order = data['order']
     items = data['items']

     context = {'items':items, 'order':order, 'cartItems': cartItems}
     return render(request, 'store/about_us.html', context)

def contact(request):
     data = cartData(request)

     cartItems = data['cartItems']
     order = data['order']
     items = data['items']

     context = {'items':items, 'order':order, 'cartItems': cartItems}
     return render(request, 'store/contact.html', context)


def checkout(request):

     data = cartData(request)

     cartItems = data['cartItems']
     order = data['order']
     items = data['items']

     context = {'items':items, 'order':order, 'cartItems': cartItems}
     return render(request, 'store/checkout.html', context)

def cart(request):
      
     data = cartData(request)

     cartItems = data['cartItems']
     order = data['order']
     items = data['items']

     context = {'items':items, 'order':order, 'cartItems': cartItems}
     return render(request, 'store/cart.html', context)


def shop(request):
    products = Product.objects.prefetch_related('reviews').all()
    data = cartData(request)

    product_list = []
    for product in products:
        product_list.append({
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "category": product.category,
            "price": float(product.price),
            "discountPercentage": float(product.discount_percentage),
            "rating": float(product.rating),
            "stock": product.stock,
            "tags": product.tags,
            "brand": product.brand,
            "sku": product.sku,
            "weight": product.weight,
            "dimensions": {
                "width": product.width,
                "height": product.height,
                "depth": product.depth
            },
            "warrantyInformation": product.warranty_information,
            "shippingInformation": product.shipping_information,
            "availabilityStatus": product.availability_status,
            "returnPolicy": product.return_policy,
            "minimumOrderQuantity": product.minimum_order_quantity,
            "reviews": [
                {
                    "rating": review.rating,
                    "comment": review.comment,
                    "date": review.date.isoformat(),
                    "reviewerName": review.reviewer_name,
                    "reviewerEmail": review.reviewer_email
                } for review in product.reviews.all()
            ],
            "meta": {
                "createdAt": product.created_at.isoformat(),
                "updatedAt": product.updated_at.isoformat(),
                "barcode": product.barcode,
                "qrCode": product.qr_code
            },
            "thumbnail": product.thumbnail.url if product.thumbnail else None,
            "images": product.images,
        })

    response_data = {
        "products": product_list,
        "cart": {
            "items": data['items'],
            "order": {
                "total": float(data['order'].get('get_cart_total', 0)),
                "items_count": data['order'].get('get_cart_items', 0),
            },
            "cartItems": data['cartItems']
        }
    }

    return JsonResponse(response_data, safe=False)

@csrf_exempt
def products(request):
    products = Product.objects.prefetch_related('reviews').all()
    data = []

    for product in products:
        product_data = {
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "category": product.category,
            "price": float(product.price),
            "discountPercentage": float(product.discount_percentage),
            "rating": float(product.rating),
            "stock": product.stock,
            "tags": product.tags,
            "brand": product.brand,
            "sku": product.sku,
            "weight": product.weight,
            "dimensions": {
                "width": product.width,
                "height": product.height,
                "depth": product.depth
            },
            "warrantyInformation": product.warranty_information,
            "shippingInformation": product.shipping_information,
            "availabilityStatus": product.availability_status,
            "reviews": [
                {
                    "rating": review.rating,
                    "comment": review.comment,
                    "date": review.date.isoformat(),
                    "reviewerName": review.reviewer_name,
                    "reviewerEmail": review.reviewer_email
                }
                for review in product.reviews.all()
            ],
            "returnPolicy": product.return_policy,
            "minimumOrderQuantity": product.minimum_order_quantity,
            "meta": {
                "createdAt": product.created_at.isoformat(),
                "updatedAt": product.updated_at.isoformat(),
                "barcode": product.barcode,
                "qrCode": product.qr_code
            },
            "thumbnail": product.thumbnail.url if product.thumbnail else None,
            "images": product.images
        }

        data.append(product_data)

    return JsonResponse({"products": data}, safe=False)

def updateItem(request):
     data = json.loads(request.body)
     productId = data['productId']
     action = data['action']

     print('action:', action)
     print('productId:', productId)

     customer = request.user.customer
     product = Product.objects.get(id=productId)
     order, created = Order.objects.get_or_create(customer=customer, complete=False)
     
     orderItem ,created = OrderItem.objects.get_or_create(order=order, product=product)
     
     if action == 'add':
          message = 'Item was added'
     elif action == 'remove':
          orderItem.quantity = (orderItem.quantity - 1)
     
     orderItem.save()

     if orderItem.quantity <= 0:
          orderItem.delete()
          message = 'Item was removed'

     return JsonResponse(message, safe=False)

def processOrder(request):
     transaction_id = datetime.datetime.now().timestamp
     data = json.loads(request.body)


     if request.user.is_authenticated:
          customer = request.user.customer
          order, created = Order.objects.get_or_create(customer=customer, complete=False)

     else:
          customer, order = guestOrder(request,data)
     
     total = float(data['form']['total'])
     order.transection_id = transaction_id

     if total == order.get_cart_total:
          order.complete = True

     order.save()

     ShippingAddress.objects.create(
          customer = customer,
          order=order,
          address=data['shipping']['address'],
          city=data['shipping']['city'],
          province=data['shipping']['province'],
          zipcode=data['shipping']['zipcode'],
     )

     return JsonResponse('Payment complete', safe=False)

def profile(request):
    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items':items, 'order':order, 'cartItems': cartItems}
    return render(request, 'store/profile.html', context)

def logout_view(request):
    logout(request)
    return redirect('index')
    
@login_required
@api_view(['GET'])
def account_page_view(request):
    
    account_info = {
        'username': request.user.username,
        'email': request.user.email,
    }
    return Response(account_info)

@login_required
def edit_account_view(request):

    if request.method == 'POST':
        form = EditAccountForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = EditAccountForm(instance=request.user)
    return render(request, 'store/edit_account.html', {'form': form})

def track_order_view(request):
    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items':items, 'order':order, 'cartItems': cartItems}

    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items':items, 'order':order, 'cartItems': cartItems}

    confirmed_orders = Order.objects.filter(customer__user=request.user, complete=True)

    
    if confirmed_orders.exists():
        return render(request, 'store/track_order.html', {'confirmed_orders': confirmed_orders},context)
    else:
        
        message = "You don't have any confirmed orders at the moment."
        return render(request, 'store/track_order.html', {'message': message},context)
    

def log_return_exchange(request):
    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items':items, 'order':order, 'cartItems': cartItems}


    if request.method == 'POST':
        item_quality = request.POST.get('item_quality', '')
        item_price = request.POST.get('item_price', '')
        
        email = request.POST.get('email', '')

        
        subject = 'Return/Exchange Request'
        message = f'Item Quality: {item_quality}\nItem Price: {item_price}\nEmail: {email}'
        sender_email = 'thriftville.inbox@gmail.com'  
        recipient_email = 'thriftville.inbox@gmail.com'
        send_mail(subject, message, sender_email, [recipient_email])

        return HttpResponse('Return/Exchange request sent successfully!')
    else:
        return render(request, 'store/log_return_exchange.html', context)
 
def help_center(request):
    data = cartData(request)

    cartItems = data['cartItems']
    order = data['order']
    items = data['items']

    context = {'items':items, 'order':order, 'cartItems': cartItems}


    if request.method == 'POST':
       
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        
        subject = f"Message from {name}"
        email_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

       
        send_mail(
            subject,
            email_message,
            'thriftville.inbox@gmail.com',  
            ['thriftville.inbox@gmail.com'], 
            fail_silently=False,
        )
       

    return render(request, 'store/help_center.html',context)

class ProductSearchView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['title', 'description', 'category', 'tags', 'brand']

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())  # <--- 🔍 Filter logic (search)
        serializer = self.get_serializer(queryset, many=True) # <--- 🔄 Convert queryset to JSON
        return Response({'products': serializer.data})        # <--- 📤 Custom response format


class ProductCategoriesView(APIView):
    def get(self, request):
        categories = Product.objects.values_list('category', flat=True).distinct()
        base_url = request.build_absolute_uri('/api/products/category/')
        data = [
            {
                "slug": cat.lower().replace(' ', '-'),
                "name": cat,
                "url": f"{base_url}{cat.lower().replace(' ', '-')}/"
            }
            for cat in categories
        ]
        return Response(data)
    
class CategoryListView(APIView):
    def get(self, request):
        categories = Product.objects.values_list('category', flat=True).distinct()
        return Response(list(categories))
    
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductsByCategoryView(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        slug = self.kwargs.get('slug').replace('-', ' ')
        return Product.objects.filter(category__iexact=slug)
    
class ProductDeleteView(APIView):
    def delete(self, request, id):
        product = Product.objects.filter(id=id).first()
        if not product:
            return Response({'error': 'Product not found'}, status=404)
        data = ProductSerializer(product).data
        data['isDeleted'] = True
        data['deletedOn'] = datetime.utcnow().isoformat() + "Z"
        return Response(data)

class ProductAddView(APIView):
    def post(self, request):
        data = request.data.copy()
        data['id'] = Product.objects.order_by('-id').first().id + 1 if Product.objects.exists() else 1
        return Response(data)

