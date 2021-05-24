//Traigo los elementos a usar
let searchInput = document.getElementById("search-input");
let searchPrompt = document.getElementById('search-prompt');
let btnSubmit = document.getElementById("submit");
let btnReset = document.getElementById("reset");
let searchText = document.getElementById("search-text");
let resultsEl = document.getElementById("results");
let btnLess = document.getElementById("less");
let btnMore = document.getElementById("more");
let sliderTrending = document.getElementById("trending");
let btnDown = document.getElementById("btn-down");
let btnUp = document.getElementById("btn-up");
// API KEY de Giphy 
const api_Key = "NrHH3zVQo9u2guVl7xtYGWphJ9Jl997r";

//Se ejecuta cuando se abre la pagina          
let i = 0;
let o = i + 3;
let index = 0;
let limit = index + 12;
setInterval('doSomething()', 10000);
console.log("El contenido cargo, i=" + i);

//Trending Gifos para llenar el div
let path_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_Key}&limit=9`
//Se hace la solicitud a giphy y devuelve un objeto
const p = fetch(path_trending).then(function (res) {
    return res.json();
}).catch(function (error) { //Si el procedimiento anterior falla se ejecuta catch
    console.log(error.message);
}) //Muestra el error en la consola
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
            console.log("i=" + i);
        }
        sliderTrending.innerHTML = resultsTrending; //Para que muestre las tendencias en el div   
    }).catch(function (error) { //Si el procedimiento anterior falla se ejecuta catch
        console.log(error.message); //Muestra el error en la consola
    })
}


//Lo que pasa cuando se oprime el boton atras del slide
btnDown.addEventListener('click', function () {
    if (i == 3) {
        console.log("No hay imagenes previas, i=" + i)
    } else {
        i = i - 6;
        o = i + 3;
        trending(p)
    }
})

//Lo que pasa cuando se oprime el boton adelante del slide
btnUp.addEventListener('click', function () {
    if (i == 9) {
        console.log("No hay mas imagenes, i=" + i)
    } else {
        o = i + 3;
        trending(p)
    }
})

//Para que el slide cambie las imagenes cada 10 segundos
function doSomething() {
    if (i == 9) {
        i = 0;
        doSomething()
    } else {
        o = i + 3;
        trending(p)
    }
}

//Para cargar las sugerencias de busqueda
searchInput.addEventListener('keyup', function () {
    const q = searchInput.value;
    let path_prompt = `https://api.giphy.com/v1/tags/related/${q}?api_key=${api_Key}&limit=4`;
    if (q.length >= 1) {
        //Se hace la solicitud a giphy y devuelve un objeto
        fetch(path_prompt).then(function (res) {
            return res.json();
        }).then(function (json) {
            let resultsHTML = "";
            json.data.forEach(function (object) {
                resultsHTML += `<li class="prompt">
            <p class="buscador-sugerencia-texto" >${object.name}</p> 
            </li>`
            })
            searchPrompt.innerHTML = resultsHTML; //Para que muestre los 4 resultados en la lista de sugerencias 
        }).catch(function (error) { //Si alguno de los procedimientos anteriores falla se ejecuta catch
            console.log(error.message); //Muestra el error en la consola
        })
        btnReset.style.display = "block";
    } else {
        console.log("No hay texto para buscar")
    }
});

//Los que pasa cuando se hace click en una de las sugerencias de busqueda
searchPrompt.addEventListener('click', function (li) {
    searchInput.value = li.target.textContent;
    let path_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_Key}&q=${searchInput.value}`;
    search(path_search)
    index = 0;
    limit = 12;
})

//Lo que pasa cuando se oprime el boton cerrar en la barra de busqueda
btnReset.addEventListener("click", function (e) {
    searchInput.value = "";
    searchInput.placeholder = "Busca GIFOS y más";
    btnSubmit.style.display = "block";
    btnReset.style.display = "none";
    index = 0;
    limit = 12;
})

//Lo que pasa cuando se oprime el boton buscar de la barra de busqueda
btnSubmit.addEventListener("click", function (e) {
    e.preventDefault()
    const q = searchInput.value;
    console.log(q)
    let path_more = `https://api.giphy.com/v1/gifs/search?api_key=${api_Key}&q=${q}`;
    index = 0;
    limit = 12;
    search(path_more)
    searchText.innerText = q; //Para que muestre el texto buscado arriba de los resultados
})

//Lo que pasa cuando se oprime el boton atras en los resultados
btnLess.addEventListener("click", function (e) {
    e.preventDefault()
    const q = searchInput.value;
    console.log(q)
    let path_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_Key}&q=${q}`;
    if (index == 12) {
        console.log("No hay imagenes previas, index=" + index)
    } else {
        index = index - 24;
        limit = index + 12;
        search(path_search)
    }
    searchText.innerText = q; //Para que muestre el texto buscado arriba de los resultados
})

//Lo que pasa cuando se oprime el boton ver mas en los resultados
btnMore.addEventListener("click", function (e) {
    e.preventDefault()
    const q = searchInput.value;
    console.log(q)
    let path_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_Key}&q=${q}`;
    if (index == 48) {
        console.log("No hay mas resultados, index=" + index)
    } else {
        resultsEl.innerHTML = ``;
        limit = index + 12;
        search(path_search)
    }
    searchText.innerText = q; //Para que muestre el texto buscado arriba de los resultados
})

//el metodo se usa para las sugerencias y la busqueda
function search(path) {
    //Se hace la solicitud a giphy y devuelve un objeto
    fetch(path).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json);
        let resultsHTML = "";
        //Bucle para que tome 12 imagenes y las muestre
        while (index < limit) {
            putButtons(json.data[index])
            index++;
            console.log("index=" + index);
        }
    }).catch(function (error) { //Si alguno de los procedimientos anteriores falla se ejecuta catch
        console.log(error.message); //Muestra el error en la consola
    })
}

//Para añadir los tres botones de funcionalidad a cada imagen
function putButtons(content) {
    resultsEl.innerHTML += `
                <div class="results-card" onclick="maxGifMobile('${content.images.fixed_width.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
                <div class="gif-actions">
                    <div class="icons-actions-gif">
                        <button class="icon-action-favorite" onclick="addFavorite('${content.id}')">Añadir</button>
                        <button class="icon-action-download" onclick="downloadGif('${content.images.fixed_width.url}', '${content.slug}')">Descargar</button>
                        <button class="icon-action-expand" onclick="maxGifDesktop('${content.images.fixed_width.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">Expandir</button>
                    </div>
                    <div class="Description-gif">
                        <p class="user-gif-results">${content.username}</p>
                        <p class="title-gif-results">${content.title}</p>
                    </div>
                </div>
                <img src="${content.images.fixed_width.url}" alt="${content.id}" class="results-gif" >
            </div>`;
}

