import authService from "../../services/authService.js";
import musicService from "../../services/musicService.js";
import { catalogTemplate } from "./catalogTemplates.js";

async function getView(context) {
    let allAlbums = await musicService.getAll();
    let isLoggedIn = authService.isLoggedIn();
    let templateResult = catalogTemplate(allAlbums, isLoggedIn);
    context.renderView(templateResult);
}

export default {
    getView
}