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
