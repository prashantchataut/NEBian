from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', obtain_auth_token, name='login'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
]