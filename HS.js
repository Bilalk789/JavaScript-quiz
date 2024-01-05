document.addEventListener("DOMContentLoaded", function() {
    fetch('your_high_scores_api_endpoint')
      .then(response => response.json())
     .then(data => {
    })
    .catch(error => console.error('Error fetching high scores:', error));  
})