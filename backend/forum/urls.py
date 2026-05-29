from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.QuestionListView.as_view(), name='question-list'),
    path('questions/<int:pk>/', views.QuestionDetailView.as_view(), name='question-detail'),
    path('questions/<int:question_pk>/answers/', views.AnswerListView.as_view(), name='answer-list'),
]