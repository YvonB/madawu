/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;
    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        };
        return this;
    };
}


var BV = null,
    curentlyShowing = 'image';
    // isTouch = Modernizr.touch;

// as the page loads, call these scripts
jQuery(document).ready(function($) {

    /*
    Responsive jQuery is a tricky thing.
    There's a bunch of different ways to handle
    it, so be sure to research and find the one
    that works for you best.
    */

    // /* getting viewport width */
    // var responsive_viewport = $(window).width();

    // /* if is below 481px */
    // if (responsive_viewport < 481) {

    // } /* end smallest screen */

    // /* if is larger than 481px */
    // if (responsive_viewport > 481) {

    // } /* end larger than 481px */

    //  if is above or equal to 768px
    // if (responsive_viewport >= 768) {

    //     /* load gravatars */
    //     $('.comment img[data-gravatar]').each(function(){
    //         $(this).attr('src',$(this).attr('data-gravatar'));
    //     });

    // }

    // /* off the bat large screen actions */
    // if (responsive_viewport > 1030) {

    // }


// .debounce(
//     'jsp-scroll-y',
//     function(event, scrollPositionY, isAtTop, isAtBottom) {
//       if (isAtBottom) {
//           var callback = $(event.target).attr('data-bottom');
//           if ($.isFunction(callback_funcs[callback])) {
//               callback_funcs[callback](event);
//           }
//       }
//     },
//     400
// );



var contentPanel = $('#content');
var contentPanelInner = $('#inner-content');
var contentPanelHeight = contentPanel.height();
var contentPanelWidth = contentPanel.width();
var contentMoarPanel = $('#content-moar');
var contentMoarPanelInner = $('#inner-moar');

var mainMenuContainer = $('#main-nav');
var mainMenuShadow = $('#main-nav-shadow');
var mainMenuToggle = $('#navigation-toggle');
var mainMenuSocialBttn  = mainMenuContainer.find( 'button.content-share' );
var mainMenuBttn  = contentPanel.find( 'button.content-close' );
var mainMenu = $('.top-nav');
var currentLink = '';

var mediaMenuContainer = $('#video-nav'),
    mediaMenuBttn  = mediaMenuContainer.find( 'button' ),
    mediaMenu = mediaMenuContainer.find('.video-nav-inner'),
    mediaMenuSelect = $('#media-menu-select'),
    mediaMenuAccommodation = mediaMenuContainer.find('.accommodation-nav-inner'),
    mediaOverlay =  $( 'div.media-overlay' );


var infoPanelContent = $('#info-panel .content'),
    infoTriggerBttn = $( '#trigger-overlay' ),
    infoBttnContainer = $('#info-panel-button'),
    infoOverlay = $( '#info-panel' ),
    infoCloseBttn = infoOverlay.find( 'button.info-close' );

var quality = 'normal';
var slides_updated = true;
var svg_icon_list = {};

var backgroundClippingTransitioning=false;

//for ajax gallery loading
var callback_funcs = {};
callback_funcs['space_gallery_load_scroll'] = space_gallery_load_scroll;

/*-------------------------------------
       INITIAL SETUP OF THINGS
 ---------------------------------------*/
// setTimeout(function(){ // make it async...
//   var bwd = $.fn.checkBandwidth({
//       site_url: the_ajax.ajaxurl,
//       file_size: 250000,
//       timeout: 6000,
//       // auto_run: false,
//       callback: function() {
//          // console.log ( bwd.getSpeed() );
//           speed_data = bwd.getSpeed();
//           // console.log(speed_data);
//           if (speed_data.timeout_happened) {
//             quality = 'image';
//           } else {
//             if (speed_data.mbps > 5) {
//               quality = 'high';
//             } else if (speed_data.mbps > 0.6) {
//               quality = 'normal';
//             } else {
//               quality = 'image';
//             }
//           }
//           // $('#credit').append(' '+quality);
//           $('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');
//           $('#supersized-loader').hide();
//           load_background();
//       }
//   });
//   // bwd.check();
// }, 200);

var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshInterface, 200);
});

/**
 * init_interface
 *
 * @access public
 *
 * @return mixed Value.
 */
function init_interface() {
    center_nav_vertically();
    $('#sound').bind('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (BV !== null) {
            if ($(this).hasClass('mute')) {
                $(this).parent().removeClass('off');
                $(this).removeClass('mute').text("Sound off");
                BV.getPlayer().volume(1);
            } else {
                $(this).parent().addClass('off');
                $(this).addClass('mute').text('Sound on');
                BV.getPlayer().volume(0);
            }
        }

    });

    // if (isTouch) {
    //     $('body').addClass('isTouch');
    // }
    $('.content-panel').jScrollPane({
          maintainPosition: false,
          showArrows: true,
          verticalDragMinHeight: 9,
          verticalDragMaxHeight: 9,
          // autoReinitialise: true
    });

    // var letters = $(".letters");
    // var lettersCount = letters.length;
    // letters.hide().each(function(index) {
    //     $(this).delay(400*index).fadeIn(1500);
    // });
    setTimeout(function() {
        showFlyin();
        mediaMenuBttn.animate({'right':0});
        if (contentPanel.hasClass('open_sesame') && !$('body').hasClass('home')) {
            openMainMenu(function() {
                contentPanel.removeClass('open_sesame');
                init_content();
                openContentPanel();

            });
        } else {
            mainMenuContainer.animate({'left':0});
        }
    }, 2000);
    initBackgroundCanvas();
}
init_interface();

    /**
     * refreshInterface
     *
     * @access public
     *
     * @return mixed Value.
     */
function refreshInterface() {
    // console.log('refreshInterface');
     if (contentMoarPanel.hasClass('open')) {
        extendContentPanel(false);
     }

    contentPanel.data('jsp').reinitialise();
    contentMoarPanel.data('jsp').reinitialise();

    refresh_gallery();
    // refreshMediaMenu();

    set_google_map_height();

    center_nav_vertically();
}

    /**
     * init_content
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_content() {
    // $('.datepicker').datepicker({dateFormat:'yy-mm-dd'});
    init_check_availability_form();
    init_rate_calculator_form();
    init_gallery();
    init_download_media();
    init_skyevents();
    init_svg_icons();
    init_enlarge_images(contentPanel);
    init_space_gallery();

    $('.tooltip').tooltipster({maxWidth:'400', position:'right', animation:'grow',contentAsHTML:true,theme:'tooltipster-punk'});

    $('.ajax-page').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var the_url = $(this).attr('href');

        openContentPanel();
        if (currentLink !== the_url) {
            unextendContentPanel(false);
            contentPanelInner.fadeOut(function() {
                getPageContentAjax('#inner-content', the_url, function() {
                    init_content();
                    contentPanelInner.fadeIn();
                });
            });
            currentLink = the_url;
        }

    });

    $('#ui-datepicker-div').click(function(e) {
        e.stopPropagation();
    });
}

/*-------------------------------------
                MAIN MENU
 ---------------------------------------*/
$('html').click(function() {
    //Hide the menus if visible
    closeContentPanel();
    closeShareOverlay();
    closeMainMenu();
});
contentPanel.click(function(e){
    e.stopPropagation();
});
contentMoarPanel.click(function(e){
    e.stopPropagation();
});
mainMenuContainer.click(function(e){
    e.stopPropagation();
});

mainMenuContainer.hover(function() {
    $('#logo, #sound-container, .content-share').addClass('dark');
    mainMenuContainer.addClass('solid');
}, function() {
    if (!mainMenuContainer.hasClass('open')) {
        $('#logo, #sound-container, .content-share').removeClass('dark');
        mainMenuContainer.removeClass('solid');
    }
});
mainMenuToggle.click(function(e) {
    e.stopPropagation();
    if (mainMenuToggle.hasClass('subnav_show')) { // go back to parent list

        var subnav_id = mainMenuToggle.data('subnav_id'),
                list_element = $('#'+subnav_id);
        $('.sub-menu a', list_element) // hide sub nav
            .fadeOut('1000')
            .promise()
            .done(function() {
                // show the higher level nav
                $('a', list_element).first().fadeIn();
                list_element.siblings().each( function() {
                    $('a', this).fadeIn();
                })

                if (!list_element.parent().hasClass('sub-menu')) {
                    mainMenuToggle.removeClass('subnav_show').data('subnav_id', '');
                } else {
                    mainMenuToggle.addClass('subnav_show').data('subnav_id', list_element.parent().parent().attr('id'));
                }
                $('.sub-menu', list_element).hide();
                center_nav_vertically();
        });
        mainMenuToggle.addClass('subnav_show').data('subnav_id', list_element.attr('id'));


    } else if (mainMenuContainer.hasClass('open')) {
        closeContentPanel();
        closeMainMenu();
    } else {
        openMainMenu();
    }
});

function openMainMenu(callback) {
    callback = callback || function(){};

    if (infoOverlay.hasClass( 'open' )) {
        toggleInfoOverlay();
    }
    hideFlyin();

    $('#sound-container, .content-share').fadeOut();
    $('#logo, #sound-container, .content-share').addClass('dark');
    $('#credit').show().animate({'bottom':'40px'}, 1000);
    mainMenuContainer.addClass('solid');

    mainMenuToggle.fadeOut(function() {
        mainMenuToggle.html('<i class="fas fa-arrow-left"></i>').fadeIn();
    });

    // mainMenuToggle.fadeOut();
    mainMenuContainer.addClass('open').animate({'left':0, 'width':'280px'}, function() {
        $('#logo .reserve').fadeIn();
        mainMenu.fadeIn();
        center_nav_vertically();
        if ($.isFunction(callback)) {
            callback();
        }
    });

}

function closeMainMenu(callback) {
    if (mainMenuToggle.text() != 'Qui<br> somme<br> nous') {
        mainMenuToggle.fadeOut(function() {
            mainMenuToggle.html('Qui<br> somme<br> nous').fadeIn();
        });
    }
    $('#logo, #sound-container, .content-share').removeClass('dark');
    $('#sound-container, .content-share').fadeIn();
    $('#credit').animate({'bottom':'-100px'}, 1000).hide();
    mainMenuContainer.removeClass('solid');
    $('#logo .reserve').hide();
    mainMenu.fadeOut();
    mainMenuContainer.removeClass('open').animate({'width':'70px'});
    if (!mediaMenuBttn.hasClass('close')) {
        showFlyin();
    }
    // mainMenuToggle.fadeIn();
}

 $('li a', mainMenu).click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    var anchor_element = $(this),
        the_url = anchor_element.attr('href'),
        list_element = anchor_element.parent();
    list_element.addClass('current-menu-item');
    list_element.siblings().removeClass('current-menu-item current_page_item current-page-ancestor current-menu-ancestor');

    if ( list_element.hasClass('menu-item-has-children') ) { // has a sub nav
        $('li a', mainMenu)
            .fadeOut('1000')
            .promise().done(function() {
                var sub_list = $('.sub-menu', list_element).first();
                sub_list.fadeIn().find('li a').fadeIn()
                    .promise().done(function() {
                    });
                center_nav_vertically();
        });
        mainMenuToggle.addClass('subnav_show').data('subnav_id', list_element.attr('id'));
    } else {
        openContentPanel();
        if (currentLink !== the_url) {
            unextendContentPanel(false);
            contentPanelInner.fadeOut(function() {
                getPageContentAjax('#inner-content', the_url, function() {
                    init_content();
                    contentPanelInner.fadeIn();
                });
            });
            currentLink = the_url;
        }
    }
});

mainMenuBttn.click( function() {
    $this = $(this);
    if ($this.hasClass('close')) {
        closeContentPanel();
    } else {
        openContentPanel();
    }
});
mainMenuSocialBttn.click( function(e) {
    e.stopPropagation();
    if ($('#share-overlay').hasClass('open')) {
        closeShareOverlay();
    } else {
        openShareOverlay();
    }
});

    /**
     * openShareOverlay
     *
     * @access public
     *
     * @return mixed Value.
     */
function openShareOverlay() {
    closeContentPanel();
    if ( $('#info-panel').hasClass('open') ) {
            $( '#trigger-overlay' ).trigger('click');
    }
    if (mediaMenuBttn.hasClass('close')) {
        mediaMenuBttn.trigger('click');
    }
    $('#share-overlay').addClass('open').fadeIn();
}
function closeShareOverlay() {
    $('#share-overlay').removeClass('open').fadeOut();
}

    /**
     * init_gallery
     *
     * @access public
     *
     * @return mixed Value.
     */
var imgloading = false;
function init_gallery() {
    $(".gallery-item").click(function() {
        imgloading = true;
        extendContentPanel();

        $(".gallery-item").removeClass('selected');
        $(this).addClass('selected');

        if ( $(this).next().length>0 ) {
            $('.gallery-next').animate({'right':'30px'});
        } else {
            $('.gallery-next').animate({'right':'-60px'});
        }
        if ( $(this).prev().length>0 ) {
            $('.gallery-prev').animate({'left':'30px'});
        } else {
            $('.gallery-prev').animate({'left':'-60px'});
        }

        /* load image */
        var imgPath = $(this).attr('data-full-src');
        // var imgWidth = $(this).attr('data-full-width');
        // var imgHeight =  $(this).attr('data-full-height');

        // var ratio = imgWidth/imgHeight;

        var maxHeight = $( window ).height()  - 182;
        var maxWidth = $( window ).width() - 282;
        var new_height = 0;
        var new_width = 0;

        // console.log(maxHeight + ' ' + maxWidth);

        contentMoarPanelInner.fadeOut(function() {
            $('<img src="'+ imgPath +'">').load(function() {
                $(this).css({ 'max-height':maxHeight, 'max-width':maxWidth });
                // todo center gallery
                if (this.height > maxHeight) {
                    new_height = maxHeight;
                    ratio  = this.height / maxHeight;
                    new_width = this.width / ratio;
                    if (new_width > maxWidth) {
                        ratio = this.width / maxWidth;
                        new_width = maxWidth;
                        new_height = this.height / ratio;
                    }
                } else if (new_width > maxWidth) {
                    ratio = this.width / maxWidth;
                    new_width = maxWidth;
                    new_height = this.height / ratio;
                } else {
                    new_height = this.height;
                    new_width = this.width;
                }
                var marginTop = (($( window ).height() - new_height) / 2)-100;
                if (marginTop > 0) {
                    $(this).css({'margin-top':marginTop + 'px'});
                }

                contentMoarPanelInner.html($(this)).slideDown();

                // $(this).appendTo( contentMoarPanelInner );
                imgloading = false;
            });
        });
    });
}
$('.gallery-close').click( function(e) {
    e.stopPropagation();
    unextendContentPanel(false);
});
$('.gallery-next').click( function(e) {
    e.stopPropagation();
    $('.gallery-item.selected').next().trigger('click');
});
$('.gallery-prev').click( function(e) {
    e.stopPropagation();
    $('.gallery-item.selected').prev().trigger('click');
});

    /**
     * refresh_gallery
     *
     * @access public
     *
     * @return mixed Value.
     */
function refresh_gallery() {
    var maxHeight = $( window ).height() - 160 - contentPanelHeight - 80;
    var maxWidth = contentPanel.width() - 80 -140;
    contentMoarPanelInner.find('img').css({ 'max-height':maxHeight, 'max-width':maxWidth });
}

    /**
     * extendContentPanel
     *
     * @param mixed \do_refresh Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function extendContentPanel(do_refresh) {
    do_refresh = typeof do_refresh !== 'undefined' ? do_refresh : true;
    // console.log(do_refresh);
    // if (!contentMoarPanel.hasClass('open')) {
        var newPosition = $( window ).height();
        // contentPanelHeight = 200;
        // contentPanel.addClass('open zoomout').stop().animate({'bottom':newPosition- contentPanelHeight}, 400);
        // mainMenuContainer.stop().animate({'bottom':newPosition}, 400);
        // mainMenuBttn.stop().animate({'top':275});
        contentMoarPanel.addClass('open').stop().animate({'height':newPosition}, 400, function() {
            $('.gallery-next').show().animate({'right':'30px'}, 800);
            $('.gallery-prev').show().animate({'left':'30px'},800);
            $('.gallery-close').show().animate({'top':'35px'});
            // $('.gallery-next, .gallery-prev').fadeIn().animate({'bottom':(newPosition-35)/2}, 400);
           // if (!contentMoarPanel.hasClass('open')) {
                if (do_refresh) refreshInterface();
            // }
        });
    // }
}// end extendContentPanel

    /**
     * unextendContentPanel
     *
     * @param mixed \close_content Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function unextendContentPanel(close_content) {
    close_content = typeof close_content !== 'undefined' ? close_content : true;
    if (contentMoarPanel.hasClass('open')) {
        $('.gallery-close').hide().css({'top': '-60px'});
        $('.gallery-next').animate({'right':'-60px'});
        $('.gallery-prev').animate({'left':'-60px'}, function() {
            contentMoarPanel.removeClass('open').stop().animate({'height':0}, 600);
            contentMoarPanelInner.html('');
            refreshInterface();

        });
    }
}// end unextendContentPanel

    /**
     * openContentPanel
     *
     * @access public
     *
     * @return mixed Value.
     */
function openContentPanel() {
    if (!contentPanel.hasClass('open')) {

        if ( $('#info-panel').hasClass('open') ) {
            $( '#trigger-overlay' ).trigger('click');
        }

        if (mediaMenuBttn.hasClass('close')) {
            mediaMenuBttn.trigger('click');
        }
        closeShareOverlay();

        mainMenuBttn.addClass('close').show();
        contentPanel.addClass('open').stop().animate({'left': '280px'}, 1000, 'easeInOutQuint', function() {
            set_google_map_height();
        });
    }

}// end openContentPanel

    /**
     * closeContentPanel
     *
     * @access public
     *
     * @return mixed Value.
     */
function closeContentPanel() {
    if (contentMoarPanel.hasClass('open')) {
        unextendContentPanel();
    }else if (contentPanel.hasClass('open')) {
        mainMenuBttn.removeClass('close').show();
        contentPanel.removeClass('open').stop().animate({'left': '-'+contentPanelWidth+'px'}, 400);
    }
    set_google_map_height();
}// end closeContentPanel

    /**
     * getPageContentAjax
     *
     * @param mixed \content_container Description.
     * @param mixed \the_url           Description.
     * @param mixed \callback          Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function getPageContentAjax(content_container, the_url, callback) {
    console.log('getPageContentAjax');
    callback = callback || function(){};
    $.post(
        the_ajax.ajaxurl,
        {
            action : 'w_load_page',
            postCommentNonce : the_ajax.postCommentNonce,
            page_url : the_url
        },
        function( response ) {
                _pudding_center(content_container, the_url, callback, response);
        }
    );
} // end getPageContentAjax

    /**
     * _pudding_center
     *
     * @param mixed \content_container Description.
     * @param mixed \the_url           Description.
     * @param mixed \callback          Description.
     * @param mixed \response          Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function _pudding_center(content_container, the_url, callback, response) {
        var html = response.content || 'Error loading data.';

        console.log(response);

        $(content_container).html( html );
        document.title = response.page_title;
        window.history.pushState({"html":response.html,"page_title":response.page_title},"", the_url);

        if ($.isFunction(callback)) {
            callback();
        }

        bottomImageContainer.html('').removeClass('show');

        // wtf was i thinking below??
        // bottomImageContainer.removeClass('show');
        // $('img', bottomImageContainer).each(function(k) {
        //     $(this).delay(400*k).animate({'margin-bottom':'-300px', 'opacity':0}, 1000);
        // }).promise().done(function() {
        //     bottomImageContainer.html('');
        // });

        if (response.flyin && response.flyin !== '') {
            console.log(response.flyin);
            if (response.flyin.indexOf('http') == -1) {
                flyin.find('.cnt').html('<h1>'+response.flyin+'</h1>');
            } else {
                $('<img src="'+ response.flyin +'">').load(function() {
                    flyin.find('.cnt').html($(this));
                });
            }
        } else if (isEmpty(flyin)){
            flyin.find('.cnt').html('');
        }
        if (response.flyin_secondary && response.flyin_secondary !== '') {
            if (response.flyin_secondary.indexOf('http') == -1) {
                flyinSecondary.html('<h3>'+response.flyin_secondary+'</h3>');
            } else {
                $('<img src="'+ response.flyin_secondary +'">').load(function() {
                    flyinSecondary.removeClass('show').addClass('hide').html($(this)).addClass('show').removeClass('hide');
                });
            }
        } else if (isEmpty(flyinSecondary)){
            flyinSecondary.removeClass('show').addClass('hide').html('');
        }

        backgroundVideo = response.video;

        if (response.image_ids && response.image_ids.length >0 && !slideImageIds.equals(response.image_ids)) {
            slideImageIds = response.image_ids;
            slides = response.images;

            slides_updated = true;
        } else {
            slides_updated = false;
        }

        if (response.google_map && response.google_map.active) {
            if ( !googleMap.page_id || googleMap.page_id !== response.google_map.page_id ) {
                // we just need to show the current map :D
                // googleMap = response.google_map; // can't just do that cause we store other thingso n that var.
                googleMap.active = response.google_map.active;
                googleMap.page_id = response.google_map.page_id;
                googleMap.lat = response.google_map.lat;
                googleMap.lng = response.google_map.lng;
                googleMap.zoom = response.google_map.zoom;
                googleMap.info_content = response.google_map.info_content;
                googleMap.marker_image = response.google_map.marker_image;
                googleMap.newMap = true;
            } else {
                googleMap.active = true;
            }
        } else {
            if (curentlyShowing == 'google_map' && response.image_ids.length == 0 && backgroundVideo.length == 0) {
                // don't hide our map.
            } else {
                googleMap.active = "";
                $('#map-canvas').fadeOut();
                if (response.image_ids && response.image_ids.length) {
                    slides_updated = true;
                }
            }
        }

        load_background();

        refreshInterface();
}

    /**
     * load_background
     *
     * Image / Video or Google Map
     *
     * @access public
     *
     * @return mixed Value.
     */
function load_background() {
    if(curentlyShowing == 'google_map' || !backgroundVideo || !backgroundVideo.length) {
        // $('#sound-container').hide();
    }
    if (googleMap.active == '1') {
        // $('#sound-container').hide();
        //cleanup for images and video
        if (curentlyShowing == 'video') {
            BV.getPlayer().pause();
            $('#big-video-wrap').fadeOut('slow', function() {
                load_google_map_script();
            });
        } else if (curentlyShowing == 'image') {
            $('#supersized-loader').hide();
            $("#supersized").fadeOut('fast', function() {
                load_google_map_script();
            });
        } else {
            load_google_map_script();
        }

    } else {
        $('#map-canvas').fadeOut();

        var show_images = false;
        var show_video = false;

        var BV_settings = {
            forceAutoplay: true,
            useFlashForFirefox: false
        };
        var vid_options = {
            doLoop: true
        };

        BV = BV || new $.BigVideo(BV_settings);

        var i, video_data=false;
        for (i in backgroundVideo) {
            if (backgroundVideo.hasOwnProperty(i)) {
                video_data=true;
                break;
            }
        }

        if (video_data && Modernizr.video && quality !=='image') {
            if (Modernizr.video.h264 && (backgroundVideo.hasOwnProperty('mp4') || backgroundVideo.hasOwnProperty('hi_mp4'))) {
                $('#big-video-wrap').fadeOut('fast');
                BV.init();
                if ( (quality === 'high' || !backgroundVideo.hasOwnProperty('mp4')) && backgroundVideo.hasOwnProperty('hi_mp4')) {
                    BV.show(backgroundVideo.hi_mp4, vid_options);
                } else {
                    BV.show(backgroundVideo.mp4, vid_options);
                }
                show_video = true;
                $(window).trigger('resize');
            } else if (Modernizr.video.ogg && (backgroundVideo.hasOwnProperty('ogv') || backgroundVideo.hasOwnProperty('hi_ogv'))) {
                $('#big-video-wrap').fadeOut('fast');
                BV.init();
                if ( (quality === 'high' || !backgroundVideo.hasOwnProperty('ogv')) && backgroundVideo.hasOwnProperty('hi_ogv')) {
                    BV.show(backgroundVideo.hi_ogv, vid_options);
                } else {
                    BV.show(backgroundVideo.ogv, vid_options);
                }
                show_video = true;
                $(window).trigger('resize');
            } else if (Modernizr.video.webm && (backgroundVideo.hasOwnProperty('webm') || backgroundVideo.hasOwnProperty('hi_webm'))) {
                $('#big-video-wrap').fadeOut('fast');
                BV.init();
                if ( (quality === 'high' || !backgroundVideo.hasOwnProperty('webm')) && backgroundVideo.hasOwnProperty('hi_webm')) {
                    BV.show(backgroundVideo.hi_webm, vid_options);
                } else {
                    BV.show(backgroundVideo.webm, vid_options);
                }

                show_video = true;
                $(window).trigger('resize');
            } else {
                show_images = true;
            }
        } else {
            show_images = true;
        }

        if (slides_updated === false) {
            show_images = false;
        }

        if (show_images) {
            // $('#sound-container').hide();
            $('#supersized-loader').show();
            if (curentlyShowing == 'video') {
                BV.getPlayer().pause();
                $('#play-video-button').fadeOut();
                $('#big-video-wrap').fadeOut('slow', function() {
                    start_supersized(slides);
                });
            } else {
                start_supersized(slides);
            }
        } else if (show_video) {
            if (backgroundClippingVideo !== undefined) {
                BV.getPlayer().currentTime(backgroundClippingVideo.currentTime);
            }

            curentlyShowing = 'video';
            BV.getPlayer().on("error", function() {
                start_supersized(slides);
            });
            // $('#sound-container').slideDown();

            if ($('#sound').hasClass('mute')) {
                BV.getPlayer().volume(0);
            } else {
                BV.getPlayer().volume(1);
            }

            $('#supersized-loader').hide();
            $("#supersized").fadeOut();
            $('#big-video-wrap').fadeIn();

            // if (isTouch) { //touch device will only play on user click.
            //     if (!flyinbusy) {
            //         $('#play-video-button-container').addClass('open').fadeIn();
            //     } else {
            //         $('#play-video-button-container').addClass('open');
            //     }
            //     $('#play-video-button').click(function() {
            //         BV.getPlayer().play();
            //         if (backgroundClippingVideo !== undefined) {
            //             BV.getPlayer().currentTime(backgroundClippingVideo.currentTime);
            //         }
            //         $('#play-video-button-container').removeClass('open').fadeOut();
            //         BV.getPlayer().on('pause', function() {
            //             if (!flyinbusy) {
            //                 $('#play-video-button-container').addClass('open').fadeIn();
            //             } else {
            //                 $('#play-video-button-container').addClass('open');
            //             }
            //         });
            //         BV.getPlayer().on('play', function() {
            //             $('#play-video-button-container').removeClass('open').fadeOut();
            //         });
            //     });
            // }
        }

        slides_updated = false;
    }
}

    /**
     * start_supersized
     *
     * Image slider
     *
     * @param mixed \slides Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function start_supersized(slides) {
    if (!slides.length) {
        // need to initialize it for futre...
        slides = [{ image: site_url+'/wp-content/themes/Leobo2014/library/images/background_placeholder.jpg', thumb: "", title: '', url: "" }];
    }
    // $('#sound-container').hide();
    curentlyShowing = 'image';
    $("#supersized").fadeOut('fast', function() {
        $('#supersized-loader').empty().remove();
        $('#supersized').empty().remove();
        $('#hzDownscaled').empty().remove();
        if (slides.length >0) {
            $('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');
            $.supersized({
                // Functionality
                slide_interval:   3000,       // Length between transitions
                transition:   1,          // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
                transition_speed:   700,        // Speed of transition
                fit_portrait: 0,
                fit_landscape: 0,
                fit_always: 0,
                // Components
                slide_links:   'blank',    // Individual links for each slide (Options: false, 'num', 'name', 'blank')
                slides: slides
            });
        }
    });
}

/*-------------------------------------
               MEDIA MENU
 ---------------------------------------*/
mediaMenuBttn.click(function() {
    $this = $(this);

    closeContentPanel();
    if ( $('#info-panel').hasClass('open') ) {
            $( '#trigger-overlay' ).trigger('click');
    }

    if ($this.hasClass('close')) {
        mediaOverlay.fadeOut();
        $this.removeClass('close');

        var delay_offset_increase = 0;
        var delay_offset = 100;
        mediaMenuSelect.children().each(function(index) {
            if($(this).is('ul')) {
                $(this).find('li').each(function(index2) {
                    $(this).delay(delay_offset).animate({opacity:0, 'margin-right':'50px'});
                    delay_offset = delay_offset + delay_offset_increase;
                });
            } else {
                $(this).delay(delay_offset).animate({opacity:0, 'margin-right':'50px'});
            }
            delay_offset = delay_offset + delay_offset_increase;
        });
        mediaMenuSelect.hide();
        showFlyin();
    } else {
        hideFlyin();

        var delay_offset_increase = 50;
        var delay_offset = 100;
        mediaMenuSelect.show().children().each(function(index) {
            if($(this).is('ul')) {
                $(this).find('li').each(function(index2) {
                    $(this).delay(delay_offset).animate({opacity:1, 'margin-right':0});
                    delay_offset = delay_offset + delay_offset_increase;
                });
            } else {
                $(this).delay(delay_offset).animate({opacity:1, 'margin-right':0});
            }
            delay_offset = delay_offset + delay_offset_increase;
        });
        mediaOverlay.fadeIn();
        $this.addClass('close');
    }
});

// $('li a', mediaMenuSelect).hover(
//     function(e) {
//         if (!backgroundClippingTransitioning) {
//             var the_url = $(this).attr('href');
//             if (currentLink !== the_url) {
//                 var video_link = $(this).data('mp4'),
//                     image_link = $(this).data('slide_image');
//                 generate_squares();
//                 showBackgroundCanvas(video_link, image_link);
//             }
//         }
//     },
//     function(e) {
//          if (!backgroundClippingTransitioning) {
//             hideBackgroundCanvas();
//         }
// });
$('li a', mediaMenuSelect).click(function(e) {
    e.preventDefault();
    if (!backgroundClippingTransitioning) {
        var the_url = $(this).attr('href');
        var list_element = $(this).parent();
        list_element.addClass('current-menu-item');
        list_element.siblings().removeClass('current-menu-item current_page_item current-page-ancestor current-menu-ancestor');

        if (currentLink !== the_url) {
            // backgroundClippingTransitioning = true;
            // fullheight_squares();

            mediaMenuBttn.trigger('click');
            // $(mainCanvas).on('completed_full', function() {
                // reset_squares();
                    getPageContentAjax('#info-panel .content', the_url, function() {
                        setTimeout(function() {
                            backgroundClippingTransitioning = false;
                            // hideBackgroundCanvas();
                            showFlyin();

                            $(mainCanvas).off('completed_full');
                        },1000)
                    });
                    currentLink = the_url;
            // })
        }
    }
});


/*-------------------------------------
                    FLYIN
 ---------------------------------------*/
var flyin = $('#flyin');
var flyinSecondary = $('#flyin-secondary');
var flytimer = null;
var flyinbusy = false;
var bottomImageContainer = $('#bottom-images');
    /**
     * showFlyin
     *
     * @access public
     *
     * @return mixed Value.
     */
function showFlyin() {

    if (!backgroundClippingTransitioning) {

        clearTimeout(flytimer);

        if (!isEmpty(flyin)) {
            flyinbusy = true;
            $('#play-video-button-container').fadeOut();

            // flytimer = setTimeout(function() {
                var flyin_offset = 22;
                var wh = $(window).height();
                var newtop = (wh / 2) - (flyin.height()/2) + flyin_offset ;

                flyin.hide().css({'top':newtop}).show();
                flytimer = setTimeout(function() {
                    flyin.addClass('show').removeClass('hide');
                    var info_wait = 600;
                    if (!isEmpty(flyinSecondary)) {
                        info_wait = 1200;
                        setTimeout(function() {
                            newtop = newtop + 130;
                            flyinSecondary.css({'top':newtop});
                            flyinSecondary.addClass('show').removeClass('hide');
                        }, 600);
                    }

                    setTimeout(function() {
                        if (isEmpty(infoPanelContent)) {
                            hideInfoButton();
                        } else {
                            showInfoButton();
                        }
                    }, info_wait) ;

                    setTimeout(function() {
                        if (!isEmpty(bottomImageContainer)) {
                            bottomImageContainer.addClass('show');
                            $('h3,img', bottomImageContainer).each(function(k) {
                                $(this).delay(400*k).animate({'margin-bottom':'30px', 'opacity':1}, 1000);
                            });
                        }
                    }, 1300);

                }, 600);

            // }, 600);
        } else {
            if (isEmpty(infoPanelContent)) {
                hideInfoButton();
            } else {
                showInfoButton();
            }
        }
    }

}

    /**
     * hideFlyin
     *
     * @access public
     *
     * @return mixed Value.
     */
function hideFlyin() {
    hideInfoButton();
    flyin.fadeOut(function() {
        $(this).removeClass('show').addClass('hide').show();
    });
    flyinSecondary.fadeOut(function() {
        $(this).removeClass('show').addClass('hide').show();
    });

    bottomImageContainer.removeClass('show');
    $('h3,img', bottomImageContainer).each(function(k) {
        $(this).delay(400*k).animate({'margin-bottom':'-300px', 'opacity':0}, 1000);
    });
}

    /**
     * hideInfoButton
     *
     * @access public
     *
     * @return mixed Value.
     */
function hideInfoButton() {
    infoBttnContainer.removeClass('show');
}

    /**
     * showInfoButton
     *
     * @access public
     *
     * @return mixed Value.
     */
function showInfoButton() {
    infoBttnContainer.addClass('show');
}

/*-------------------------------------
                INFO PANEL
 ---------------------------------------*/

    /**
     * toggleInfoOverlay
     *
     * @access public
     *
     * @return mixed Value.
     */
function toggleInfoOverlay() {
    closeContentPanel();
    if( infoOverlay.hasClass( 'open' ) ) {
        infoCloseBttn.removeClass('show');
        setTimeout(function() {
            infoOverlay.removeClass('open').addClass('close');
        }, 400);
    }
    else {
        infoOverlay.addClass('open').removeClass('close');
        // we need to wait for css animation to finish.
        setTimeout(function() {
            infoCloseBttn.addClass('show');
        }, 600);
    }
}

infoTriggerBttn.bind("click", function(e) {
    toggleInfoOverlay(e);
} );
infoCloseBttn.bind("click", toggleInfoOverlay );
 /* end info panel overlay */


/*-------------------------------------
                SHORTCODES
 ---------------------------------------*/

    /**
     * isNumber
     *
     * @param mixed \n Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

    /**
     * init_check_availability_form
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_check_availability_form() {
    var s, e, num;
    $('#startdate, #enddate').datepicker({
        dateFormat:'yy-mm-dd',
        constrainInput: true,
        onSelect: function(dateText, dobj) {
            var num = 0;
            s = $('#startdate').val();
            e = $('#enddate').val();
            s = s.split('-');
            e = e.split('-');
            start_date = new Date(s[0], s[1], s[2]);
            end_date = new Date(e[0], e[1], e[2]);
            diff = end_date - start_date;
            days = diff/1000/3600/24;
            if (isNaN(days)) {
                    days='0';
            }
            $('#numberofnights').val(days);
        }
    });

    $('#numberofnights').change( function() {
        x = $('#numberofnights').val();
        if (isNumber(x) && x >0) {
            s = $('#startdate').val();
            s = s.split('-');
            start_date = new Date(s[0], s[1], s[2]);
            // days = parseInt(s[2],10)+parseInt(x,10);
            // end_date = new Date(s[0], s[1], days);
            end_date = new Date( start_date.getTime()+(x*1000*3600*24) );
            month = end_date.getMonth();
            if (month < 10) month = '0'+month;
            day = end_date.getDate();
            if (day < 10) day = '0'+day;
            $('#enddate').val(end_date.getFullYear()+'-'+month+'-'+day);
        } else {
            $('#numberofnights').val('0');
        }
    });

    $('.content-slides').slidesjs({
        width: 200,
        height: 100
      });

    // Ajax for submission 5/10/2014
    $('#check_availability_v2').validate({
          submitHandler: function(form) {
            $.post(
                    the_ajax.ajaxurl,
                    {
                        action : 'w_check_availability',
                        postCommentNonce : the_ajax.postCommentNonce,
                        check_availability : '1',
                        startdate : $('#startdate').val(),
                        enddate : $('#enddate').val(),
                    },
                    function( response ) {
                        if (response.content) {
                            $('#check_availability_v2').hide().siblings('p').hide();
                            $('#availability-results').html(response.content).show();
                            if (response.need_slider) {
                                $('.availability-slides', '#availability-results').slidesjs({
                                    width: 200,
                                    height: 87,
                                    start: response.starting_slide
                                  });
                                $('.availability-grid', '#availability-results').css({margin:'auto' });
                            } else {
                                $('.availability-slides', '#availability-results').show();
                                $('.availability-grid', '#availability-results').css({margin:'0' });
                            }
                            $('.show_availibility_form', '#availability-results').click(function() {
                                $('#availability-results').hide();
                                $('#check_availability_v2').show().siblings('p').show();
                            });
                        }
                    }
                );
      }
    });
}

    /**
     * init_rate_calculator_form
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_rate_calculator_form() {
    var s, e, num;
    $('#rate_startdate').datepicker({
        dateFormat:'dd-mm-yy',
        minDate:0,
        constrainInput: true,
        beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            var dateclass = 'PEW';
            if (typeof disabled_dates_rate[string] == 'undefined') {
                return [true, 'available-date'];
            } else if (disabled_dates_rate[string] == 1) {
                return [false, 'provisional-date'];
            } else if (disabled_dates_rate[string] == 2) {
                return [false, 'unavailable-date'];
            }
            return [true]
        },
        onSelect: function(dateText, inst) {
            var p = dateText.split('-');
            $('#rate_enddate').datepicker( "option", "minDate", new Date(p[2], p[1]-1, p[0]) );
        }
    });
    $('#rate_enddate').datepicker({
        dateFormat:'dd-mm-yy',
        minDate:0,
        constrainInput: true,
        beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            var dateclass = 'PEW';
            if (typeof disabled_dates_rate[string] == 'undefined') {
                return [true, 'available-date'];
            } else if (disabled_dates_rate[string] == 1) {
                return [false, 'provisional-date'];
            } else if (disabled_dates_rate[string] == 2) {
                return [false, 'unavailable-date'];
            }
            return [true]
        }
    });

     $('#rate_numberofadults').spinner({
        min:1,
        max: 22
     });
     $('#rate_numberofchildren').spinner({
        min: 0,
        max: 21
     });

    // Ajax for submission 5/10/2014
    $('#leobo_rate_calculator_form').validate({
          submitHandler: function(form) {
            $.post(
                    the_ajax.ajaxurl,
                    {
                        action : 'w_rate_calculator',
                        postCommentNonce : the_ajax.postCommentNonce,
                        rate_calculator : '1',
                        startdate : $('#rate_startdate').val(),
                        enddate : $('#rate_enddate').val(),
                        adults : $('#rate_numberofadults').val(),
                        children : $('#rate_numberofchildren').val(),
                        // helicopter : $('#rate_helicopter').prop('checked') ? '1' : '0'
                    },
                    function( response ) {
                        if (response.content) {
                            $('#leobo_rate_calculator_form').hide().siblings('p').hide();
                            $('#rate-calculator-results').html(response.content).show();
                            $('.show_rate_form', '#rate-calculator-results').click(function() {
                                $('#rate-calculator-results').hide();
                                // $('#leobo_rate_calculator_form').show();
                                $('#leobo_rate_calculator_form').show().siblings('p').show();
                            });
                        }
                    }
                );
            }
        });

}

    /**
     * init_download_media
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_download_media() {
    $('#download_media_form').validate({
          submitHandler: function(form) {
                $.post(
                        the_ajax.ajaxurl,
                        {
                            action : 'w_download_media_subscribe',
                            postCommentNonce : the_ajax.postCommentNonce,
                            search : 'subscribe',
                            first_name : $('#first_name').val(),
                            surname : $('#surname').val(),
                            email : $('#email').val()
                        },
                        function( response ) {
                            $('#download_media_box').html(response.content);
                        }
                    );
          }
         });
}

    /**
     * init_skyevents
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_skyevents() {
    $('#skyevents select.dropdown').customSelect();

    $('#se_date').datepicker({
        dateFormat: 'dd-mm-yy',
        onSelect: function(dateText, inst) {
            var pieces = dateText.split('-');

            if (pieces.length > 1) {
                $('#se_startDay').val(pieces[0]);
                $('#se_startMonth').val(pieces[1]);
                $('#se_startYear').val(pieces[2]);
            }
        }
    })

    $('#se_time').spinit({
        callback: function() {
            var time = $('#se_time').val();
            var pieces = time.split(':');
            if (pieces.length > 1) {
                $('#se_startHour').val(pieces[0]);
                $('#se_startMin').val(pieces[1]);
            }
        },
        height: 37,
        width: 210,
        min: 1,
        initValue: '7:00',
        max: 24,
        btnWidth: 56,
        timer: true,
        timerInc: 10,
        timerMax: 23
    });

    $('#skyevents form').submit(function(e) {
          e.preventDefault();
          $('#skyevents_loader').show();
          $('.skyevents_results').fadeOut();
          post_data = $(this).serialize() + '&action=w_skyevents';
          $.post(
            the_ajax.ajaxurl,
            post_data,
            function( response ) {
              var events = response.events || 'No events retrieved.';
              $('.skyevents_results').html(events).slideDown();
              $('#skyevents_loader').hide();
              setTimeout(refreshInterface, 500);
            }
          );

        });
}

    /**
     * init_news
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_news() {
    var widget = jQuery('.super-rss-reader-widget');
    if (widget.length) {
        widget.find('.srr-wrap').hide();
        widget.find('.srr-wrap:first').show();
        widget.find('.srr-tab-wrap li:first').addClass('srr-active-tab');

        jQuery('.srr-tab-wrap li').click(function(){
            var id = jQuery(this).attr('data-tab');
            var parent = jQuery(this).parent().parent();

            jQuery(this).parent().children('li').removeClass('srr-active-tab');
            jQuery(this).addClass('srr-active-tab');

            parent.find('.srr-wrap').hide();
            parent.find('.srr-wrap[data-id=' + id + ']').show();
        });

        // Add the ticker to the required elements
        jQuery('.srr-vticker').each(function(){
            var visible = jQuery(this).attr('data-visible');
            var interval = jQuery(this).attr('data-speed');
            var ticker = jQuery(this).easyTicker({
                'visible': visible,
                'interval': interval
            });
        });
    }
}

    /**
     * init_enlarge_images
     *
     * @param mixed \master Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_enlarge_images(master) {
  var preload_images = [];
  master = master || 'body';
  $('.enlarge_image a', master).click( function(e) {
    e.preventDefault();
    the_HREF = $(this).attr('href');
    var img_el = $(this).children('img');
    var image_title = img_el.attr('data-title');
    var image_blurb = img_el.attr('data-blurb');
    var c = new Image();
    c.onload = function() {
        backgroundVideo = [];
        slides_updated = true;

        var  new_image = {
                        image: the_HREF,
                        thumb: "",
                        title: image_title,
                        url: ""
                    };

        slides = [new_image];

        load_background();
    };
    c.src = the_HREF;
  }).each(function() {
    preload_images.push($(this).attr('href'));
  });
  $.preload( preload_images);
}

    /**
     * init_space_gallery
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_space_gallery() {
  var g_button = $('.space-gallery-load-more');
  if (g_button.length > 0) {

    g_button.each(function() {
      var b = $(this).parent().closest('.content-panel').attr('data-bottom') || '';
      if (b) b = b+',';
      b = b+'space_gallery_load_scroll';
      $(this).parent().closest('.content-panel').attr('data-bottom', b);
    }).click( function(e) {
      e.preventDefault();

      // loading
      var load_button = $(this);
      load_button.addClass('loading');
      var gallery_container = load_button.parent();
      space_gallery_load_ajax(gallery_container,load_button);

    });
  }
}

var space_gallery_loading = false;
    /**
     * space_gallery_load_scroll
     *
     * @param mixed \event Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function space_gallery_load_scroll(event) {
    var gallery_container = $(event.target).find('.space-gallery');
    var load_button = gallery_container.find('.space-gallery-load-more');
    if (load_button.length > 0) {
        space_gallery_load_ajax(gallery_container, load_button);
    }
}

    /**
     * space_gallery_load_ajax
     *
     * @param mixed \gallery_container Description.
     * @param mixed \load_button       Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function space_gallery_load_ajax(gallery_container, load_button) {
  if (!space_gallery_loading) {
      space_gallery_loading = true;
      load_button.addClass('loading');
      //ajax
      $.post(
          // see tip #1 for how we declare global javascript variables
          the_ajax.ajaxurl,
          {
            // here we declare the parameters to send along with the request
            // this means the following action hooks will be fired:
            // wp_ajax_nopriv_myajax-submit and wp_ajax_myajax-submit
            action : 'w_space_gallery',
            // send the nonce along with the request
            category : gallery_container.attr('data-category'),
            perpage : gallery_container.attr('data-per-page'),
            start : gallery_container.attr('data-start')
          },
          function( response ) {
            load_button.removeClass('loading');
            var html = response.content || 'EMPTY';
            gallery_container.append('<div id="space_gallery_'+response.start+'">'+html+'</div>').attr('data-start', response.start);
            init_enlarge_images('#space_gallery_'+response.start);
            $('.tooltip').tooltipster({maxWidth:'400', position:'right', animation:'grow',contentAsHTML:true,theme:'tooltipster-punk'});

            if (response.more) {
                load_button.appendTo(gallery_container); //woop
            } else {
                load_button.remove();
            }

            contentPanel.data('jsp').reinitialise();
            contentMoarPanel.data('jsp').reinitialise();

            space_gallery_loading = false;

            // $(content_container).html( html );
          }
        );
  }
}


/*-------------------------------------
                    SVG
 ---------------------------------------*/

    /**
     * init_svg_icons
     *
     * @param mixed \master Description.
     *
     * @access public
     *
     * @return mixed Value.
     */
function init_svg_icons(master) {
    master = master || 'body';
    $('.si-icon', master).each( function() {
      var d = $(this).attr('data-icon-name');
      svg_icon_list[d] = new svgIcon( this, svgIconConfig, {size: {w:400, h:400}, speed:400} );
    });
    setTimeout(function(){
        click_svg_icons();
    }, 800);
}

    /**
     * click_svg_icons
     *
     * @access public
     *
     * @return mixed Value.
     */
function click_svg_icons() {
    setTimeout(function(){
      try { svg_icon_list['thermometer'].toggle(true); } catch(e) {}
    }, 100);
    setTimeout(function(){
      try { svg_icon_list['compass'].toggle(true); } catch(e) {}
    }, 500);
    setTimeout(function(){
      try { svg_icon_list['cloudy'].toggle(true); } catch(e) {}
      try { svg_icon_list['rainy'].toggle(true); } catch(e) {}
      try { svg_icon_list['sunny'].toggle(true); } catch(e) {}
      try { svg_icon_list['variable'].toggle(true); } catch(e) {}
    }, 800);
}

    /**
     * center_nav_vertically
     *
     * @access public
     *
     * @return mixed Value.
     */
function center_nav_vertically() {
    var new_margin = Math.ceil(($(window).height() - $('#left-nav .content').height()) / 2);
    $('#left-nav .content').animate('margin-top', new_margin + 'px');

    new_margin = Math.ceil(($(window).height() - $('#menu-main').height()) / 2);
    $('#menu-main').animate({'margin-top': new_margin + 'px'});
}


/* make a clickable div */
$("div.linky").click(function(){
     window.location=$(this).find("a").attr("href");
     return false;
});

function isEmpty( el ){
  return !$.trim(el.html());
}



/*-------------------------------------
        Background Clipping
 ---------------------------------------*/

// Config Background Clipping
var canvasRectangles = 10;
var clippingHeightInterval = 0.1;
var clippingHeightMinLimit = 0.2;
var clippingHeightLimit = 0.5;
var breathing_max = 30;
var breathing_ratio = 0.3;

var firstHeightLimit = 1/2;
var changeRatioFull = 50;
var changeRatioMax = 10; // random select 1 to changeRatioMax to make colums move at slightly different speeds.
var changeRatioMin = 7;
var growRate = 20;

// End config

var canvasWidth = window.outerWidth;
var canvasHeight = window.outerHeight;

var squares = [];
var squares_total = 0;

var offset = 0;
var then = Date.now();

var backgroundClippingToggle = 0;
var backgroundClippingRunning = false;
var backgroundClippingBreathing = true;
var backgroundClippingVideoLoaded = false;

var backgroundClippingFullComplete = false;

var backgroundClippingImage;
var backgroundClippingVideo;
var backgroundPlaceholder = true;

var backgroundClippingDrawX = 0;
var backgroundClippingDrawY = 0;

 var mainCanvas;
 var mainContext;

 var mainCanvasAspectRatio;

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;


function fullheight_squares() {
    var change_height = Math.floor(canvasHeight * clippingHeightInterval);
    for (var i = 0; i < squares_total; i++) {
        squares[i][4] = canvasHeight + Math.abs(backgroundClippingDrawY);
        squares[i][5] = changeRatioFull;
    }
}

function reset_squares() {
    squares.length = 0;
    squares_total = 0;
}


function generate_squares() {
    var max_height = Math.floor(canvasHeight * clippingHeightLimit),
        min_height = Math.floor(canvasHeight * clippingHeightMinLimit);
        change_height = Math.floor(canvasHeight * clippingHeightInterval),
        direction = 1,
        num = change_height;

    squares.length = 0;
    single_width = canvasWidth / canvasRectangles;
    squareWidths = 0;
    var previous_square_height = clippingHeightMinLimit

    while(squareWidths < canvasWidth) {
        if (previous_square_height >= max_height) {
            direction = 2;
        } else if (previous_square_height <= min_height) {
            direction = 1;
        } else {
            direction = Math.floor(Math.random() * 2 + 1);
        }

        if (direction == 1) { // grow
            num = previous_square_height + change_height;
            // console.log( previous_square_height + '+' + change_height + '='+num);
        } else { //shrink
            num = previous_square_height - change_height;
            // console.log( previous_square_height + '-' + change_height + '= '+num);
        }
        var ratio = Math.floor(Math.random() * changeRatioMax + changeRatioMin);
        squares.push( [squareWidths,0,single_width, 0, num, ratio, 0] );
        squareWidths = squareWidths + single_width;

        previous_square_height = num;
    }
    squares_total = squares.length;
    console.log(squares);
    // console.log( canvasHeight )
    // console.log( firstHeightLimit )
    // console.log( changeRatioMin )
    // console.log( (canvasHeight*firstHeightLimit) );
}
// generate_squares();

function initBackgroundCanvas () {
    console.log('initBackgroundCanvas')

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    // var video = document.getElementsByTagName("video")[0];
    mainCanvas = document.getElementById("background_canvas");
    mainContext = mainCanvas.getContext('2d', {alpha: true});

    mainCanvas.width  = canvasWidth;
    mainCanvas.height = canvasHeight;

    mainCanvasAspectRatio = canvasHeight / canvasWidth;
}

function showBackgroundCanvas(video_link, image_link) {
    console.log('showBackgroundCanvas');
    if (quality == 'image') {
        backgroundClippingImage = document.createElement('img');
        backgroundClippingImage.src = image_link;

        $(backgroundClippingImage).load(function(){
            $(this).width(this.width);
            $(this).height(this.height);

            $(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
            backgroundClippingImageResize($(this));   // Resize background image

            backgroundClippingDrawX = ( $(mainCanvas).width() - $(this).width())/2;
            backgroundClippingDrawY = (( $(mainCanvas).height() - $(this).height())/2 );

            backgroundPlaceholder = false;
            mainCanvas.width = mainCanvas.width;
            $(mainCanvas).show();
            backgroundClippingRunning =true;
            then = Date.now();
            drawCanvasFrame();
        }); // End Load

        mainCanvas.width = mainCanvas.width;
        $(mainCanvas).show();
        backgroundPlaceholder = true;
        backgroundClippingRunning =true;
        then = Date.now();
        drawCanvasFrame();

    } else {
        // get image to show before video
        backgroundClippingImage = document.createElement('img');
        backgroundClippingImage.src = image_link;

        $(backgroundClippingImage).load(function(){
            $(this).width(this.width);
            $(this).height(this.height);

            $(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
            backgroundClippingImageResize($(this));   // Resize background image

            backgroundClippingDrawX = ( $(mainCanvas).width() - $(this).width())/2;
            backgroundClippingDrawY = (( $(mainCanvas).height() - $(this).height())/2 );

            backgroundPlaceholder =false;
            mainCanvas.width = mainCanvas.width;
            $(mainCanvas).show();
            backgroundClippingRunning =true;
            then = Date.now();
            drawCanvasFrame();
        }); // End Load

        backgroundClippingVideo = document.createElement('video');
        backgroundClippingVideo.preload = 'auto';
        backgroundClippingVideo.addEventListener('canplay', startPlay, false);

        if (backgroundClippingVideo.canPlayType('video/mp4')) {
            backgroundClippingVideo.src = video_link;
        }

        backgroundClippingVideo.addEventListener('loadedmetadata', backgroundClippingVideoResize, false);

        backgroundClippingVideo.addEventListener('ended', stopPlay, false);
        backgroundClippingVideo.addEventListener('pause', stopPlay, false);


        function startPlay() {
            console.log('startplay');
            backgroundClippingVideoLoaded = true;
            backgroundClippingFullComplete = false;
            backgroundClippingRunning = true;
            backgroundClippingVideo.muted = true;
            backgroundClippingVideo.play();

            mainCanvas.width = mainCanvas.width;
            $(mainCanvas).show();
            then = Date.now();
            drawCanvasFrame();
        }

        function stopPlay() {
            console.log('stopplay');
            backgroundClippingVideoLoaded = false;
            backgroundClippingRunning = false;
        }
    }

}

function hideBackgroundCanvas() {
    $(mainCanvas).hide();
    backgroundClippingVideoLoaded = false;
    // setTimeout(function() {
        backgroundClippingFullComplete = false;
        backgroundClippingRunning = false;
        if ( backgroundClippingVideo !== undefined) {
            backgroundClippingVideo.pause();
            backgroundClippingVideo.src = "";
        }
        backgroundClippingImage = "";
        mainCanvas.width = mainCanvas.width;
        backgroundPlaceholder = true;
    // }, 1000);
}

function drawCanvasFrame() {
    var now = Date.now();
    var change = now - then;
        // var change = 30;

    if (squares_total == 0) {
        backgroundClippingRunning = false;
    }
    // if (offset < canvasHeight) {
        offset = (growRate * change/1000);
    // }

    if (backgroundClippingRunning) {

        if ( backgroundClippingToggle++ % 1 === 0) { //limit frame %4 = 15 frames

            mainContext.save();

             // if ( backgroundClippingToggle % 3 === 0) {
                mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
            // }
            // mainCanvas.width = mainCanvas.width;

            mainContext.beginPath();

            backgroundClippingFullComplete = 0;

            //draw rectangle
            for (var i = 0; i < squares_total; i++) {
                var square = squares[i];

                if (square[3] <= (canvasHeight + Math.abs(backgroundClippingDrawY))) {
                    if (square[3] <= square[4]) {
                        newHeight = square[3] + (offset * square[5]);
                        square[3] = newHeight;
                    } else if (backgroundClippingBreathing == 1) {
                        if ( square[6] == 0 ) {
                            newHeight = square[3] + (offset * breathing_ratio);
                            if ( (square[3] - square[4] ) >= breathing_max) {
                                square[6] = 1;
                            }
                        } else {
                            newHeight = square[3] - (offset * breathing_ratio);
                            if (square[3] - 20 <= square[4]) {
                                square[6] = 0;
                            }
                        }
                        square[3] = newHeight;
                    }
                } else {
                    backgroundClippingFullComplete++;
                }

                mainContext.rect(square[0], square[1], square[2], square[3]);
            }

            // mainContext.fill();
            mainContext.clip();
            if (backgroundPlaceholder) {
                mainContext.rect(0, 0, mainCanvas.width, mainCanvas.height);
                mainContext.fillStyle = 'black';
                mainContext.fill();
            } else if (quality == 'image' || backgroundClippingVideoLoaded == false) {
                mainContext.drawImage(backgroundClippingImage, backgroundClippingDrawX, backgroundClippingDrawY, $(backgroundClippingImage).width(), $(backgroundClippingImage).height());
            } else {
                mainContext.drawImage(backgroundClippingVideo, backgroundClippingDrawX, backgroundClippingDrawY, $(backgroundClippingVideo).width(), $(backgroundClippingVideo).height());
            }
            mainContext.restore();

            if (squares_total > 0 && backgroundClippingFullComplete >= squares_total) {
                $(mainCanvas).trigger('completed_full');
                reset_squares();
            }

        }//if toggle

        then = now;

        requestAnimationFrame(drawCanvasFrame);
    }
}

function backgroundClippingVideoResize() {
    var video = this;
    var windowW = $(mainCanvas).width(),
            windowH = $(mainCanvas).height(),
            windowAspect = windowW/windowH;

    mediaAspect = $(video).prop('videoWidth')/$(video).prop('videoHeight');

    if (windowAspect < mediaAspect) {
        // taller
        $(backgroundClippingVideo)
            .width(windowH*mediaAspect)
            .height(windowH);
        backgroundClippingDrawY = 0;
        backgroundClippingDrawX = -(windowH*mediaAspect-windowW)/2;

    } else {
        // wider
        $(backgroundClippingVideo)
            .width(windowW)
            .height(windowW/mediaAspect);

        backgroundClippingDrawY = -(windowW/mediaAspect-windowH)/2;
        backgroundClippingDrawX = 0;
    }
}

//Copied from supersize....
function backgroundClippingImageResize(thisSlide) {
    var ratio = (thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);  // Define image ratio

    //hack
    ratio = ratio - 0.02;
    //endahck

    // Gather browser size
    var browserwidth = $(mainCanvas).width(),
        browserheight = $(mainCanvas).height(),
        offset;

    /*-----Resize Image-----*/
    if ($.supersized.vars.options.fit_always){   // Fit always is enabled
        if ((browserheight/browserwidth) > ratio){
            resizeWidth();
        } else {
            resizeHeight();
        }
    }else{  // Normal Resize
        if ((browserheight <= $.supersized.vars.options.min_height) && (browserwidth <= $.supersized.vars.options.min_width)){    // If window smaller than minimum width and height

            if ((browserheight/browserwidth) > ratio){
                $.supersized.vars.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);   // If landscapes are set to fit
            } else {
                $.supersized.vars.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);       // If portraits are set to fit
            }

        } else if (browserwidth <= $.supersized.vars.options.min_width){     // If window only smaller than minimum width

            if ((browserheight/browserwidth) > ratio){
                $.supersized.vars.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();   // If landscapes are set to fit
            } else {
                $.supersized.vars.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);       // If portraits are set to fit
            }

        } else if (browserheight <= $.supersized.vars.options.min_height){   // If window only smaller than minimum height

            if ((browserheight/browserwidth) > ratio){
                $.supersized.vars.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);   // If landscapes are set to fit
            } else {
                $.supersized.vars.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();       // If portraits are set to fit
            }

        } else {    // If larger than minimums

            if ((browserheight/browserwidth) > ratio){
                $.supersized.vars.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();   // If landscapes are set to fit
            } else {
                $.supersized.vars.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();       // If portraits are set to fit
            }

        }
    }
    /*-----End Image Resize-----*/


    /*-----Resize Functions-----*/

    function resizeWidth(minimum){
        if (minimum){   // If minimum height needs to be considered
            if(thisSlide.width() < browserwidth || thisSlide.width() < $.supersized.vars.options.min_width ){
                if (thisSlide.width() * ratio >= $.supersized.vars.options.min_height){
                    thisSlide.width($.supersized.vars.options.min_width);
                    thisSlide.height(thisSlide.width() * ratio);
                }else{
                    resizeHeight();
                }
            }
        }else{
            if ($.supersized.vars.options.min_height >= browserheight && !$.supersized.vars.options.fit_landscape){   // If minimum height needs to be considered
                if (browserwidth * ratio >= $.supersized.vars.options.min_height || (browserwidth * ratio >= $.supersized.vars.options.min_height && ratio <= 1)){    // If resizing would push below minimum height or image is a landscape
                    thisSlide.width(browserwidth);
                    thisSlide.height(browserwidth * ratio);
                } else if (ratio > 1){      // Else the image is portrait
                    thisSlide.height($.supersized.vars.options.min_height);
                    thisSlide.width(thisSlide.height() / ratio);
                } else if (thisSlide.width() < browserwidth) {
                    thisSlide.width(browserwidth);
                    thisSlide.height(thisSlide.width() * ratio);
                }
            }else{  // Otherwise, resize as normal
                thisSlide.width(browserwidth);
                thisSlide.height(browserwidth * ratio);
            }
        }
    };

    function resizeHeight(minimum){
        if (minimum){   // If minimum height needs to be considered
            if(thisSlide.height() < browserheight){
                if (thisSlide.height() / ratio >= $.supersized.vars.options.min_width){
                    thisSlide.height($.supersized.vars.options.min_height);
                    thisSlide.width(thisSlide.height() / ratio);
                }else{
                    resizeWidth(true);
                }
            }
        }else{  // Otherwise, resized as normal
            if ($.supersized.vars.options.min_width >= browserwidth){    // If minimum width needs to be considered
                if (browserheight / ratio >= $.supersized.vars.options.min_width || ratio > 1){  // If resizing would push below minimum width or image is a portrait
                    thisSlide.height(browserheight);
                    thisSlide.width(browserheight / ratio);
                } else if (ratio <= 1){     // Else the image is landscape
                    thisSlide.width($.supersized.vars.options.min_width);
                    thisSlide.height(thisSlide.width() * ratio);
                }
            }else{  // Otherwise, resize as normal
                thisSlide.height(browserheight);
                thisSlide.width(browserheight / ratio);
            }
        }
    };

    /*-----End Resize Functions-----*/

    console.log('Lw '+browserwidth+' Lh '+browserheight+' ratio:'+ratio +' W '+thisSlide.width()+ ' H '+thisSlide.height()+' '+thisSlide.attr('src')
        + ' ' + thisSlide.data('origHeight')+' '+thisSlide.data('origWidth')
        );


}



}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );

/*-------------------------------------
                GOOGLE MAP
 ---------------------------------------*/

    /**
     * initialize_google_map
     *
     * @access public
     *
     * @return mixed Value.
     */
function initialize_google_map() {
    curentlyShowing = 'google_map';

    if (!googleMap.map) {
            googleMap.mapLatLng = new google.maps.LatLng(googleMap.lat, googleMap.lng)
            var mapOptions = {
                zoom: parseInt(googleMap.zoom),
                center: googleMap.mapLatLng,
                mapTypeControl: true,
                mapTypeControlOptions: {
                  position: google.maps.ControlPosition.RIGHT_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
            };

            googleMap.map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);

            create_marker_google_map();

            google.maps.event.addDomListener(window, 'resize', function() {
                googleMap.map.setCenter(googleMap.mapLatLng);
            });

      } else {
            googleMap.mapLatLng = new google.maps.LatLng(googleMap.lat, googleMap.lng)
            googleMap.map.setCenter(googleMap.mapLatLng);
            googleMap.map.setZoom(parseInt(googleMap.zoom));

            if ( googleMap.newMap ) {
                googleMap.marker.setMap(null);
                googleMap.marker = null;
                googleMap.infowindow = null;

                create_marker_google_map()
            }
      }
      jQuery('#map-canvas').fadeIn();
      set_google_map_height();
}

    /**
     * create_marker_google_map
     *
     * @access public
     *
     * @return mixed Value.
     */
function create_marker_google_map() {
    var markerOptions  = {
          position: googleMap.mapLatLng,
          map: googleMap.map,
          title: 'Leobo Private Reserve',
     }

    if (googleMap.marker_image) {
        //customer marker image
        markerOptions.icon = googleMap.marker_image;
    }

    googleMap.marker = new google.maps.Marker(markerOptions);

    if (googleMap.info_content.length) {
        googleMap.infowindow = new google.maps.InfoWindow({
          content: googleMap.info_content
        });
        google.maps.event.addListener(googleMap.marker, 'click', function() {
            googleMap.infowindow.open(googleMap.map,googleMap.marker);
        });
    }
}

    /**
     * load_google_map_script
     *
     * @access public
     *
     * @return mixed Value.
     */
function load_google_map_script() {
    if ( !googleMap.map ) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA_MOtfbIeu0vmqdZi1r_E4sCYGLYZTDMc&v=3.exp' +
          '&signed_in=true&callback=initialize_google_map';
      script.id = 'google_map_scripty_thing';
      document.body.appendChild(script);
  } else {
        initialize_google_map();
  }
}

    /**
     * set_google_map_height
     *
     * @access public
     *
     * @return mixed Value.
     */
function set_google_map_height() {
    var map_height = jQuery( window ).height();
    // if (jQuery('#content').hasClass('open')) {
    //     map_height = map_height - 480;
    // }
    jQuery('#map-canvas').animate({height:map_height+'px'}, 500, function() {
        if (googleMap.map) {
            var currCenter = googleMap.map.getCenter();
            google.maps.event.trigger(googleMap.map, 'resize');
            googleMap.map.setCenter(currCenter);
        }
    });

}


