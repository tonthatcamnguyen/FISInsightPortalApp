apiFake = "http://118.69.123.51:5000/api/";



export function postLogin(user, password) {
    
    return fetch(apiFake + "login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'username='+user+'&password='+password
    }).
        then((response) => response.json())
}
