from rest_framework import serializers
from .models import Resource, Subject, Grade, ResourceType


class ResourceListSerializer(serializers.ModelSerializer):
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)
    grade_display = serializers.CharField(source='get_grade_display', read_only=True)
    resource_type_display = serializers.CharField(source='get_resource_type_display', read_only=True)

    class Meta:
        model = Resource
        fields = [
            'id', 'title', 'subject', 'subject_display', 'grade', 'grade_display',
            'resource_type', 'resource_type_display', 'thumbnail_url', 'page_count',
            'download_count', 'created_at',
        ]


class ResourceDetailSerializer(serializers.ModelSerializer):
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)
    grade_display = serializers.CharField(source='get_grade_display', read_only=True)
    resource_type_display = serializers.CharField(source='get_resource_type_display', read_only=True)

    class Meta:
        model = Resource
        fields = [
            'id', 'title', 'description', 'subject', 'subject_display',
            'grade', 'grade_display', 'resource_type', 'resource_type_display',
            'file_url', 'file_size', 'thumbnail_url', 'page_count',
            'download_count', 'created_at', 'updated_at',
        ]