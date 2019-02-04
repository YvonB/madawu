jQuery(document).ready(function($) {
	// Scroll Down
	$("#bottom-images").click(function(e) {
		e.preventDefault();
		var position = $('#circuits').offset().top;

		$("body, html").animate({
			scrollTop: position
		} /* speed */ );
	});

	// Hover circuits

	$("<div class='overlay_on_fivecolumns'><span>Associez <br> nature et plage</span></div>").insertAfter(".five-columns .et_pb_fullwidth_image_0 img");
	$("<div class='overlay_fivecolumns' id='nature'><span>Associez <br> nature et plage</span><br><p>J'y vais</p></div>").insertAfter(".five-columns .et_pb_fullwidth_image_0 img");

	$("<div class='overlay_on_fivecolumns'><span>Le Sud <br> Aventurier</span></div>").insertAfter(".five-columns .et_pb_fullwidth_image_1 img");
	$("<div class='overlay_fivecolumns' id='sud'><span>Le Sud <br> Aventurier</span><br><p>J'y vais</p></div>").insertAfter(".five-columns .et_pb_fullwidth_image_1 img");

	$("<div class='overlay_on_fivecolumns'><span>Nord <br> Plage et Nature</span></div>").insertAfter(".five-columns .et_pb_fullwidth_image_2 img");
	$("<div class='overlay_fivecolumns' id='nord'><span>Nord <br> Plage et Nature</span><br><p>J'y vais</p></div>").insertAfter(".five-columns .et_pb_fullwidth_image_2 img");

	$("<div class='overlay_on_fivecolumns'><span id='ouest' style='color:#e9a300;'>OUEST <br> Le top des aventurier</span><div style='display:flex;flex-direction: column;justify-content: center;text-align: center;'><span style='widht:64%;'>ALLEES <br> DES BAOBAB</span><br><hr/ style='width: 100%;/*! background: red; */border: 1px solid #eeee;border-bottom: 0px;'><span style='widht:64%;'>TSINGY <br> DE BEMARAHA</span></div></div>").insertAfter(".five-columns .et_pb_fullwidth_image_3 img");
	$("<div class='overlay_fivecolumns'><span>OUEST <br> Le top des aventurier</span><br><p>J'y vais</p></div>").insertAfter(".five-columns .et_pb_fullwidth_image_3 img");

	$("<div class='overlay_on_fivecolumns'><span>Nosy be</span></div>").insertAfter(".five-columns .et_pb_fullwidth_image_4 img");
	$("<div class='overlay_fivecolumns' id='nosy'><span>Nosy be</span><br><p>J'y vais</p></div>").insertAfter(".five-columns .et_pb_fullwidth_image_4 img");


	$('.et_pb_module.et_pb_fullwidth_image.et_pb_fullwidth_image_0').hover(function() {
		$(this).find('.overlay_on_fivecolumns').css('visibility', 'hidden');
          $(this).find('.overlay_fivecolumns').animate({bottom: ($(this).find('.overlay_fivecolumns').css('visibility', 'visible').position().top-$(this).find('img').position().top)+'px'}, 200);
       }, function() {
           $(this).find('.overlay_fivecolumns').animate({bottom:'0px'}, 200).css('visibility', 'hidden');
           $(this).find('.overlay_on_fivecolumns').css('visibility', 'visible');
    });
    $('.et_pb_module.et_pb_fullwidth_image.et_pb_fullwidth_image_1').hover(function() {
    	$(this).find('.overlay_on_fivecolumns').css('visibility', 'hidden');
          $(this).find('.overlay_fivecolumns').animate({bottom: ($(this).find('.overlay_fivecolumns').css('visibility', 'visible').position().top-$(this).find('img').position().top)+'px'}, 200);
       }, function() {
           $(this).find('.overlay_fivecolumns').animate({bottom:'0px'}, 200).css('visibility', 'hidden');
           $(this).find('.overlay_on_fivecolumns').css('visibility', 'visible');
    });
    $('.et_pb_module.et_pb_fullwidth_image.et_pb_fullwidth_image_2').hover(function() {
    	$(this).find('.overlay_on_fivecolumns').css('visibility', 'hidden');
          $(this).find('.overlay_fivecolumns').animate({bottom: ($(this).find('.overlay_fivecolumns').css('visibility', 'visible').position().top-$(this).find('img').position().top)+'px'}, 200);
       }, function() {
           $(this).find('.overlay_fivecolumns').animate({bottom:'0px'}, 200).css('visibility', 'hidden');
           $(this).find('.overlay_on_fivecolumns').css('visibility', 'visible');
    });
    $('.et_pb_module.et_pb_fullwidth_image.et_pb_fullwidth_image_3').hover(function() {
    	$(this).find('.overlay_on_fivecolumns').css('visibility', 'hidden');
          $(this).find('.overlay_fivecolumns').animate({bottom: ($(this).find('.overlay_fivecolumns').css('visibility', 'visible').position().top-$(this).find('img').position().top)+'px'}, 200);
       }, function() {
           $(this).find('.overlay_fivecolumns').animate({bottom:'0px'}, 200).css('visibility', 'hidden');
           $(this).find('.overlay_on_fivecolumns').css('visibility', 'visible');
    });
    $('.et_pb_module.et_pb_fullwidth_image.et_pb_fullwidth_image_4').hover(function() {
    	$(this).find('.overlay_on_fivecolumns').css('visibility', 'hidden');
          $(this).find('.overlay_fivecolumns').animate({bottom: ($(this).find('.overlay_fivecolumns').css('visibility', 'visible').position().top-$(this).find('img').position().top)+'px'}, 200);
       }, function() {
           $(this).find('.overlay_fivecolumns').animate({bottom:'0px'}, 200).css('visibility', 'hidden');
           $(this).find('.overlay_on_fivecolumns').css('visibility', 'visible');
    });


    // Scrooll dawn and Up
        $(window).scroll(function () {
            var scroll= $(this).scrollTop();
            console.log(scroll);
            if(scroll >= 656){
                // $('.main-nav-sticky').css('transform', 'translate(0px, 0px)');
               $('#main-header').show(200);
               $('#main-nav').hide(200);
            }
            else if(scroll <= 300){
                 $('#main-header').hide(200);
                 $('#main-nav').show(200);
            }
        });
    
    // Home dans la page d'accueil
    var url = $(location).attr('href');
   if(url == 'http://localhost/madawu/'){
   	console.log('acueil');
   	$('#home .fas.fa-home').addClass('fa_home_white');
   }

   // Clique sur le btn Home pour scroller vers le haut
   $('#home .fas.fa-home').click(function(event) {
   		event.preventDefault();
   		 $('html, body').animate({scrollTop:0}, 'slow');
          return false;
   });

   // Chargement du BG
   setTimeout(function changeFond(){
   		$('#premiere_section').css('background-image',  'url("http://localhost/madawu/wp-content/uploads/2019/02/lumerien-hp-1.jpg")');
   }, 6000);
  
   // Plus dinfo 
   

});

