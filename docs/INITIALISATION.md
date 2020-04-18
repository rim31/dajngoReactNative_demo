# intitialisation

## Python Django 3

1. virtual env
in your project folder :
```
python -m venv my_env
source my_env/bin/activate
```

2. start django project
```
pip install django djangorestframework django-rest-knox
OR 
pip install django djangorestframework django-cors-headers
pip install --upgrade pip
django-admin startproject leadmanager
cd leadmanager 
django-admin startproject leads 
```
it will create the project django


3. settings.py

add this
```
INSTALLED_APPS = [
   ...
    'rest_framework',
    'corsheaders',
    'students'
]
```

add this
```
MIDDLEWARE = [
    ....
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]
```

add this
```
CORS_ORIGIN_ALLOW_ALL = True
```


_________________

```
    'leads',
    'rest_framework',
```


4. create the app

```
python manage.py migrate

cd django_react_proj

python manage.py startapp students
```
_________________

```
python manage.py makemigrations
python manage.py migrate
```

5. migration

```
python manage.py makemigrations
python manage.py migrate
python manage.py makemigrations --empty --name students students
```



change the file : django_react_proj/students/migrations/
```
from django.db import migrations

def create_data(apps, schema_editor):
    Student = apps.get_model('students', 'Student')
    Student(name="John Doe", email="john@email.com", document="22342342", phone="00000000").save()

class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
```

again :
```
python manage.py migrate
```

6. Serializers.py

create this file : 
students/serializers.py
```
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student 
        fields = ('pk', 'name', 'email', 'document', 'phone', 'registrationDate')
```

7. urls.py

change that :
django_react_proj/urls.py it add POST GET and PUT DELETE
```
from django.contrib import admin
from django.urls import path, re_path
from students import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/students/$', views.students_list),  # POST  GET
    re_path(r'^api/students/(?P<pk>[0-9]+)$',views.students_detail),  # PUT DELETE]
```

8. views.js

create taht

GET / http://localhost:8000/api/students 

students/views.py
```
from django.shortcuts import render
from .models import Student
from .serializers import *

@api_view(['GET', 'POST'])
def students_list(request):
    if request.method == 'GET':
        data = Student.objects.all()

        serializer = StudentSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def students_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```


9. test it : 
```
python manage.py createsuperuser

python manage.py runserver
```
> http://localhost:8000/api/students/


## React 

```
npx create-react-app frontend
npm install bootstrap reactstrap axios --save
OR
yarn add bootstrap reactstrap axios --save
```

