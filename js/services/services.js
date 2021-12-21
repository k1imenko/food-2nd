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

export { getResourse };
export { postData };