

const apiGrid = document.getElementById('api-grid');
const favoriteGrid = document.getElementById('favorites-grid');


const buildCard = (item) => {
  const amiiboName = document.createElement('h3');
  amiiboName.classList.add('amiibo-name');
  const nameText = document.createTextNode(item.name);

  const amiiboSeries = document.createElement('div');
  amiiboSeries.classList.add('amiibo-series');
  const Seriestext = document.createTextNode(item.gameSeries);

  const favoritebtn = document.createElement('button');
  favoritebtn.classList.add('favorite-btn');
  favoritebtn.setAttribute('data-id', `${item.head}`);
  const btnText = document.createTextNode('Add to Favorites');

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

  
  card.appendChild(cardBody);
  cardBody.appendChild(amiiboImage);
  cardBody.appendChild(popupBox);
  popupBox.appendChild(amiiboName);
  popupBox.appendChild(amiiboSeries);
  popupBox.appendChild(favoritebtn);
  amiiboName.appendChild(nameText);
  amiiboSeries.appendChild(Seriestext);
  favoritebtn.appendChild(btnText);
  return card;
}

// Fetch data from the API
fetch('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=Super Smash Bros.')
  .then(response => response.json())
  .then(data => {
    
    const arr = data.amiibo.map(entry => entry);
    const amiibos = arr.slice(0, 30);
    
    amiibos.forEach(item => {
      apiGrid.appendChild(buildCard(item))
    });
    
    
    function addToFavorites(event) {
      const itemId = event.target.dataset.head;
      const selectedItem = amiibos.find(item => item.head === parseInt(itemId));
      event.target.classList.add('active')
      
      favoriteGrid.appendChild(buildFavorite(selectedItem))
      event.target.parentElement.remove();
    }
    
    function removeFromFavorites(event) {
      const itemId = event.target.dataset.head;
      const selectedFavorite = amiibos.find(item => item.head === parseInt(itemId));      
      event.target.classList.remove('active')

      apiGrid.appendChild(buildCard(selectedFavorite))
      event.target.parentElement.remove();
    }

    const addToFavoritesButtons = document.querySelectorAll('favorite-btn');
    addToFavoritesButtons.forEach(button => {
      button.addEventListener('click', addToFavorites);
    });
    
    const removeFromFavoritesButtons = document.querySelectorAll('favorite-btn.active');
    removeFromFavoritesButtons.forEach(button => {
      button.addEventListener('click', removeFromFavorites);
    });
    

  });
