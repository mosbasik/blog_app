from django.conf.urls import include, url

urlpatterns = [
    url(r'^$', 'main.views.initial', name='initial'),
    url(r'^posts/$', 'main.views.posts', name='posts'),
    url(r'^post-previews/$', 'main.views.post_previews', name='post_previews'),
    url(r'^posts/(?P<id>\d+)/$', 'main.views.edit_post', name='edit_post'),
    url(r'^create-post/$', 'main.views.create_post', name='create_post'),
    url(r'^post-admin/$', 'main.views.post_admin', name='post_admin'),
]
