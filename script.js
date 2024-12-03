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
button.addEventListener("click", event =>{
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
newContainer.id = "newContainer";
newContainer.style.display = "flex";
newContainer.style.height = "20rem";
newContainer.style.borderRadius = "10px";
newContainer.style.marginTop = "1rem";
newContainer.style.justifyContent = "center";
newContainer.style.backgroundImage = "url('journal/journal.jpg')";
const box3 = document.getElementById("GamesContainer");
box3.parentNode.insertBefore(newContainer, box3);

const newElement = document.createElement("h1");
newElement.id = "newH1";
newElement.textContent = "Click me to change the font-style";
newElement.style.width = "55%";
newElement.style.textAlign = "center";
newElement.style.backgroundColor = "white";
newElement.style.marginTop = "140px";
newElement.style.height = "40px";
newElement.style.borderRadius = "10px";
newElement.style.cursor = "pointer";
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
