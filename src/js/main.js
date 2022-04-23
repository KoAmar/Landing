import 'bootstrap';
// import 'jquery';
import 'css/main.scss';
const $ = require('jquery')
// require.ensure('bootstrap')
// require.ensure('jquery')
$(document).ready(()=>{
    var navbarHeight = $('.navbar').height;
    $('.banner').height(navbarHeight);
    
})