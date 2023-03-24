
const favoritesCount = 0;
// Fetch data from the API
fetch('https://api.themoviedb.org/3/movie/550?api_key=32a5f3c6ca624e33f29bf9ea47ee29f7')
  .then(response => response.json())
  .then(data => {

    const items = data.slice(0, 30);
    const apiGrid = getElementById('api-grid');
    items.forEach(item => {
      const itemHtml = `
      <div class="movie-card" data-item="movie" data-open="api-${items.indexOf(item)}" id="movie-container">
        <div class="card-body">
          <img src="${item.poster_path}" alt="movie">
        <div class="movie-popup-box">
          <h3 class="movie-title">${item.title}</h3>
          <div class="movie-genre">${item.genres.filter(genre => genre.name)}</div>
          <button class="favorite-btn" data-id="${item.id}">&#9734;</button>
        </div>
        </div>
      </div>
      `;
      apiGrid.appendChild(itemHtml);
    });
    
    
    function addToFavorites(event) {
      const itemId = event.target.dataset.id;
      const selectedItem = items.find(item => item.id === parseInt(itemId));
      const favoriteGrid = document.getElementById('favorites-grid');
      const favoriteHtml = `
      <div class="favorite-card" data-item="api" data-open="api-1" id="favorite-container">
      <div class="card-body">
        <img src="${selectedItem.poster_path}" alt="movie">
        <div class="movie-popup-box">
          <h3 class="move-title">${selectedItem.title}</h3>
          <div class="movie-genre">${selectedItem.genres.filter(genre => genre.name)}</div>
          <button class="remove-from-favorites" data-id="${selectedItem.id}">Remove from Favorites</button>
        </div>
        </div>
      </div>
      `;
      favoriteGrid.appendChild(favoriteHtml);
      event.target.parentElement.remove();
    }
    
    function removeFromFavorites(event) {
      const itemId = event.target.dataset.id;
      const selectedFavorite = items.find(item => item.id === parseInt(itemId));
      const movieContainer = document.getElementById('movie-container');
      const movieHtml = `
      <div class="movie-card" data-item="movie" data-open="api-${items.indexOf(item)}" id="movie-container">
      <div class="card-body">
        <img src="${selectedFavorite.poster_path}" alt="movie">
      <div class="movie-popup-box">
        <h3 class="movie-title">${selectedFavorite.title}</h3>
        <div class="movie-genre">${selectedFavorite.genres.filter(genre => genre.name)}</div>
        <button class="favorite-btn" data-id="${selectedFavorite.id}">Add to Favorites</button>
      </div>
      </div>
    </div>
      `;
      movieContainer.insertAdjacentHTML('beforeend', movieHtml);
      event.target.parentElement.remove();
    }
    
    const addToFavoritesButtons = document.querySelectorAll('.favorite-btn');
    addToFavoritesButtons.forEach(button => {
      button.addEventListener('click', addToFavorites);
      favoritesCount++;
    });
    
    const removeFromFavoritesButtons = document.querySelectorAll('.remove-from-favorites');
    removeFromFavoritesButtons.forEach(button => {
      button.addEventListener('click', removeFromFavorites);
      favoritesCount--;
    });
  });

  if(favoritesCount < 1) {
    const noFavorites = `<div class="no-favorites">No Favorites Selected!</div>`;
    favoritesGrid.appendChild(noFavorites);
  }