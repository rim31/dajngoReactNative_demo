from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.views import APIView

# Lead viewset : CRUD -> (POST, GET, PUT, DELETE)


class LeadViewset(viewsets.ModelViewSet):
    # queryset = Lead.objects.all()
    # permission_classes = [
    #     permissions.AllowAny
    # ]
    # serializer_class = LeadSerializer
    permission_classes = (permissions.AllowAny,)
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()
