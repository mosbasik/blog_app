
var page = 0;   // initialize the pagination to start at 0
loadPosts(page);    // get the first page of posts on the front page
$('#load-posts').click(loadPosts);  // load another page on every button click


/********** USER LOGIN/CREATE FORM TOGGLES***********/

$('#switch-to-create').click(function(e) {
    e.preventDefault();
    $('#user-login-form').fadeOut(function() {
        $('#user-create-form').fadeIn()
    });
})

$('#switch-to-login').click(function(e) {
    e.preventDefault();
    $('#user-create-form').fadeOut(function() {
        $('#user-login-form').fadeIn();
    });
})


/**************POST ADMIN **************/

// when a previous post is clicked, load the data into the form and change the
// relevant hidden fields to correspond.  Also add a cancel button and change
/// the submit button to an edit button.
$('.edit-post-link').click(function(e) {
    e.preventDefault();
    var id = $(this).parent().attr('data-post-id');

    $.get('/blog/posts/' + id + '/json/', function(result) {
        console.log(result)

        $('#submit-button').html('Edit Post');
        $('#cancel-button').show();

        var text = result[0].fields.text
        var title = result[0].fields.title
        var id = result[0].pk
        var author = result[0].fields.author
        var featured_image = result[0].fields.featured_image

        $('#post-form input[name="author"]').val(author)
        $('#post-form input[name="title"]').val(title)
        $('#post-form textarea[name="text"]').val(text)
        $('#post-form input[name="id"]').val(id)

        if (featured_image.length > 0) {
            $('#featured-image-form').attr('src', '/media/' + featured_image).show();

        } else{
            $('#featured-image-form').attr('src', '').hide();
        }

    });
});


// clear all the inputs of the create/edit posts form
function clear_form() {
    $('#post-form input[name="author"]').val(global_author)
    $('#post-form input[name="title"]').val('')
    $('#post-form textarea[name="text"]').val('')
    $('#post-form input[name="id"]').val('')
    $('#featured-image-form').attr('src', '').hide()

    $('#submit-button').html("Give up. Just give up.")
    $('#cancel-button').hide()
}


// bind the action of the cancel button on the edit form
$('#cancel-button').click(function(e) {
        e.preventDefault();
        clear_form()
});



/****************DELETE POST************/

$('.delete-post-link').click(function(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this post?")) {
        var id = $(this).parent().attr('data-post-id');

        $.ajax({
            url: '/blog/posts/' + id + '/',
            method: 'DELETE',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
            },
            success: function() {
                $('li[data-post-id="' + id + '"]').remove()
                var current_id = $('#post-form input[name="id"]').val()
                if (id === current_id) {
                    clear_form()
                }
            }
        })
    }
})


/**********LOADING POSTS*******/

// increment the page counter and load another page of posts
$('#older-posts').click(function(e) {
    e.preventDefault()
    page++
    loadPosts(page);

});


// load a page of posts depending on the global page counter
function loadPosts() {
    // $('#loader').show();
    $.ajax({
            url: '/blog/post-previews/',
        data: {
            page: page
        },
        success: function(result) {
            console.log(result.length)

            if (result.length === 0) {
                $('#post-previews').append("Sorry, no more posts")
                $('#older-posts').hide();
            } else {
                $('#post-previews').append(result);

            }
        }
    })
}


// something to do with crsf tokens
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}