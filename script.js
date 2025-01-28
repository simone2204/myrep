/*Date Function*/
function updateDate() {
    const today = new Date();
  
    // Format the date to the desired string format
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
  
    // Select the element with ID "Date" and update its content
    const dateElement = document.querySelector('#Date');
    if (dateElement) {
      dateElement.textContent = formattedDate;
    } else {
      console.error('Element with ID "Date" not found.');
    }
  }
  
  updateDate(); // Call the function to display the date when the page loads

//---------------------------------------------------------------------------
// 1) UTILIZZARE ADDEVENTLISTENER()

const button = document.getElementById("readMore");
button.addEventListener("click", (event) =>{
  if(paragraphs.style.visibility === "visible"){
    document.getElementById("paragraphs").style.visibility = "hidden";
    button.textContent = "read more";
    }
    else {
      document.getElementById("paragraphs").style.visibility = "visible";
      button.textContent = "reduce";
    }
});

//------------------------------------------------------------------------------
// 2) USARE CREATEELEMENT()
const newContainer = document.createElement("div");
newContainer.classList.add("NewContainer");
newContainer.id = "newContainer";
const box3 = document.getElementById("GamesContainer");
box3.parentNode.insertBefore(newContainer, box3);

const newElement = document.createElement("h1");
newElement.id = "newH1"
newElement.classList.add("new-h1");
newElement.textContent = "Click me to change the font-style";
document.getElementById("newContainer").append(newElement);


//-------------------------------------------------------------------------
// 3) MODIFICARE L'URL DI UN'IMMAGINE TRAMITE SRC
const image = document.getElementById("images");
const button_1 = document.getElementById("button");
const images = ["sport/sport.webp", "sport/conor.webp", "sport/tennis.jpg"];
let index = 0;
function switchImages() {
  index++;
  if (index >= images.length) index = 0;
  image.src = images[index];
}
setInterval(switchImages, 10000);
button_1.addEventListener("click", switchImages);

//-----------------------------------------------------------------------
// 4) UTILIZZARE CLASSLIST
const button_2 = document.getElementById("newH1");
const button_3 = document.getElementById("title");
const fonts = ["Courier New","Cambria","Franklin Gothic Medium","Segoe UI","Georgia","Impact"];
let i = 0;
function changeFont() {
  i++;
  if (i >= fonts.length) i = 0;
  button_2.style.fontFamily = fonts[i];
  button_2.textContent = `This is '${fonts[i]}'`;
  button_3.style.fontFamily = fonts[i];
}
button_2.addEventListener("click", changeFont);

//----------------------------------------------------------------------
button_3.addEventListener("mouseover", event => {
  button_3.classList.add("hover");
});
button_3.addEventListener("mouseout", event => {
  button_3.classList.remove("hover");
});

//------------------------------------------------------------------------
// ATTRIBUTI DATA-*
const images_1 = document.querySelectorAll("img");
images_1.forEach(image => {
  image.addEventListener("mouseover", event =>{
    const dataAttr = image.getAttribute("data-category");
    console.log(`${dataAttr}`);
    image.style.opacity='0.8';
  });
  image.addEventListener("mouseout", event =>{
    image.style.opacity='1.0';
  });
});

//------------------------------------------------------------------------
// MODAL-VIEW
const image_2 = document.querySelector("#Container-3 img");
image_2.addEventListener("click", event => {
  const modal = document.createElement("div");
  modal.classList.add("modal-view");

  const modalImage = document.createElement("img");
  modalImage.src = image_2.src;
  modalImage.alt = image_2.alt;
  
  modal.appendChild(modalImage);
  document.body.appendChild(modal);
  modal.addEventListener("click", event => {
    document.body.removeChild(modal);
  });
});

//----------------------------------------------------------------------------
// NYT API TO RETRIEVE NEWS AND ARTICLES WITH PHP
document.addEventListener("DOMContentLoaded", () => {
  firstArticle();
  // setupLikeButtons();
});

function firstArticle() {
  const h1 = document.getElementById("header-1");
  const p = document.getElementById("paragrafo");
  const sp = document.getElementById("sottoParagrafo");
  const image = document.getElementById("IMG-1");

  if (!h1 || !p || !sp || !image) {
    console.error("One or more required elements are missing.");
    return;
  }

  h1.textContent = "Loading....";
  p.textContent = "Loading...";
  sp.textContent = "loading...";

  fetch('http://127.0.0.1/Projects/News.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.title && data.abstract && data.lead_paragraph) {
      h1.textContent = data.title;
      p.textContent = data.abstract;
      sp.textContent = data.lead_paragraph;

      const articleId = 1;
      // Mantieni il cuore e il contatore
      p.innerHTML = `${data.abstract} 
        <span class="like-icon" data-article="${articleId}">❤️</span>
        <span class="like-count" id="like-article${articleId}">0</span>`;

      if (data.img) {
      const img = document.createElement("img");
      img.src = data.img;
      img.alt = "article image";
      img.classList.add("img-api");
      image.innerHTML = "";
      image.appendChild(img);
     } 
     else image.textContent = "No image available";

    }
      else {
        h1.textContent = "errore nel caricamento...";
        p.textContent = "errore nel caricamento...";
        sp.textContent = "errore nel caricamento...";
      }
      h1.classList.add('visible');
      p.classList.add('visible');
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    h1.textContent = "Errore nella richiesta";
    p.textContent = "Errore nella richiesta";
    sp.textContent = "Errore nella richiesta";
  })
  .finally(() => {
    h1.classList.add('visible');
    p.classList.add('visible');
  });
}

//----------------------------------------------------------------
// LOGIN - LOGOUT MANAGER
document.addEventListener("DOMContentLoaded", () => {
  function getCookie(name) {
      let cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].split("=");
          if (cookie[0] === name) {
              return decodeURIComponent(cookie[1]);
          }
      }
      return null;
  }

  let userEmail = getCookie("user_email");
  let loginLink = document.getElementById("login");
  let userInfo = document.getElementById("user-info");

  if (userEmail) {
      // Se l'utente è loggato, sostituisce il pulsante di login con l'email e un pulsante di logout
      loginLink.style.display = "none"; // Nasconde il link di login
      userInfo.innerHTML = `<span>${userEmail}</span>
      <button id="Logout">Logout</button>`;

      // Logout: rimuove il cookie e ricarica la pagina
      document.getElementById("Logout").addEventListener("click", () => {
          document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          location.reload();
      });
  }
});

//----------------------------------------------------------------------------
// LIKES BUTTONS
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("like-icon")) {
    // Controllo login lato client
    function getCookie(name) {
      let cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === name) {
          return decodeURIComponent(cookie[1]);
        }
      }
      return null;
    }

    let userEmail = getCookie("user_email"); // Controlla se l'utente è loggato
    console.log("userEmail: ", userEmail);

    if (!userEmail) {
      alert("Devi essere loggato per mettere Mi Piace!");
      return;
    }

    const articleId = event.target.getAttribute("data-article");
    console.log("articleId", articleId);
    if (!articleId) {
      console.error("articleId non trovato");
      return;
    }
    const likeCountElement = document.getElementById(`like-article${articleId}`);

    if (!likeCountElement) {
      console.error(`Elemento con ID like-article${articleId} non trovato`);
      return;
    }

    // Recupera i like dell'utente dal localStorage
    let likedArticles = JSON.parse(localStorage.getItem("likedArticles")) || {};
    console.log("liked articles: ", likedArticles);

    if (likedArticles[articleId] && likedArticles[articleId][userEmail]) {
      alert("Hai già messo Mi Piace a questo articolo!");
      return;
    }

    // Se l'utente non ha già messo like, lo aggiunge
    likedArticles[articleId] = likedArticles[articleId] || {};
    likedArticles[articleId][userEmail] = true;
    localStorage.setItem("likedArticles", JSON.stringify(likedArticles));

    let currentLikes = parseInt(likeCountElement.textContent);
    currentLikes++; // Aggiungi un like
    likeCountElement.textContent = currentLikes;

    // Invio richiesta al server per registrare il like
    fetch("http://127.0.0.1/Projects/like.php", {
      method: "POST",
      body: JSON.stringify({ articleId: articleId }),
      headers: { 
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then(response => response.text())  // Converti la risposta in testo per debug
    .then(data => {
      console.log("Risposta dal server:", data);
      return JSON.parse(data);  // Ora prova a parsare il JSON
    })
    .then(json => {
      if (json.success) {
        console.log("Like aggiornato:", json);
      } else {
        console.error("Errore aggiornamento like:", json.error);
      }
    })
    .catch(error => console.error("Errore nella richiesta:", error));
  }
});
