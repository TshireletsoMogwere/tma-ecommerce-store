

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



Contributing
Feel free to fork this repository, make improvements, and submit pull requests!
License
This project is licensed under the MIT License.
Happy coding! 🚀
