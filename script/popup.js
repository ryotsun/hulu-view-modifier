/**
 * Created by tsugawa-r on 25/05/2017.
 */

'use strict';

$(document).ready(function() {
    var data = ['content_width', 'is_zoom'];

    chrome.storage.sync.get(data, function(values) {
        if (!$.isEmptyObject(values)) {
            console.log('already set', values);
            $('#width-bar').val(values['content_width']);
            $('#popup-zoom').prop('checked', values['is_zoom']);
        } else {
            $('#width-bar').val(100);
            $('#popup-zoom').prop('checked', true);
            console.log('not set');
        }
        var current_width = $('#width-bar').val();
        $('#width-value').text(current_width + '%');
    });


    $(document).on('change', '#width-bar', function(e) {
        var current_width = $('#width-bar').val();
        $('#width-value').text(current_width + '%');

        // save value to storage
        var new_data = {}
        new_data['content_width'] = e.target.value;
        chrome.storage.sync.set(new_data, function() {
            console.log("setting was saved successfully.");
        });

        var queryInfo = {
            active: true,
            windowId: chrome.windows.WINDOW_ID_CURRENT
        };

        chrome.tabs.query(queryInfo, function(tabs) {
            chrome.tabs.sendMessage(tabs.shift().id, {
                content_width: e.target.value
            },
            function(response) {
                console.log(response);
            })
        });
    });

    // for popup's checkbox
    $(document).on('change', '#popup-zoom', function(e) {
        // save value to storage
        var new_data = {}
        new_data['is_zoom'] = $('#popup-zoom').prop('checked');
        chrome.storage.sync.set(new_data, function() {
            console.log("setting was saved successfully.");
        });

        var queryInfo = {
            active: true,
            windowId: chrome.windows.WINDOW_ID_CURRENT
        };

        chrome.tabs.query(queryInfo, function(tabs) {
            chrome.tabs.sendMessage(tabs.shift().id, {
                    is_zoom: new_data['is_zoom']
                },
                function(response) {
                    console.log(response);
                })
        });
    });
});
