from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Thing, Progress


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        # to mask password to not display it
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # function pour overide la creation d'un user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class ThingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thing
        fields = ['id', 'title', 'description', 'creator', 'people', 'resources', 'category', 'location',
                  'date_creation', 'date_modification', 'available_date', 'limit_available', 'activate', ]
