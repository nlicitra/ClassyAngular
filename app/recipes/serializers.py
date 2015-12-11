from .models import Recipe
from rest_framework import serializers

class ArrayField(serializers.CharField):

    def to_representation(self, data):
        if isinstance(data, list):
            return data
        else:
            return data.split(',')

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = ArrayField()
    class Meta:
        model = Recipe
        fields = ('id', 'name', 'ingredients')
