var messageFactory = function () {

    var sendingMessage = function (BYOI_element) {



        var listElement = $('<a class="list-group-item BYOI-message"></a>');
        var textElement = '<div class="list-group-item-text"></div>';
        $(textElement).append('<div class="h3 text-justify text">"+BYOI_JSON.text+"</div>');
        $(textElement).append('<span class="small">send to 12, 13, ..., 17, 20 min ago</span>');
        $(listElement).append(listElement);


        /*
         <a href="#" class="list-group-item">
         <div class="list-group-item-text">
         <div class="h3 text-justify text">Lorem ipsum dolor sit amet, consectetur adipiscing volutpat.</div>
         <span class="small">send to 12, 13, ..., 17, 20 min ago</span>
         </div>
         </a>
         */


        return listElement;
    };

    var receivingMessage = function (BYOI_element) {

    };

};