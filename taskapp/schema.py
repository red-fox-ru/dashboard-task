import graphene
from graphene_django import DjangoObjectType

from taskapp.models import Project, Todo
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username')


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'repository', 'users')


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ('id', 'user', 'project', 'label', 'created_at', 'updated_at', 'is_completed')


class Query(graphene.ObjectType):
    project = graphene.Field(ProjectType, id=graphene.Int())
    todo = graphene.Field(TodoType, id=graphene.Int())
    users = graphene.List(UserType)
    projects = graphene.List(ProjectType)
    projects_by_title = graphene.List(ProjectType, title=graphene.String(required=False))
    todos = graphene.List(TodoType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_project(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_all_todos(self, info):
        return Todo.objects.all()

    def resolve_todo(self, info, id):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None

    def resolve_projects_by_title(self, info, title=None):
        projects = Project.objects.all()
        if title:
            projects = projects.filter(title__icontains=title)
        return projects


class TodoMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        label = graphene.String()
        updated_at = graphene.DateTime()
        is_completed = graphene.Boolean()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, id, label, updated_at, is_completed):
        todo = Todo.objects.get(pk=id)
        todo.label = label
        todo.updated_at = updated_at
        todo.is_completed = is_completed
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_author = TodoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
