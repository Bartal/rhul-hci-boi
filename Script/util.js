var charSplit = "<b class='charSplit'>|</b>";
var maxCharLenght = 60;
var wheel;


function renderWheel() {
    wheel = new wheelnav("wheelDiv");
    wheel.cssMode = true;
    wheel.slicePathFunction = slicePath().DonutSlice;
    wheel.createWheel(["Encryption", "Delete", "Checksum", "Modify", "Join", "Split", "Add random number", "Decrypt"]);

    wheel.titleAttr = {fill: "#111"};
    wheel.titleSelectedAttr = {fill: "#000"};
    wheel.titleHoverAttr = {fill: "#000"};

    wheel.clockwise = false;
    wheel.clickModeRotate = false;
    wheel.refreshWheel();

}

function addCallbackFunction() {
    // Add in encrypyion callback
    wheel.navItems[0].navigateFunction = function () {
    };
    // Add in Delete call back
    wheel.navItems[1].navigateFunction = function () {
    };

}


function createSortableListsOnJoin() {
    $("#toJoin").sortable({
        connectWith: "ul"
    });

    $("#avalibleToJoin").sortable({
        connectWith: "ul",
        dropOnEmpty: false
    });

    $("#toJoin, #avalibleToJoin").disableSelection();
}


function openSplitMessage() {
    var input = $('#messageInput').val();
    $('#spiltMessageTextEditor').html(input);
    $('#splitModal').modal('toggle');
}

function sendMessageButtonHandler() {
    console.log("testing");
    if ($(this).hasClass('send')) {
        var input = $('#messageInput').val();
        $('#messageInput').val('');
        addMessageToMessageList(input);
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
            $('#wheelDiv').fadeIn('slow');
            wheel.refreshWheel();
            break;
        case 1:
            $('#wheelDiv').fadeOut('fast');
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
    var htmlMessage = '<li href="#" class="list-group-item">' + message + '</li>';
    $('#messageBord').append(htmlMessage);
}