var wheel;

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

    wheel.navItems[4].navigateFunction = function () {
    };

    wheel.navItems[5].navigateFunction = function () {
    };
}

function toggleEncrytionText() {
    if ($(encryptionTspan).text() == "Encrypt") {
        $(encryptionTspan).text('Decrypt')
    } else {
        $(encryptionTspan).text('Encrypt')
    }
}