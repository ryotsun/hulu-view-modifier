/**
 * Created by tsugawa-r on 25/05/2017.
 */

'use strict';

$(document).ready(function() {
    var data = ['content_width', 'is_zoom'];

    chrome.storage.sync.get(data, function(values) {
        if (!$.isEmptyObject(values)) {
            // for view width
            if (location.href.indexOf('watch') > 0) {
                document.body.style.width = values['content_width'] + '%';
                $('header').width(values['content_width'] + '%');
                $('.vod-mod-movie__inner:first-child').width('100%');
            }

            // for popup
            if (!values['is_zoom']) {
                disablePopUp();
            }
        }
    });

    function disablePopUp() {
        $("[class^='vod-mod-tray__']").on('mouseover', function(e) {
            return false;
        });
    }

    function enablePopUp() {
        $("[class^='vod-mod-tray__']").off('mouseover');
    }

    chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
        if (response) {
            if (response.content_width) {
                console.log(response);
                document.body.style.width = response.content_width + '%';
                $('header').width(response.content_width + '%');
                $('.vod-mod-movie__inner:first-child').width('100%');
            }

            if (response.is_zoom) {
                enablePopUp();
            } else {
                disablePopUp();
            }

            sendResponse(response);
        } else {
            sendResponse('no response');
        }
    });
});
