App = {
    init : function() {
        this.$timer = $('#timer');
        window.addEventListener('message', this.recieveBroadcast.bind(this), false);
    },
    
    recieveBroadcast : function(evt) {
        this.$timer.html(evt.data);
    }
};

window.addEventListener('load', function() {
    App.init();
});