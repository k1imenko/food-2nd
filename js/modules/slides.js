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

export default slides;