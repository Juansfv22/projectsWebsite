/**
 * Projects API client module.
 * 
 * Handles API calls for creating projects and fetching project listings.
 * Communicates with the backend /projects endpoint.
 */

const API_URL = "/projects"

/**
 * Fetch all projects from the database.
 * 
 * Public endpoint - no authentication required.
 */
export async function getProjects() {

    const response = await fetch(API_URL + "/")
    return await response.json()
}


/**
 * Create a new project.
 * 
 * Requires JWT authentication. Sends project data to backend for creation.
 */
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