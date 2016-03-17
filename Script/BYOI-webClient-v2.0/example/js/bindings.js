var charSplit = "<b class='charSplit' style='color:red'>|</b>";


$(document).ready(function () {
    //bind elements of the DOM to BYOI methods

    $('#connectButton').click(function () {
        // attempt connection to the server
        BYOI.connect();
    });


    $('#deleteButton').click(function () {
        // delete all selected messages from the main Message Handler
        $('#messageBord').getSelectedMessages().remove();
    });

    $('#addButton').click(function () {
        //this is just an example, the final html should be defined by the 
        //student, all the meta-data should be added here though
        //
        //in this place we show a "manual" way to create the message and
        //add the meta-data to it. But the API provides a helper method
        //to create the message in a nicer way. An example on how to 
        //use this part of the API is shown in the connection.js file
        $('#messageList').getSelectedMessages().toggleSelectMessage();
        var msg = $('<div class="added"><span class="text">' + $('#msg').val() + '</span>&nbsp;</div>').BYOIMessage();
        msg.relayMessage();
    });

    $(document).ready(function () {
        $("#spiltMessageTextEditor").attr('contenteditable', 'true');
        $('#spiltMessageTextEditor').keyup(updateSplitMessage);
        $("#messageBord").sortable({
            connectWith: "div",
            dropOnEmpty: true,

            update: function (event, ui) {
                console.log(event);
            }
        });
        $("#messageBord").disableSelection();
        var hasBeenDrag = false;

        $('#messageBord').on('mouseup', '.BYOI-message', function () {
            var wasDrag = hasBeenDrag;
            hasBeenDrag = false;
            if (!wasDrag) {
                $(this).toggleSelectMessage();
            }
        }).on('mousedown', '.BYOI-message', function () {
            hasBeenDrag = false;
        }).on('mousemove', '.BYOI-message', function () {
            hasBeenDrag = true;
        }).on('dblclick', '.BYOI-message', function () {
            $('#msg').val($(this).data('text'));
        });


        $("#toJoin").sortable({
            connectWith: "div",
            dropOnEmpty: true
        });

        $("#avalibleToJoin").sortable({
            connectWith: "div",
            dropOnEmpty: true
        });

        $("#toJoin, #avalibleToJoin").disableSelection();
        var toJoinDarg = false;
        $('#toJoin').on('mouseup', '.list-group-item', function () {
            var wasDrag = toJoinDarg;
            toJoinDarg = false;
            if (!wasDrag) {
                $('#avalibleToJoin').append(this);
            }

        }).on('mousedown', '.list-group-item', function () {
            toJoinDarg = false;
        }).on('mousemove', '.list-group-item', function () {
            toJoinDarg = true;
        });


        var avalibleToJoinDarg = false;
        $('#avalibleToJoin').on('mouseup', '.list-group-item', function () {
            var wasDrag = avalibleToJoinDarg;
            avalibleToJoinDarg = false;
            if (!wasDrag) {
                $('#toJoin').append(this);
            }

        }).on('mousedown', '.list-group-item', function () {
            avalibleToJoinDarg = false;
        }).on('mousemove', '.list-group-item', function () {
            avalibleToJoinDarg = true;
        });
    });

// bind checksum method to the message
    $('#checksumButton').click(function () {
        // get the text
        var input = $('#msg');
        // create a new message from the input text and add a checksum to it
        var msg = $('<div><span class="text">' + input.val() + '</span></div>').BYOIMessage()
            .addChecksum().relayMessage();
        // add the message to the input (update field value)

        BYOI.addMessageToContainer(msg, input);

        $('#messageList').getSelectedMessages().toggleSelectMessage();
        $('#msg').val($("#messageList-checksum").children().last().data('text'));
    });

// bind verify checksum method to the message handler
    $('#verifyButton').click(function () {
        // create a new message and verify the checksum
        var verify = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage().verifyChecksum();
        $('#messageList').getSelectedMessages().toggleSelectMessage();
    });

// bind encryption method to the message handler
    $('#encryptButton').click(function () {
        // encrypt the last select
        var msg = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage().encryptMessage(
            parseInt(+$('#recipient').val()) // encryption key is the recipient node
        ).relayMessage(); // send to every message handler
        // add the message to the input (update field value)
        BYOI.addMessageToContainer(msg, $('#msg'));
        $('#messageList').getSelectedMessages().toggleSelectMessage();
        $('#msg').val($("#messageList-encryped").children().last().data('text'));
    });

// bind decryption method to the message handler
    $('#decryptButton').click(function () {
        var msg = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage().decryptMessage(
            parseInt(+$('#recipient').val()) // decryption key is the recipient node
        ).relayMessage(); // send to every message handler
        // add the message to the input (update field value)
        BYOI.addMessageToContainer(msg, $('#msg'));
        $('#messageList').getSelectedMessages().toggleSelectMessage();
    });

// bind random number method to the message handler
    $('#randomButton').click(function () {
        // add a random number to the last selected element of the message handler
        var msg = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage()
            .addRandomNumber().relayMessage();
        // add the message to the input (update field value)
        BYOI.addMessageToContainer(msg, $('#msg'));
    });


// bind send method to the message handler
    $('#sendButton').click(function () {
        // create a new message
        // NOTE at least one tag with class "text" should be inside the
        // html of a message, otherwise the content sent will be an
        // empty string
        //
        // also, notice that because of this, the message is not inserted with
        // all the html tags provided, but only those that were inside the
        // tag with the "text" class.
        var html = '<div><span class="text">' + $('#msg').val() + '</span></div>';
        // sent message to the server
        $(html).BYOIMessage().send($('#recipient').val());
        $('#messageList').getSelectedMessages().toggleSelectMessage();
        $('#msg').val('');
    });


// bind close connection method to the message handler
    $('#closeButton').click(function () {
        BYOI.connection.close();
    });


// bind combine method to the message handler
    $('#combineButton').click(function () {

        $('#toJoin').empty();
        $('#avalibleToJoin').empty();

        $('#messageBord').getAllMessages().each(function () {
            if ($(this).hasClass('BYOI-selected')) {
                $('#toJoin').append($(this).clone());
            } else {
                $('#avalibleToJoin').append($(this).clone());
            }
        });
        $('#joinModal').modal('toggle');

        $('#messageList').getSelectedMessages().toggleSelectMessage();
    });

    $('#join-save').click(function () {
        var result = "";
        $('#toJoin').children('.BYOI-message').each(function () {
            result += $(this).find('.text').text();
        });
        var msg = $('<div class="combined"><span class="text">' + result + '</span>&nbsp;</div>').BYOIMessage();
        msg.relayMessage();

        $('#joinModal').modal('toggle');

        $('#messageList').getSelectedMessages().toggleSelectMessage();
    });

// bind split method to the message handler
    $('#splitButton').click(function () {
        var input = $('#msg').val();

        $('#spiltMessageTextEditor').html("");
        var chars = input.split("");
        for (var i = 0; i < chars.length; ++i) {
            var object = "<span>" + chars[i] + "</span>";
            $('#spiltMessageTextEditor').append(object);
        }
        updateSplitMessage();

        $('#splitModal').modal('toggle');

        $('#messageList').getSelectedMessages().toggleSelectMessage();
    });

    $('#split-sendButton').click(function () {
        $('#spiltMessageTextEditor').children('.charSplit').each(function () {
            $(this).remove();
        });

        var text = $("#spiltMessageTextEditor").text();
        var charLenght = BYOI.config('')['MSG_MAX_LEN'];
        var regex = new RegExp(".{1," + charLenght + "}", 'g');
        var textChunks = text.match(regex);

        for (var i = 0; i < textChunks.length; ++i) {
            var html = '<div><span class="text">' + textChunks[i] + '</span></div>';
            // sent message to the server
            $(html).BYOIMessage().send($('#recipient').val());
            $('#messageList').getSelectedMessages().toggleSelectMessage();
        }
        $('#msg').val('');
        $('#splitModal').modal('toggle');
    });


    $('#split-closeButton').click(function () {
        $('#spiltMessageTextEditor').children('.charSplit').each(function () {
            $(this).remove();
        });

        var text = $("#spiltMessageTextEditor").text();
        var charLenght = BYOI.config('')['MSG_MAX_LEN'];
        var regex = new RegExp(".{1," + charLenght + "}", 'g');
        var textChunks = text.match(regex);
        $('#msg').val(text);
    });

    function updateSplitMessage(event) {
        var maxlenght = BYOI.config('')['MSG_MAX_LEN'];

        // Update to o
        $("#spiltMessageTextEditor").contents().filter(function () {
            return (this.innerHTML !== undefined && this.innerHTML.length > 1) || this.nodeType === 3;
        }).each(function () {
            if (this.nodeType === 3) {
                var text = this.textContent;
            } else {
                var text = this.innerHTML;
            }
            var chars = text.split("");
            var object = "";
            for (var i = 0; i < chars.length; ++i) {
                object += "<span>" + chars[i] + "</span>";
            }
            $(this).before(object);
            $(this).remove();
        });

        $('#spiltMessageTextEditor').children('.charSplit').each(function () {
            $(this).remove();
        });

        $('#spiltMessageTextEditor').children("span:nth-child(" + maxlenght + "n)").each(function () {
            $(this).after(charSplit);
        });
    }


// create a System Alert
//$('#systemMessage').BYOISystemAlert();
    $('#systemMessage').BYOISystemAlert({
        //this is the default behaviour if the onAlert property is not provided
        onAlert: function (alert) {
            $('#systemMessage').html(alert);
            $('#systemMessages').alert();
            $('#systemMessages').fadeTo(2000, 500).slideUp(500, function () {
            });

        }
    });

// create a Message Handler
    $('#messageList').BYOIMessageHandler({
        accept: function (message) {
            return true;
        },
        onError: function (msg) {
            console.log(msg);
        }
    });

// create a Message Handler with a filter
    toAndFrom = $("#messageBord");
    toAndFrom.BYOIMessageHandler({
        accept: function (msg) {
            if (msg.data('type') == "MESSAGE") {
                var footer = "";
                if (msg.data('to') == 0) {
                    footer = "Bordcast messge";
                } else {
                    footer = "send to " + msg.data('to')
                }
                var dataCopy = $(msg).data();
                var newMessage = "  <a href=\"#\" class=\"list-group-item\">"
                    + "    <h4 class=\"list-group-item-heading text\">" + msg.data('text') + "</h4>"
                    + "    <p class=\"list-group-item-text\">" + footer + "</p>"
                    + "  </a> ";
                msg.html(newMessage);
                msg.addMetadata(dataCopy);

                return true;
            } else if (msg.hasClass('received')) {
                var dataCopy = $(msg).data();
                var newMessage = "  <a href=\"#\" class=\"list-group-item received\">"
                    + "    <h4 class=\"list-group-item-heading text\">" + msg.data('text') + "</h4>"
                    + "    <p class=\"list-group-item-text connected\">" + msg.data('node') + "</p>"
                    + "  </a> ";
                msg.html(newMessage);
                msg.addMetadata(dataCopy);
                return true;
            } else if (msg.hasClass('added')) {
                var dataCopy = $(msg).data();
                var newMessage = "  <a href=\"#\" class=\"list-group-item\">"
                    + "    <h4 class=\"list-group-item-heading text\">" + msg.data('text') + "</h4>"
                    + "    <p class=\"list-group-item-text connected\">" + "self add message" + "</p>"
                    + "  </a> ";
                msg.html(newMessage);
                msg.addMetadata(dataCopy);
                return true;
            } else if (msg.hasClass('combined')) {
                var dataCopy = $(msg).data();
                var newMessage = "  <a href=\"#\" class=\"list-group-item\">"
                    + "    <h4 class=\"list-group-item-heading text\">" + msg.data('text') + "</h4>"
                    + "    <p class=\"list-group-item-text connected\">" + "Message combine" + "</p>"
                    + "  </a> ";
                msg.html(newMessage);
                msg.addMetadata(dataCopy);
                return true;
            }
            return false;
        }
    });

    encryptedList = $('#messageList-encryped').BYOIMessageHandler({
        accept: function (msg) {
            return msg.hasClass('encrypted');
        }
    });

    checksumList = $('#messageList-checksum').BYOIMessageHandler({
        accept: function (msg) {
            return msg.hasClass('checksum');
        }
    });

    taskList = $('#messageList-task').BYOIMessageHandler({
        accept: function (msg) {
            return msg.hasClass('task');
        }
    });


    $('#messageBord').on('click', '.BYOI-message', function () {
        if ($('#messageBord').getSelectedMessages().length > 0) {
            $(encryptionTspan).text('Decrypt');
        } else {
            $(encryptionTspan).text('Encrypt');
        }
    });
});
