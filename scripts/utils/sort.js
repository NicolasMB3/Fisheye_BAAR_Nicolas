const sortBy = (items, option) => {
  if (option === "popularity") {
    items.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (option === "date") {
    items.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (option === "title") {
    items.sort(function (a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase()
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  }
};

const display = (items, mediasContainer) => {
  mediasContainer.innerHTML = "";
  items.forEach((item) => {
    mediasContainer.innerHTML += buildDom(item);
  });
};

const buildDom = (item) => {
  if (item.image) {
    return buildImage(item.photographerId, item);
  } else {
    return buildVideo(item.photographerId, item);
  }
};

const buildVideo = (id, item) => {
  return `<figure>
  <video class=" media-card media-video" width="300" height="300"  src="./assets/medias/${id}/${item.video}" type="video/mp4" alt="${item.title}" tabindex="1">
      <source  src="./assets/medias/${id}/${item.video}" type="video/mp4">
      Your browser does not support the video tag.
  </video>
  <div class='figcaption-container'>
  <figcaption>${item.title}</figcaption>
  <h2 class='media-likes-count'  aria-label="${item.likes} likes" tabindex='1'>${item.likes} </h2>
  <img src='./assets/icons/heart.svg'  class='heart-icon' alt='heart' aria-label='ajouter un like' tabindex='1'>
  </div>
</figure>`;
}

const buildImage = (id, item) => {
  return `<figure>
  <img class="media-card media-image" src="./assets/medias/${id}/${item.image}" alt="${item.title}" tabindex="1">
  <div class='figcaption-container'>
  <figcaption>${item.title} </figcaption>
  <h2 class='media-likes-count' aria-label="${item.likes} likes" tabindex='1'>${item.likes} </h2> 
  <img src='./assets/icons/heart.svg'  class='heart-icon' alt='heart' aria-label='ajouter un like' tabindex='1'>
  </div>
</figure>`;
}

export const initSort = (items, option) => {
  const mediasContainer = document.querySelector(".medias_section");
  sortBy(items, option);
  display(items, mediasContainer);
};
