import { html } from "./../../node_modules/lit-html/lit-html.js";

export let albumTemplate = (album, isLoggedIn) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
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

export let searchTemplate = (form) => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <div class="search">
        <form  @submit=${form.submitHandler}>
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list">Search</button>
        </form>
    </div>
    <h2>Results:</h2>
    <div class="search-result ${form.hasSearch ? "" : "hidden"}">
        ${form.result.length>0
        ? html`${form.result.map(a=>albumTemplate(a, form.isLoggedIn))}`
        : html`<p class="no-result">No result.</p>`
        }
        
    </div>
</section>`;