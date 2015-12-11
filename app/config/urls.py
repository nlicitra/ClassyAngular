from django.conf.urls import patterns, include, url
from django.contrib import admin
from recipes import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'recipes', views.RecipesViewSet)
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'app.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', views.index, name='main'),
    url(r'^test/$', views.test, name='test'),
    url(r'^api/', include(router.urls, namespace='recipes')),
    url(r'^admin/', include(admin.site.urls)),
)
