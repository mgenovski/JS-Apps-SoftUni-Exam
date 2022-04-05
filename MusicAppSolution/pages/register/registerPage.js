import authService from "../../services/authService.js";
import { registerTemplate } from "./registerTemplate.js";


async function submitHandler(context, e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    const password = formData.get('password');
    const rePass = formData.get('conf-pass');
    const email = formData.get('email');

    if (password !== rePass) {
        return alert("Passwords do not match.");
    }

    if (email == '' || password == '' || rePass == '') {
        return alert("All fields are required.")
    }

    let user = {
        email,
        password
    }

    let registerResult = await authService.register(user);
    context.page.redirect('/home');
}

async function getView(context) {
    let boundSubmitHandler = submitHandler.bind(null, context);
    let form = {
        submitHandler: boundSubmitHandler,
    }
    let templateResult = registerTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}