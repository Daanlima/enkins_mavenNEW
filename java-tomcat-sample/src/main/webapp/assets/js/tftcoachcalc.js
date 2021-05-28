function calc(){

    var rankSelecionado = $('#currentRank option:selected').val();
    var qntdSelecionado = $('#qntdAulas option:selected').val();
    var total = (rankSelecionado * qntdSelecionado);

    if (total != 0) {
      $("#rs").removeClass("removed");
       document.getElementById('price').innerText = total.innerText = total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    else{
       document.getElementById('price').innerText = total.innerText = total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    
}


$(document).ready(function(){

    calc();


    $("#currentRank").change(function(){
        var imgsrc = $(this).children("option:selected").attr("data-divid");
        $('.image-swap').attr("src", imgsrc);

        var imgsrc = $(this).children("option:selected").attr("data-divid");

        calc();
        
    });


     $("#qntdAulas").change(function(){

        calc();
        
    });

});