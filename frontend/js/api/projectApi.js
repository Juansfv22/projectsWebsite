const API_URL = "/projects"

export async function getProject(id){

    const response = await fetch(API_URL + "/" + id)

    return await response.json()

}

export async function updateProject(id, projectUpdates) {
    const token = localStorage.getItem("token")

    const response = await fetch(API_URL + "/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(projectUpdates)
    })

    if (!response.ok) {
        const error = new Error("Proyecto no actualizado")
        error.status = response.status
        throw error
    }

    return await response.json()
}

export async function deleteProject(id) {
    const token = localStorage.getItem("token")

    const response = await fetch(API_URL + "/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = new Error("Proyecto no eliminado")
        error.status = response.status
        throw error
    }
}