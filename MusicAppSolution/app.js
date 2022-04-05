import nav from "./nav/nav.js";
import page from "./node_modules/page/page.mjs";
import catalogPage from "./pages/catalog/catalogPage.js";
import createPage from "./pages/create/createPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import editPage from "./pages/edit/editPage.js";
import homePage from "./pages/home/homePage.js";
import loginPage from "./pages/login/loginPage.js";
import registerPage from "./pages/register/registerPage.js";
import searchPage from "./pages/search/searchPage.js";
import renderingMiddleware from "./rendering/renderingMiddleware.js";
import authService from "./services/authService.js";

let appContainer = document.getElementById('main-content');
let navContainer = document.getElementById('navigation');
renderingMiddleware.initialize(appContainer, navContainer);


page('/home', renderingMiddleware.decorateContext, nav.getView, homePage.getView);

page('/login', renderingMiddleware.decorateContext, nav.getView, loginPage.getView);
page('/register', renderingMiddleware.decorateContext, nav.getView, registerPage.getView);
page('/logout', async(context) => {await authService.logout(); page.redirect('/home')}, nav.getView);

page('/catalog', renderingMiddleware.decorateContext, nav.getView, catalogPage.getView);
page('/details/:id', renderingMiddleware.decorateContext, nav.getView, detailsPage.getView);
page('/create', renderingMiddleware.decorateContext, nav.getView, createPage.getView);
page('/edit/:id', renderingMiddleware.decorateContext, nav.getView, editPage.getView);

page('/search', renderingMiddleware.decorateContext, nav.getView, searchPage.getView);

page('/index.html', '/home');
page('/', '/home');

page.start();