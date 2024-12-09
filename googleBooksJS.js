//-- SEARCH IN GOOGLE BOOKS WITH API KEY AUTHENTICATION--
//-----------------------------------
async function fetchBooks() {
    const bookName = document.getElementById('BookName').value;
    const author = document.getElementById('author').value;
    const apiKey = 'AIzaSyA_5zejU9GwkG-6GoNfAOjVttM8nwwJ5n8';
    let baseUrl = `https://www.googleapis.com/books/v1/volumes?q=`;
    let query = '';

    if (bookName) query += `intitle:${bookName}`;
    if (author) query += (query ? '+' : '') + `inauthor:${author}`;

    const url = `${baseUrl}${query}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore nella richiesta");

        const books = await response.json();
        displayBooks(books.items);
    } catch {
        console.error('Errore', error);
    }
}

function displayBooks(books) {
    const container = document.getElementById('Container-1');
    container.innerHTML = ''; // Pulisce il contenitore

    if (!books || books.length === 0) {
        container.innerHTML = '<p>Nessun libro trovato</p>';
        return;
    }

    books.forEach(book => {
        const title = book.volumeInfo.title || 'Titolo non disponibile';
        const authors = book.volumeInfo.authors?.join(', ') || 'Autore non disponibile';
        const cover = book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg';

        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `<img src="${cover}" alt="Copertina del libro">
            <h4>${title}</h4>
            <p>Autore: ${authors}</p>`;

        container.appendChild(bookElement);

        console.log(books);
    });
}