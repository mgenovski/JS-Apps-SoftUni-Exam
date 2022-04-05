import authService from "../../services/authService.js";
import musicService from "../../services/musicService.js";
import { detailsTemplate } from "./detailsTemplate.js";

async function deleteHandler(context, id, e) {
    let confirmed = confirm('Are you sure you whant to delete this album?');
    if (confirmed) {
        let deleteResult = await musicService.deleteItem(id);
        context.page.redirect('/catalog');
    }
}

async function getView(context) {
    let id = context.params.id;
    let boundDeleteHandler = deleteHandler.bind(null, context, id);
    let album = await musicService.getOne(id);
    album.imgUrl = await album.imgUrl.startsWith('.') ? album.imgUrl.substring(1) : album.imgUrl;
    let isOwner = authService.getUserId() === album._ownerId;
    let templateResult = detailsTemplate(album, boundDeleteHandler, isOwner);
    context.renderView(templateResult);
}

export default {
    getView
}