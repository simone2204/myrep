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

// -----------------------------------------------------------

let string = 'President-elect Trump promised a 25 percent tariff on Canada and Mexico, and an additional 10 percent on China, blaming the flow of drugs and migrants.'
document.getElementById("ID-1").textContent = string;

//----------------------------------------------------------------------

// 1) UTILIZZARE ADDEVENTLISTENER()

