export function getDeleteCourse(tokenUser, courseId) {
    const url = 'http://10.86.224.37:5001/api/edu/delete_course?courseId=' + `${courseId}`
    const tokenUser1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw"
 
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " +tokenUser1,
        }),
    })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            return { resultCode: -1, message: "No internet... " + error.message }
        })
}
