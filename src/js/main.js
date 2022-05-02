import 'bootstrap';
// import 'jquery';
import 'css/main.scss';
const $ = require('jquery')
// require.ensure('bootstrap')
// require.ensure('jquery')
$(document).ready(() => {
    var navbarHeight = $('.navbar').height() + 100;
    $('.banner').css({
        "padding-top": navbarHeight,
        // "min-height": navbarHeight + window.innerHeight
    });
    $('.menu-toggle').on('click', function () {
        $(this).toggleClass('is-active');
    });
    window.scrollTo(0);
})