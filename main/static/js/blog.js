var page = 0
loadPosts(page)

$('#posts').on('click', '.delete', function() {
    if (confirm('Are you sure you want to delete this post?')) {
        var id = $(this).parents('article').attr('id')
        $.ajax({
            url: '/blog/posts/' + id + '/',
            method: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
            },
            success: function() {
                $('#'+id).remove()
            },
        })
    }
})


$('#older-posts').click(function(e) {
    console.log(page)
    e.preventDefault()
    page++
    loadPosts(page)
})


// $('#post-form').submit(function(e){

//     e.preventDefault();

//     var title = $('#post-form input[name="post-title"]').val()
//     var text = $('#post-form textarea[name="post-text"]').val()
//     var csrf = $('#post-form input[name="csrfmiddlewaretoken"]').val()

//     $.ajax({
//         url: '/blog/create-post/',
//         method: 'POST',
//         data: {
//             'title': title,
//             'text': text,
//             'csrfmiddlewaretoken': csrf,
//         },
//         success: function(result){
//             $('#post-form input[name="post-title"]').val('')
//             $('#post-form textarea[name="post-text"]').val('')
//             $('#posts').prepend(result)
//         },
//     })
// })


function loadPosts(page) {
    $.ajax({
        url: '/blog/post-previews/',
        data: {
            page: page
        },
        success: function(result) {
            console.log(result.length)
            if (result.length === 0) {
                $('#post-previews').append("No more posts found.")
                $('#older-posts').hide()
            } else {
                $('#post-previews').append(result)
            }
        },
    })
}


function getCookie(name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length == 2) return parts.pop().split(";").shift()
}
