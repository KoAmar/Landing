import * as bootstrap from 'bootstrap';
import $ from 'jquery';
// const $ = require('jquery')
import 'slick-carousel';
// import jquery from 'jquery';
import 'css/main.scss';
import AOS from 'aos';
window.bootstrap = bootstrap;

var target = window.location.hash;
let navHeight;
let menuToggler;
let bsCollapse;

function currentNavHeight() {
    // if ($(window).width() >= 992) {
    navHeight = $(".navbar").outerHeight(true);
    // }
    // else {
    // console.log($(".navbar").outerHeight(true));
    // console.log($(".navbar-collapse").outerHeight(true));
    //     navHeight = $(".navbar").outerHeight(true) - $(".navbar-collapse").outerHeight(true);
    // }
    // console.log(navHeight);
}

function multiEvent() {
    currentNavHeight();

    $('.banner').css({
        "padding-top": navHeight + 100,
    });

    $('#scheduleModal .modal-content, #testimonialModal .modal-content').height(window.innerHeight);

    $('main > *:not(.banner)').each(function () {
        $(this).css('min-height', window.innerHeight - navHeight);
    })
    if (target) {
        setTimeout(function () {
            scrollTo(target, menuToggler, bsCollapse);
            target = undefined;
        }, 1);
    }
}

function hideScrollModal(modal) {
    modal.addEventListener('shown.bs.modal', function () {
        $(':root').css({
            overflowY: 'hidden'
        })
    })
    modal.addEventListener('hidden.bs.modal', function () {
        $(':root').css({
            overflowY: 'visible'
        })
    })
}

function scrollTo(anchor, menuToggler, bsCollapse) {
    let blockTop = $(anchor).offset().top;
    history.replaceState(undefined, undefined, anchor)

    if ($(window).width() < 992) {
        menuToggler.removeClass('is-active');
        bsCollapse.hide();
    }
    // currentNavHeight();
    window.scrollTo(0, blockTop - navHeight);
    target = anchor;
}

window.addEventListener('load', function () {

    menuToggler = $('.menu-toggle');
    let myCollapse = $('#navbarMenu');
    bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
    })

    multiEvent();

    //Navbar
    menuToggler.on('click', function () {
        $(this).toggleClass('is-active');
    });
    $('.navbar-brand').on('click', function () {
        menuToggler.removeClass('is-active');
        bsCollapse.hide();
    })

    //Banner
    $('.banner .banner-content .banner-btn-wrapper .btn')
        .add('.navbar-nav .nav-link')
        .on('click', function (event) {
            event.preventDefault();

            let anchor = $(this).attr("href");
            scrollTo(anchor, menuToggler, bsCollapse);
        })

    AOS.init({
        // debounceDelay: 50, 
        offset: 400,
        // delay: 5,
        duration: 400,
        // once: false, 
        // mirror: true, 
    });

    //About me
    if ($(window).width() >= 992) {
        $('.featurettes-item').on('mouseenter', function () {
            $(this).addClass('is-active');
            $(this).find('.featurette-text').slideDown(250)
        })
        $('.featurettes-item').on('mouseleave', function () {
            $(this).removeClass('is-active');
            $(this).find('.featurette-text').slideUp(250)
        })
    }

    //Modal
    hideScrollModal(document.getElementById('scheduleModal'));
    hideScrollModal(document.getElementById('testimonialModal'));

    //Testimonials
    $('.testimonials-wrapper').slick({
        // infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 3000,
        nextArrow: $('.next'),
        prevArrow: $('.prev')
        // nextArrow: '<button class="next"></button>',
        // prevArrow: '<button class="prev"></button>'
    });
    // $('.testimonials .slick-slide .left').each(function () {
    //     // console.log($(this).height());
    //     if ($(this).height() > 250) {
    //         $('.testimonials .slick-slide .left:not(.show-more)').addClass('show-more')
    //         console.log("+++");
    //     }
    // })
    // .height() > 350) {
    //     $('.testimonials .carousel-item.active .left:not(.show-more)').addClass('show-more')
    //     console.log('+++');

    // }
    // console.log('+');

    //Payment
})
window.addEventListener('resize', function () {
    multiEvent();
});