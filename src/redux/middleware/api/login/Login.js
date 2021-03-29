export function loginRequire(username, password) {
    const url = "http://118.69.123.51:5000/fis/api/login"
    return fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            return { resultCode: -1, message: "No internet... " + error.message }
        })
}