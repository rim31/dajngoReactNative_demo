from django.db import models

class Lead(models.Model):
    name = models.CharField(max_length=99)
    email = models.EmailField(max_length=99, unique=True)
    message = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)