let searchInputEl = document.getElementById("searchInput");
let selectDisplayCountEl = document.getElementById("selectDisplayCount");
let searchResultsEl = document.getElementById("searchResults");
let noResultEl = document.createElement("p");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearchResult(book) {

    let resultEl = document.createElement("div");
    resultEl.classList.add("col-6", "text-center");
    searchResultsEl.appendChild(resultEl);

    let imageEl = document.createElement("img");
    imageEl.src = book.imageLink;
    resultEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.textContent = book.author;
    authorEl.classList.add("text-center");
    resultEl.appendChild(authorEl);
    console.log(searchResultsEl);

}

function displayBooks(jsondata) {
    spinnerEl.classList.add("d-none");
    if (jsondata.search_results.length === 0) {
        searchResultsEl.textContent = "No Results Found";
    } else {
        searchResultsEl.textContent = "";
        let rEl = document.createElement("div");
        rEl.classList.add("col-12");
        rEl.textContent = "Popular Books";
        searchResultsEl.appendChild(rEl);
    }

    for (let book of jsondata.search_results) {
        console.log(book);
        createAndAppendSearchResult(book);
    }
}

function searchBooks(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");

        let search = searchInputEl.value;
        let count = selectDisplayCountEl.value;
        console.log(count);
        let url = "https://apis.ccbp.in/book-store?title=" + search + "&maxResults=" + count;
        console.log(url);
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                displayBooks(jsondata);
            });
    }
}

searchInputEl.addEventListener("keydown", searchBooks);