;
'use strict';

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
    container: document.querySelector('#container'),
    remoteCurrentPresentationUrl: '',
    currentPresentation: '',
    lastModified: '0000-00-00 00:00:00',
    checkInterval: 5000,

    init: function () {
        this.remoteCurrentPresentationUrl =
            urlParamReader.getUrlParam('current_presentation_url', 'http://localhost:8080/test.txt');

        // Plan regularly
        window.setInterval(() => this.getCurrentPresentation(), this.checkInterval);

        // Start immediately
        this.getCurrentPresentation();
    },
    getCurrentPresentation: function () {
        window.fetch(this.remoteCurrentPresentationUrl)
            .then(res => {
                this.lastModified = res.headers.get('Last-Modified');
                res.text().then(url => {
                    url = url.trim();
                    if (this.currentPresentation !== url) {
                        this.currentPresentation = url;
                        this.showPresentation(url);
                    }
                });
            })
            .catch(err => {
                console.error(err);
                // @TODO Better error display?
            });
    },
    showPresentation: function (url) {
        this.container.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.src = url;
        this.container.append(iframe);
    }
};

player.init();
