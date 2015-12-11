from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from .serializers import RecipeSerializer
from .models import Recipe

def index(request):
    return render(request, 'recipes/index.html')

def test(request):
    return render(request, 'recipes/test.html')

class RecipesViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.AllowAny]
