let list = document.querySelector(".list");
let imageHolder = document.querySelector(".image-holder");

fetch(
  "https://raw.githubusercontent.com/spectre900/sprinklr_19_may_2022/master/items.json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let item = data[0];

    let image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("src", item.previewImage);

    let title = document.createElement("input");
    title.classList.add("title");
    title.setAttribute("value", item.title);

    imageHolder.appendChild(image);
    imageHolder.appendChild(title);

    for (let item of data) {
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
    }
  });
