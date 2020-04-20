# Again django react 

## step by step

1. installation django

python 3 : 

```
python -m venv my_env

source my_env/bin/active

pip install django djangorestframework django-cors-headers

#project 
django-admin startproject backendAPI

# create the apllication
django-admin startapp api

#starting
cd backendAPI
python manage.py migrate

# create a superuser
python manage.py createsuperuser
```

2. backendAPI/backendAPI/settings.py

```
backendAPI
├── api
├── backendAPI
├── db.sqlite3
└── manage.py
```

add :
```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api'
]
```

```
backendAPI
├─backendAPI
  ├── __init__.py
  ├── __pycache__
  ├── asgi.py
  ├── settings.py
  ├── urls.py
  └── wsgi.py

migrate again
```

run :
```
python manage.py migrate
python manage.py runserver

```

2. api


backendAPI
├── api


2. 1. views.py

```
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

```

2. 2. serializers.py

```
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
        'id', 'username', 'password',
        'email',
        'created_at',
        'date_validated', 
        'token', 
        'validated')
```

2. 3. urls.py

api/urls.py

```
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

```

backendAPI/urls.py
```
from django.contrib import admin
from django.urls import path
from django.conf.urls import include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api', include('api.urls')),
]
```

2. 4. Verification POSTMAN
add more validation / login / creation


serializers.py
```
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
# from .models import Movie, Rating


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        # to mask password to not display it
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # fonction pour overide la creation d'un user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

```


api/urls.py
```
# from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import  UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    # path('new/', admin.site.urls),# simple original url
    path('', include(router.urls)),
]
```


backendAPI/urls.py
```
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('auth/', obtain_auth_token),
]
```


settings .py
```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'api'
]
```



check authentication :
http://127.0.0.1:8000/admin/authtoken/token/

POST
http://127.0.0.1:8000/api/users/
 

GET a token : POST 
http://127.0.0.1:8000/auth/

post
username
password


