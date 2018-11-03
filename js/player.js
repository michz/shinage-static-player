;
'use strict';

var urlParamReader = {
    parts: [],

    init: function () {
        this.parts = this.getUrlVars();
    },

    getUrlVars: function () {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    },

    getUrlParam: function (parameter, defaultValue) {
        var value = defaultValue;
        if(window.location.href.indexOf(parameter) > -1) {
            value = this.parts[parameter];
        }
        return value;
    }
};
urlParamReader.init();

//console.log(urlParamReader.getUrlParam('test', 'ersatz'));

var player = {
    container: $('#container'),
    remoteCurrentPresentationUrl: '',
    currentPresentation: '',
    lastModified: '0000-00-00 00:00:00',
    checkInterval: 5000,

    init: function () {
        this.remoteCurrentPresentationUrl =
            urlParamReader.getUrlParam('current_presentation_url', 'http://localhost:8080/test.txt');
    },
    getCurrentPresentation: function () {
        var that = this;
        $.ajax({
            url: that.remoteCurrentPresentationUrl,
            method: 'get',
            success: function (data, status, xhr) {
                // @TODO Prüfen was passiert wenn kein Last-Modified-Header geschickt wird
                that.lastModified = xhr.getResponseHeader("Last-Modified");
                var url = data.trim();
                console.log(xhr.getAllResponseHeaders());

                if (that.currentPresentation !== url) {
                    that.currentPresentation = url;
                    that.showPresentation(url);
                }
            }
        });
        setTimeout($.proxy(that.getCurrentPresentation, this), that.checkInterval);
    },
    showPresentation: function (url) {
        this.container.empty();
        this.container.append(
            '<iframe src="' + url + '"></iframe>'
        );
    }
};

player.init();
player.getCurrentPresentation();
