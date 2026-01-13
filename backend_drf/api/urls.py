from django.urls import path
from accounts import views  as UserViews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import StockPredictionViewAPIView 
urlpatterns = [
    path('register/', UserViews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected/', UserViews.ProtectedView.as_view(), name='protected'),
    path('predicted/', StockPredictionViewAPIView.as_view(), name='predicted'),
]
