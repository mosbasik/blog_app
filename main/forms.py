from django.forms import ModelForm
from django.contrib.auth.models import User
from main.models import Post


class PostForm (ModelForm):
    class Meta:
        model = Post
        fields = '__all__'