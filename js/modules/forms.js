import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formsSelector, modalTimerId) {
    let forms = document.querySelectorAll(formsSelector);
    let message = {
        loading: 'icons/spinner.svg',
        success: 'от души, братик. на связи',
        failure: 'че за нах?!'
    };

    forms.forEach(item => { //подвязываем функцию postData, которая является обработчиком событий при отправке под каждую из форм
        bindPostData(item);
    });

    function bindPostData(form) { //отвечает за почтинг данных
        form.addEventListener('submit', (e) => { //submit срабатывает каждый раз когда мы пытаемся отправить форму
            e.preventDefault(); //отменяем перезагрузку страницы после отправки формы

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; //вставляем изображение спинера из icons/spinner
            statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); //добавляем спиннер к форме, но меняем место его появления, аргументами передаем сначала где будет появляться, потом что именно будет появляться

            // let request = new XMLHttpRequest(); //отправка данных исп XMLHttpRequest
            // request.open('POST', 'server.php'); //сначала всегда вызывается open() чтобы настроить запрос, 2-й арг это путь на который будем ссылаться

            // request.setRequestHeader('Content-type', 'multipart/form-data'); заголовки, которые сообщают серверу, какой именно контент приходит. Когда исп XMLHttpRequest заголовки устанавливать не нужно, они ставятся автоматически
            //request.setRequestHeader('Content-type', 'application/json'); //отправляем данные в JSON

            let formData = new FormData(form); //помещаем данные которые заполнил пользователь в форме мы получили в js и могли отправить на сервер

            // let object = {}; //превращаем FormData в JSON
            // formData.forEach(function(value, key) { //на основании данных, которые были в FormData сформируем object при помощи перебора 
            //     object[key] = value;
            // });

            let json = JSON.stringify(Object.fromEntries(formData.entries())); //превращаем нашщ обьект в массив с массивами при помощи formData.entries(), потом конвертируем обратно в обьект при помощи Object.fromEntries() и передаем в postData вторым аргументом 

            //let json = JSON.stringify(object); //конвертируем обычный обьект formData в JSON и помещаем его в request.send()

            // fetch('server.php', { //исп fetch вместо XMLHttpRequest для отправки формы 
            //         method: 'POST',
            //         headers: {
            //             'Content-type': 'application/json'
            //         },
            //         body: JSON.stringify(object)
            //     })
            postData('http://localhost:3000/requests', json)
                .then(data => { //data - это данные которые возвращаются из Promise, те которые вернул сервер
                    console.log(data);
                    showThanksModal(message.success); //после заполнения и отправки данных показывается message.success
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => { //finalyy - действие которое выполняется всегда, в независимости как выполнился код ранее
                    form.reset(); //очищаем модальное окно от сообщения message 
                });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success); //после заполнения и отправки данных показывается message.success
            //         form.reset(); //очищаем модальное окно от сообщения message после его отправки
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) { //показ окна благодарности после отправки данных
        let prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        let thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json());
}

export default forms;