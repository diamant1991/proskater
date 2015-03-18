var mydivs=new Array('#mens-shoes','#shoes', '#sneakers','#ugg-boots');

function opcl(arr, e){
    if ($(e).css('display') == 'none'){
        for(var i in arr){   
           $(arr[i]).hide();
        }
        $(e).show();       
    }
}

$( document ).ready(function() {

$('.tovar-class li a').click(function() {
    $('.tovar-class li a').removeClass('active');
    $(this).addClass('active');
  });
});