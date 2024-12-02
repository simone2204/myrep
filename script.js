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
//----------------------------------------------------------------------

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


//------------------------------------------------------------
