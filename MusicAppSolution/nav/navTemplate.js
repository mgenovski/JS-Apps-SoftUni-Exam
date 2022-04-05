import { html } from "./../node_modules/lit-html/lit-html.js";

export let navTemplate = (navInfo) => html`
<nav>
    <img src="./images/headphones.png">
    <a href="/home">Home</a>
    <ul>
        <!--All user-->
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        ${!navInfo.isLoggedIn
        ? html`
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`
        : html`
        <li><a href="/create">Create Album</a></li>
        <li><a href="/logout">Logout</a></li>`}
    </ul>
</nav>`;