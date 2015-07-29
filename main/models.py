from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
    text = models.TextField()
    author = models.ForeignKey(User)
    date_posted = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    featured_image = models.ImageField(upload_to='image_uploads', null=True, blank=True)

    def __unicode__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey('main.Post')
    text = models.TextField()
    user = models.ForeignKey(User, null=True, blank=True)
    date_posted = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return "%s - %s" % (self.user.username, self.post.title)


class Upload(models.Model):
    uploaded_file = models.FileField(upload_to='uploads')


class Tag(models.Model):
    name = models.CharField(max_length=75)
    post = models.ManyToManyField('main.Post')

    def __unicode__(self):
        return self.name
