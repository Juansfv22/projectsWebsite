/**
 * Project detail page module.
 * 
 * Manages the individual project detail page with full project information.
 * Handles editing and deletion of projects for authenticated admins.
 * Fetches project data from API and renders dynamic form fields.
 */

import { deleteProject, getProject, updateProject } from "./api/projectApi.js"
import { setupLog } from "./setupLog.js"


// Check if user is authenticated
const token = setupLog()

/**
 * Extract project ID from URL query parameter.
 * 
 * Parses the URL to get the 'id' query parameter passed from project list.
 */
function getProjectId(){

    const params = new URLSearchParams(window.location.search)

    return params.get("id")

}


/**
 * Load and display project details.
 * 
 * Fetches project from API using ID from URL, then renders:
 * - Project name, description, image, Stack, and attachment
 * - Admin form with edit and delete buttons (if user is authenticated)
 * 
 * Images are loaded from frontend/images/ directory with fallback to default.
 */
async function loadProject(){

    const id = getProjectId()

    const project = await getProject(id)

    const container = document.getElementById("projectContainer")

    // Use provided values or show placeholder text
    const description = project.description ?? "Este proyecto aún no tiene descripción."
    const imgSrc = `/images/image${id}.png`
    const attachment = project.attachment?.replace(/^https?:\/\//, "") ?? "Sin contenido aún."
    const Stack = project.Stack ?? "Sin Stack aún."

    container.innerHTML = `
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight mb-4 text-back-blue">
        ${project.name}
        </h1>

        <div class="w-full mb-4">
        <img src="${imgSrc}" alt="${project.name}" onerror="this.onerror=null;this.src='/images/default.png';" class="w-full h-full object-contain rounded-2xl">
        </div>

        <p class="text-slate-800 mb-5 leading-relaxed whitespace-pre-line">
        ${description}
        </p>

        <div class="mb-6">
        <h2 class="text-sm font-semibold text-details-green mb-1">Stack</h2>
        <p class="text-slate-800 break-words">${Stack}</p>
        </div>

        <div class="mb-6">
        <a href="https://${attachment}" target="_blank" class="text-xl font-semibold text-details-green mb-1 hover:text-back-blue transition">View on GitHub →</a>
        </div>

        ${token ? `
        <div class="border-t border-white/60 pt-6 mt-6">
        <h2 class="text-lg font-extrabold tracking-tight mb-4">Opciones de admin</h2>

        <div class="grid grid-cols-1 gap-3">
        <input id="editName" class="border border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/60 outline-none p-3 rounded-xl w-full bg-white" placeholder="Nombre" value="${project.name ?? ""}" />
        <textarea id="editDescription" class="border border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/60 outline-none p-3 rounded-xl w-full bg-white" placeholder="Descripción" rows="3">${project.description ?? ""}</textarea>
        <input id="editStack" class="border border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/60 outline-none p-3 rounded-xl w-full bg-white" placeholder="Stack" value="${project.Stack ?? ""}" />
        <input id="editAttachment" class="border border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/60 outline-none p-3 rounded-xl w-full bg-white" placeholder="Attachment" value="${project.attachment ?? ""}" />
        </div>

        <div class="flex flex-col sm:flex-row gap-3 mt-4">
        <button id="saveBtn" class="bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:from-sky-500 hover:to-fuchsia-500 text-white px-5 py-3 rounded-xl font-semibold shadow-sm transition">
        Guardar cambios
        </button>

        <button id="deleteBtn" class="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white px-5 py-3 rounded-xl font-semibold shadow-sm transition">
        Eliminar
        </button>
        </div>
        </div>
        ` : ``}
    `

    // Setup admin form handlers if user is authenticated
    if (token) {
        const saveBtn = document.getElementById("saveBtn")
        const deleteBtn = document.getElementById("deleteBtn")

        /**
         * Handle project update.
         * 
         * Collects form data, validates, sends update request, and reloads page.
         */
        saveBtn?.addEventListener("click", async () => {
            const updates = {
                name: document.getElementById("editName").value?.trim() || null,
                description: document.getElementById("editDescription").value?.trim() || null,
                Stack: document.getElementById("editStack").value?.trim() || null,
                attachment: document.getElementById("editAttachment").value?.trim() || null,
            }

            if (updates.name === null) {
                alert("Ingresa el nombre del proyecto.")
                return
            }

            // Remove null values to allow partial updates
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
                    window.location.href = "login.html"
                } else if (error.status === 400) {
                    alert("Este nombre de proyecto ya existe.")
                } else {
                    alert("No se pudo actualizar el proyecto.")
                }
            }
        })

        /**
         * Handle project deletion.
         * 
         * Confirms deletion with user, sends delete request, and redirects to homepage.
         */
        deleteBtn?.addEventListener("click", async () => {
            const ok = confirm("¿Seguro que quieres eliminar este proyecto?")
            if (!ok) return

            try {
                await deleteProject(id)
                window.location.href = "index.html"
            } catch (error) {
                if (error.status === 401) {
                    alert("Por favor inicia sesión nuevamente.")
                    localStorage.removeItem("token")
                    sessionStorage.setItem("window", window.location.href)
                    window.location.href = "login.html"
                } else {
                    alert("No se pudo eliminar el proyecto.")
                }
            }
        })
    }
}


// Load project details on page load
loadProject()