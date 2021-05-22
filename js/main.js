$(document).ready(() => {
  getWatchlist();

  $('#search-form').on('submit', (event => {
    let searchInput = $('#search-input').val();
    getSearchResults(searchInput);
    event.preventDefault();
  }));
});

function getSearchResults(searchInput) {
  axios.get(`https://www.omdbapi.com/?apikey=d84c5776&s=${searchInput}`)
  .then(response => {
    console.log(response);
    let searchResults = response.data.Search;
    let output = '';
    let watchlistId = JSON.parse(localStorage.getItem("movieIdArray"));
    $.each(searchResults, (index, result) => {
      let name = result.Title.replace("'", "\\'");
      const disabledOrNot = watchlistId.includes(result.imdbID) ? 'disabled' : '';

      output += `
      <container class="result">
        <div class="result-inner">
          <div>
            <img
              src="${result.Poster}"
            />
          </div>
          <div class="inner">
            <h6 class="title">${result.Title}</h6>
            <p class="year">${result.Year}</p>
          </div>
        </div>
        <div>
          <button id="${result.imdbID}" onclick="addToWatchlist('${result.imdbID}', '${result.Poster}', '${name}', '${result.Year}'); this.disabled=true;" class="btn" ${disabledOrNot}>Add</button>
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
      <container class="result">
        <div class="result-inner">
          <div>
            <img
              src="${movie.poster}"
            />
          </div>
          <div class="inner">
            <h6 class="title">${movie.title}</h6>
            <p class="year">${movie.year}</p>
          </div>
        </div>
        <div>
          <button onclick="removeFromWatchlist(${index}, '${movie.id}')" class="btn">Remove</button>
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
