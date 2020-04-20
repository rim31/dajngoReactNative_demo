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




___________

# React js

```
npx create-react-app frontend
```


create differents folders and files

in src/

App.js
```
import React from 'react';
import './App.css';
import Layout from './layouts/Layout';
import Login from './components/Login';
function App() {
  return (
    <div>
      <Layout />
      <Login />
    </div>
  );
}

export default App;

```


components/Login.js
```
import React, { useState } from 'react'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function changeUsername(e) {
    setUsername(e.target.value);
    console.log(username)
  }

  function changePassword(e) {
    setPassword(e.target.value);
    console.log(password)
  }
  const login = (e) => {
    // alert('Login');
    console.log("Login ", username, password);
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    }).then(
      data => { console.log(data); }
    ).catch(error => console.error(error))
  }

  return (
    <div className="field">
      LOGIN
      <div className="control">
        <label>Username
        <input type="text" className="input is-info"
            name="username" value={username} onChange={changeUsername} />
        </label>
      </div>
      <div className="control">
        <label>password
        <input type="password" className="input is-info"
            name="password" value={password} onChange={changePassword} />
        </label>
      </div>
      <button onClick={login} className="button is-link">Login</button>
    </div>
  )
}

```

problem CORS

## CORS 

modify settings.py

```
MIDDLEWARE: [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',#==========HERE
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',


CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
]

```


POST works :
CORS OK

## Add new data : models:

models.py
```
from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Thing(models.Model):
    # Todo list initially :
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=255)
    creator = models.TextField(max_length=255, blank=True)
    people = models.TextField(max_length=255, blank=True)
    resources = models.TextField(max_length=255, blank=True)
    category = models.CharField(max_length=50, blank=True)
    location = models.TextField(max_length=255, blank=True)
    date_creation = models.DateTimeField(auto_now=True)
    date_modification = models.DateTimeField(default=datetime.now, blank=True)
    available_date = models.DateTimeField(default=datetime.now, blank=True)
    limit_available = models.DateTimeField(default=datetime.now, blank=True)
    activate = models.BooleanField(default=True)

    # check the number of ratings, then add it in serializers.py
    def nb_of_progress(self):
        # return the number of progress vote(initially for rating number votes)
        progress = Progress.objects.filter(thing=self)
        return len(progress)

    # average progress
    def average_progress(self):
        # return the average of progress vote(initially for average of  votes)
        sum = 0
        progress = Progress.objects.filter(thing=self)
        for progres in progress:
            sum += progres.state
        if (len(progress) > 0):
            return (sum / len(progress))
        else:
            return 0


# progression of a thing 1-5 : created / received / preparing / done / received
class Progress(models.Model):
    thing = models.ForeignKey(Thing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    state = models.IntegerField(
        validators=[MinValueValidator(1),
                    MaxValueValidator(5)], default=1)

    class Meta:
        # only one thing per user and one state per thing/user
        unique_together = (('user', 'thing'), )
        index_together = (('user', 'thing'), )


# Resource : table, tools, etc.. : created / received / preparing / done / received
class Resource(models.Model):

    thing = models.ForeignKey(Thing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(max_length=255)
    category = models.CharField(max_length=50, blank=True)
    location = models.TextField(max_length=255, blank=True)
    available = models.TextField(max_length=255, blank=True)
    date = models.DateTimeField(default=datetime.now, blank=True)
    date_creation = models.DateTimeField(auto_now=True)
    state = models.IntegerField(
        validators=[MinValueValidator(1),
                    MaxValueValidator(5)], default=1)


class Article(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    description = models.TextField(max_length=255, blank=True)

    def __str__(self):
        return self.title

```


```
python manage.py makemigrations
python manage.py migrate
```


serializers.py
```
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Thing, Progress


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


class ThingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

```


admin.py
```
from django.contrib import admin
from .models import Thing

# Register your models here.
admin.site.register(Thing)

```


modify urls.py
```
# from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import UserViewSet, ThingViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('things', ThingViewSet)

urlpatterns = [
    # path('new/', admin.site.urls),# simple original url
    path('', include(router.urls)),
]
```


views.py
```
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer, ThingSerializer
from .models import Thing


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ThingViewSet(viewsets.ModelViewSet):
    queryset = Thing.objects.all()
    serializer_class = ThingSerializer

```


serilalizers.py
```
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Thing, Progress


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        # to mask password to not display it
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # function pour overide la creation d'un user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class ThingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thing
        fields = ['id', 'title', 'description', 'creator', 'people', 'resources', 'category', 'location',
                  'date_creation', 'date_modification', 'available_date', 'limit_available', 'activate', ]

```


TEST :
> http://localhost:8000/api/things/