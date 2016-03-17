var wheel;
var encryptionTspan;

function renderWheel() {
    wheel = new wheelnav("wheelDiv");

    wheel.slicePathFunction = slicePath().TabSlice;
    //wheel.markerEnable = true;
    wheel.initWheel(["Delete\nMessage", "Add\nChecksum", "Join\n Messages", "Verify\nchecksum", "Add\n Random\nNumber", "Decrypt\nMessage"]);

    wheel.clockwise = false;
    wheel.clickModeRotate = false;
    addCallbackFunction();

    wheel.createWheel();
    $('svg').css('overflow', 'visible');
    encryptionTspan = $('text[id|="wheelnav-wheelDiv-title"] tspan:contains("Decrypt")');
}

function addCallbackFunction() {
    // Add in encrypyion callback

    //["Delete\n Message", "verify\nchecksum", "Join\n Messages", "Add\n Random Number", "Decrypt\n Message"]
    wheel.navItems[0].navigateFunction = function () {
        $('#messageBord').getSelectedMessages().remove();
        //Delete\n Message
    };

    wheel.navItems[1].navigateFunction = function () {
        // get the text
        var input = $('#msg');
        // create a new message from the input text and add a checksum to it
        var msg = $('<div><span class="text">' + input.val() + '</span></div>').BYOIMessage()
            .addChecksum().relayMessage();
        // add the message to the input (update field value)

        BYOI.addMessageToContainer(msg, input);

        $('#messageList').getSelectedMessages().toggleSelectMessage();
        $('#msg').val($("#messageList-checksum").children().last().data('text'));
    };

    wheel.navItems[2].navigateFunction = function () {
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

    };

    wheel.navItems[3].navigateFunction = function () {
        var verify = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage().verifyChecksum();
        $('#messageList').getSelectedMessages().toggleSelectMessage();
    };

    wheel.navItems[4].navigateFunction = function () {
        // add a random number to the last selected element of the message handler
        var msg = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage()
            .addRandomNumber().relayMessage();
        // add the message to the input (update field value)
        BYOI.addMessageToContainer(msg, $('#msg'));
    };

    wheel.navItems[5].navigateFunction = function () {
        if ($(encryptionTspan).text() == "Encrypt") {

            var msg = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage().encryptMessage(
                parseInt(+$('#recipient').val()) // encryption key is the recipient node
            ).relayMessage(); // send to every message handler
            // add the message to the input (update field value)
            BYOI.addMessageToContainer(msg, $('#msg'));
            $('#messageList').getSelectedMessages().toggleSelectMessage();
            $('#msg').val($("#messageList-encryped").children().last().data('text'));

        } else {
            var msg = $('<div><span class="text">' + $('#msg').val() + '</span></div>').BYOIMessage().decryptMessage(
                parseInt(+$('#recipient').val()) // decryption key is the recipient node
            ).relayMessage(); // send to every message handler
            // add the message to the input (update field value)
            BYOI.addMessageToContainer(msg, $('#msg'));
            $('#messageList').getSelectedMessages().toggleSelectMessage();
        }
    };
}

