/******/
(() => { // webpackBootstrap
    /******/
    "use strict";
    /******/
    var __webpack_modules__ = ({

        /***/
        "./js/modules/calc.js":
        /*!****************************!*\
          !*** ./js/modules/calc.js ***!
          \****************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
            });

            function calc() {
                const result = document.querySelector('.calculating__result span');

                let sex, height, weight, age, ratio;

                if (localStorage.getItem('sex')) {
                    sex = localStorage.getItem('sex');
                } else {
                    sex = 'female'; //уст переменные в дефолтные значения для корректного отображения на сайте
                    localStorage.setItem('sex', 'female');
                }

                if (localStorage.getItem('ratio')) {
                    ratio = localStorage.getItem('ratio');
                } else {
                    ratio = 1.375; //коэфициент активности (взят из источника)
                    localStorage.setItem('ratio', '1.375');
                }

                function calcTotal() { //запускаем каждый раз когда было изменено значение в любом инпуте
                    if (!sex || !height || !weight || !age || !ratio) { //если не заполнен пол, или вес, или рост и тд то выводим прочерк
                        result.textContent = '____';
                        return; //вызываем return, чтобы прервать функцию
                    }

                    if (sex === 'female') { // расчет для женщин
                        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
                    } else { // расчет для мужчин
                        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
                    }
                }
                calcTotal();

                function initLocalSettings(selector, activeClass) {
                    const elements = document.querySelectorAll(selector);

                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                            elem.classList.add(activeClass);
                        }
                        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                            elem.classList.add(activeClass);
                        }
                    });
                }

                initLocalSettings('#gender div', 'calculating__choose-item_active'); //запускаем ф-цию исп id и класс активности из верстки
                initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); //запускаем ф-цию исп класс физ активности и класс активности из верстки

                function getStaticInformation(selector, activeClass) { //получаем инфо из статических инпутов с активностью, когда на них нажали мы исп это значение
                    const elements = document.querySelectorAll(selector);

                    elements.forEach(elem => {
                        elem.addEventListener('click', (e) => {
                            if (e.target.getAttribute('data-ratio')) { //если у элем есть data-аттрибут 
                                ratio = +e.target.getAttribute('data-ratio'); //мы обращаемся к ratio и исп аттрибут data-ratio
                                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //запоминаем что пользователь выбрал определенные параметры
                            } else {
                                sex = e.target.getAttribute('id'); //если у элемента нет аттрибута тогда рабоатем с id
                                localStorage.setItem('sex', e.target.getAttribute('id'));
                            }

                            elements.forEach(elem => {
                                elem.classList.remove(activeClass); //сначала эл избавляется от класса активности
                            });
                            e.target.classList.add(activeClass); //после удаления класса активности добавляем новый

                            calcTotal();
                        });
                    });
                }
                getStaticInformation('#gender', 'calculating__choose-item_active'); //запускаем ф-цию исп id и класс активности из верстки
                getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active'); //запускаем ф-цию исп класс физ активности и класс активности из верстки

                function getDynamicInformation(selector) { //получаем инфо из динамически меняющихся инпутов(рост вес возраст)
                    const input = document.querySelector(selector);

                    input.addEventListener('input', () => { //когда пользватель что то вводит в инпут выполняем след действия 

                        if (input.value.match(/\D/g)) { //проверяем чтобы пользователь введет тоько числа
                            input.style.border = '1px solid red'; //ставим красную обводку если что то пошло не так
                        } else {
                            input.style.border = 'none';
                        }

                        switch (input.getAttribute('id')) {
                            case 'height':
                                height = +input.value;
                                break;
                            case 'weight':
                                weight = +input.value;
                                break;
                            case 'age':
                                age = +input.value;
                                break;
                        }
                        calcTotal();
                    });
                }
                getDynamicInformation('#height');
                getDynamicInformation('#weight');
                getDynamicInformation('#age');
            }

            /* harmony default export */
            const __WEBPACK_DEFAULT_EXPORT__ = (calc);

            /***/
        }),

        /***/
        "./js/modules/cards.js":
        /*!*****************************!*\
          !*** ./js/modules/cards.js ***!
          \*****************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
            });
            /* harmony import */
            var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../services/services */ "./js/services/services.js");


            function cards() {
                class MenuCard {
                    constructor(src, alt, title, descr, price, parentSelector, ...classes) { //classes-классы, добавленные с помощью rest-operator
                        this.src = src;
                        this.alt = alt;
                        this.title = title;
                        this.descr = descr;
                        this.price = price;
                        this.classes = classes; //массив
                        this.parent = document.querySelector(parentSelector);
                        this.transfer = 27; //свойство для перевода валюты
                        this.changeToUAH();
                    }
                    changeToUAH() { //метод перевода перевода в гривну
                        this.price = this.price * this.transfer;
                    }
                    render() { //создаем верстку, куда помещаются элементы
                        let element = document.createElement('div');
                        if (this.classes.length === 0) { //если не было передано какой либо класс, 
                            this.classes = 'menu__item'; //устанавливаем дефолтный класс
                            element.classList.add(this.classes);
                        } else {
                            this.classes.forEach(className => element.classList.add(className)); //className-каждый эл внутри массива classes
                        }

                        element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div> 
                </div>
            `;
                        this.parent.append(element); //помещаем только что полученный element в parent
                    }
                }

                // Сокращенный вариант создания элементов на странице, то что раньше было new MenuCard
                (0, _services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu') //при помощи сервера(запроса) получаю массив с обьектами(расположен в db.json),
                .then(data => {
                    data.forEach(({ img, altimg, title, descr, price, }) => { //далее перебираем его и те обьекты которые внутри, их деструктуризируем по отдельным  частям, 
                        new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //эти части передаю в конструктор, который создает новую карточку на странице и рендерит ее 
                    });
                });

                // new MenuCard( //аргументами передаем те значения, которые были в верстке
                //     "img/tabs/vegy.jpg", //src
                //     "vegy", //alt
                //     'Меню "Фитнес"', //title
                //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', //descr
                //     9, //число задано в БД
                //     '.menu .container', //parentSelector
                // ).render();

                // new MenuCard( //аргументами передаем те значения, которые были в верстке
                //     "img/tabs/elite.jpg", //src
                //     "elite", //alt
                //     'Меню “Премиум”', //title
                //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', //descr
                //     14, //число задано в БД
                //     '.menu .container', //parentSelector
                // ).render();

                // new MenuCard( //аргументами передаем те значения, которые были в верстке
                //     "img/tabs/post.jpg", //src
                //     "post", //alt
                //     'Меню "Постное"', //title
                //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', //descr
                //     21, //число задано в БД
                //     '.menu .container', //parentSelector
                // ).render();
            }

            /* harmony default export */
            const __WEBPACK_DEFAULT_EXPORT__ = (cards);

            /***/
        }),

        /***/
        "./js/modules/forms.js":
        /*!*****************************!*\
          !*** ./js/modules/forms.js ***!
          \*****************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
            });
            /* harmony import */
            var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./modal */ "./js/modules/modal.js");
            /* harmony import */
            var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../services/services */ "./js/services/services.js");



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
                        (0, _services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
                    (0, _modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
                        (0, _modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
                    }, 4000);
                }

                fetch('http://localhost:3000/menu')
                    .then(data => data.json());
            }

            /* harmony default export */
            const __WEBPACK_DEFAULT_EXPORT__ = (forms);

            /***/
        }),

        /***/
        "./js/modules/modal.js":
        /*!*****************************!*\
          !*** ./js/modules/modal.js ***!
          \*****************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "default": () => (__WEBPACK_DEFAULT_EXPORT__),
                /* harmony export */
                "closeModal": () => ( /* binding */ closeModal),
                /* harmony export */
                "openModal": () => ( /* binding */ openModal)
                    /* harmony export */
            });

            function openModal(modalSelector, modalTimerId) {
                const modal = document.querySelector(modalSelector);
                modal.classList.add('show');
                modal.classList.remove('hide');
                document.body.style.overflow = 'hidden'; //убираем проктурку при открытом модальном окне
                // modal.classList.toggle('show'); альтернативный вариант показа модального окна, при помощи toggle

                if (modalTimerId) {
                    clearInterval(modalTimerId); //отключаем повторный показ модального окна после его закрытия
                }
            }

            function closeModal(modalSelector) {
                const modal = document.querySelector(modalSelector);
                modal.classList.add('hide');
                modal.classList.remove('show');
                document.body.style.overflow = '';
                // modal.classList.toggle('show'); альтернативный вариант показа модального окна, при помощи toggle
            }

            function modal(triggerSelector, modalSelector, modalTimerId) {
                let modalTrigger = document.querySelectorAll(triggerSelector), //получаем доступ к дата-атрибуту через []
                    modal = document.querySelector(modalSelector);


                modalTrigger.forEach(btn => { //исп forEach так как modalTrigger - это псевдомассив(querySelectorAll)
                    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
                });


                // modalCloseBtn.addEventListener('click', closeModal); //удаляем строку и добавляем условие 
                modal.addEventListener('click', (e) => { //при клике на свободном пространстве модал окно закрывается
                    if (e.target === modal || e.target.getAttribute('data-close') == '') { //если мы клаикаем на подложку или на крестик модальное окно закрывается
                        closeModal(modalSelector);
                    }
                });
                document.addEventListener("keydown", (e) => {
                    if (e.code === "Escape" && modal.classList.contains('show')) { //при помощи contains('show') escape юудет срабатывать только в случае открытого модально окна
                        closeModal(modalSelector);
                    }
                });

                function showModalByScroll() { //если прокрученная часть страницы и видимая на текущий момент часть страницы больше или равна общей высоте страницы то показываем модальное окно 
                    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                        openModal(modalSelector, modalTimerId);
                        window.removeEventListener('scroll', showModalByScroll); //после пролистывания страницы и открытия модального окна удаляем это событие чтобы не повторялось каждый раз
                    }
                }

                window.addEventListener('scroll', showModalByScroll); //показ модального окна после прокрутки всей страницы
            }

            /* harmony default export */
            const __WEBPACK_DEFAULT_EXPORT__ = (modal);



            /***/
        }),

        /***/
        "./js/modules/slides.js":
        /*!******************************!*\
          !*** ./js/modules/slides.js ***!
          \******************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
            });

            function slides({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

                const slides = document.querySelectorAll(container), // доступ к классу со слайдами
                    slider = document.querySelector(slide), //доступ к слайдам для установки position-relative и добавления точек
                    prev = document.querySelector(prevArrow), // доступ к стрелочке предыдущий
                    next = document.querySelector(nextArrow), // доступ к стрелочке следующий
                    total = document.querySelector(totalCounter), //кол-во слайдов
                    current = document.querySelector(currentCounter), //текущий слайд
                    slidesWrapper = document.querySelector(wrapper),
                    slidesField = document.querySelector(field), //поле с нашими слайдами
                    width = window.getComputedStyle(slidesWrapper).width; //получаем ширину окна со слайдами


                let slideIndex = 1; //первый номер в нумерации слайдов
                let offset = 0; //отступ

                if (slides.length < 10) { //если кол-во слайдов будет меньше 10
                    total.textContent = `0${slides.length}`; // то мы добавляем ноль к цифре текущего слайда
                    current.textContent = `0${slideIndex}`;
                } else {
                    total.textContent = slides.length;
                    current.textContent = slideIndex;
                }

                slidesField.style.width = 100 * slides.length + '%';
                slidesField.style.display = 'flex';
                slidesField.style.transition = '0.5s all';
                // slidesField.style.cssText = `
                //     width: 100 * slides.length + '%',
                //     display: flex,
                //     transition: 0.5s all
                // `;

                // console.log(slidesField);

                slidesWrapper.style.overflow = 'hidden'; //ограничиваем показ слайда внутри wrapper

                slides.forEach(slide => {
                    slide.style.width = width; //перебираем все слайды и делаем их одинаковой ширины
                });

                //Создаем точки на слайдере

                slider.style.position = 'relative'; //уст для работы с точками

                const dots = document.createElement('ol'),
                    array = [];
                dots.classList.add('carousel-dots');
                dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
                slider.append(dots); //помещаем созданные точки в слайдер

                for (let i = 0; i < slides.length; i++) {
                    const dot = document.createElement('li'); // создаем точки внутри slides
                    dot.setAttribute('data-slide-to', i + 1); //устанавливаем каждой точке аттрибут data-slide-to(те к какому слайду она будет относиться)
                    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
                    if (i == 0) {
                        dot.style.opacity = 1;
                    }
                    dots.append(dot);
                    array.push(dot);
                }

                function dotsVision() {
                    array.forEach(dot => dot.style.opacity = '.5');
                    array[slideIndex - 1].style.opacity = 1;
                }

                function slidesVision() {
                    if (slides.length < 10) {
                        current.textContent = `0${slideIndex}`;
                    } else {
                        current.textContent = slideIndex;
                    }
                }

                next.addEventListener('click', () => {
                    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
                        offset = 0; //означает что долистали до конца и надо вернуться в самое начало
                    } else {
                        offset += deleteNotDigits(width);
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex == slides.length) {
                        slideIndex = 1;
                    } else {
                        slideIndex++;
                    }

                    slidesVision();
                    dotsVision();
                });

                prev.addEventListener('click', () => {
                    if (offset == deleteNotDigits(width) * (slides.length - 1)) { //исп регулярные выражения
                        offset = 0; //означает что долистали до конца и надо вернуться в самое начало
                    } else {
                        offset += deleteNotDigits(width);
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex == 1) {
                        slideIndex = slides.length;
                    } else {
                        slideIndex--;
                    }

                    dotsVision();
                    slidesVision();
                });
                array.forEach(dot => { //изменяем активный индикатор при клике мышкой на него
                    dot.addEventListener('click', (e) => {
                        const slideTo = e.target.getAttribute('data-slide-to');

                        slideIndex = slideTo;
                        offset = deleteNotDigits(width) * (slideTo - 1);

                        slidesField.style.transform = `translateX(-${offset}px)`;

                        dotsVision();
                        slidesVision();
                    });
                });

                function deleteNotDigits(str) {
                    return +str.replace(/\D/g, ''); //исп регулярные выражения
                }


                //!Альтернативный вариант слайдов
                // showSlides(slideIndex);

                // if (slides.length < 10) { //если кол-во слайдов будет меньше 10
                //     total.textContent = `0${slides.length}`; // то мы добавляем ноль к цифре текущего слайда
                // } else {
                //     total.textContent = slides.length;
                // }

                // function showSlides(n) { //функция показа слайдов, n-slideIndex, с текущим положением слайда
                //     if (n > slides.length) {
                //         slideIndex = 1;
                //     }

                //     if (n < 1) {
                //         slideIndex = slides.length; //устанвливаем в посл элемент в слайдерах
                //     }

                //     slides.forEach(item => item.style.display = 'none'); //скрываем все слайды на странице
                //     slides[slideIndex - 1].style.display = 'block'; //показываем текущий слайд

                //     if (slides.length < 10) { //если кол-во слайдов будет меньше 10
                //         current.textContent = `0${slideIndex}`; // то мы добавляем ноль к цифре текущего слайда
                //     } else {
                //         current.textContent = slideIndex;
                //     }
                // }

                // function plusSlides(n) {
                //     showSlides(slideIndex += n);
                // }

                // prev.addEventListener('click', () => {
                //     plusSlides(-1);
                // });
                // next.addEventListener('click', () => {
                //     plusSlides(1);
                // });
            }

            /* harmony default export */
            const __WEBPACK_DEFAULT_EXPORT__ = (slides);

            /***/
        }),

        /***/
        "./js/modules/tabs.js":
        /*!****************************!*\
          !*** ./js/modules/tabs.js ***!
          \****************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
            });

            function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
                let tabs = document.querySelectorAll(tabsSelector),
                    tabsContent = document.querySelectorAll(tabsContentSelector),
                    tabsParent = document.querySelector(tabsParentSelector);

                function hideTabContent() { // скрываем табы со страницы   
                    tabsContent.forEach(item => { //скрываем весь контент который есть в классе tabcontent
                        item.classList.add('hide');
                        item.classList.remove('show', 'fade');
                    });
                    tabs.forEach(item => { //удаляем класс активности у каждого элемента tabs
                        item.classList.remove(activeClass);
                    });
                }
                hideTabContent();


                function showTabContent(i = 0) { //i-это первый таб на странице
                    tabsContent[i].classList.add('show', 'fade');
                    tabsContent[i].classList.remove('hide');
                    tabs[i].classList.add(activeClass);
                }
                showTabContent();


                tabsParent.addEventListener('click', (event) => {
                    let target = event.target;
                    if (target && target.classList.contains(tabsSelector.slice(1))) { //удаляем точку у класса '.tabheader__item', который передается аргументом
                        tabs.forEach((item, i) => {
                            if (target == item) {
                                hideTabContent();
                                showTabContent(i); //сюда передаем номер элемента, который совпал при переборе
                            }
                        });
                    }
                });
            }

            /* harmony default export */
            const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

            /***/
        }),

        /***/
        "./js/modules/timer.js":
        /*!*****************************!*\
          !*** ./js/modules/timer.js ***!
          \*****************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                    /* harmony export */
            });

            function timer(id, deadline) {

                function getTimeRemaining(endtime) { //определяет разницу между текущим временем и окончанием акции
                    let t = Date.parse(endtime) - Date.parse(new Date()),
                        days = Math.floor(t / (1000 * 60 * 60 * 24)),
                        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                        minutes = Math.floor((t / 1000 / 60) % 60),
                        seconds = Math.floor((t / 1000) % 60);

                    return {
                        'total': t,
                        'days': days,
                        'hours': hours,
                        'minutes': minutes,
                        'seconds': seconds
                    };
                }

                function getZero(num) { //подставляем ноль если в таймере одиночная цифра
                    if (num >= 0 && num < 10) {
                        return `0${num}`;
                    } else {
                        return num;
                    }
                }

                function setClock(selector, endtime) { // устанавливаем таймер на страницу(endtime - ёто переменная deadline)
                    let timer = document.querySelector(selector),
                        days = timer.querySelector('#days'),
                        hours = timer.querySelector('#hours'),
                        minutes = timer.querySelector('#minutes'),
                        seconds = timer.querySelector('#seconds'),
                        timeInterval = setInterval(updateClock, 1000); //перезапускаем таймер каждую секунду
                    updateClock(); //заускаем чтобы не ждать 1 сек перезапуск таймера

                    function updateClock() {
                        let t = getTimeRemaining(endtime);

                        days.innerHTML = getZero(t.days); //данные приходят из return в getTimeRemaining + передаем в getZero значения часов, минут и секунд
                        hours.innerHTML = getZero(t.hours);
                        minutes.innerHTML = getZero(t.minutes);
                        seconds.innerHTML = getZero(t.seconds);

                        if (t.total <= 0) { //если время вышло(меньше или равно 0) останавливаем таймер 
                            clearInterval(timeInterval);
                        }
                    }
                }
                setClock(id, deadline);
            }

            /* harmony default export */
            const __WEBPACK_DEFAULT_EXPORT__ = (timer);

            /***/
        }),

        /***/
        "./js/services/services.js":
        /*!*********************************!*\
          !*** ./js/services/services.js ***!
          \*********************************/
        /***/
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__);
            /* harmony export */
            __webpack_require__.d(__webpack_exports__, {
                /* harmony export */
                "getResourse": () => ( /* binding */ getResourse),
                /* harmony export */
                "postData": () => ( /* binding */ postData)
                    /* harmony export */
            });
            const postData = async(url, data) => { //async-значит что код асинхронный.создаем запрос, когда создаем ф-цию postData, туда передается url, который передается в fetch
                const res = await fetch(url, { // await-дает время дождаться выполнения какого учатска кода и получить ответ от сервера, первым арг передаем url, чтобы ссылаться на какой то сервер
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: data
                });
                return await res.json(); //возвращается promise
            };

            const getResourse = async(url) => { //делаем запрос
                const res = await fetch(url); //дожидаемся окончания
                if (!res.ok) {
                    throw new Error(`could not fetch ${url}, status: ${res.status}`);
                }
                return await res.json(); //возвращается promise
            };




            /***/
        })

        /******/
    });
    /************************************************************************/
    /******/ // The module cache
    /******/
    var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/
        var cachedModule = __webpack_module_cache__[moduleId];
        /******/
        if (cachedModule !== undefined) {
            /******/
            return cachedModule.exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = __webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/
            exports: {}
            /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /************************************************************************/
    /******/
    /* webpack/runtime/define property getters */
    /******/
    (() => {
        /******/ // define getter functions for harmony exports
        /******/
        __webpack_require__.d = (exports, definition) => {
            /******/
            for (var key in definition) {
                /******/
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    })();
    /******/
    /******/
    /* webpack/runtime/hasOwnProperty shorthand */
    /******/
    (() => {
        /******/
        __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
            /******/
    })();
    /******/
    /******/
    /* webpack/runtime/make namespace object */
    /******/
    (() => {
        /******/ // define __esModule on exports
        /******/
        __webpack_require__.r = (exports) => {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/
            }
            /******/
            Object.defineProperty(exports, '__esModule', { value: true });
            /******/
        };
        /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
        /*!**********************!*\
          !*** ./js/script.js ***!
          \**********************/
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */
        var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./modules/tabs */ "./js/modules/tabs.js");
        /* harmony import */
        var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./modules/calc */ "./js/modules/calc.js");
        /* harmony import */
        var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./modules/forms */ "./js/modules/forms.js");
        /* harmony import */
        var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./modules/modal */ "./js/modules/modal.js");
        /* harmony import */
        var _modules_slides__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ./modules/slides */ "./js/modules/slides.js");
        /* harmony import */
        var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! ./modules/timer */ "./js/modules/timer.js");
        /* harmony import */
        var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__( /*! ./modules/cards */ "./js/modules/cards.js");









        window.addEventListener('DOMContentLoaded', () => {
            let modalTimerId = setTimeout(() => (0, _modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 30000); //появление модального окна спустя какое-то время
            (0, _modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
            (0, _modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
            (0, _modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
            (0, _modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
            (0, _modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])('.timer', '2022-06-01');
            (0, _modules_cards__WEBPACK_IMPORTED_MODULE_6__["default"])();
            (0, _modules_slides__WEBPACK_IMPORTED_MODULE_4__["default"])({
                container: '.offer__slide',
                nextArrow: '.offer__slider-next',
                slide: '.offer__slider',
                prevArrow: '.offer__slider-prev',
                totalCounter: '#total',
                currentCounter: '#current',
                wrapper: '.offer__slider-wrapper',
                field: '.offer__slider-inner'
            });
        });
    })();

    /******/
})();
//# sourceMappingURL=bundle.js.map