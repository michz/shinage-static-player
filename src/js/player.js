;
'use strict';

import * as jQuery from 'jquery';
// export for others scripts to use
//window.$ = $;
//window.jQuery = jQuery;

const urlParamReader = {
    parts: [],

    init: function () {
        this.parts = this.getUrlVars();
    },

    getUrlVars: function () {
        const vars = {};
        /*var parts = */window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    },

    getUrlParam: function (parameter, defaultValue) {
        let value = defaultValue;
        if (window.location.href.indexOf(parameter) > -1) {
            value = this.parts[parameter];
        }
        return value;
    }
};
urlParamReader.init();

const player = {
    container: jQuery('#container'),
    remoteCurrentPresentationUrl: '',
    currentPresentation: '',
    lastModified: '0000-00-00 00:00:00',
    checkInterval: 5000,

    init: function () {
        this.remoteCurrentPresentationUrl =
            urlParamReader.getUrlParam('current_presentation_url', 'http://localhost:8080/test.txt');
    },
    getCurrentPresentation: function () {
        jQuery.ajax({
            url: this.remoteCurrentPresentationUrl,
            method: 'get',
            success: (data, status, xhr) => {
                // @TODO Prüfen was passiert wenn kein Last-Modified-Header geschickt wird
                this.lastModified = xhr.getResponseHeader("Last-Modified");
                const url = data.trim();

                if (this.currentPresentation !== url) {
                    this.currentPresentation = url;
                    this.showPresentation(url);
                }
            }
        });
        setTimeout(jQuery.proxy(this.getCurrentPresentation, this), this.checkInterval);
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
