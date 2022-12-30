export function like() {

  // Récupérer tous les boutons de like sur la page Photographer
  const likeButtons = document.querySelectorAll(".heart-icon");

  likeButtons.forEach((likeButton) => {

    // On initalise la variable clicked à false
    let clicked = false;

    likeButton.addEventListener("click", (e) => {
      const parent = likeButton.parentElement;
      const nombreDeLikes = parent.querySelector(".media-likes-count");
      const totalLikes = document.querySelector(".info-like-number");
      e.preventDefault();
      if (!clicked) {
        likeButton.style.filter = "saturate(200%)";
        nombreDeLikes.innerHTML = parseInt(nombreDeLikes.innerHTML) + 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
        clicked = true;
      } else {
        likeButton.style.filter = "saturate(100%)";
        nombreDeLikes.innerHTML = parseInt(nombreDeLikes.innerHTML) - 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
        clicked = false;
      }
    });

    likeButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const parent = likeButton.parentElement;
        const nombreDeLikes = parent.querySelector(".media-likes-count");
        const totalLikes = document.querySelector(".info-like-number");
        e.preventDefault();
        if (!clicked) {
          likeButton.style.filter = "saturate(200%)";
          nombreDeLikes.innerHTML = parseInt(nombreDeLikes.innerHTML) + 1;
          totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
          clicked = true;
        } else {
          likeButton.style.filter = "saturate(100%)";
          nombreDeLikes.innerHTML = parseInt(nombreDeLikes.innerHTML) - 1;
          totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
          clicked = false;
        }
      }
    });
  });
}
