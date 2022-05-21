let list = document.querySelector(".list");
let imageHolder = document.querySelector(".image-holder");

function displayItem(item) {
  let image = document.createElement("img");
  image.classList.add("image");
  image.setAttribute("src", item.previewImage);

  let title = document.createElement("input");
  title.classList.add("title");
  title.setAttribute("value", item.title);

  imageHolder.innerHTML = "";
  imageHolder.appendChild(image);
  imageHolder.appendChild(title);
}

function highlight(element) {
  for (child of list.children) {
    child.classList.remove("highlight");
  }
  element.classList.add("highlight");
}

function addItemToList(item) {
  let listItem = document.createElement("div");
  listItem.classList.add("list-item");

  let listItemImage = document.createElement("img");
  listItemImage.classList.add("image-icon");
  listItemImage.setAttribute("src", item.previewImage);

  let listItemTitle = document.createElement("span");
  listItemTitle.classList.add("image-title");
  listItemTitle.innerHTML = item.title;

  listItem.appendChild(listItemImage);
  listItem.appendChild(listItemTitle);

  list.appendChild(listItem);

  listItem.addEventListener("click", function () {
    displayItem({
      previewImage: listItemImage.getAttribute("src"),
      title: listItemTitle.innerHTML,
    });
    highlight(listItem);
  });
}

fetch(
  "https://raw.githubusercontent.com/spectre900/sprinklr_19_may_2022/master/items.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let item of data) {
      addItemToList(item);
    }
    displayItem(data[0]);
    highlight(list.children[0]);
  });
