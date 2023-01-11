function photographerFactory(data) {

  const { name, portrait, id, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;
  const photographerLink = "photographer.html"

  // Function d'usine qui permet de créer chaque element du DOM pour un photographe
  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute("tabindex", 1);
    a.setAttribute("data-id", id);
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    h2.textContent = name;
    p.textContent = `${city}, ${country}`;
    p2.textContent = tagline;
    p3.textContent = price + '€/jour'
    a.classList.add('linkArticle')
    // On met l'id dans l'URL pour venir le récupérer sur la prochaine page
    a.href = `${photographerLink}?id=${id}`;
    a.append(img, h2);
    article.append(a, p, p2, p3);
    return (article);
  }

  return { name, picture, id, getUserCardDOM }
}