function photographerFactory(data) {

    const { name, portrait, id, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const photographerLink = "photographer.html"

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const a = document.createElement('a');
        img.setAttribute("src", picture);
        h2.textContent = name;
        p.textContent = `${city}, ${country}`;
        p2.textContent = tagline;
        p3.textContent = price + '€/jour'
        a.classList.add('linkArticle')
        a.href = `${photographerLink}?id=${id}`;
        a.append(img, h2);
        article.append(a, p, p2, p3);
        return (article);
    }

    return { name, picture, getUserCardDOM }
}