/**
 * Created by Vitalii on 11/04/2016.
 */
/*$.fn.scrollTo = function( target, options, callback ){
    if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
    var settings = $.extend({
        scrollTarget  : target,
        offsetTop     : 50,
        duration      : 500,
        easing        : 'swing'
    }, options);
    return this.each(function(){
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
};*/
$.fn.onScroll = function onScroll(event,cssClass){
    var scrollPos = $(document).scrollTop();
    $('.main-menu-nav a:not(.no-event)').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top-100 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.main-menu ul li a:not(.no-event)').removeClass(cssClass);
            //debugger;
            currLink.addClass(cssClass);
        }
        else{
            currLink.removeClass(cssClass);
        }
    });
};

$(document).scroll(function () {
    $().onScroll(this, 'active');
});

//smoothscroll
$('.main-menu a[href^="#"]').on('click', function (e) {
    e.preventDefault();
//            $(document).off("scroll");

    $('.main-menu a[href^="#"]').each(function () {
        $(this).removeClass('active');
    });
    $(this).addClass('active');

    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top + 2
    }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", $().onScroll(this, 'active'));
    });
});
/*Main-Menu change*/
$(window).scroll(function () {

    if ($(this).scrollTop() > $(window).height()-100) {
//                $('.main-section h1').animate({fontSize: "0"}, 0, function () {});
        $('.navbar').removeClass('navbar-transparent').addClass('main-menu-scroll');

    }
    else {
//                $('.main-section h1').animate({fontSize: "3.75em"}, 0, function () {});
        $('.navbar').addClass('navbar-transparent').removeClass('main-menu-scroll');
    }
});


$('.btn-main-photo-slide').bind('click',function (event) {
    // event.stopPropagation();
    $('.main-photo').toggleClass('image-file2');
});
$('.btn-navbar-mobile').click(function (e) {
    if(e.target.id === 'languageBtn') return false;

    $('.navbar').toggleClass('hide');
    $('.btn-navbar-mobile i').each(function (i, item) {
        $(item).toggleClass('hide-btn');
    });

});

/*Rippling all buttons*/
var RippleButton = function () {
};
RippleButton.prototype.init = function () {
    this.createRipple();
}
RippleButton.prototype.createRipple = function () {
    //var _this = this;
    this.container = document.querySelectorAll('.btn');
    function create() {
        var rippleElement = document.createElement('div');
        var rippleCircle = document.createElement('div');
        rippleElement.classList.add('js-ripple');
        rippleElement.classList.add('c-ripple');
        rippleCircle.classList.add('c-ripple__circle');
        rippleElement.appendChild(rippleCircle);
        rippleElement.addEventListener('click',function (e) {
            var offsetTop =rippleElement.parentElement.offsetTop;//getBoundingClientRect().top;//
            var offsetLeft =rippleElement.parentElement.offsetLeft;
            var circle =rippleElement.firstElementChild;
            var x = e.pageX - offsetLeft;
            var y = e.pageY - offsetTop;
            circle.style.top =y+'px';
            circle.style.left =x+'px';
            circle.classList.add('is-active');
        });
        rippleElement.addEventListener('animationend',function () {
            rippleElement.firstElementChild.classList.remove('is-active');
        });
        return rippleElement;
    }
    Array.prototype.forEach.call(this.container,function (item) {
        item.appendChild(create());
    });

};


    /*$('.btn').each(function (i, index) {
        var re = $('<div/>').addClass('js-ripple').addClass('c-ripple');
        var rc = $('<div/>').addClass('c-ripple__circle');
        re.append(rc);
        $(index).append(re);
    });
    var $ripple = $('.js-ripple');
    $ripple.on('click.ui.ripple',function (e) {
        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find('.c-ripple__circle');

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass('is-active');
        // $this.addClass('rippleEffect');

    });

    $ripple.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function (e) {
        $(this).find('.c-ripple__circle').removeClass('is-active');
}*/

$('.input-group').on('click',function (e) {
    $(this).addClass('is-focused');
}).find('.form-control').on('blur',function (e) {
    var a= $('.is-focused').find('.form-control');
    if($(a)[0]!=undefined && $(a)[0].value.length>0){
        $('.is-focused').removeClass('is-empty');
    }
    else{
        $('.is-focused').hasClass('is-empty')?true:$('.is-focused').addClass('is-empty');
    }
    $('.is-focused').removeClass('is-focused');
});