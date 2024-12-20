// FIRST WORKING API WITH OPEN'S LIBRARY WITHOUT ANY API KEY
//----------------------------------------------------------
/*async function fetchBooks(){
    try {
        const BookName = document.getElementById("BookName").value.toLowerCase();
        const author = document.getElementById("author").value.toLowerCase();
        const language = document.getElementById("language").value;
        let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(BookName)}`;

        if (author) url += `+author:${encodeURIComponent(author)}`;
        if (language) url += `&language=${language}`;

        const response = await fetch(url);

        if(!response.ok) throw new Error("Could not fetch, check if the title is correct or book not present in library");

        const books = await response.json();

        const container = document.getElementById("Container-1");
        container.innerHTML = "";

        // 'const results = books.docs.slice(0, 10);' se voglio visualizzare un numero finito di libri.
        books.docs.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.className = "book";
            const coverImg = document.createElement("img");
            const coverId = book.cover_i;
            if (coverId){
                coverImg.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
            } else {
                coverImg.alt = "cover not available";
                coverImg.src = "";
            }
            coverImg.className = "book-cover";

            coverImg.dataset.url = `https://openlibrary.org${book.key}`;
            coverImg.addEventListener("click", event => {
                  if (event.target.dataset.url) {
                        window.open(event.target.dataset.url, "_blank");
                  } else console.error("No url found for this cover");
            });

            const title = document.createElement("h4");
            title.textContent = book.title || "title not available";

            const author = document.createElement("p");
            author.textContent = `Author: ${book.author_name?.join(", ") || "unknown"}`;

            const access = document.createElement("h4");
            access.textContent = `condition: ${book.ebook_access}`;

            const language = document.createElement("h4");
            language.textContent = `lang: ${book.language?.join(", ")}`;

            const publishYear = document.createElement("p");
            publishYear.textContent = `publish year: ${book.first_publish_year}`;

            bookDiv.appendChild(coverImg);
            bookDiv.appendChild(title);
            bookDiv.appendChild(author);
            bookDiv.appendChild(access);
            bookDiv.appendChild(publishYear);
            bookDiv.appendChild(language);

            container.appendChild(bookDiv);
        });

        console.log(books);
    }
    catch(error){
        console.error(error);
    }
}
//---------------------------------------------------------*/

// IMPLEMENTAZIONE LATO CLIENT, LATO SERVER BOOKS.PHP
document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
})

function fetchBooks() {
    const url = 'http://127.0.0.1/Projects/Books.php';

    fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Network response is not ok...');
        return response.json();
    })
    .then(data => {
        console.log(data);
        if(data.error) {
            console.error('Error: ', data.error);
            displayError(data.error);
        } else {
            displayBooks(data);
        }
    })
    .catch(error => {
        console.error('Error fetching books:', error);
    })
}

function displayBooks(books) {
    const container = document.getElementById('Container-1');
    container.innerHTML = '';

    if (books.length === 0) { 
        displayError('No book found'); 
        return ;
    }

    books.forEach(book => {
        const li = document.createElement('li');
        const img = document.createElement("img");
        img.src = book.book_image || 'default_image.jpg';
        img.alt = `Cover of ${book.title}`;

        const text = document.createElement("p");
        text.textContent = `${book.title} by ${book.author}`;

        li.appendChild(img);
        li.appendChild(text);

        container.appendChild(li);
    });
}
