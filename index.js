import redditapi from "./redditapi";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  const searchTerm = searchInput.value;
  console.log(searchTerm);

  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  console.log(sortBy);

  const searchLimit = document.getElementById("limit").value;
  console.log(searchLimit);

  if (searchTerm === "") {
    showMessage("Please add a search term", " alert alert - danger");
  }

  searchInput.value = "";

  redditapi.search(searchTerm, searchLimit, sortBy).then((results) => {
    console.log(results);
    let output = '<div class="card-columns">';
    results.forEach(function (post) {
      let image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";

      output += `
        <div class ="card" >
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class ="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card=text">${truncateString(post.selftext, 100)}</p>
        <a href ="${
          post.url
        }" target="_ blank" class ="btn btn-primary">Read more</a>
        <hr>
        <span class ="badge badge-secondary">Subreddit: ${post.subreddit}</span>
        
        </div>
        </div>
        `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault();
});

function showMessage(message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");

  searchContainer.insertBefore(div, search);
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}

function truncateString(myString, limit) {
  const shortened = myString.indexOf(" ", limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}
