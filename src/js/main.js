import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
// import Swiper from 'swiper';
import 'css/main.scss';
const $ = require('jquery')
let navHeight;

function initNavHeight() {
    // if ($(window).width() >= 992) {
    navHeight = $(".navbar").outerHeight(true);
    // }
    // else {
    //     console.log($(".navbar").outerHeight(true));
    //     console.log($(".navbar-collapse").outerHeight(true));
    //     navHeight = $(".navbar").outerHeight(true)// - $(".navbar-collapse").outerHeight(true);
    // }
}

function hideLongTestimonial() {
    if ($('.testimonials .carousel-item.active .left').height() > 350) {
        $('.testimonials .carousel-item.active .left:not(.show-more)').addClass('show-more')
        console.log('+++');

    }
    console.log('+');
}

function multiEvent() {
    initNavHeight();

    $('.banner').css({
        "padding-top": navHeight + 100,
    });

    $('#scheduleModal .modal-content').height(window.innerHeight);

    $('main > *:not(.banner)').each(function () {
        $(this).css('min-height', window.innerHeight - navHeight);
    })
}

$(document).ready(function () {
    multiEvent();

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

        let href = $(this).attr("href")
        let blockTop = $(href).offset().top;
        history.replaceState(undefined, undefined, href)

        if ($(window).width() < 992) {
            menuToggler.toggleClass('is-active');
            bsCollapse.hide();
        }
        // console.log(blockTop);
        // console.log(navHeight);
        window.scrollTo(0, blockTop - navHeight);
    })

    if ($(window).width() >= 992) {
        $('.featurettes-item').on('mouseenter', function () {
            $(this).addClass('is-active');
            $(this).find('.featurette-text').slideDown(200)
        })
        $('.featurettes-item').on('mouseleave', function () {
            $(this).removeClass('is-active');
            $(this).find('.featurette-text').slideUp(200)
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

    hideLongTestimonial()
    var testimonialsCarousel = document.getElementById('testimonialsCarousel')
    testimonialsCarousel.addEventListener('slid.bs.carousel', function () {
        // console.log('+');
        // $('.testimonials .carousel-item').each(function () {
        // $(this).css('opacity', '0')
        // $(this).show()
        // console.log($(this).height());
        // if ($(this).height() > 350) {
        //     console.log('+')
        //     $(this).addClass('show-more')
        // }
        // $(this).find('*:not(active)').hide()
        // $(this).css('opacity', '1')
        // })
        hideLongTestimonial()
    })
})
window.addEventListener('resize', function () {
    multiEvent();
});