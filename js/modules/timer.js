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

export default timer;