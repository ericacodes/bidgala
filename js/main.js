$(document).ready(() => {
  let imdbIDs = ["hi"];
  // getImdbIDs();

  $('#search-form').on('submit', (event => {
    let searchInput = $('#search-input').val();
    getSearchResults(searchInput);
    event.preventDefault();
  }));

});

function getSearchResults(searchInput) {
  axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=d84c5776&s=${searchInput}`)
  .then(response => {
    console.log(response)
    let searchResults = response.data.Search;
    let output = '';
    $.each(searchResults, (index, result) => {
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
          <a onclick="addMovie('${result.imdbID}')" class="btn btn-primary">Add</a>
        </div>
      </container>
      `
    });

    console.log(output);
    $('#output').html(output);
  })
  .catch(error => console.log(error));
}

function getArray() {
  let parsedArray = JSON.parse(localStorage.getItem("idArray"));
  
  if (parsedArray) {
    array = idArray;
  }
}

function addMovie(id) {
  localStorage.setItem("idArray", JSON.stringify(array));
}