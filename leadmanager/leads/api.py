from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead viewset : CRUD -> (POST, GET, PUT, DELETE)