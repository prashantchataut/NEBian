from django.db import models
from django.conf import settings


class Subject(models.TextChoices):
    PHYSICS = 'physics', 'Physics'
    CHEMISTRY = 'chemistry', 'Chemistry'
    MATHEMATICS = 'mathematics', 'Mathematics'
    BIOLOGY = 'biology', 'Biology'
    ENGLISH = 'english', 'English'
    NEPALI = 'nepali', 'Nepali'
    SOCIAL_STUDIES = 'social_studies', 'Social Studies'
    COMPUTER_SCIENCE = 'computer_science', 'Computer Science'


class Grade(models.TextChoices):
    GRADE_10 = '10', 'Grade 10'
    GRADE_11 = '11', 'Grade 11'
    GRADE_12 = '12', 'Grade 12'


class TargetType(models.TextChoices):
    QUESTION = 'question', 'Question'
    ANSWER = 'answer', 'Answer'


class Question(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='questions',
    )
    title = models.CharField(max_length=300)
    content = models.TextField()
    subject = models.CharField(max_length=20, choices=Subject.choices)
    grade = models.CharField(max_length=2, choices=Grade.choices)
    tags = models.JSONField(default=list, blank=True)
    likes_count = models.PositiveIntegerField(default=0)
    answers_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['subject', 'grade']),
            models.Index(fields=['-likes_count']),
            models.Index(fields=['-answers_count']),
        ]

    def __str__(self):
        return f'{self.author}: {self.title[:60]}'


class Answer(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='answers',
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='answers',
    )
    content = models.TextField()
    likes_count = models.PositiveIntegerField(default=0)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_accepted', '-likes_count', 'created_at']

    def __str__(self):
        return f'Answer by {self.author} on "{self.question.title[:40]}"'


class Like(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='likes',
    )
    target_id = models.PositiveIntegerField()
    target_type = models.CharField(max_length=10, choices=TargetType.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'target_id', 'target_type']
        indexes = [
            models.Index(fields=['target_type', 'target_id']),
        ]

    def __str__(self):
        return f'{self.user} liked {self.target_type} {self.target_id}'