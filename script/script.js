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
        $(".vod-mod-series-area__tray, .vod-mod-tray__content").on('mouseover', "[class^='vod-mod-tray__']", function(e) {
            var base_element = e.target.closest("[data-panel-for]");
            if (base_element) {
                var id = base_element.getAttribute('data-panel-for');
                var element = document.querySelector(id);
                var title_element = element.querySelector("header .vod-mod-popup-panel__program");

                // 追加するノード
                var div = document.createElement('div');
                div.id = 'hvm-movie-clip-description';
                div.innerHTML = title_element.innerHTML;

                var prev_element = element.previousElementSibling.querySelector(".vod-mod-tray__thumbnail");
                prev_element.appendChild(div);
                $(div).fadeIn(0);

                // サムネイルの変更
                var thumbnail = element.previousElementSibling.querySelector("img");
                var thumbnail_new = element.querySelectorAll(".vod-mod-popup-panel__picture img");
                if (thumbnail_new[thumbnail_new.length - 1].src !== "https://www.happyon.jp/") {
                    thumbnail.src = thumbnail_new[thumbnail_new.length - 1].src;
                }
            }
            return false;
        });
        $(".vod-mod-series-area__tray, .vod-mod-tray__content").on('mouseout', function(e) {
            var element = document.getElementById('hvm-movie-clip-description');
            if (element) {
                element.remove();
            }

            // サムネイルを元に戻す
            var base_element = e.target.closest("[data-panel-for]");
            if (base_element) {
                var id = base_element.getAttribute('data-panel-for');
                var element = document.querySelector(id);
                var thumbnail = element.previousElementSibling.querySelector("img");
                var thumbnail_new = element.querySelectorAll(".vod-mod-popup-panel__picture img");
                if (thumbnail_new[0].src !== "https://www.happyon.jp/") {
                    thumbnail.src = thumbnail_new[0].src;
                }
            }
        });

        $(".vod-mod-content").on('mouseover', "[class^='vod-mod-tile__']", function(e) {
            var base_element = e.target.closest("[data-panel-for]");
            if (base_element) {
                var id = base_element.getAttribute('data-panel-for');
                var element = document.querySelector(id);
                var title_element = element.querySelector("header .vod-mod-popup-panel__program");

                // 追加するノード
                var div = document.createElement('div');
                div.id = 'hvm-movie-clip-description';
                div.innerHTML = title_element.innerHTML;

                var prev_element = element.previousElementSibling.querySelector(".vod-mod-tile__thumbnail");
                prev_element.appendChild(div);
                $(div).fadeIn(0);

                // サムネイルの変更
                var thumbnail = element.previousElementSibling.querySelector("img");
                var thumbnail_new = element.querySelectorAll(".vod-mod-popup-panel__picture img");
                if (thumbnail_new[thumbnail_new.length - 1].src !== "https://www.happyon.jp/") {
                    thumbnail.src = thumbnail_new[thumbnail_new.length - 1].src;
                }
            }
            return false;
        });
        $(".vod-mod-content").on('mouseout', function(e) {
            var element = document.querySelector("#hvm-movie-clip-description");
            if (element) {
                element.remove();
            }

            // サムネイルを元に戻す
            var base_element = e.target.closest("[data-panel-for]");
            if (base_element) {
                var id = base_element.getAttribute('data-panel-for');
                var element = document.querySelector(id);
                var thumbnail = element.previousElementSibling.querySelector("img");
                var thumbnail_new = element.querySelectorAll(".vod-mod-popup-panel__picture img");
                if (thumbnail_new[0].src !== "https://www.happyon.jp/") {
                    thumbnail.src = thumbnail_new[0].src;
                }
            }
        });
    }

    function enablePopUp() {
        $(".vod-mod-series-area__tray, .vod-mod-tray__content").off('mouseover', "[class^='vod-mod-tray__']");
        $(".vod-mod-content").off('mouseover', "[class^='vod-mod-tile__']");
    }

    chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
        if (response) {
            if (response.content_width) {
                console.log(response);
                if (location.href.indexOf('watch') > 0) {
                    document.body.style.width = response.content_width + '%';
                    $('header').width(response.content_width + '%');
                    $('.vod-mod-movie__inner:first-child').width('100%');
                }
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
