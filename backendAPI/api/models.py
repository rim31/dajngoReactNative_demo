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
