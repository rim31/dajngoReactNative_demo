# from django.contrib import admin
# from django.urls import path
# from django.conf.urls import include
from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls

# router.register(r'resource', ResourceViewSet, basename='resource')
# # router.register('users', UserViewSet)
# router.register(r'tasks', TaskViewSet, basename='tasks')
# router.register('progress', ProgressViewSet)

# # urlpatterns = router.urls
# urlpatterns = [
#     # 'admin/', admin.site.urls,# simple original url
#     path('', include(router.urls)),  # HERE
#     path('articles/', ArticleListView.as_view()),
#     path('articles/create/', ArticleCreateView.as_view()),
#     path('articles/<pk>', ArticleDetailView.as_view()),
#     path('articles/<pk>/update/', ArticleUpdateView.as_view()),
#     path('articles/<pk>/delete/', ArticleDeleteView.as_view()),
# ]
