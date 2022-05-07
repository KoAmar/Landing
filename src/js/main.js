import * as bootstrap from 'bootstrap';

window.bootstrap = bootstrap;
// import 'jquery';
import 'css/main.scss';
const $ = require('jquery')
// require.ensure('bootstrap')
// require.ensure('jquery')
// jQuery.fx.off = false;

function multiEvent() {
    let navbarHeight = $('.navbar').height() + 100;
    $('.banner').css({
        "padding-top": navbarHeight,
    });
    $('#scheduleModal .modal-content').height(window.innerHeight);
}

$(document).ready(function () {
    multiEvent();
    // window.scrollTo(0,0);

    let menuToggler = $('.menu-toggle');
    let myCollapse = $('#navbarMenu');
    let bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
    })

    menuToggler.on('click', function () {
        $(this).toggleClass('is-active');
    });
    $('.navbar-brand').on('click', function () {
        menuToggler.removeClass('is-active');
        bsCollapse.hide();
    })
    $('.navbar-nav').find('.nav-link').on('click', function (event) {
        event.preventDefault();
        let blockTop = $($(this).attr("href")).offset().top;
        let navHeight = $(".navbar").outerHeight(true) - $(".navbar-collapse").outerHeight(true);
        window.scrollTo(0, blockTop - navHeight);

        menuToggler.toggleClass('is-active');
        bsCollapse.hide();
    })

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
    var scheduleModal = document.getElementById('scheduleModal')//$('#scheduleModal');
    scheduleModal.addEventListener('shown.bs.modal', function () {
        $(':root').css({
            overflowY: 'hidden'
        })
    })
    scheduleModal.addEventListener('hidden.bs.modal', function () {
        $(':root').css({
            overflowY: 'visible'
        })
    })

})
window.addEventListener('resize', function (event) {
    multiEvent();
});