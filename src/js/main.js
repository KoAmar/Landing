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
}

$(document).ready(function () {
    multiEvent();
    // window.scrollTo(0,0);

    let menuToggler = $('.menu-toggle');
    menuToggler.on('click', function () {
        $(this).toggleClass('is-active');
    });
    // $('.navbar-nav').find('.nav-link').on('click',function(){
    //     menuToggler.toggleClass('is-active');
    // })

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