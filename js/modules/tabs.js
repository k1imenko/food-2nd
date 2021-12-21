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

export default tabs;