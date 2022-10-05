const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views')); // aqui li estas dient que quan volguem seleccionar algun document dintre de views no fa falta que posem el /views devant de el nom del doc que volem obtenir
app.use(express.static('public'));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials"); 
// ...

// Add the route handlers here:


app.get('/', (req, res) => {  // aqui si que fiquem barra xq li estas dient que quant el usuari vagi a la ruta del navegador "/" es renderitzi el que tens a index.hbs
  res.render('index.hbs'); // aqui no fiquem barres per dos mortius: 1 x el que hi ha a la linea 11  i xq es un document del nostre trevall i no una ruta del navegador
});

app.get('/beers', (req, res)=>{
  punkAPI
  .getBeers()
    .then((beersArr)=>{ // guardan la resposta del metode getBeers
      res.render('beers', {beers: beersArr});
      console.log(beersArr);
      })
    .catch(error => console.log(error))  
    })
  
  
  


app.get('/random-beer', (req, res)=>{
  punkAPI
  .getRandom()
  .then((responseFromApi)=>{
    res.render('randomBeer', {beers: responseFromApi})
  })
  .catch(error => console.log(error))  

  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
