import * as bootstrap from 'bootstrap';
import $ from 'jquery';
// const $ = require('jquery')
import 'slick-carousel';
// import jquery from 'jquery';
import 'css/main.scss';
window.bootstrap = bootstrap;

let navHeight;

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

    $('#scheduleModal .modal-content').height(window.innerHeight);

    $('main > *:not(.banner)').each(function () {
        $(this).css('min-height', window.innerHeight - navHeight);
    })
}

window.addEventListener('load', function () {
    multiEvent();

    let menuToggler = $('.menu-toggle');
    let myCollapse = $('#navbarMenu');
    let bsCollapse = new bootstrap.Collapse(myCollapse, {
        toggle: false
    })

    //Navbar
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
        // currentNavHeight();
        window.scrollTo(0, blockTop - navHeight);
    })

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

    //Schedule
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

    //Testimonials
    $('.testimonials-wrapper').slick({
        // infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 5000,
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

})
window.addEventListener('resize', function () {
    multiEvent();
});