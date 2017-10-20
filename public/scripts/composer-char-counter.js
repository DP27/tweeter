var counter=140;
$(document).ready(function() {//function for char count and acknowledging user about the char count.
    $('textarea').keyup(function() {
        var count = counter - $(this).val().length;
        var transverse = $(this).siblings('.counter');
        var counts = transverse.text(count);
        if(count <= 0){
            transverse.addClass("red");
        }else if(count >= 1){
            transverse.removeClass("red");
        }
    });
});


