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
          <a onclick="addToWatchlist('${result.imdbID}')" class="btn btn-primary">Add</a>
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
  let parsedArray = JSON.parse(localStorage.getItem("idArray"));
  console.log(parsedArray);

  if (parsedArray) {
    let output = '';
    $.each(parsedArray, (index, id) => {
      console.log(typeof id)
      axios.get(`http://www.omdbapi.com/?&apikey=d84c5776&i=${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    });
  }

  // $.each(parsedArray, (index, result) => {
  //   output += `
  //   <container class="row result">
  //     <div class="col">
  //       <img
  //         src="${result.Poster}"
  //       />
  //     </div>
  //     <div class="col">
  //       <h6>${result.Title}</h6>
  //       <p>${result.Year}</p>
  //     </div>
  //     <div class="col">
  //       <a onclick="addToWatchlist(${result.imdbID})" class="btn btn-primary">Add</a>
  //     </div>
  //   </container>
  //   `
  // });
  // console.log(output);
  // $('#list').html(output);

}

function addToWatchlist(id) {
  console.log(typeof id);

  if (localStorage.getItem("idArray") == null) {
    localStorage.setItem("idArray", "[]");
  }

  let parsedArray = JSON.parse(localStorage.getItem("idArray"));
  parsedArray.push(id);
  localStorage.setItem("idArray", JSON.stringify(parsedArray));

  getWatchlist();
}




// addNewEntry
// readData 
// saveData 
// updateEntries