//Traigo los elementos a usar
let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let sliderTrending = document.getElementById("trending");
let btnDown = document.getElementById("btn-down");
let btnUp = document.getElementById("btn-up");
// API KEY de Giphy 
const api_Key = "NrHH3zVQo9u2guVl7xtYGWphJ9Jl997r";

//Se ejecuta cuando se abre la pagina
    console.log("El contenido cargo");
    //Trending Gifos para llenar el div
    let path_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_Key}&limit=9`
    let i=0;
    let o=i+3;
    //Se hace la solicitud a giphy y devuelve un objeto
    const p = fetch(path_trending).then(function(res) {
        return res.json(); 
    }).catch(function (error) { //Si el procedimiento anterior falla se ejecuta catch
        console.log(error.message);}) //Muestra el error en la consola
   trending(p)
    
    function trending(params) {
        p.then(function (json) {
            let resultsTrending = "";
            //Bucle para que tome 3 imagenes y las ponga en el slide
            while (i < o) {
                console.log(json.data[i].images.fixed_width.url);
                const url = json.data[i].images.fixed_width.url;
                const width = json.data[i].images.fixed_width.width;
                const height = json.data[i].images.fixed_width.height;
                const title = json.data[i].title;
                resultsTrending += `<img src="${url}" width="${width}" height="${height}" alt="${title}">`; 
                i++; 
                console.log("i="+i);
            }
            sliderTrending.innerHTML = resultsTrending; //Para que muestre las tendencias en el div   
        }).catch(function (error) { //Si el procedimiento anterior falla se ejecuta catch
            console.log(error.message); //Muestra el error en la consola
        })  
    }
       

    //Lo que pasa cuando se oprime el boton atras
    btnDown.addEventListener('click', function(){
        i=i-6;
        o=i+3;   
        if (!(i<0)) {
           trending(p)   
        } else{
            console.log("No hay imagenes previas")
        }   
    })

    //Lo que pasa cuando se oprime el boton adelante
    btnUp.addEventListener('click', function(){
        o=i+3;    
        if ((i!=9)) {
            trending(p)   
         } else{
             console.log("No hay mas imagenes")
         }   
    })

//Lo que pasa cuando se oprime el boton buscar
searchForm.addEventListener("submit",function(e){
    e.preventDefault()
    const q = searchInput.value;
    search(q)
})

function search(q){
    let path_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_Key}&q=${q}&limit=12`
    //Se hace la solicitud a giphy y devuelve un objeto
    fetch(path_search).then(function(res) {
       return res.json(); 
    }).then(function (json) {
        console.log(json.data[0].images.fixed_width.url); //Para que muestre los url en la consola
        let resultsEl = document.getElementById("results");
        let resultsHTML = "";
        json.data.forEach(function (object) {
            console.log(object.images.fixed_width.url);
            const url = object.images.fixed_width.url;
            const width = object.images.fixed_width.width;
            const height = object.images.fixed_width.height;
            const title = object.title;
            resultsHTML += `<img src="${url}" width="${width}" height="${height}" alt="${object.title}">`;
        })
        resultsEl.innerHTML = resultsHTML; //Para que muestre los 12 resultados en el div   
    }).catch(function (error) { //Si alguno de los procedimientos anteriores falla se ejecuta catch
        console.log(error.message); //Muestra el error en la consola
    })
    }
    