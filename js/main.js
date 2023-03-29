
const favoritesCount = 0;
// Fetch data from the API
fetch('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=Super Smash Bros.')
  .then(response => response.json())
  .then(data => {
    
    const arr = data.amiibo.map(entry => entry);
    const amiibos = arr.slice(0, 30);
    const apiGrid = document.getElementById('api-grid');
    const favoriteGrid = document.getElementById('favorites-grid');
    amiibos.forEach(item => {
      const itemHtml = `
      <div class="amiibo-card" data-item="amiibo" data-open="api-${amiibos.indexOf(item)}" id="amiibo-container">
        <div class="card-body">
          <img src="${item.image}" alt="${item.name}">
        <div class="amiibo-popup-box">
          <h3 class="amiibo-name">${item.name}</h3>
          <div class="amiibo-genre">${item.gameSeries}</div>
          <button class="favorite-btn" data-id="${item.id}">&#9734;</button>
        </div>
        </div>
      </div>
      `;
      apiGrid.appendChild(itemHtml);
    });
    
    
    function addToFavorites(event) {
      const itemId = event.target.dataset.id;
      const selectedItem = amiibos.find(item => item.id === parseInt(itemId));
      
      const favoriteHtml = `
      <div class="favorite-card" data-item="api" data-open="api-1" id="favorite-container">
      <div class="card-body">
        <img src="${selectedItem.image}" alt="${item.name}">
        <div class="amiibo-popup-box">
          <h3 class="amiibo-name">${selectedItem.name}</h3>
          <div class="amiibo-genre">${selectedItem.gameSeries}</div>
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
      const selectedFavorite = amiibos.find(item => item.id === parseInt(itemId));
      
      const amiiboHtml = `
      <div class="amiibo-card" data-item="amiibo" data-open="api-${amiibos.indexOf(item)}" id="amiibo-container">
      <div class="card-body">
        <img src="${selectedFavorite.image}" alt="${item.name}">
      <div class="amiibo-popup-box">
        <h3 class="amiibo-name">${selectedFavorite.name}</h3>
        <div class="amiibo-genre">${selectedFavorite.gameSeries}</div>
        <button class="favorite-btn" data-id="${selectedFavorite.id}">Add to Favorites</button>
      </div>
      </div>
    </div>
      `;
      apiGrid.appendChild(amiiboHtml);
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
