from django.contrib import admin

from main.models import Post, Comment, Tag, Upload

# Register your models here.
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Upload)
