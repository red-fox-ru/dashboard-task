from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    help = 'Displays current time'

    def handle(self, *args, **kwargs):
        User.objects.create_user(username='admin', email='', password='admin', is_superuser=True)
