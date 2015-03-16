var mydivs=new Array('#all-new-items','#mens', '#women');

function opcl(arr, e){
    if ($(e).css('display') == 'none'){
        for(var i in arr){   
           $(arr[i]).hide();
        }
        $(e).show();       
    }
}

$( document ).ready(function() {

$('.control li').click(function() {
    $('.control li').removeClass('active');
    $(this).addClass('active');
  });
});