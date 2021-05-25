    if (window.matchMedia("(max-width: 480px)").matches) {
        console.log(">480px")
        mobileExpand.style.display = "block";
        mobileExpand.innerHTML = `
    <button class="mobile-close" onclick="closeMobileExpand()"><img src="./assets/close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="mobile-gif">
    <div class="card">
        <div class="mobile-text">
            <p class="mobile-user">${user}</p>
            <p class="mobile-title">${title}</p>
        </div>
        <div>
            <button class="mobile-btn" onclick="addFavoriteMaxMobile('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-mob-${id}"></button>
            <button class="mobile-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>`;
        document.body.appendChild(mobileExpand);
    }
    console.log(id);