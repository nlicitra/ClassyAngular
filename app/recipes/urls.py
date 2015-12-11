from .views import RecipesViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'', RecipesViewSet, base_name='recipes')
#urlpatterns = router.urls
