
document.addEventListener('DOMContentLoaded', function () {

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get('id');

    const db = firebase.firestore();
    const rol = localStorage.getItem("rol")

    const form = document.getElementById('form')
    const inputMessage = document.getElementById('inputMessage')
    const chat = document.getElementById('chat')
    const chatContainer = document.getElementById('chatContainer')
    const imageInput = document.getElementById('imageInput');

    let projectChat = 'fullChat' + id
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const file = imageInput.files[0];
        if (file) {
            addMessageFile()

        } else {

            if (inputMessage.value != '') {
                addMessage()
            }
        }
    })
    updateMessages()

    async function addMessage() {
        try {
            const messageData = {
                type: "texto",
                message: inputMessage.value,
                idusuario: rol,
                fecha: Date.now(),
                chatId: id
            };
            await db.collection(projectChat).add(messageData);
            updateMessages();

            // notification(messageData)
        } catch (e) {
            console.log(e)
        }
        inputMessage.value = ''

    }
    async function addMessageFile() {

        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child('chat_images');
        const file = imageInput.files[0];
        const timestamp = Date.now();
        const imageRef = imagesRef.child(`${id}_${timestamp}_${file.name}`);
        const uploadTask = imageRef.put(file);

        uploadTask
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .then(url => {
                urlImage = url
                db.collection(projectChat).add({

                    type: 'image',
                    url: url,
                    idusuario: rol,
                    fecha: timestamp,
                    chatId: id,
                });
                // Aquí puedes hacer lo que quieras con la URL, como agregarla al mensaje
            })
            .catch(error => {
                console.error(error);
            });
        document.getElementById('imageInput').value = '';

        // actualiza el chat con la imagen agregada
        updateMessages();
    }


    async function updateMessages() {
        try {
            db.collection(projectChat).orderBy('fecha').onSnapshot((querySnapshot) => {
                chat.innerHTML = '';
                querySnapshot.forEach((doc) => {

                    if (doc.data().type == 'texto') {
                        if (doc.data().idusuario == 'client') {
                            chat.innerHTML += `
                    <li class="flex justify-start">
                    <div class="relative max-w-xl px-4 py-2 text-gray-800 bg-blue-300 rounded shadow">
                        <span class="block text-xl">${doc.data().message}</span>
                    </div>
                </li> 
                 `
                        } else {
                            chat.innerHTML += `
                  <li class="flex justify-end">
                  <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span class="block text-xl">${doc.data().message}</span>
                  </div>
              </li> `

                        }
                    } else if (doc.data().type == 'image') {
                        // mensaje de imagen
                        if (doc.data().idusuario == 'client') {
                            chat.innerHTML += `
                                <li class="flex justify-start">
                                    <div class="relative max-w-xl px-1 py-1 text-gray-800 bg-blue-300 rounded shadow">
                                        <img class="w-32" src="${doc.data().url}">
                                    </div>
                                </li> 
                            `;
                        } else {
                            chat.innerHTML += `
                                <li class="flex justify-end">
                                    <div class="relative max-w-xl px-1 py-1 text-gray-700 bg-gray-100 rounded shadow">
                                        <img class="w-32" src="${doc.data().url}">
                                    </div>
                                </li> 
                            `;
                        }
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                })
            })
        } catch (e) {
            console.log(e)
        }

    }



})

