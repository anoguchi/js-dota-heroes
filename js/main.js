import zlFetch from "https://cdn.jsdelivr.net/npm/zl-fetch@6.0.0/src/index.js";

const dotaApi = "https://api.opendota.com/api";

const heroesList = document.querySelector(".heroes-list");
const filtersDiv = document.querySelector(".filters");

zlFetch(`${dotaApi}/constants/heroes`)
  .then((response) => {
    const heroes = Object.values(response.body);

    heroes.forEach((hero) => {
      const li = document.createElement("li");
      li.classList.add("hero");
      li.innerHTML = `
        <a href="#">
          <span class="hero__name">${hero.localized_name}</span>
          <img src="https://api.opendota.com${hero.img}" alt="${hero.localized_name} image">
        </a>
      `;
      heroesList.appendChild(li);
    });

    filtersDiv.addEventListener("change", (event) => {
      const selectedAttackTypes = [
        ...document.querySelectorAll("#attack-type input:checked"),
      ].map((checkbox) => checkbox.id);
      const filtered = heroes.filter((hero) => {
        if (selectedAttackTypes.length === 0) return true;
        const attackType = hero.attack_type.toLowerCase();
        return selectedAttackTypes.includes(attackType);
      });
      heroesList.innerHTML = "";
      filtered.forEach((hero) => {
        const li = document.createElement("li");
        li.classList.add("hero");
        li.innerHTML = `
      <a href="#">
        <span class="hero__name"> ${hero.localized_name} </span>
        <img src="https://api.opendota.com${hero.img}" alt="${hero.localized_name} image">
      </a>
    `;
        heroesList.appendChild(li);
      });
    });
  })
  .catch((error) => console.log(error));
