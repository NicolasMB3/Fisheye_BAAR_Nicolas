class Lightbox {

  static init() {
    const links = Array.from(document.querySelectorAll("img:not(.logo):not(.heading-image):not(.close):not(.pp):not(#close):not(.heart-icon):not(.heart-icon-bottom), video"));
    const gallery = links.map((link) => link.getAttribute("src"));
    const alts = links.map((link) => link.getAttribute("alt"));

    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(
          e.currentTarget.getAttribute("src"),
          gallery,
          alts,
          e.currentTarget.getAttribute("alt")
        );
      })
    );

    links.forEach((link) =>
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          new Lightbox(
            e.currentTarget.getAttribute("src"),
            gallery,
            alts,
            e.currentTarget.getAttribute("alt")
          );
        }
      })
    );
  }

  // Créer et initialiser un objet
  constructor(url, gallery, alts, alt) {
    this.element = this.buildDOM(url);
    this.gallery = gallery;
    this.alts = alts;
    url.endsWith(".mp4") ? this.loadVideo(url, alt) : this.loadImage(url, alt);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  // Première méthode
  loadImage(url, alt) {
    document.body.style.overflowY = "hidden";
    this.alt = alt;
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    const caption = document.createElement("p");
    const figContainer = document.createElement("figure");
    figContainer.appendChild(image);
    figContainer.appendChild(caption);
    caption.innerHTML = this.alt;
    loader.classList.add("lightbox_loader");
    container.innerHTML = "";
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(figContainer);
      this.url = url;
      this.alt = alt;
    };
    image.src = url;
    image.setAttribute("alt", "Image: " + this.alt)
  }

  loadVideo(url, alt) {
    document.body.style.overflowY = "hidden";
    this.alt = alt;
    this.url = null;
    const video = document.createElement("video");
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    const caption = document.createElement("p");
    const figContainer = document.createElement("div");
    const refresher = () => {
      container.replaceChildren(figContainer);
      this.alt = alt;
      this.url = url;
    };
    figContainer.appendChild(video);
    figContainer.appendChild(caption);
    caption.innerHTML = this.alt;
    loader.classList.add("lightbox_loader");
    container.innerHTML = "";
    container.appendChild(loader);
    video.onloadeddata = refresher;
    video.setAttribute("src", url);
    video.setAttribute("controls", true);
    video.setAttribute("autoplay", true);
    video.setAttribute("preload", "auto");
    video.setAttribute("alt", alt);
    this.url = url;
    video.src = url;
    video.innerHTML = `<source src="${url} alt="${this.alt}" type="video/mp4">`;
  }

  next(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === this.gallery.length - 1) i = -1;
    // Opérateur conditionnel : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    this.gallery[i + 1].endsWith(".mp4") ? this.loadVideo(this.gallery[i + 1], this.alts[i + 1]) : this.loadImage(this.gallery[i + 1], this.alts[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === 0) i = this.gallery.length;
    this.gallery[i - 1].endsWith(".mp4") ? this.loadVideo(this.gallery[i - 1], this.alts[i - 1]) : this.loadImage(this.gallery[i - 1], this.alts[i - 1]);
  }

  close(e) {
    e.preventDefault();
    document.body.style.overflowY = "auto";
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    // removeEventListener supprime d'une EventTarget (cible) un écouteur d'évènements précédemment enregistré
    document.removeEventListener("keyup", this.onKeyUp);
  }

  stopPlayVideo() {
    const video = this.element.querySelector("video");
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  onKeyUp(e) {
    switch (e.key) {
      case 'Escape':
        this.close(e);
        break
      case 'ArrowLeft':
        this.prev(e);
        break
      case ' ':
        this.stopPlayVideo();
        break
      case 'ArrowRight':
        this.next(e);
        break
    }
  }

  buildDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
            <button class="lightbox_close"></button>
            <button class="lightbox_next"></button>
            <button class="lightbox_prev"></button>
            <div class="lightbox_container">
            </div>`;
    dom.querySelector(".lightbox_close").addEventListener("click", this.close.bind(this));
    dom.querySelector(".lightbox_next").addEventListener("click", this.next.bind(this));
    dom.querySelector(".lightbox_prev").addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

export default Lightbox;
