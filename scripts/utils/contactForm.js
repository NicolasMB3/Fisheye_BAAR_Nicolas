// Fonction qui permet de fermer la modal
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Affichage de la modal avec le style
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const name = document.querySelector(".photograph-name").textContent;
  const contactNameContainer = document.querySelector(".modal-title");
  const focusableElements = 'button, input, textarea, [tabindex]:not([tabindex="-1"])';
  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];
  modal.style.display = "block";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.right = "0";
  modal.style.bottom = "0";
  modal.style.margin = "0";
  modal.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
  contactNameContainer.innerHTML = "Contactez-moi " + name;

  document.addEventListener("keydown", (e) => {
    let isTabPressed = e.key === "Tab";
    // Fermeture de la modal avec la touche "ESC"
    if (e.key === "Escape") closeModal();
    if (!isTabPressed) return;

    // Focus de l'imput grâce à la touche SHIFT (ArrowUP)
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    }
    else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
  firstFocusableElement.focus();
}

const contactForm = document.querySelector(".contact_form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const formData = new FormData();
  formData.append("Prénom", prenom);
  formData.append("Nom", nom);
  formData.append("Email", email);
  formData.append("Message", message);

  // Affichage des informations dans la console dev
  console.log(prenom, nom, email, message);

  closeModal();
});
