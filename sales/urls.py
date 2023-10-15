from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from sales import views


router = routers.DefaultRouter()
router.register(r'sales', views.SaleViewSet, 'sales')

urlpatterns = [
    path('api/', include(router.urls)),
    path('docs/sales/', include_docs_urls(title='Housing Sales API'))
]