/**
 * Created by Vitalii on 11/04/2016.
 */
$.fn.scrollTo = function( target, options, callback ){
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
};
$.fn.onScroll = function onScroll(event,cssClass){
    var scrollPos = $(document).scrollTop();
    $('.main-menu a:not(.no-event)').each(function () {
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