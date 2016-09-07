var App = {
    init : function() {
        this.time = 30;
        this.timeSet = 30;
        this.playing = false;
        this.window = null;
        this.$less = $('#less');
        this.$more = $('#more');
        this.$timer = $('#timer');
        this.$playpause = $('#playpause');
        this.$restart = $('#restart');
        this.$open = $('#open');

        this.$less.on('click', this.clickOnLess.bind(this));
        this.$more.on('click', this.clickOnMore.bind(this));
        this.$playpause.on('click', this.clickOnPlayPause.bind(this));
        this.$restart.on('click', this.clickOnRestart.bind(this));
        this.$open.on('click', this.openWindow.bind(this));

        setInterval(this.interval.bind(this), 1000);
    },

    clickOnLess : function() {
        this.timeSet -= 10;
        
        if(this.timeSet < 0)
            this.timeSet = 0;
        
        this.time = this.timeSet;
        this.renderTimer();
    },

    clickOnMore : function() {
        this.timeSet += 10;
        this.time = this.timeSet;
        this.renderTimer();
    },

    renderTimer : function() {
        var r = moment.utc(this.time*1000).format("HH:mm:ss");
        this.$timer.html(r);
        this.broadcast(r);
    },

    clickOnPlayPause : function() {
        if(this.playing) {
            this.playing = false;
            this.$playpause.html("<i class=\"ion-play\"></i>");
            this.$more.removeAttr('disabled');
            this.$less.removeAttr('disabled');
        } else {
            this.playing = true;
            this.$playpause.html("<i class=\"ion-pause\"></i>");
            this.$more.attr('disabled', '');
            this.$less.attr('disabled', '');
        }
    },

    clickOnRestart : function() {
        if(this.playing)
            this.clickOnPlayPause();
        
        this.time = this.timeSet;
        this.renderTimer();
    },

    openWindow : function() {
        this.window = window.open("timer.html", "_blank");
        this.$open.attr('disabled', '');
        this.$playpause.removeAttr('disabled');
        this.$restart.removeAttr('disabled');
    },

    broadcast : function(action) {
        if(!this.window)
            return;
        
        this.window.postMessage(action, "*");
    },

    interval : function() {
        if(!this.playing)
            return;
        
        this.time--;

        if(this.time < 0)
            this.time = 0;

        this.renderTimer();
    },
};

window.addEventListener('load', function() {
    App.init();
});