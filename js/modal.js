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

});