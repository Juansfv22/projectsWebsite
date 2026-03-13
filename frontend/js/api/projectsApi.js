const API_URL = "http://127.0.0.1:8000/projects"

export async function getProjects() {

    const response = await fetch(API_URL + "/")
    return await response.json()
}


export async function createProject(project) {

    const token = localStorage.getItem("token")

    const response = await fetch(API_URL + "/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(project)
    })

    if (!response.ok) {
        const error = new Error("Proyecto no creado")
        error.status = response.status
        throw error
    }

    return await response.json()

}