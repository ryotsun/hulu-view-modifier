/**
 * Created by tsugawa-r on 25/05/2017.
 */

'use strict';

$(document).ready(function() {
    var data = ['content_width'];

    chrome.storage.sync.get(data, function(values) {
        if (!$.isEmptyObject(values)) {
            document.body.style.width = values['content_width'] + '%';
            $('header').width(values['content_width'] + '%');
            $('.vod-mod-movie__inner:first-child').width('100%');
        }
    });

    chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
        if (response.content_width) {
            console.log(response);
            document.body.style.width = response.content_width + '%';
            $('header').width(response.content_width + '%');
            $('.vod-mod-movie__inner:first-child').width('100%');
            sendResponse(response);
        } else {
            sendResponse('no response');
        }
    });

    $(document).on('click', '.vod-mod-profile__image', function(e) {
       var name = e.target.parentNode.parentNode.nextSibling.nextSibling.innerHTML;
       localStorage.setItem('hulu-ext-account', name);
       console.log(name);
       debugger;
    });

    var login_account = localStorage.getItem('hulu-ext-account');

    var accounts = $('.vod-mod-profile__name');
    var forms = $('form');
    for (var i = 0, l = accounts.length; i < l; i++) {
        if (login_account === accounts[i].innerHTML) {
            forms[i].submit();
        }
    }
});
