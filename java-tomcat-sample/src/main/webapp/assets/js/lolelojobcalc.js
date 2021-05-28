/*
  Ferro: 0 -> 3
  Bronze: 4 -> 7
  Prata: 8 -> 11
  Ouro: 12 -> 15
  Platina: 16 -> 19
  Diamante: 20 -> 23
  Mestre: 24
  Grão-Mestre: 25
  Challenger: 26

  Ferro 4 -> Ferro 1: 14.00 // 0 -> 3: 14.00
  Ferro 1 -> Prata 4: 15.00 // 3 -> 8: 15.00
  Prata 4 -> Ouro 4: 19.00 // 8 -> 12: 19.00
  Ouro 4 -> Platina 4: 24.00 // 12 -> 16: 24.00
  Platina 4 -> Diamante 4: 35.00 // 16 -> 20: 35.00
  Diamante 4 -> Diamante 3: 90.00 // 20 -> 21: 90.00
  Diamante 3 -> Diamante 2: 100.00 // 21 -> 22: 100.0
  Diamante 2 -> Diamante 1: 120.00 // 22 -> 23: 120.00
  Diamante 1 -> Mestre: 180.00 // 23 -> 24: 180.00
  Mestre -> Grão-Mestre 600.00 // 24 -> 25: 600.00
  Grão-Mestre -> Desafiante 1300.00 // 25 -> 26: 1300.00
*/

const imgPath = "./assets/img",
  rankInfo={
    qt: 9,
    noDivision: 6,
    qtDivision: 4,
    coeffs: [0, 4, 8, 12, 16, 20, 24, 25, 26]
  },
  priceList={
    coeffs: [0, 3, 8, 12, 16, 20, 21, 22, 23, 24, 25, 26],
    prices: [10.0, 12.0, 18.0, 25.0, 40.0, 70.0, 100.0, 120.0, 150.0, 600.0, 1000.0]
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
    rankImage.src=imgPath+"/ranks/"+rankSelect.value+".png";
  else
    rankImage.src=imgPath+"/ranks/"+rankSelect.value+"/"+(rankInfo.qtDivision-divisionSelect.selectedIndex)+".png";
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
  let {curRankCoeff, targetRankCoeff} = getRanksCoeff(),
    {coeffs, prices} = priceList, curPrice=0, totalPrice=0;
  
  for(let i=0;i<coeffs.length-1 && coeffs[i]<=curRankCoeff;i++)
    curPrice = i;

  for(;curRankCoeff<targetRankCoeff;curRankCoeff++){
    if(coeffs[curPrice+1]<=curRankCoeff) curPrice++;

    totalPrice += prices[curPrice];
  }

  totalPrice*=(1+getExtra());

  return totalPrice;
}

function setPrice(){
  if(!isRequestValid()){
    hideElement(document.querySelector("#priceContainer"));
    showElement(document.querySelector("#alert"));
  }
  else{
    let price = calculatePrice(),
      e = document.querySelector("#price");
    e.innerHTML=moneyFormatter.format(price);

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

function drawBackground(){
  let body = document.querySelector("body");

  if(Math.random()<0.5) body.classList.add("backYasuo");
  else body.classList.add("backZed");
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
  drawBackground();
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