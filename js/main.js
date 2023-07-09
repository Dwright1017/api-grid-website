
const dataId = '[data-id]'
const IdValues = document.querySelectorAll(dataId);
const root = document.documentElement;
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
  favoritebtn.setAttribute('id', `${item.head}`);
  favoritebtn.setAttribute('data-location', 'main');

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
  return card;
}

// Fetch data from the API and build initial table
fetch('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=Super Smash Bros.')
  .then(response => response.json())
  .then(data => {
    
    const arr = data.amiibo.map(entry => entry);
    const amiibos = arr.slice(0, 30);
    
    amiibos.forEach(item => {
      apiGrid.appendChild(buildCard(item))
    });

    const favBtns = document.querySelectorAll('.favorite-btn');
    console.log(favBtns);
    favBtns.forEach((item) => {
    item.addEventListener('click', () => {
      const GridLocation = item.dataset.location;
      const btnId = item.id;
      let direction = '';
      if (GridLocation === 'favorites') {
        direction = 'toMain';
      } else if (GridLocation === 'main') {
        direction = 'toFavs';
      }
      switchContainers(btnId, direction);
    })
  })
  });

  function sortByName() {
    const cardList = apiGrid.querySelectorAll('.amiibo-card');
    const sortedList = Array.from(cardList).sort((a, b) => {
      const aName = a.querySelector('.amiibo-name').textContent;
      const bName = b.querySelector('.amiibo-name').textContent;
      return aName.localeCompare(bName);
    });
    apiGrid.innerHTML = '';
    sortedList.forEach(card => {
      apiGrid.appendChild(card);
    });
};


//Function for switching to favorites container and vice versa and update LS
function switchContainers(id, direction) {
  const favbutton = document.getElementById(id)
  console.log(favbutton);
  const card = favbutton.parentElement.parentElement.parentElement;
  console.log(card);

  if (direction === 'toMain') {
    apiGrid.appendChild(card)
    favbutton.classList.remove('active')
    favbutton.dataset.location = 'main';
    localStorage.setItem()
  } else if (direction === 'toFavs') {
    favoriteGrid.appendChild(card)
    favbutton.classList.add('active')
    favbutton.dataset.location = 'favorites'
  }
}


//Event listeners for switch buttons
