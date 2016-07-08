/**
 * Created by Vitalii on 11/04/2016.
 */

$.fn.onScroll = function onScroll(event, cssClass) {
    var scrollPos = $(document).scrollTop();
    $('.main-menu-nav a:not(.no-event)').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - 100 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.main-menu ul li a:not(.no-event)').removeClass(cssClass);
            //debugger;
            currLink.addClass(cssClass);
        }
        else {
            currLink.removeClass(cssClass);
        }
    });
};

/*$(document).scroll(function () {
 $().onScroll(this, 'active');
 });*/

//smoothscroll
$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $('a[href^="#"]').each(function () {
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

    if ($(this).scrollTop() > $(window).height() - 100) {
        $('.navbar').removeClass('navbar-transparent').addClass('main-menu-scroll');

    }
    else {
        $('.navbar').addClass('navbar-transparent').removeClass('main-menu-scroll');
    }
});

/*Mobile menu*/
$('.btn-navbar-mobile').click(function (e) {
    if (e.target.id === 'languageBtn') return false;

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
        rippleElement.addEventListener('click', function (e) {
            var offsetTop = rippleElement.parentElement.offsetTop;//getBoundingClientRect().top;//
            var offsetLeft = rippleElement.parentElement.offsetLeft;
            var circle = rippleElement.firstElementChild;
            var x = e.pageX - offsetLeft;
            var y = e.pageY - offsetTop;
            circle.style.top = y + 'px';
            circle.style.left = x + 'px';
            circle.classList.add('is-active');
        });
        rippleElement.addEventListener('animationend', function () {
            rippleElement.firstElementChild.classList.remove('is-active');
        });
        return rippleElement;
    }

    Array.prototype.forEach.call(this.container, function (item) {
        item.appendChild(create());
    });

};

/*Input controls animate*/
$('.input-group').on('click', function (e) {
    $(this).addClass('is-focused');
}).find('.form-control').on('blur', function (e) {
    var a = $('.is-focused').find('.form-control');
    if ($(a)[0] != undefined && $(a)[0].value.length > 0) {
        $('.is-focused').removeClass('is-empty');
    }
    else {
        $('.is-focused').hasClass('is-empty') ? true : $('.is-focused').addClass('is-empty');
    }
    $('.is-focused').removeClass('is-focused');
});

/*Google map*/
// footer map
// init google map
function initialize() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        scrollwheel: false,
        center: {lat: 52.231987, lng: 21.014571}
    });
    // marker
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: 52.231987, lng: 21.014571},
        title: 'Warsaw'
    });

}
;
google.maps.event.addDomListener(window, 'load', initialize);

// footer map open
/*$(document).on("click", ".open-map", function () {
 $(this).addClass("_open-map");
 return false;
 });
 $(document).on("click", "#map", function () {
 return false;
 });
 $(document).on("click", "body", function () {
 $('.open-map').removeClass("_open-map");
 });*/
// footer map end

/*Photo grey background*/
$('.main-bg .container').click(function (e) {
    if (e.target != this) return false;

    $('.main-section').toggleClass('u-grey');
});

$.getJSON("/files/resume.json", function (data) {
    console.log("success");
    $('.timeline').timelineCV({
        //user configuration
        containerDetail: '.timeline-detail-block',
        containerSkills: '.skills-block',
        data: data,
        typeOfTimeline: "default",
        typeOfView: "horizontal",
        created: function (e, el) {
            /*var rippleButton = new RippleButton();
             rippleButton.init();*/
        }
    })

}).fail(function () {
    alert("I'm sorry something went bad way! \nPlease restart page! ");

}).always(function () {
    if ($('.timeline').height() < $(window).height()) {
        $('.timeline').css('height', $(window).height() - 100);
    }

});

var MyMailer = function MyMailer(data, url) {
    this.data = data;
    this.url = url;

};
/*MyMailer.prototype.createMail = function () {
    return {
        data: this.data,
        url: this.url
    }
};*/
MyMailer.prototype.sendMail = function () {

    $.ajax({
        type: "POST",
        url: this.url,
        data: this.data,
        success: function (msg) {
            console.log("Прибыли данные: " + msg);
            alert("Yor message was send!\nThank you");
        },
        fail:function (e) {
            alert("Error(");
        }
    });
};

MyMailer.prototype.init = function () {
    this.sendMail();
};


$('#sendMessage').on('click',function () {
    var form = this.closest('form');
    var mail = new MyMailer($(form).serialize(),$(form).attr('action'));
    mail.init();
});
