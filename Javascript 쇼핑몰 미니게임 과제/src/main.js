

// Fetch the items from the JSON file
funtion loadItems() {
  return fetch('data/data.json')
  .then(response => response.hson())
  .then(json => json.itmes);

}

// main
loadItems()
.then(items => {
  displayItmes(items);
  setEventListners(itmes);
})
.catch(console.log)