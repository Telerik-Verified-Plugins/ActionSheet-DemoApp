(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        share: function () {
            this.showActionSheet({
                'title': 'What do you want with this image?',
                'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
                'addCancelButtonWithLabel': 'Cancel',
                'androidEnableCancelButton' : true,
                'addDestructiveButtonWithLabel' : 'Delete it'                
            });
        },

        delete: function () {
            this.showActionSheet({
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete note'
            });
        },

        logout: function () {
            this.showActionSheet({
                'buttonLabels': ['Log out'],
                'androidEnableCancelButton' : true,
                'addCancelButtonWithLabel': 'Cancel'
            });
        },

        showActionSheet: function (options) {
            if (!this.checkSimulator()) {
                window.plugins.actionsheet.show(
                    options,
                    function (result) {
                        // wrapping in a timeout so the dialog doesn't freeze the app
                        setTimeout(function(buttonIndex) {
                            alert('button index clicked: ' + buttonIndex);
                        }, 0);
                    }
                );
            }
        },

        encode: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.barcodeScanner.encode(

                    // pick one of TEXT_TYPE / EMAIL_TYPE / PHONE_TYPE / SMS_TYPE
                    cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,

                    // the thing to encode - for a link use TEXT_TYPE above
                    "http://www.telerik.com",

                    // success callback (will currently not be invoked)
                    function (result) {
                        alert("Encoding succeeded: " + result);
                    },

                    // error callback
                    function (error) {
                        alert("Encoding failed: " + error);
                    }
                );
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.cordova === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);