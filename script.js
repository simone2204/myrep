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

