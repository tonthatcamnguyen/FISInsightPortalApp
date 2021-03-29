export function getCourse(tokenUser) {
    const url = "http://10.86.224.37:5001/api/edu/get_all_course"

    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + tokenUser
        },
    })
        .then((response) => {

            return response.json()
        })
        .catch((error) => {
            return { resultCode: -1, message: "No internet... " + error.message }
        })
}
