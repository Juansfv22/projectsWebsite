/**
 * Portfolio homepage module.
 * 
 * Manages the main portfolio page displaying projects list and admin controls.
 * Handles project creation, loading, and error handling.
 * Shows authentication status and renders project cards dynamically.
 */

import { getProjects, createProject } from "./api/projectsApi.js"
import { createProjectCard } from "./components/projectCard.js"
import { setupLog } from "./setupLog.js"

// DOM elements
const container = document.getElementById("projectsContainer")
const createProjectBox = document.getElementById("createProjectBox")

// Check if user is authenticated
const token = setupLog()


// Show project creation form only to authenticated users
if(token){

    createProjectBox.classList.remove("hidden")
    createProjectBox.innerHTML =
            `<h2 class="text-lg font-extrabold tracking-tight mb-4">
            Crear nuevo proyecto
            </h2>

            <div class="flex flex-col sm:flex-row gap-3">

            <input
            id="name"
            placeholder="Nombre del proyecto"
            class="border border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/60 outline-none p-3 rounded-xl w-full bg-white"
            />

            <button id="createBtn"
            class="bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:from-sky-500 hover:to-fuchsia-500 text-white px-8 py-3 rounded-xl font-semibold shadow-sm transition">
            Crear
            </button>

            </div>`
    
}


/**
 * Load and display all projects from the database.
 * 
 * Fetches projects from API, clears container, and renders each project as a card.
 * Adds smooth fade-in animation to cards as they appear.
 */
async function loadProjects(){

    container.innerHTML = ""

    const projects = await getProjects()

    projects.forEach(project => {

        const card = createProjectCard(project)

        // Add initial animation classes
        card.classList.add("opacity-0","translate-y-4")

        container.appendChild(card)

        // Trigger animation on next frame
        setTimeout(()=>{
            card.classList.remove("opacity-0","translate-y-4")
        },50)

    })

}


// Setup create project button handler
const createBtn = document.getElementById("createBtn")

createBtn?.addEventListener("click", async ()=>{

        const name = document.getElementById("name").value

        if(!name){
            alert("Ingresa el nombre del proyecto.")
            return
        }

        try{
            // Send project creation request to backend
            await createProject({
                name
            })

            // Clear input and reload projects list
            document.getElementById("name").value = ""
            loadProjects()

        }catch (error){
            // Handle different error cases
            if (error.status === 400){
                alert("Este nombre de proyecto ya existe.")
            }

            else if (error.status === 401){
                // Token expired or invalid
                alert("Por favor inicia sesión nuevamente.")
                localStorage.removeItem("token")
                sessionStorage.setItem("window", window.location.href)
                window.location.href = "login.html"
            }
        }   

    })


// Load projects on page load
loadProjects()