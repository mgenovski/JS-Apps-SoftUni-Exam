import musicService from "../../services/musicService.js";
import { createTemplate } from "./createTemplate.js";

let form = undefined;

async function submitHandler(context, e) {
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
        let templateResult = createTemplate(form);
        alert("All fields are required!");
        return context.renderView(templateResult);
    }

    let newAlbum = {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
    };

    let createResult = await musicService.create(newAlbum);
    context.page.redirect('/catalog');

}

async function getView(context) {
    let boundSubmitHandler = submitHandler.bind(null, context);
    form = {
        submitHandler: boundSubmitHandler,
        invalidFields: {
            name: true,
            imgUrl: true,
            price: true,
            releaseDate: true,
            artist: true,
            genre: true,
            description: true
        }
    }
    let templateResult = createTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}