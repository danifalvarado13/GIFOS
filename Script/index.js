//Traigo los elementos a usar
let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");

//Lo que pasa cuando se oprime el boton buscar
searchForm.addEventListener("submit",function(e){
    e.preventDefault()
    const q = searchInput.value;
    search(q)
})

function search(q){
    // API KEY de Giphy 
    const api_Key = "NrHH3zVQo9u2guVl7xtYGWphJ9Jl997r";
    let path = `https://api.giphy.com/v1/gifs/search?api_key=${api_Key}&q=${q}&limit=12`

    //Se hace la solicitud a giphy y devuelve un objeto
    fetch(path).then(function(res) {
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
    