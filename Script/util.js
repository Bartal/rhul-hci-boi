var charSplit = "<b class='charSplit' style='color:red'>|</b>";
var maxCharLenght = 60;
var wheel;
var encryptionTspan;

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

    wheel.slicePathFunction = slicePath().LineSlice;
    wheel.markerEnable = true;
    wheel.initWheel(["Delete\n Message", "Add\n Checksum", "Join\n Messages", "Modify\n Message", "Add\n Random Number", "Decrypt\n Message"]);

    wheel.clockwise = false;
    wheel.clickModeRotate = false;
    addCallbackFunction();

    wheel.createWheel();
    $('svg').css('overflow', 'visible');
    encryptionTspan = $('text[id|="wheelnav-wheelDiv-title"] tspan:contains("Decrypt")');
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

function toggleEncrytionText() {
    if ($(encryptionTspan).text() == "Encrypt") {
        $(encryptionTspan).text('Decrypt')
    } else {
        $(encryptionTspan).text('Encrypt')
    }
}

function createSortableListsOnJoin() {
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
        console.log("Mouse move");
        avalibleToJoinDarg = true;
    });

}


function dragAndDropMessageList() {
    $("#messageBord").sortable({
        connectWith: "div",
        dropOnEmpty: true,

        update: function (event, ui) {
            console.log(event);
        }
    });
    $("#messageBord").disableSelection();
    var toJoinDarg = false;


    $('#messageBord').on('mouseup', '.list-group-item', function () {
        var wasDrag = toJoinDarg;
        toJoinDarg = false;
        if (!wasDrag) {
            $(this).toggleClass('BYOI-selected');
        }
    }).on('mousedown', '.list-group-item', function () {
        toJoinDarg = false;
    }).on('mousemove', '.list-group-item', function () {
        toJoinDarg = true;
    });
}

function openJoinMessage() {
    $('#toJoin').empty();
    $('#avalibleToJoin').empty();

    $('#messageBord').children('.BYOI-message').each(function () {
        if ($(this).hasClass('BYOI-selected')) {
            $(this).removeClass('BYOI-selected');
            $('#toJoin').append($(this).clone());

        } else {
            $('#avalibleToJoin').append($(this).clone());
        }
    });
    $('#messageBord').getSelectedMessages().toggleSelectMessage();
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

function openConnect() {
    $('#connectionModal').modal('toggle');
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
                top: event.clientY - 600, left: event.clientX - 300
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

function addMessageToMessageList(message) {
    if (message.length == 0 || message.length > maxCharLenght) {
        return false;
    }
    var htmlMessage = '<li href="#" class="list-group-item">' + message + '</li>';
    $('#messageBord').append(htmlMessage);
    return true;
}

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


function addRandonNumber() {
    console.log("Adding an random number");
    var value = $('#messageInput').val();
    var number = Math.round((Math.random() * 100));
    $('#messageInput').val(number + value);
}

function addHash() {
    var value = $('#messageInput').val();
    var hash = (value.hashCode() % 1000000);
    $('#messageInput').val(value + ":" + hash);
}