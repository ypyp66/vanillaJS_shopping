//get api
function loadItems() {
  return fetch("../data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

//아이템 렌더링 함수
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

//create HTML, li
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}
function onButtonClick(e, items) {
  const { key, value } = e.target.dataset;

  if (key == undefined || value == undefined) {
    return;
  }

  //조건에 맞는 것만 렌더링
  displayItems(items.filter((item) => item[key] === value));
}

//event발생 함수들을 모아놓은 함수
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");

  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", () => onButtonClick(event, items));
}

//js파일이 로딩되면 실행
loadItems()
  .then((items) => {
    //loadItems()가 끝나면 실행
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.error());
