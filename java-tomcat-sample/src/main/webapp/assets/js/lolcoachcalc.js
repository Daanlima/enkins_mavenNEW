function calc(){

    var ferroPrata = "Aulas com professor Mestre ou de elo superior. Abordamos: principais heróis de cada rota, builds, builds situacionais, fase de rotas, talentos, páginas de runas, utilização do mapa e farm.";
    var ouroPlatina = "Aulas com professor Mestre ou de elo superior. Abordamos: counter-picks, posicionamento e foco em team fight e late Game, kiting, ganks, roaming, zoning, lidar com jogadores ragers no chat, disputa de visão e objetivos globais.";
    var diamanteMestre = "Aulas com professor Desafiante. Principais conteúdos abordados: ShoutCaller de objetivos para seu time, como obter e distribuir vantagem entre seu time após ganhar a lane, mapear a selva inimiga, roaming avançado, controle de terreno e muito mais.";


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

    if (rankSelecionado == 30) {
       document.getElementById('textCoach').innerText = ferroPrata;
    }
    else if (rankSelecionado == 35) {
       document.getElementById('textCoach').innerText = ouroPlatina;
    }
    else if (rankSelecionado == 40) {
       document.getElementById('textCoach').innerText = diamanteMestre;
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