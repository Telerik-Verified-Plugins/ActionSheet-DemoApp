(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        share: function () {
            this.showActionSheet({
                'title': 'What do you want with this image?',
                'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
                'addCancelButtonWithLabel': 'Cancel',
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
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
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel'
            });
        },

        showActionSheet: function (options) {
            if (!this.checkSimulator()) {
                window.plugins.actionsheet.show(
                    options,
                    function (buttonIndex) {
                        // wrapping in a timeout so the dialog doesn't freeze the app
                        setTimeout(function() {
                            alert('button index clicked: ' + buttonIndex);
                        }, 0);
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