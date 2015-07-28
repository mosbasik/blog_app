// $('#post-form').submit(function(e){

//     e.preventDefault();

//     var title = $('#post-form input[name="title"]').val()
//     console.log(title)
//     var text = $('#post-form textarea[name="text"]').val()
//     var csrf = $('#post-form input[name="csrfmiddlewaretoken"]').val()

//     $.ajax({
//         url: '/blog/bs-create-post/',
//         method: 'POST',
//         data: {
//             title: title,
//             text: text,
//             csrfmiddlewaretoken: csrf,
//         },
//         success: function(result){
//             $('#post-form input[name="title"]').val('')
//             $('#post-form textarea[name="text"]').val('')
//         },
//     })
// })
