from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceListSerializer, ResourceDetailSerializer


class ResourceListView(generics.ListAPIView):
    serializer_class = ResourceListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['subject', 'grade', 'resource_type']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'download_count', 'title']
    ordering = ['-created_at']

    def get_queryset(self):
        return Resource.objects.all()


class ResourceDetailView(generics.RetrieveAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceDetailSerializer
    lookup_field = 'pk'