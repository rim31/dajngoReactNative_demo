from django.db import models
from datetime import datetime

# Create your models here.


class Lead(models.Model):
    name = models.CharField(max_length=99)
    email = models.EmailField(max_length=50, unique=True)
    message = models.TextField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
