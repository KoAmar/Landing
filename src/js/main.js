import 'bootstrap';
// import 'jquery';
import 'css/main.scss';
const $ = require('jquery')
// require.ensure('bootstrap')
// require.ensure('jquery')
// jQuery.fx.off = false;
function multiEvent() {
    var navbarHeight = $('.navbar').height() + 100;
    $('.banner').css({
        "padding-top": navbarHeight,
    });
    $('#scheduleModal .modal-content').height(window.innerHeight);
    if ($('#scheduleModal.show').length > 0) {
        $(':root').css({
            overflowY: 'hidden'
        })
    }
    else {
        $(':root').css({
            overflowY: 'visible'
        })
    }
}

$(document).ready(function () {
    multiEvent();
    // window.scrollTo(0,0);

    $('.menu-toggle').on('click', function () {
        $(this).toggleClass('is-active');
    });

    if ($(window).width() >= 992) {
        $('.featurettes-item').on('mouseenter', function () {
            $(this).addClass('is-active');
            $(this).find('.featurette-text').slideDown(400)
        })
        $('.featurettes-item').on('mouseleave', function () {
            $(this).removeClass('is-active');
            $(this).find('.featurette-text').slideUp(400)
        })
    }
})
window.addEventListener('resize', function (event) {
    multiEvent();
});