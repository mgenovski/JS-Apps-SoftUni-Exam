import musicService from "../../services/musicService.js";
import authService from "../../services/authService.js";
import { searchTemplate } from "./searchTemplate.js";

let query;

async function submitHandler(context, e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    query = formData.get('search');

    context.page.redirect('/search');
}

async function getView(context) {
    let boundSubmitHandler = submitHandler.bind(null, context);
    
    let form = {
        submitHandler: boundSubmitHandler,
        result: [],
        hasSearch: false,
        isLoggedIn: authService.isLoggedIn()
    }
    if(query!=undefined) {
        let searchResult = await musicService.searchAlbums(query);
        form.result = searchResult;
        form.hasSearch = true;
        query = undefined;
    }
    let templateResult = searchTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}