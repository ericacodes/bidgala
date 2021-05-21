$(document).ready(() => {
  getWatchlist();

  $('#search-form').on('submit', (event => {
    let searchInput = $('#search-input').val();
    getSearchResults(searchInput);
    event.preventDefault();
  }));

});

function getSearchResults(searchInput) {
  axios.get(`http://www.omdbapi.com/?apikey=d84c5776&s=${searchInput}`)
  .then(response => {
    let searchResults = response.data.Search;
    let output = '';
    let watchlistId = JSON.parse(localStorage.getItem("movieIdArray"));
    $.each(searchResults, (index, result) => {
      let name = result.Title.replace("'", "\\'");
      const disabledOrNot = watchlistId.includes(result.imdbID) ? 'disabled' : '';

      output += `
      <container class="row result">
        <div class="col">
          <img
            src="${result.Poster}"
          />
        </div>
        <div class="col">
          <h6>${result.Title}</h6>
          <p>${result.Year}</p>
        </div>
        <div class="col">
          <button id="${result.imdbID}" onclick="addToWatchlist('${result.imdbID}', '${result.Poster}', '${name}', '${result.Year}'); this.disabled=true;" class="btn btn-primary" ${disabledOrNot}>Add</button>
        </div>
      </container>
      `
      
    });

    console.log(output);
    $('#output').html(output);
  })
  .catch(error => console.log(error));
}

function getWatchlist() {
  let parsedInfo = JSON.parse(localStorage.getItem("movieInfoArray"));

  if (parsedInfo) {
    let output = '';
    $.each(parsedInfo, (index, movie) => {
      output += `
      <container class="row result">
        <div class="col">
          <img
            src="${movie.poster}"
          />
        </div>
        <div class="col">
          <h6>${movie.title}</h6>
          <p>${movie.year}</p>
        </div>
        <div class="col">
          <button onclick="removeFromWatchlist(${index}, '${movie.id}')" class="btn btn-primary">Remove</button>
        </div>
      </container>
    `
    });
    $('#list').html(output);
  }
}

function addToWatchlist(id, poster, title, year) {
  let movieInfo = {
    id, poster, title, year
  }

  if (localStorage.getItem("movieInfoArray") == null) {
    localStorage.setItem("movieInfoArray", "[]");
    localStorage.setItem("movieIdArray", "[]");
  }
  let parsedInfo = JSON.parse(localStorage.getItem("movieInfoArray"));
  let parsedId = JSON.parse(localStorage.getItem("movieIdArray"));
  parsedInfo.push(movieInfo);
  parsedId.push(id);
  localStorage.setItem("movieInfoArray", JSON.stringify(parsedInfo));
  localStorage.setItem("movieIdArray", JSON.stringify(parsedId));

  getWatchlist();
}

function removeFromWatchlist(index, id) {
  $(`#${id}`).removeAttr("disabled");
  let parsedInfo = JSON.parse(localStorage.getItem("movieInfoArray"));
  let parsedId = JSON.parse(localStorage.getItem("movieIdArray"));
  parsedInfo.splice(index, 1);
  parsedId.splice(index, 1);
  localStorage.setItem("movieInfoArray", JSON.stringify(parsedInfo));
  localStorage.setItem("movieIdArray", JSON.stringify(parsedId));

  getWatchlist();
}
