import { getProject } from "./api/projectApi.js"
import { setupLog } from "./setupLog.js"


const token = setupLog()


function getProjectId(){

    const params = new URLSearchParams(window.location.search)

    return params.get("id")

}


async function loadProject(){

    const id = getProjectId()

    const project = await getProject(id)

    const container = document.getElementById("projectContainer")

    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">
            ${project.name}
        </h1>

        <p class="text-gray-600">
            Este proyecto aún no tiene descripción.
        </p>
    `
}


loadProject()