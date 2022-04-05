import { get, post, put, del } from "./../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/data/albums';

async function getAll() {
    let result = await get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`);
    return result;
}

async function getOne(id) {
    let result = await get(`${baseUrl}/${id}`);
    return result;
}

async function create(item) {
    let result = await post(baseUrl, item);
    return result;
}

async function update(item, id) {
    let result = await put(`${baseUrl}/${id}`, item);
    return result;
}

async function deleteItem(id) {
    let result = await del(`${baseUrl}/${id}`);
    return result;
}

async function getMine(userId) {
    let result = await get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
    return result;
}

async function searchAlbums(query) {
    let result = await get(`${baseUrl}?where=name%20LIKE%20%22${query}%22`);
    return result;
}

export default {
    getAll,
    getOne,
    create,
    update,
    searchAlbums,
    deleteItem,
    getMine
}