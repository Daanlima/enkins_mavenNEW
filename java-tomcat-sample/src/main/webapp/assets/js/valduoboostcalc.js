/*
  Ferro: 0 -> 2
  Bronze: 3 -> 5
  Prata: 6 -> 8
  Ouro: 9 -> 11
  Platina: 12 -> 14
  Diamante: 15 -> 17
  Imortal: 18 -> 20
  Radiante: 21

  0 -> 3: 10.00 // Promocional: 25.00 no total se comprar todos
  3 -> 6: 15.00 // Promocional: 35.00 no total se comprar todos
  6 -> 9: 20.00 // Promocional: 50.00 no total se comprar todos
  9 -> 12: 25.00 //Promocional: 60.00 no total se comprar todos
  12 -> 15: 35.00 //Promocional: 90.00 no total se comprar todos
  15 -> 16: 60.00
  16 -> 17: 80.00
  17 -> 18: 100.00
  18 -> 19: 120.00
  19 -> 20: 150.00
  20 -> 21: 300.00
*/

const imgPath = "./assets/img",
  rankInfo={
    qt: 8,
    noDivision: 7,
    qtDivision: 3,
    coeffs: [0, 3, 6, 9, 12, 15, 18, 21]
  },
  priceInfo={
    coeffs: [0, 3, 6, 9, 12, 15, 16, 17, 18, 19, 20, 21],
    prices: [15.0, 25.0, 30.0, 35.0, 50.0, 100.0, 120.0, 150.0, 175.0, 200.0, 400.0],
    discounts: [5.0, 10.0, 10.0, 15.0, 15.0]
  },
  moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

function isRankDivided(rankNumber){
  return rankNumber<rankInfo.noDivision;
}

function isRequestValid(){
  let ranksCoeff = getRanksCoeff();
  return ranksCoeff.curRankCoeff<ranksCoeff.targetRankCoeff; 
}

function hideElement(element){
  element.classList.add("removed");
}

function showElement(element){
  element.classList.remove("removed");
}

function getCoeff(rank, division){
  if(!isRankDivided(rank)) return rankInfo.coeffs[rank];
  else return rankInfo.coeffs[rank] + division;
}

function getRanksCoeff(){
  let curRankCoeff = getCoeff(
    document.querySelector("#currentRank").selectedIndex,
    document.querySelector("#currentDivision").selectedIndex
  ),
  targetRankCoeff = getCoeff(
    document.querySelector("#targetRank").selectedIndex,
    document.querySelector("#targetDivision").selectedIndex
  );

  return {curRankCoeff, targetRankCoeff};
}

function setRankImage(rankImage, rankSelect, divisionSelect){
  if(!isRankDivided(rankSelect.selectedIndex))
    rankImage.src=imgPath+"/ranksVal/"+rankSelect.value+".png";
  else
    rankImage.src=imgPath+"/ranksVal/"+rankSelect.value+"/"+(rankInfo.qtDivision-divisionSelect.selectedIndex)+".png";
}

function setDivisionSelect(rankSelect, divisionContainer){
  if(!isRankDivided(rankSelect.selectedIndex))
    hideElement(divisionContainer);
  else
    showElement(divisionContainer);
}

function getExtra(){
  let checkboxes = Array.prototype.slice.call(document.querySelectorAll(".calcCardExtra input[type=checkbox]:checked")),
    extra = 0;

  for(let x of checkboxes)
    extra+=parseFloat(x.value, 10);

  return extra/100;
}

function calculatePrice(){
  let curPrice=0, totalDiscount=0, basePrice=0, fromRankBegin=false,
    {curRankCoeff, targetRankCoeff} = getRanksCoeff(),
    {coeffs, prices, discounts} = priceInfo;
  
  for(let i=0;i<coeffs.length-1 && coeffs[i]<=curRankCoeff;i++)
    curPrice = i;

  for(let incPrice=false;curRankCoeff<targetRankCoeff;curRankCoeff++){
    if(curRankCoeff==coeffs[curPrice]) fromRankBegin=true;

    if(curPrice+1<coeffs.length && coeffs[curPrice+1]<=curRankCoeff+1){
      incPrice=true;
      if(fromRankBegin && curPrice<discounts.length)
        totalDiscount+=discounts[curPrice];
    }

    if(coeffs[curPrice+1]<=curRankCoeff)
      curPrice++;

    basePrice += prices[curPrice];

    if(incPrice){
      curPrice++; incPrice=false;
    }
  }

  let extra = getExtra();
  basePrice*=(1+extra);
  totalDiscount*=(1+extra);

  return {basePrice, totalDiscount};
}

function setPrice(){
  if(!isRequestValid()){
    hideElement(document.querySelector("#priceContainer"));
    showElement(document.querySelector("#alert"));
  }
  else{
    let {basePrice, totalDiscount} = calculatePrice(),
      e = document.querySelector("#basePrice");

    if(totalDiscount>0){
      e.innerHTML=moneyFormatter.format(basePrice);
      e.parentElement.classList.remove("removed");
    }
    else e.parentElement.classList.add("removed");
    
    e = document.querySelector("#price");
    e.innerHTML=moneyFormatter.format(basePrice-totalDiscount);

    hideElement(document.querySelector("#alert"));
    showElement(document.querySelector("#priceContainer"));
  }
}

function onChangeCurrentRank(){
  let rankImage = document.querySelector("#currentRankImage"),
    rankSelect = document.querySelector("#currentRank"),
    divisionSelect = document.querySelector("#currentDivision"),
    divisionContainer = document.querySelector("#currentDivisionContainer");;

  setRankImage(rankImage, rankSelect, divisionSelect);
  setDivisionSelect(rankSelect, divisionContainer);
  setPrice();
}

function onChangeTargetRank(){
  let rankImage = document.querySelector("#targetRankImage"),
    rankSelect = document.querySelector("#targetRank"),
    divisionSelect = document.querySelector("#targetDivision"),
    divisionContainer = document.querySelector("#targetDivisionContainer");;

  setRankImage(rankImage, rankSelect, divisionSelect);
  setDivisionSelect(rankSelect, divisionContainer);
  setPrice();
}

function addEvents(){
  let e = document.querySelector("#currentRank");
  e.addEventListener("change", onChangeCurrentRank);

  e = document.querySelector("#currentDivision");
  e.addEventListener("change", onChangeCurrentRank);

  e = document.querySelector("#targetRank");
  e.addEventListener("change", onChangeTargetRank);

  e = document.querySelector("#targetDivision");
  e.addEventListener("change", onChangeTargetRank);

  e = Array.prototype.slice.call(document.querySelectorAll(".calcCardExtra input[type=checkbox]"));
  for(let x of e) x.addEventListener("change", setPrice);
}

function start(){
  addEvents();
  onChangeCurrentRank(); onChangeTargetRank(); //iniciando imagem de ranks e preço
}

function getPedidoElojob(){
  var servico = "Elojob";
  var rankatual = $( "#currentRank option:selected" ).text();
  var divatual = $( "#currentDivision option:selected" ).text();
  var rankdesejado = $( "#targetRank option:selected" ).text();
  var divadesejado = $( "#targetDivision option:selected" ).text();
  var filadesejada = $( "#targetQueue option:selected" ).text();


  var pedido = servico  + rankatual +  divatual + rankdesejado + divadesejado + filadesejada;
  console.log(pedido);
}