from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer,UserSerializer,RegisterSerializer
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import generics
from rest_framework.response import Response



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    permission_classes = [IsAuthenticated] #[permissions.IsAuthenticated]
    
    def get(self, request):
        tasks = Task.objects.filter(created_by=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    #def get_queryset(self):
        #return Task.objects.filter(created_by=self.request.user)
    def get_queryset(self):
        # You can add filtering here based on query parameters (e.g., title, status)
        queryset = Task.objects.filter(created_by=self.request.user)
        
        title = self.request.query_params.get('title', None)
        status = self.request.query_params.get('status', None)
        
        if title:
            queryset = queryset.filter(title__icontains=title)
        
        if status:
            queryset = queryset.filter(status__icontains=status)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]#[] #[permissions.IsAdminUser]  # Change as needed


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data['username'])
        # Create a token for the new user after they are created
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})