import zlFetch from "https://cdn.jsdelivr.net/npm/zl-fetch@6.0.0/src/index.js";

/* globals zlFetch */
// ========================
// Variables
// ========================
const dotaApi = "https://api.opendota.com/api";
const heroesList = document.querySelector(".heroes-list");
const filtersDiv = document.querySelector(".filters");

// ========================
// Functions
// ========================
/**
 * Creates an <li> element for each hero and adds it to the DOM.
 * @param {object} hero - The hero
 */
function addHeroToDom(hero) {
  const li = document.createElement("li");
  li.classList.add("hero");
  li.innerHTML = `
    <a href="#">
      <span class="hero__name"> ${hero.name} </span>
      <img src="${hero.image}" alt="${hero.name} image">
    </a>
  `;
  heroesList.appendChild(li);
}

/**
 * Filters heroes according to three categories.
 * 1. Attack type
 * 2. Primary attribute
 * 3. Role
 * @param {Array} heroes - array of heroes
 */
function filterHeroesByCategories(heroes) {
  const selectedAttackTypes = [
    ...document.querySelectorAll("#attack-type input:checked"),
  ].map((checkbox) => checkbox.id);
  const selectedPrimaryAttributes = [
    ...document.querySelectorAll("#primary-attribute input:checked"),
  ].map((checkbox) => checkbox.id);
  const selectedRoles = [
    ...document.querySelectorAll("#role input:checked"),
  ].map((checkbox) => checkbox.id);

  return (
    heroes
      // Filter by attack type
      .filter((hero) => {
        if (selectedAttackTypes.length === 0) return true;
        return selectedAttackTypes.includes(hero.attackType);
      })
      // Filter by primary attribute
      .filter((hero) => {
        if (selectedPrimaryAttributes.length === 0) return true;
        return selectedPrimaryAttributes.includes(hero.primaryAttribute);
      })
      // Filter by role
      .filter((hero) => {
        if (selectedRoles.length === 0) return true;
        return selectedRoles.some((role) => {
          return hero.roles.includes(role);
        });
      })
  );
}

// ========================
// Execution
// ========================
zlFetch(`${dotaApi}/constants/heroes`)
  .then((response) => {
    const heroes = Object.values(response.body).map((hero) => {
      return {
        name: hero.localized_name,
        attackType: hero.attack_type.toLowerCase(),
        primaryAttribute: hero.primary_attr,
        roles: hero.roles.map((role) => role.toLowerCase()),
        image: `https://api.opendota.com${hero.img}`,
      };
    });

    // Put heroes into the DOM
    heroes.forEach(addHeroToDom);

    // Filter heroes
    filtersDiv.addEventListener("change", (event) => {
      const filtered = filterHeroesByCategories(heroes);
      heroesList.innerHTML = "";
      filtered.forEach(addHeroToDom);
    });
  })
  .catch(console.log);
