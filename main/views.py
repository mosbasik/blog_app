from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render, redirect

from main.models import Post
from main.forms import PostForm

import time


def initial(request):
    return render(request, 'index.html')


def posts(request):
    # time.sleep(1)
    posts = Post.objects.all().order_by('-date')
    json = serializers.serialize('json', posts)
    # return render(request, 'posts.html', {'posts': posts})
    return HttpResponse(json, content_type='application/json', status=200)


def post_previews(request):
    page = int(request.GET.get('page', 0))
    page_size = 3
    start = page * page_size
    end = (page + 1) * page_size
    posts = Post.objects.all().order_by('-date')[start:end]
    return render(request, 'post_preview.html', {'posts': posts})


def create_post(request):
    form = PostForm(request.POST, request.FILES)
    if form.is_valid():
        post = form.save()
        message = 'Your post has been saved'
    else:
        message = form.errors

    return render(request, 'post_admin.html', {'message': message})


def post_admin(request):
    return render(request, 'post_admin.html', {})


def bootstrap(request):
    return render(request, 'bootstrap.html', {})


def edit_post(request, id=None):

    if request.method == 'DELETE':
        post = Post.objects.get(id=id).delete()
        return HttpResponse(status=204)

    elif request.method == 'GET':
        post = Post.objects.get(id=id)
        return render(request, 'post.html', {'post': post})
