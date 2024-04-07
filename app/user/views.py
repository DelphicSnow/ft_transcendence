from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

# class UserCreationAPIView(APIView):
#     # permission_classes = (IsAuthenticated, )

#     def post(self, request, format=None):
#         serializer = UserSerializer(data=request.data)
#         print("Creation serializer: ", serializer.is_valid())
#         if serializer.is_valid():
#             serializer.save()
#             return Response(data=serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(data=serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

# class UserListView(APIView):
#     permission_classes = (IsAuthenticated, )
    
#     def get(self, request):
#         if not (request.user.is_admin):
#             return Response(data={"error_message": "Manager Can view all employee list"}, status=status.HTTP_401_UNAUTHORIZED)
        
#         all_users = User.objects.all()
#         serializer = UserListSerializer(all_users, many=True)

#         return Response(data=serializer.data, status=status.HTTP_200_OK)


class RegisterView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        print("Creation serializer: ", serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

        login(request, user)
        return Response({'success': 'User logged in successfully'}, status=status.HTTP_200_OK)