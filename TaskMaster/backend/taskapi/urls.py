from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserViewSet, RegisterView
from rest_framework.authtoken.views import obtain_auth_token 

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)

#urlpatterns = [
   # path('', include(router.urls)),
#]
#urlpatterns = router.urls
urlpatterns = [
     path('', include(router.urls)),  
    #path('api/', include(router.urls)),
   # path('api/login/', obtain_auth_token),  # Ensure login endpoint is available
     path('register/', RegisterView.as_view()), 
]
