import { html } from "./../../node_modules/lit-html/lit-html.js";

export let albumTemplate = (album, isLoggedIn) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.name}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLoggedIn
        ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`
        : ''
        }
    </div>
</div>`;

export let catalogTemplate = (allAlbums, isLoggedIn) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${allAlbums.length>0
    ? html`${allAlbums.map(a=>albumTemplate(a, isLoggedIn))}`
    : html`<p>No Albums in Catalog!</p>`
    }
</section>`;