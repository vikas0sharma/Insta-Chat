$(function () {
    // Declare a proxy to reference the hub.
    var chat = $.connection.chatHub;


    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message, id) {
        // Html encode display name and message.
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page.
       
        if ($.connection.hub.id == id) {
            $('#discussion').append('<li><span class="default-usr-me pull-right">' + encodedName.substring(0, 1).toUpperCase()
                + '</span><div class="chat-text-right  pull-right">' + encodedMsg + '</div></li>');
            emojify.run();
        }
        else {
            $('#discussion').append('<li><span class="default-usr pull-left">' + encodedName.substring(0, 1).toUpperCase()
                + '</span><div class="chat-text pull-left">' + encodedMsg + '</div></li>');
            $('#notify')[0].play(); // Get our sound FX.
            emojify.run();
        }

        var height = $("#chat-panel-body")[0].scrollHeight;
        $('.panel-body').animate({ scrollTop: height });
    };
    // Get the user name and store it to prepend to messages.
    $('#displayname').val(prompt('Enter your name:', ''));
    // Set initial focus to message input box.
    $('#message').focus();

    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#message').keypress(function (e) {
            // Call the Send method on the hub.
            if (e.which == 13 && $('#message').val()!='') {
                var _id = $.connection.hub.id;
                chat.server.send($('#displayname').val(), $('#message').val(), _id);
                // Clear text box and reset focus for next comment.
                $('#message').val('').focus();
            }
        });
        //$('#btn-chat').click(function (e) {
        //    if ($('#message').val() != '') {
        //        var _id = $.connection.hub.id;
        //        chat.server.send($('#displayname').val(), $('#message').val(), _id);
        //        // Clear text box and reset focus for next comment.
        //        $('#message').val('').focus();
        //    }
        //});
    });

    $('#minimize').click(function () {
        if ($('#minimize').hasClass('glyphicon-minus')) {
            $('.panel-body').hide();
            $('.panel-footer').hide();
            $('#minimize').removeClass('glyphicon-minus').addClass('glyphicon-plus');
            $('.chat-panel').addClass('mini');
        }
        else {
            $('.panel-body').show();
            $('.panel-footer').show();
            $('#minimize').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            $('.chat-panel').removeClass('mini');
        }
        

    })

  
    emojify.setConfig({
        only_crawl_id: null,            // Use to restrict where emojify.js applies
        img_dir: 'assets/images/emoji',  // Directory for emoji images
        ignored_tags: {                // Ignore the following tags
            'SCRIPT': 1,
            'TEXTAREA': 1,
            'A': 1,
            'PRE': 1,
            'CODE': 1
        }
    });

    $("#emo").click(function () {
        $("#emo-div").fadeToggle();
       
    });
    $('img[class="emoji"]').click(function () {
        $('#message').val($('#message').val() + $(this).attr('title'));
        $('#message').focus();
    })

});