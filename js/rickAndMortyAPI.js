const API_ENDPOINT = "https://rickandmortyapi.com/api/character";

const getCharacters = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      dataRender(data.results);
      pagination(data.info);
    })
    .catch((error) => console.error("Error:", error));
};

const dataRender = (characters) => {
  if (characters.length === 0) {
    document.querySelector(".dataAlbum").innerHTML =
      "<h2>No characters found</h2>";
    return;
  }
  const charactersContainer = document.querySelector(".dataAlbum");
  const charactersRendering = characters.map(
    (character) =>
      `<div class= "col">
    <div class= "card h-100" style= "width: 12rem;">
    <img src="${character.image}" class="card-img-top" alt="img-personaje">
    <h2 class="card-title" > ${character.name} </h2>
    <div class="card-body">
    <h5 class="card-title">Status: ${character.status}</h5>
    <h5 class="card-title">Species: ${character.species}</h5>
    </div>
    </div>
    </div>
    `
  );
  charactersContainer.innerHTML = charactersRendering.join("");
};

const pagination = (info) => {
  let prevIsDisabled = info.prev ? "" : "disabled";
  let nextIsDisabled = info.next ? "" : "disabled";
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = `
  <li class="page-item ${prevIsDisabled}">
    <a class="page-link" href="#" onclick="getCharacters('${info.prev}')">Previous</a>
  </li>
  <li class="page-item ${nextIsDisabled}">
    <a class="page-link" href="#" onclick="getCharacters('${info.next}')">Next</a>
  </li>
  `;
};

getCharacters(API_ENDPOINT);
