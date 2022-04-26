from django.db import models

from users.models import User


class Project(models.Model):
    title = models.CharField(max_length=128, blank=True)
    description = models.TextField(null=True, blank=True)
    repository = models.URLField(null=True, blank=True)
    users = models.ManyToManyField(User, blank=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name='todo_user')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, related_name='label_project')
    label = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    is_completed = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Project label"
        verbose_name_plural = "Project labels"

    def __str__(self):
        return f'From {self.user} on {self.project}'
