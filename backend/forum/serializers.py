from rest_framework import serializers
from .models import Question, Answer


class AnswerSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)

    class Meta:
        model = Answer
        fields = [
            'id', 'question', 'author', 'author_name', 'content',
            'likes_count', 'is_accepted', 'created_at', 'updated_at',
        ]
        read_only_fields = ['author', 'likes_count', 'is_accepted', 'created_at', 'updated_at']


class AnswerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['question', 'content']


class QuestionListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)
    grade_display = serializers.CharField(source='get_grade_display', read_only=True)

    class Meta:
        model = Question
        fields = [
            'id', 'author', 'author_name', 'title', 'subject', 'subject_display',
            'grade', 'grade_display', 'tags', 'likes_count', 'answers_count',
            'created_at',
        ]


class QuestionDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)
    grade_display = serializers.CharField(source='get_grade_display', read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            'id', 'author', 'author_name', 'title', 'content', 'subject',
            'subject_display', 'grade', 'grade_display', 'tags', 'likes_count',
            'answers_count', 'answers', 'created_at', 'updated_at',
        ]


class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['title', 'content', 'subject', 'grade', 'tags']