from django.contrib import admin
from django.urls import path, re_path
from students import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/students/$', views.students_list),  # POST  GET
    re_path(r'^api/students/(?P<pk>[0-9]+)$',
            views.students_detail),  # PUT DELETE
]
