/* eslint-disable */
import { displayMap } from './leaflet';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { resizeImage } from "./resizeImage.js";
import { signup } from './signup';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapbox = document.getElementById('map');
const loginForm = document.getElementById('form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.getElementById('form--update');
const userPasswordForm = document.getElementById('form--password');
const pfpUploadInput = document.getElementById("photo");
const formSignUp = document.getElementById('form--signup');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapbox) {
    const  locations = JSON.parse(mapbox.dataset.locations);
    displayMap(locations);
}

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();

        // Log in form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        login(email, password);
    });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
    pfpUploadInput.addEventListener("change", async (e) => {
        const inputPic = pfpUploadInput.files[0];
        if (inputPic) {
            const userPhotoElement =
                document.querySelector(".form__user-photo");
            resizeImage(inputPic, 500, 500, userPhotoElement);
        }
    });
    userDataForm.addEventListener('submit', async e => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        console.log(form);

        await updateSettings(form, 'data');
    });
}

if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn--save-password').textContent = 'Updating...';
        
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;

        await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');

        document.querySelector('.btn--save-password').textContent = 'Save password';
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';

    });
}

if (formSignUp) {
    formSignUp.addEventListener('submit', e => {
        e.preventDefault();

        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const name = firstname + ' ' + lastname;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;

        signup(name, email, password, passwordConfirm);
    });
}

if (bookBtn)
    bookBtn.addEventListener('click', e => {
        e.target.textContent = 'Processing...';
        const { tourId } = e.target.dataset;
        bookTour(tourId);
    });