
let favoritesCount = 0;
const apiGrid = document.getElementById('api-grid');
const favoriteGrid = document.getElementById('favorites-grid');
let favorite = false;

const buildCard = (item) => {
  const amiiboName = document.createElement('h3');
  amiiboName.classList.add('amiibo-name');
  const nameText = document.createTextNode(item.character);

  const amiiboSeries = document.createElement('div');
  amiiboSeries.classList.add('amiibo-series');
  const Seriestext = document.createTextNode(item.gameSeries);

  const favoritebtn = document.createElement('button');
  favoritebtn.classList.add('favorite-btn');
  favoritebtn.setAttribute('data-id', `${item.head}`);
  const btnText = document.createTextNode('&#9733');

  const popupBox = document.createElement('div');
  popupBox.classList.add('amiibo-popup-box');

  const amiiboImage = document.createElement('img');
  amiiboImage.setAttribute('src', `${item.image}`);
  amiiboImage.setAttribute('alt', `${item.name}`);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const card = document.createElement('div');
  card.classList.add('amiibo-card');
  amiiboImage.setAttribute('data-item', 'amiibo');
  
  card.setAttribute('id', 'amiibo-container');

  if (favorite === 0) {
    favoriteGrid.appendChild(card);
  } else {
    apiGrid.appendChild(card);
  }

  card.appendChild(cardBody);
  cardBody.appendChild(amiiboImage);
  cardBody.appendChild(popupBox);
  popupBox.appendChild(amiiboName);
  popupBox.appendChild(amiiboSeries);
  popupBox.appendChild(favoritebtn);
  amiiboName.appendChild(nameText);
  amiiboSeries.appendChild(Seriestext);
  favoritebtn.appendChild(btnText);
}
// Fetch data from the API
fetch('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=Super Smash Bros.')
  .then(response => response.json())
  .then(data => {
    
    const arr = data.amiibo.map(entry => entry);
    const amiibos = arr.slice(0, 30);
    
    amiibos.forEach(item => {
      buildCard(item);
    });
    
    
    function addToFavorites(event) {
      const itemId = event.target.dataset.head;
      const selectedItem = amiibos.find(item => item.head === parseInt(itemId));
      favorite = true;
      
      buildCard(selectedItem);
      event.target.parentElement.remove();
    }
    
    function removeFromFavorites(event) {
      const itemId = event.target.dataset.head;
      const selectedFavorite = amiibos.find(item => item.head === parseInt(itemId));
      favorite = false;
      
      buildCard(selectedFavorite);
      event.target.parentElement.remove();
    }
    
    const addToFavoritesButtons = document.querySelectorAll('.favorite-btn');
    addToFavoritesButtons.forEach(button => {
      button.addEventListener('click', addToFavorites);
      favoritesCount++;
    });
    
    const removeFromFavoritesButtons = document.querySelectorAll('.favorite-btn.active');
    removeFromFavoritesButtons.forEach(button => {
      button.addEventListener('click', removeFromFavorites);
      favoritesCount--;
    });

    if (favoritesCount < 1) {
      const noFavorites = document.createElement('div');
      const noFavText = document.createTextNode('No Favorites!');

      noFavorites.appendChild(noFavText);
      favoriteGrid.appendChild(noFavorites);
    }
  });
