document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm !== '') {
        searchMovies(searchTerm);
    }
});

function searchMovies(searchTerm) {
    const apiKey = '7ca1e05d'; // Replace with your actual OMDB API key
    const url = `https://www.omdbapi.com/?t=${searchTerm}&apikey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === 'True') {
                displayMovie(data);
            } else {
                displayNotFound();
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError();
        });
}

function displayMovie(movieData) {
    const movieDisplay = document.getElementById('movieDisplay');
    movieDisplay.innerHTML = `
        <h2>${movieData.Title} (${movieData.Year})</h2>
        <p><strong>Plot:</strong> ${movieData.Plot}</p>
        <img src="${movieData.Poster}" alt="Poster">
    `;
}

function displayNotFound() {
    const movieDisplay = document.getElementById('movieDisplay');
    movieDisplay.innerHTML = '<p>Movie not found!</p>';
}

function displayError() {
    const movieDisplay = document.getElementById('movieDisplay');
    movieDisplay.innerHTML = '<p>An error occurred. Please try again later.</p>';
}
