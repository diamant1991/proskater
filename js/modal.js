var mydivs=new Array('.tab-1','.tab-2');

function opcl(arr, e){
    if ($(e).css('display') == 'none'){
        for(var i in arr){   
           $(arr[i]).hide();
        }
        $(e).show();       
    }
}


	$(document).ready(function () {
  
	$('.order .control li').click(function() {
    $('.order .control li').removeClass('active');
    $(this).addClass('active');
  });

	$('#btn-fast-order').click(function(){
   		if($('.popup-box-main').attr('visible')!='true'){
	   		$('.form-mask').fadeIn(400);
	        $('.popup-box-main').fadeIn(400);
	        $('.popup-box-main').attr({'visible':'true'})
	  	}
	  	else{
   			$('.form-mask').fadeOut(400);
        	$('.popup-box-main').fadeOut(400);
	        $('.popup-box-main').attr({'visible':'false'})
	  	}
	})
 $('.btn-close1').click(function(){
   		$('.form-mask').fadeOut(400)
        $('.popup-box-main').fadeOut(400)
        $('.popup-box-main').attr({'visible':'false'})
	})
 $('.quick-link').click(function(){
      if($('.popup-tovar').attr('visible')!='true'){
        $('.quick-form-mask').fadeIn(400);
          $('.popup-tovar').fadeIn(400);
          $('.popup-tovar').attr({'visible':'true'})
      }
      else{
        $('.quick-form-mask').fadeOut(400);
          $('.popup-tovar').fadeOut(400);
          $('.popup-tovar').attr({'visible':'false'})
      }
  })
 $('.btn-close, .quick-form-mask').click(function(){
      $('.quick-form-mask').fadeOut(400)
        $('.popup-tovar').fadeOut(400)
        $('.popup-tovar').attr({'visible':'false'})
  })

});
  function popup_position(){
         var my_popup = $('.popup-tovar'), // наш попап
                 my_popup_w = my_popup.width(), // ширина попапа
                 my_popup_h = my_popup.height(), // высота попапа
                 popup_half_w = my_popup_w/2, // половина ширины попапа
                 popup_half_h = my_popup_h/2, // половина высоты попапа
                 win_w = $(window).width(), // ширина окна
                 win_h = $(window).height(); // высота окна
 
         if ( win_w > my_popup_w ) { // если ширина окна больше ширины попапа
                 my_popup.css({'margin-left':-popup_half_w, 'left': '50%'});
         }
         if ( win_w < my_popup_w ) { // если ширина окна меньше ширины попапа                  
                 my_popup.css({'margin-left': 5, 'left': '0'});
         }
         if ( win_h > my_popup_h ) { // если высота окна больше ширины попапа
                 my_popup.css({'margin-top': -popup_half_h, 'top':'45%'});
         }
         if ( win_h < my_popup_h ) { // если высота окна меньше ширины попапа
                 my_popup.css({'margin-top': 5, 'top': '0'});
         }
 }

        $(document).ready(function(){ 
    popup_position();
    });
    $(window).resize(function(){  
    popup_position();
    });
     