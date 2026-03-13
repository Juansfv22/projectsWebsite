import { deleteProject, getProject, updateProject } from "./api/projectApi.js"
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

    const description = project.description ?? "Este proyecto aún no tiene descripción."
    const imgSrc = project.image_url || "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
    const attachment = project.attachment ?? "Sin contenido aún."

    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">
            ${project.name}
        </h1>

        <div class="w-full mb-4">
            <img src="${imgSrc}" alt="${project.name}" class="w-full max-h-80 object-cover rounded shadow-sm">
        </div>

        <p class="text-gray-600 mb-4">
            ${description}
        </p>

        <div class="mb-4">
            <h2 class="text-sm font-semibold text-gray-700 mb-1">Contenido</h2>
            <p class="text-gray-700 break-words">${attachment}</p>
        </div>

        ${token ? `
        <div class="border-t pt-4 mt-4">
            <h2 class="text-lg font-semibold mb-3">Opciones de admin</h2>

            <div class="grid grid-cols-1 gap-3">
                <input id="editName" class="border p-2 rounded w-full" placeholder="Nombre" value="${project.name ?? ""}" />
                <textarea id="editDescription" class="border p-2 rounded w-full" placeholder="Descripción" rows="3">${project.description ?? ""}</textarea>
                <input id="editImageUrl" class="border p-2 rounded w-full" placeholder="Image URL" value="${project.image_url ?? ""}" />
                <input id="editAttachment" class="border p-2 rounded w-full" placeholder="Attachment" value="${project.attachment ?? ""}" />
            </div>

            <div class="flex gap-3 mt-4">
                <button id="saveBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                    Guardar cambios
                </button>

                <button id="deleteBtn" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
                    Eliminar
                </button>
            </div>
        </div>
        ` : ``}
    `

    if (token) {
        const saveBtn = document.getElementById("saveBtn")
        const deleteBtn = document.getElementById("deleteBtn")

        saveBtn?.addEventListener("click", async () => {
            const updates = {
                name: document.getElementById("editName").value?.trim() || null,
                description: document.getElementById("editDescription").value?.trim() || null,
                image_url: document.getElementById("editImageUrl").value?.trim() || null,
                attachment: document.getElementById("editAttachment").value?.trim() || null,
            }

            Object.keys(updates).forEach((k) => updates[k] === null && delete updates[k])

            try {
                await updateProject(id, updates)
                alert("Cambios guardados con éxito")
                loadProject()
            } catch (error) {
                if (error.status === 401) {
                    alert("Por favor inicia sesión nuevamente.")
                    localStorage.removeItem("token")
                    sessionStorage.setItem("window", window.location.href)
                    window.location.href = "/frontend/login.html"
                } else if (error.status === 400) {
                    alert("Este nombre de proyecto ya existe.")
                } else {
                    alert("No se pudo actualizar el proyecto.")
                }
            }
        })

        deleteBtn?.addEventListener("click", async () => {
            const ok = confirm("¿Seguro que quieres eliminar este proyecto?")
            if (!ok) return

            try {
                await deleteProject(id)
                window.location.href = "/frontend/index.html"
            } catch (error) {
                if (error.status === 401) {
                    alert("Por favor inicia sesión nuevamente.")
                    localStorage.removeItem("token")
                    sessionStorage.setItem("window", window.location.href)
                    window.location.href = "/frontend/login.html"
                } else {
                    alert("No se pudo eliminar el proyecto.")
                }
            }
        })
    }
}


loadProject()