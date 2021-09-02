document.getElementById('error-message').style.display = 'none';

// spinner 
const spinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;

}

// Search area 
const searchBook = () => {
    document.getElementById('search-result').textContent = '';
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // clear search field 
    searchField.value = "";

    // Handle empty search request
    if (searchText === '') {
        displayError();
    }
    // load data 
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
        // display spinner 
        spinner('block');
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('book-numbers').textContent = '';
    }
}
// error handling function 
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('search-result').textContent = '';
    document.getElementById('book-numbers').textContent = '';

}
// Display search result 
const displaySearchResult = books => {
    console.log(books)
    const searchResult = document.getElementById('search-result')
    document.getElementById('error-message').style.display = 'none';
    const bookList = books.docs;
    // slice array element 
    const arraySliceList = bookList.slice(0, 15);

    if (bookList.length === 0) {
        displayError();
    }
    // console.log(books)
    else {
        document.getElementById('book-numbers').innerText = `Showing ${arraySliceList.length} books of total ${books.numFound} results`;
        searchResult.textContent = ''
        arraySliceList.forEach(book => {
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..." height="250px">
            <div class="card-body">
                <h5 class="card-title fw-bold">Book Name: ${book.title}</h5>
                <p class="card-text">1st Publihed year: <span class="fw-bold">${book.first_publish_year}</span></p>
                <p class="card-text">Publisher:<span class="fw-bold"> ${book.publisher}<span></p>
            <p class="card-text ">Author Name:<span class="text-danger fw-bolder"> ${book.author_name}</span></p>
        </div>`
            searchResult.appendChild(div)
        });
    }
    // display spinner 
    spinner('none');
}

