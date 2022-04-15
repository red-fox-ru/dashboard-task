from django.contrib import admin

from taskapp.models import Project, Todo


class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'project', 'label', 'created_at', 'updated_at')
    list_filter = ('user', 'project', 'created_at')
    search_fields = ('user', 'project', 'label')


admin.site.register(Todo, CommentAdmin)
admin.site.register(Project)
