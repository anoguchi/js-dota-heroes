import zlFetch from "https://cdn.jsdelivr.net/npm/zl-fetch@6.0.0/src/index.js";

const dotaApi = "https://api.opendota.com/api";

const heroesList = document.querySelector(".heroes-list");

zlFetch(`${dotaApi}/constants/heroes`)
  .then((response) => {
    const heroes = Object.values(response.body);

    heroes.forEach((hero) => {
      const li = document.createElement("li");
      li.classList.add("hero");
      li.innerHTML = `
          <a href="#">
          <span class="hero__name">${hero.localized_name}</span>
          <img src="https://api.opendota.com${hero.icon}" alt="${hero.localized_name}">
        </a>
      `;
      heroesList.appendChild(li);
    });
  })
  .catch((error) => console.log(error));
