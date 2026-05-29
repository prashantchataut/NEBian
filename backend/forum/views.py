from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .models import Question, Answer
from .serializers import (
    QuestionListSerializer,
    QuestionDetailSerializer,
    QuestionCreateSerializer,
    AnswerSerializer,
    AnswerCreateSerializer,
)


class QuestionListView(generics.ListCreateAPIView):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['subject', 'grade']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'likes_count', 'answers_count']
    ordering = ['-created_at']

    def get_queryset(self):
        return Question.objects.select_related('author').all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return QuestionCreateSerializer
        return QuestionListSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class QuestionDetailView(generics.RetrieveAPIView):
    queryset = Question.objects.select_related('author').prefetch_related('answers__author')
    serializer_class = QuestionDetailSerializer
    lookup_field = 'pk'


class AnswerListView(generics.ListCreateAPIView):
    def get_queryset(self):
        return Answer.objects.filter(question_id=self.kwargs['question_pk']).select_related('author')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AnswerCreateSerializer
        return AnswerSerializer

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            question_id=self.kwargs['question_pk'],
        )