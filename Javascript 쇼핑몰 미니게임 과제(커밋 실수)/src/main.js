

// Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);

}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  const html = items.map(item => createHTMLString(item)).join('')
  // console.log(html);
  container.innerHTML = items.map(item => createHTMLString(item)).join('');


}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
    <span class="item_description>${item.gender}, ${item.size}</span>
  </li>
  `
}

function onButtonClick (event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return
  }

  const filtered = items.filter(item => item[key] === value);
  // console.log(filtered);
  displayItems(filtered);

  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);

  /*
  const taret = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key==null || value==null) {
    return;
  }
    updateItems(items, key, value);
  */
  
}

function updateItems (items, key ,value) {
  items.forEach(item => {
    if(item.dataset[key] === value) {
      item.classList.remove('imvisible');
    } else {
      item.classList.add('invisible');
    }
  })
}


function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
.then(items => {
  displayItems(items);
  setEventListeners(items);
})
.catch(console.log)