from django.contrib import admin
from .models import Question, Answer, Like


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'subject', 'grade', 'likes_count', 'answers_count', 'created_at']
    list_filter = ['subject', 'grade']
    search_fields = ['title', 'content']


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['question', 'author', 'likes_count', 'is_accepted', 'created_at']
    list_filter = ['is_accepted']


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['user', 'target_type', 'target_id', 'created_at']
    list_filter = ['target_type']