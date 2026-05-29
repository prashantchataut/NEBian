from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    grade = models.CharField(
        max_length=2,
        blank=True,
        default='',
    )

    class Meta:
        db_table = 'auth_user'

    def get_full_name(self):
        full_name = f'{self.first_name} {self.last_name}'.strip()
        return full_name if full_name else self.username