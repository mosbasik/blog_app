from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    text = models.TextField()
    author = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    featured_image = models.ImageField(upload_to='image_uploads', null=True, blank=True)

    def __unicode__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey('main.Post')
    text = models.TextField()
    user = models.ForeignKey(User, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.text[:10]


class Tag(models.Model):
    post = models.ManyToManyField('main.Post')
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Upload(models.Model):
    uploaded_file = models.FileField(upload_to='uploads')
