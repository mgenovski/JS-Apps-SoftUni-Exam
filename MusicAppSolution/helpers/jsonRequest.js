
async function createRequest(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const err = await response.json();
        alert(err.message);
        throw new Error(err.message);
    }
    try{
        const data = await response.json();
        return data;
    }catch (err){
    }
}

function createOptions(method, data) {
    const result = {
        method,
        headers: {}
    };
    if (data) {
        result.headers['Content-Type'] = 'application/json';
        result.body = JSON.stringify(data);
    }
    if (sessionStorage.getItem('token')) {
        result.headers['X-Authorization'] = sessionStorage.getItem('token');
    }
    return result;
}

export async function get(url) {
    return createRequest(url, createOptions('get'));
}

export async function post(url, body) {
    return createRequest(url, createOptions('post', body));
}

export async function put(url, body) {
    return createRequest(url, createOptions('put', body));
}

export async function del(url) {
    return createRequest(url, createOptions('delete'));
}