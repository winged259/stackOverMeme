function classToggle() {
    const navLink = document.querySelectorAll('.nav-item')
    navLink.forEach(nav => nav.classList.toggle('navToggleShow'));
}
const navIcon = document.querySelector('.nav-icon')
navIcon.addEventListener('click', classToggle)

const cloudinary_url = 'https://api.cloudinary.com/v1_1/winged/image/upload';
const cloudinary_upload_preset = 'gclufyes';

const upload = document.querySelector('#upload');
const uploadLink = document.querySelector('#upload-link')

function post(path, params, method = 'post') {

    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

upload.addEventListener('change', function(e) {
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinary_upload_preset);
    axios({
            url: cloudinary_url,
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(function(res) {
            post('/create', { height: res.data.height, width: res.data.width, url: res.data.secure_url })
        })
        .catch(function(err) {
            console.log(err)
        })
})
uploadLink.addEventListener('change', function(e) {
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinary_upload_preset);
    axios({
            url: cloudinary_url,
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(function(res) {
            post('/create', { height: res.data.height, width: res.data.width, url: res.data.secure_url })
        })
        .catch(function(err) {
            console.log(err)
        })
})