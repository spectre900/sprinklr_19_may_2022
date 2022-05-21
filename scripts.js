let itemInFocus = 0;
let list = document.querySelector(".list");
let imageHolder = document.querySelector(".image-holder");

function displayItem(listItem) {
  let image = document.createElement("img");
  image.classList.add("image");
  image.setAttribute("src", listItem.children[0].getAttribute("src"));

  let title = document.createElement("input");
  title.classList.add("title");
  title.setAttribute("value", listItem.children[1].innerHTML);
  title.addEventListener("change", function () {
    listItem.children[1].innerHTML = title.value;
  });

  imageHolder.innerHTML = "";
  imageHolder.appendChild(image);
  imageHolder.appendChild(title);

  for (child of list.children) {
    child.classList.remove("highlight");
  }
  listItem.classList.add("highlight");
}

function addItemToList(item, itemIndex) {
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
    displayItem(listItem);
    itemInFocus = itemIndex;
  });
}

fetch(
  "https://raw.githubusercontent.com/spectre900/sprinklr_19_may_2022/master/items.json"
)
  .then((response) => {
    return response.json();
  })
  .then((items) => {
    let itemIndex = 0;
    for (let item of items) {
      addItemToList(item, itemIndex);
      itemIndex++;
    }
    displayItem(list.children[itemInFocus]);

    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        if (itemInFocus < list.children.length - 1) {
          itemInFocus++;
          displayItem(list.children[itemInFocus]);
        }
      } else if (event.key === "ArrowUp") {
        if (itemInFocus > 0) {
          itemInFocus--;
          displayItem(list.children[itemInFocus]);
        }
      }
    });
  });
