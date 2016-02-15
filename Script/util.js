var charSplit = "<b class='charSplit' style='color:red'>|</b>";
var maxCharLenght = 60;
var wheel;

String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};


function renderWheel() {
    wheel = new wheelnav("wheelDiv");
    //wheel.cssMode = true;
    wheel.slicePathFunction = slicePath().DonutSlice;
    wheel.createWheel(["Encryption", "Delete", "Checksum", "Modify", "Join", "Split", "Add random number", "Decrypt"]);

    wheel.titleAttr = {fill: "#111"};
    wheel.titleSelectedAttr = {fill: "#000"};
    wheel.titleHoverAttr = {fill: "#000"};

    wheel.clockwise = false;
    wheel.clickModeRotate = false;
    addCallbackFunction()
    wheel.refreshWheel();

}

function addCallbackFunction() {
    // Add in encrypyion callback
    wheel.navItems[0].navigateFunction = function () {
    };
    // Add in Delete call back
    wheel.navItems[1].navigateFunction = function () {
    };

    wheel.navItems[4].navigateFunction = openJoinMessage;

    wheel.navItems[5].navigateFunction = openSplitMessage;

}


function createSortableListsOnJoin() {
    $("#toJoin").sortable({
        connectWith: "ul",
        dropOnEmpty: true
    });

    $("#avalibleToJoin").sortable({
        connectWith: "ul",
        dropOnEmpty: true
    });

    $("#toJoin, #avalibleToJoin").disableSelection();

    $('#toJoin').on('click', '.list-group-item', function () {
        $('#avalibleToJoin').append(this);
    });

    $('#avalibleToJoin').on('click', '.list-group-item', function () {
        $('#toJoin').append(this);
    });
}


function openJoinMessage() {
    $('#toJoin').empty();
    $('#avalibleToJoin').empty();

    $('#messageBord').children('li').each(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('#toJoin').append($(this).clone());

        } else {
            $('#avalibleToJoin').append($(this).clone());
        }
    });

    $('#joinModal').modal('toggle');
}

function openSplitMessage() {
    var input = $('#messageInput').val();

    $('#spiltMessageTextEditor').html("");
    var chars = input.split("");
    for (var i = 0; i < chars.length; ++i) {
        var object = "<span>" + chars[i] + "</span>";
        $('#spiltMessageTextEditor').append(object);
    }
    updateSplitMessage();

    $('#splitModal').modal('toggle');
}

function sendMessageButtonHandler() {
    console.log("testing");
    if ($(this).hasClass('send')) {
        var input = $('#messageInput').val();
        if (addMessageToMessageList(input)) {
            $('#messageInput').val('');
        }
    } else {
        openSplitMessage();
    }
}


function bodyMouseHandler(event) {
    switch (event.which) {
        case 3:
            // get moues possion, set possion to new possion
            // set visiblilty to true
            console.log(event.clientX, event.clientY);
            $('#wheelDiv').css({
                position: "absolute",
                marginLeft: 0, marginTop: 0,
                top: event.clientY - 130, left: event.clientX - 130
            });
//            $('#wheelDiv').fadeIn('slow');
            $('#wheelDiv').show();
            wheel.refreshWheel();
            break;
        case 1:
            $('#wheelDiv').hide();
        //$('#wheelDiv').fadeOut('fast');
        default:
    }
}

function inputKeybordHandler(evnet) {
    var content = $(this).val();
    var maxChar = maxCharLenght;
    var charLable = "";

    $("#sendMessage").removeClass('send');
    $("#sendMessage").removeClass('split');

    if (content.length <= maxChar) {
        charLable = "You have " + (maxChar - content.length) + " left";
        $("#sendMessage").addClass('send');
        $("#sendMessage").html("Sent message");
    } else {
        charLable = "You will have to split the message to send of the message";
        $("#sendMessage").addClass('split');
        $("#sendMessage").html("split message");
    }
    $('#messageLabel').html(charLable);

}

function addMessageToMessageList(message, from) {
    if (message.length == 0 || message.length > maxCharLenght) {
        return false;
    }
    var htmlMessage = '<li href="#" class="list-group-item';
    if (from == "self") {
        htmlMessage += ' text-right';
    }
    htmlMessage += '">' + message + '</li>';
    $('#messageBord').append(htmlMessage);
    return true;
}

function updateSplitMessage() {
    $('#spiltMessageTextEditor').children('.charSplit').each(function () {
        $(this).remove();
    });
    var childEleemtns = $("#spiltMessageTextEditor").text().split("");
    $("#spiltMessageTextEditor").empty();
    for (var i = 0; i < childEleemtns.length; ++i) {
        if (i != 0 && (i % maxCharLenght) == 0) {
            $('#spiltMessageTextEditor').append(charSplit);
            console.log("I am trying to split an message")
        }
        var object = "<span>" + childEleemtns[i] + "</span>";
        $('#spiltMessageTextEditor').append(object);
    }
}


function addRandonNumber() {
    console.log("Adding an random number")
    var value = $('#messageInput').val();
    var number = Math.round((Math.random() * 100));
    $('#messageInput').val(number + value);
}

function addHash() {
    var value = $('#messageInput').val();
    var hash = (value.hashCode() % 1000000);
    $('#messageInput').val(value + ":" + hash);
}