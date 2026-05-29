from django.db import models


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


class ResourceType(models.TextChoices):
    TEXTBOOK = 'textbook', 'Textbook'
    NOTES = 'notes', 'Notes'
    PAST_PAPER = 'past_paper', 'Past Paper'
    PRACTICE_SET = 'practice_set', 'Practice Set'


class Resource(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    subject = models.CharField(max_length=20, choices=Subject.choices)
    grade = models.CharField(max_length=2, choices=Grade.choices)
    resource_type = models.CharField(max_length=15, choices=ResourceType.choices)
    file_url = models.URLField(max_length=500, blank=True, default='')
    file_size = models.PositiveBigIntegerField(default=0, help_text='File size in bytes')
    thumbnail_url = models.URLField(max_length=500, blank=True, default='')
    page_count = models.PositiveIntegerField(default=0)
    download_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['subject', 'grade']),
            models.Index(fields=['resource_type']),
        ]

    def __str__(self):
        return f'{self.get_subject_display()} - {self.title}'