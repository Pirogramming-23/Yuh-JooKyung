// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    //.then(response => console.log(response));
    .then(response => response.json())
    // .then(json => console.log(json))
    .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    const html = items.map(item => createHTMLString(item));
    // console.log(html);
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from the given item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}, ${item.color}</span>
    </li>
    `;
}

function onButtonClick(event, items) {

    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    // console.log(dataset.key);
    // console.log(dataset.value);
    // console.log(key, value);
    // console.log(items);


    if (key == null || value == null) {
        return;
    }

    // const filtered = items.filter(item => item[key] === value); 
    // console.log(filtered);

    // displayItems(filtered);
    updateItems(items, key, value);
}

function updateItems(items, key, value) {
    items.forEach(item => {
        // console.log(item);
        if (item.dataset[key] === value) {
            item.classList.remove('invisible');
        } else {
            item.classList.add('invisible');
        }
    });
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
    // console.log(items);
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);