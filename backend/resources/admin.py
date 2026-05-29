from django.contrib import admin
from .models import Resource


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'grade', 'resource_type', 'download_count', 'created_at']
    list_filter = ['subject', 'grade', 'resource_type']
    search_fields = ['title', 'description']