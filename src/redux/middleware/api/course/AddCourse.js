export function postAddCourse(tokenUser, object) {
    const url = "http://118.69.123.51:5000/fis/api/edu/create_new_course"
    const tokenUser1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw"
 
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenUser1
        }),
        body: JSON.stringify(object)
    })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            return { resultCode: -1, message: "No internet... " + error.message }
        })
}
