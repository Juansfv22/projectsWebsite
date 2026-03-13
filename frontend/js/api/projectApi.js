const API_URL = "http://127.0.0.1:8000/projects"

export async function getProject(id){

    const response = await fetch(API_URL + "/" + id)

    return await response.json()

}