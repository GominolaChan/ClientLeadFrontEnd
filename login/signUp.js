function checkToken() {
    if (isTokenValid()) {

        const rol = localStorage.getItem("rol")
        if(rol=='developer'){
            window.location.href = "/developer/index.html"
        }else{
            window.location.href = "/client/index.html"
        }
    }
}
checkToken();
const url = window.location.search;
const urlParams = new URLSearchParams(url);
let user = urlParams.get('u');

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form)
    const queryString = new URLSearchParams(formData)

    queryString.append("rol", user);
    queryString.append("username", formData.get('name'));

    showData(queryString.toString())
})

async function showData(data) {

    try {

        console.log(data)
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
        };

        const response = await fetch("http://localhost:1337/api/auth/local/register", requestOptions)

        if (!response.ok) {

            if (response.status == 400 || response.status == 401) {

                document.getElementById('alert').classList.remove('hidden')
                return;
            }
            throw new Error('hay error en la peticion')
        }
        document.getElementById('alert').classList.add('hidden')

        if (response.status == 200) {
            window.location.href = '/login/logIn.html';

        }
    } catch (e) {
        console.log(e);
    }
}