from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',
                  'created_at', 'date_validated', 'token', 'validated')
        # to mask password to not display it
        # extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # fonction pour overide la creation d'un user
    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     Token.objects.create(user=user)
    #     return user
