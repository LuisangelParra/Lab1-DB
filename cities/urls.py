from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from cities import views


# api versioning
router = routers.DefaultRouter()
router.register(r'cities', views.CityViewSet, 'cities')

urlpatterns = [
    path('api/', include(router.urls)),
    path('docs/', include_docs_urls(title='Housing Price API'))
]