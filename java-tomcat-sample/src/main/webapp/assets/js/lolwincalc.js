function calc(){

    var rankSelecionado = $('#currentRank option:selected').val();
    var qntdSelecionado = $('#qntdWins option:selected').val();
    var tipoSelecionado = $('#tipoServ option:selected').val();
    var total = (rankSelecionado * qntdSelecionado) * tipoSelecionado;

    if (rankSelecionado == 40 || rankSelecionado == 60 || rankSelecionado == 20 || rankSelecionado == 25) {
      var x = document.getElementById("tipoServ");
          x.disabled = true;
          $('#tipoServ').val(1);
    }else{
      var x = document.getElementById("tipoServ");
          x.disabled = false;
    }

    if (total != 0) {
      $("#rs").removeClass("removed");
       document.getElementById('price').innerText = total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    else{
      $("#rs").addClass("removed");
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


    $("#qntdWins").change(function(){

        calc();
        
    });

    $("#tipoServ").change(function(){

        calc();
        
    });

});