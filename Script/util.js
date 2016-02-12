var charSplit = "<b class='charSplit'>|</b>";

function openWindow($title, $content, callback) {
    var winFeature =
        'location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes; width:500px, height:500px';
    var myWindow = window.open("", $title, winFeature);
    myWindow.document.write($content);
    $(myWindow).bind('beforeunload', callback || function (e) {
        });
    return myWindow;
}

function updateSplitMarker(content, splitsize) {
    var regexSplitsize = new RegExp(".{1," + splitsize + "}", "g");
    console.log(content.match(regexSplitsize));
}

function createColorCodingInput() {

}

function getInput() {
}

function openSplitWindow(message) {
    var content = '<html>' +
        '<head>' +
        '<link rel="stylesheet" href="Style/bootstrap.min.css">' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">' +
        '<script>' +
        '$(text_edit).prop("contentEditable", true).blur(function () {' +
        '        var chars = $(this).text().split("");' +
        '        $(inputID).val($(this).text());' +
        '' +
        '        this.innerHTML = "";' +
        '' +
        '        console.log(updateSplitMarker(chars.join(""), 20));' +
        '        $.each(chars, function () {' +
        '            $("<span>").text(this).css({' +
        '                color: "#" + (Math.random() * 16777215 | 0).toString(16)' +
        '            }).appendTo(text_edit);' +
        '        });' +
        '    });' +
        '</script>' +
        '<style>' +
        '#text_edit{' +
        'height:200px;' +
        'width: 100%;' +
        '}' +
        '</style>' +
        '</head>' +
        '<body>' +
        '<div class="contaner-fluid">' +
        '	<div class="row">' +
        '		<div class="col-xs-12">' +
        '           <div id="text_edit">' + message + '</div>' +
        '           <input type="hidden" id="spintSend"/>' +
        '		</div>' +
        '	</div>' +
        '	<div class="row">' +
        '		<div class="col-xs-12">' +
        '			<button type="submit" class="btn btn-default">send incident</button>' +
        '			<button type="submit" class="btn btn-default">cansel</button>' +
        '		</div>' +
        '	</div>' +
        '</div>' +
        '</body>' +
        '</html>';

    var window = openWindow("Split", content, function (e) {
        console.log(e)
    });

}


function openJoinWindow(message) {
    var content = '<html>' +
        '<head>' +
        '<link rel="stylesheet" href="Style/bootstrap.min.css">' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">' +
        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">' +
        '</head>' +
        '<body>' +
        '<div class="contaner-fluid">' +
        '	<div class="row">' +
        '		<div class="col-sm-6">' +
        '    <div class="list-group" style="max-height: 80vh; overflow-y:scroll;">' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum t eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '</div>' +
        '		</div>' +
        '		<div class="col-sm-6">' +
        '    <div class="list-group" style="max-height: 80vh; overflow-y:scroll;">' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum t eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '        <a href="#" class="list-group-item">Cras justo odio</a>' +
        '        <a href="#" class="list-group-item">Dapibus ac facilisis in</a>' +
        '        <a href="#" class="list-group-item">Morbi leo risus</a>' +
        '        <a href="#" class="list-group-item">Porta ac consectetur ac</a>' +
        '        <a href="#" class="list-group-item">Vestibulum at eros</a>' +
        '    </div>' +
        '		</div>' +
        '	</div>' +
        '	<div class="row">' +
        '		<div class="col-xs-12">' +
        '			<button type="submit" class="btn btn-default">send incident</button>' +
        '			<button type="submit" class="btn btn-default">cansel</button>' +
        '		</div>' +
        '	</div>' +
        '</div>' +
        '</body>' +
        '</html>';

    var window = openWindow("Split", content, function (e) {
        console.log(e)
    });

}


function createContentEditAria(conentID, inputID) {
    $(conentID).prop("contentEditable", true).blur(function () {
        var chars = $(this).text().split("");
        $(inputID).val($(this).text());

        this.innerHTML = "";

        console.log(updateSplitMarker(chars.join(""), 20));
        $.each(chars, function () {
            $("<span>").text(this).css({
                color: "#" + (Math.random() * 16777215 | 0).toString(16)
            }).appendTo(conentID);
        });
    });
}