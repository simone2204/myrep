function updateDate() {
    const today = new Date();
  
    const options = { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    };
    const formattedDate = today.toLocaleDateString('en-US', options);
  
    const dateElement = document.querySelector('#Date');
    if (dateElement) {
      dateElement.textContent = formattedDate;
    } else {
      console.error('Element with ID "Date" not found.');
    }
  }
updateDate();


const button = document.getElementById("readMore");
button.addEventListener("click", () =>{
  if(document.getElementById("paragraphs").style.visibility == "visible"){
    document.getElementById("paragraphs").style.visibility = "hidden";
    button.textContent = "read more";
    }
    else {
      document.getElementById("paragraphs").style.visibility = "visible";
      button.textContent = "reduce";
    }
});


const newContainer = document.createElement("div");
newContainer.classList.add("NewContainer");
newContainer.id = "newContainer";
const gamesContainer = document.getElementById("GamesContainer");
gamesContainer.parentNode.insertBefore(newContainer, gamesContainer);

const newElement = document.createElement("h1");
newElement.id = "newH1"
newElement.classList.add("new-h1");
newElement.textContent = "Click me to change the font-style";
document.getElementById("newContainer").append(newElement);


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


button_3.addEventListener("mouseover", () => {
  button_3.classList.add("hover");
});
button_3.addEventListener("mouseout", () => {
  button_3.classList.remove("hover");
});


const images_1 = document.querySelectorAll("img");
images_1.forEach(image => {
  image.addEventListener("mouseover", () => {
    const dataAttr = image.getAttribute("data-category");
    console.log(`${dataAttr}`);
    image.style.opacity='0.8';
  });
  image.addEventListener("mouseout", () => {
    image.style.opacity='1.0';
  });
});


const image_2 = document.querySelector("#Container-3 img");
image_2.addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.classList.add("modal-view");

  const modalImage = document.createElement("img");
  modalImage.src = image_2.src;
  modalImage.alt = image_2.alt;
  
  modal.appendChild(modalImage);
  document.body.appendChild(modal);
  modal.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  loadArticles();
});

function loadArticles() {
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
  image.textContent = "Loading image...";

  fetch('http://127.0.0.1/Projects/News_.php')
  .then(response => response.json())
  .then(data => {
    console.log("First fetch data:", data);

    if (data.title && data.abstract && data.lead_paragraph) {
      h1.textContent = data.title;
      p.textContent = data.abstract;
      sp.textContent = data.lead_paragraph;

      const articleId = 1;

      p.innerHTML = `${data.abstract} 
        <span class="like-icon" data-article="${articleId}">👍</span>
        <span class="like-count" id="like-article${articleId}">0</span>
        <button class="comment" data-article="${articleId}">Share a comment</button>`;

      if (data.img) {
        const img = document.createElement("img");
        img.src = data.img;
        img.alt = "Article image";
        img.classList.add("img-api");
        image.innerHTML = "";
        image.appendChild(img);
      } else {
        image.textContent = "No image available";
      }
    } else {
      h1.textContent = "Error loading article";
      p.textContent = "Error loading article";
      sp.textContent = "Error loading article";
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    h1.textContent = "Request error...";
    p.textContent = "Request error...";
    sp.textContent = "Request error...";
  });

  fetch('http://127.0.0.1/Projects/News.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (Array.isArray(data) && data.length > 0) {
      // Pulisci il contenitore articoli prima di aggiungere nuovi articoli
      document.getElementById("articles-container").innerHTML = "";

      // Itera attraverso gli articoli e crea gli elementi HTML per ciascuno
      data.forEach((article, index) => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");

        articleDiv.innerHTML = `
          <h1>${article.title}</h1>
          <p>${article.abstract}</p>
          <p>${article.lead_paragraph}</p>
          ${article.img ? `<img src="${article.img}" alt="Article image">` : "<p>No image available</p>"}
          <span class="like-icon" data-article="${index + 1}">👍</span>
          <span class="like-count" id="like-article${index + 1}">0</span>
          <button class="comment" data-article="${index + 1}">Share a comment</button>`;

        // Aggiungi l'articolo al contenitore
        document.getElementById("articles-container").appendChild(articleDiv);
      });
    }
      else {
        h1.textContent = "loading error...";
        p.textContent = "loading error...";
        sp.textContent = "loading error...";
      }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    h1.textContent = "Request error...";
    p.textContent = "Request error...";
    sp.textContent = "Request error...";
  })
}


document.addEventListener("click", (event) => {
  if (event.target.classList.contains("like-icon")) {
    console.log("userEmail: ", userEmail);

    if (!userEmail) {
      alert("Devi essere loggato per mettere like!");
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
    
    fetch("http://127.0.0.1/Projects/like.php", {
      method: "POST",
      body: JSON.stringify({ articleId: articleId }),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    .then(response => response.json())
    .then(likeCountObject => {
      if (likeCountObject.success) {
        
        likeCountElement.textContent = likeCountObject.likeCount;
        console.log("Like aggiornato:", likeCountObject);
      } else {
        alert(likeCountObject.error);
        console.error("Errore aggiornamento like:", likeCountObject.error);
      }
    })
    .catch(error => console.error("Errore nella richiesta:", error));
  }

  if (event.target && event.target.classList.contains("comment")) {
    if (!userEmail) {
      alert("Devi essere autenticato per commentare");
    } else {
      const articleId = event.target.getAttribute("data-article");
      window.location.href = `../commentPage.php?articleId=${articleId}`;
    }
  }
});


function getLikeCount(articleId) {
  fetch('http://127.0.0.1/Projects/get_likes.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ articleId: articleId })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          const likeElement = document.getElementById(`like-article${articleId}`);
          if (likeElement) {
              likeElement.innerText = data.likeCount;
          } else {
              console.error(`Elemento like-article${articleId} non trovato nel DOM`);
          }
      }
  })
  .catch(error => console.error('Errore nel recupero dei like:', error));
}
