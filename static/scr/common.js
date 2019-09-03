const cardList = {
  Adventurer:  { action: 0, buy: 0, coin: 0, name: "冒険者" },
  Bureaucrat:  { action: 0, buy: 0, coin: 0, name: "役人" },
  Cellar:      { action: 1, buy: 0, coin: 0, name: "地下貯蔵庫" },
  Chancellor:  { action: 0, buy: 0, coin: 2, name: "宰相" },
  Chapel:      { action: 0, buy: 0, coin: 0, name: "礼拝堂" },
  CouncilRoom: { action: 0, buy: 1, coin: 0, name: "議事堂" },
  Feast:       { action: 0, buy: 0, coin: 0, name: "祝宴" },
  Festival:    { action: 2, buy: 1, coin: 2, name: "祝祭" },
  Gardens:     { action: 0, buy: 0, coin: 0, name: "庭園" },
  Laboratory:  { action: 1, buy: 0, coin: 0, name: "研究所" },
  Library:     { action: 0, buy: 0, coin: 0, name: "書庫" },
  Market:      { action: 1, buy: 1, coin: 1, name: "市場" },
  Militia:     { action: 0, buy: 0, coin: 2, name: "民兵" },
  Mine:        { action: 0, buy: 0, coin: 0, name: "鉱山" },
  Moat:        { action: 0, buy: 0, coin: 0, name: "堀" },
  Moneylender: { action: 0, buy: 0, coin: 0, name: "金貸し" },
  Remodel:     { action: 0, buy: 0, coin: 0, name: "改築" },
  Smithy:      { action: 0, buy: 0, coin: 0, name: "鍛冶屋" },
  Spy:         { action: 1, buy: 0, coin: 0, name: "密偵" },
  Thief:       { action: 0, buy: 0, coin: 0, name: "泥棒" },
  ThroneRoom:  { action: 0, buy: 0, coin: 0, name: "玉座の間" },
  Village:     { action: 2, buy: 0, coin: 0, name: "村" },
  Witch:       { action: 0, buy: 0, coin: 0, name: "魔女" },
  Woodcutter:  { action: 0, buy: 1, coin: 2, name: "木こり" },
  Workshop:    { action: 0, buy: 0, coin: 0, name: "工房" },
};
const userCount = {
  action: 1,
  buy: 1,
  coin: 0
};

const lst_s = document.getElementById('cardList_select'),
      lst_p = document.getElementById('cardList_played').children[0],
      tag_m = document.getElementsByTagName('main'),
      tag_l = document.getElementById('reset'),
      tag_a = document.getElementById('userA'),
      tag_b = document.getElementById('userB'),
      tag_c = document.getElementById('userC');

(function(){
  for (const key in cardList) {
    if (cardList.hasOwnProperty(key)) {
      let elm = document.createElement('button');
      elm.innerText = cardList[key].name;
      elm.value = key;
      elm.addEventListener('click', playAction);
      lst_s.appendChild(elm);
    }
  }

})();

function playAction(e) {
  if( userCount.action == 0 ) return;
  userCount.action += cardList[e.target.value].action - 1,
  userCount.buy    += cardList[e.target.value].buy,
  userCount.coin   += cardList[e.target.value].coin;
  update_userCount();
  lst_p.insertAdjacentHTML('beforeend',`<li><p>${cardList[e.target.value].name}</p></li>`);
  lst_s.insertBefore(e.target,lst_s.firstElementChild);
  tag_m[0].scrollTop = 0;

  if( userCount.action == 0 ) lst_s.classList.add('noadd');
  if( !lst_s.classList.contains('addHistory') ) lst_s.classList.add('addHistory');
}

function update_userCount() {
  tag_a.innerText  = userCount.action;
  tag_b.innerText  = userCount.buy;
  tag_c.innerText  = userCount.coin;
}

tag_l.addEventListener('click',function(){
  userCount.action = 1,
  userCount.buy    = 1,
  userCount.coin   = 0;
  update_userCount();
  lst_p.textContent = null;
  if( lst_s.classList.contains('noadd') ) lst_s.classList.remove('noadd');
});