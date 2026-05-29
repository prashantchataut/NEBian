from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'grade', 'is_staff']
    list_filter = ['is_staff', 'is_active', 'grade']
    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {'fields': ('grade',)}),
    )