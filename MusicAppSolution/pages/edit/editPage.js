import musicService from "../../services/musicService.js";
import { editTemplate } from "./editTemplate.js";

let form = undefined;

async function submitHandler(context, id, e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    form.invalidFields = {};

    let name = formData.get('name');
    if (name.length == 0) {
        form.invalidFields.name = true;
    }

    let price = formData.get('price');
    if (price.length == 0) {
        form.invalidFields.price = true;
    }

    let releaseDate = formData.get('releaseDate');
    if (releaseDate.length == 0) {
        form.invalidFields.releaseDate = true;
    }

    let artist = formData.get('artist');
    if (artist.length == 0) {
        form.invalidFields.artist = true;
    }

    let genre = formData.get('genre');
    if (genre.length == 0) {
        form.invalidFields.genre = true;
    }
    
    let description = formData.get('description');
    if (description.length == 0) {
        form.invalidFields.description = true;
    }

    let imgUrl = formData.get('imgUrl');
    if (imgUrl.trim().length==0) {
        form.invalidFields.imgUrl = true;
    }

    if (Object.keys(form.invalidFields).length > 0) {
        let templateResult = editTemplate(form);
        alert("All fields are required!");
        return context.renderView(templateResult);
    }

    let editAlbum = {
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
    };

    let editResult = await musicService.update(editAlbum, id);
    context.page.redirect(`/details/${id}`);

}

async function getView(context) {
    let id = context.params.id;
    let album = await musicService.getOne(id);

    let boundSubmitHandler = submitHandler.bind(null, context, id);
    form = {
        submitHandler: boundSubmitHandler,
        values: {
            name: album.name,
            imgUrl: album.imgUrl,
            price: album.price,
            releaseDate: album.releaseDate,
            artist: album.artist,
            genre: album.genre,
            description: album.description
        },
        invalidFields: {}
    }
    let templateResult = editTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}