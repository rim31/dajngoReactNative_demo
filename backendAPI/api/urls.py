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
