Navigate to the Backend folder!

Run command: python manage.py runserver

Django Project Setup Guide
A concise guide to set up a Django project for local development.
Prerequisites

Python 3.8+ installed
pip and venv available

Setup Instructions

Create and Activate a Virtual Environment
python3 -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate


Install Django
pip install django
# Verify installation
django-admin --version


Create a New Django Project
django-admin startproject myproject
cd myproject

Project structure:
myproject/
├── manage.py
└── myproject/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── asgi.py
    └── wsgi.py


Run the Development Server
python manage.py runserver

Open http://127.0.0.1:8000/ to view the Django welcome page.

Create a Superuser
python manage.py createsuperuser

Follow prompts to set username, email, and password.

Access Django Admin
python manage.py runserver

Visit http://127.0.0.1:8000/admin/ and log in with your superuser credentials.


Useful Commands
python -m venv venv                # Create virtual environment
source venv/bin/activate           # Activate virtual environment (Mac/Linux)
venv\Scripts\activate              # Activate virtual environment (Windows)
pip install django                 # Install Django
django-admin startproject myproject # Create project
cd myproject                       # Navigate to project folder
python manage.py migrate           # Apply migrations
python manage.py createsuperuser   # Create admin user
python manage.py runserver         # Run development server

Troubleshooting

Ensure Python and pip are correctly installed: python3 --version and pip --version.
If django-admin is not found, verify the virtual environment is active and Django is installed.
For database issues, check settings.py for correct database configuration.

API Endpoints (Local Development Server)
HTTP Endpoint	View / Purpose	Description
http://127.0.0.1:8000/	index	Home page / landing page
http://127.0.0.1:8000/login/	user_login	User login page
http://127.0.0.1:8000/get-products/	products	Fetch list of products
http://127.0.0.1:8000/register/	CustomerRegistrationView (CBV)	User registration
http://127.0.0.1:8000/cart/	cart	User shopping cart page
http://127.0.0.1:8000/checkout/	checkout	Checkout page/process
http://127.0.0.1:8000/shop/	shop	Shop main page
http://127.0.0.1:8000/about_us/	aboutUs	About Us page
http://127.0.0.1:8000/contact/	contact	Contact page
http://127.0.0.1:8000/update_item/	updateItem	Update item (e.g., cart update)
http://127.0.0.1:8000/process_order/	processOrder	Process an order
http://127.0.0.1:8000/profile/	profile	User profile page
http://127.0.0.1:8000/products/search/	ProductSearchView (CBV)	Search products
http://127.0.0.1:8000/products/add/	ProductAddView (CBV)	Add new product
http://127.0.0.1:8000/logout/	logout_view	User logout
http://127.0.0.1:8000/products/category/<slug:slug>/	ProductsByCategoryView (CBV)	View products by category (replace <slug:slug>)
http://127.0.0.1:8000/products/categories/	ProductCategoriesView (CBV)	List all product categories
http://127.0.0.1:8000/products/<int:id>/	ProductDeleteView (CBV)	Delete product by ID (replace <int:id>)
http://127.0.0.1:8000/products/category-list/	CategoryListView (CBV)	List categories
http://127.0.0.1:8000/account/	account_page_view	User account overview
http://127.0.0.1:8000/account/edit/	edit_account_view	Edit user account
http://127.0.0.1:8000/track_order/	track_order_view	Track order status
http://127.0.0.1:8000/log_return_exchange/	log_return_exchange	Log return or exchange request
http://127.0.0.1:8000/help-center/	help_center	Help Center / Support page

Password Reset Endpoints
HTTP Endpoint	View / Purpose	Description
http://127.0.0.1:8000/reset_password/	PasswordResetView	Password reset request form
http://127.0.0.1:8000/reset_password_sent/	PasswordResetDoneView	Password reset email sent confirmation
http://127.0.0.1:8000/reset/<uidb64>/<token>/	PasswordResetConfirmView	Password reset confirmation (replace params)
http://127.0.0.1:8000/reset_password_complete/	PasswordResetCompleteView	Password reset complete confirmation


Contributing
Feel free to fork this repository, make improvements, and submit pull requests!
License
This project is licensed under the MIT License.
Happy coding! 🚀
