const data = require("./dataset/winedata.json")
console.log(data.filter(wine => wine.description.toLowerCase().includes('fruity')));
