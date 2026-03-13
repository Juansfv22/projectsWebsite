import { getProjects, createProject } from "./api/projectsApi.js"
import { createProjectCard } from "./components/projectCard.js"
import { setupLog } from "./setupLog.js"

const container = document.getElementById("projectsContainer")
const createProjectBox = document.getElementById("createProjectBox")

const token = setupLog()


if(token){

    createProjectBox.innerHTML = 
            `<h2 class="text-lg font-semibold mb-4">
            Crear nuevo proyecto
            </h2>

            <div class="flex gap-4">

            <input
            id="name"
            placeholder="Nombre del proyecto"
            class="border p-2 rounded w-full"
            />

            <button id="createBtn"
            class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2 rounded transition">
            Crear
            </button>

            </div>`
    
    createProjectBox.classList.remove("hidden")
}


async function loadProjects(){

    container.innerHTML = ""

    const projects = await getProjects()

    projects.forEach(project => {

        const card = createProjectCard(project)

        card.classList.add("opacity-0","translate-y-4")

        container.appendChild(card)

        setTimeout(()=>{
            card.classList.remove("opacity-0","translate-y-4")
        },50)

    })

}


const createBtn = document.getElementById("createBtn")

createBtn?.addEventListener("click", async ()=>{

        const name = document.getElementById("name").value

        if(!name){
            alert("Ingresa el nombre del proyecto.")
            return
        }

        try{

            await createProject({
                name
            })

            document.getElementById("name").value = ""
            loadProjects()

        }catch (error){

            if (error.status === 400){
                alert("Este nombre de proyecto ya existe.")
            }

            else if (error.status === 401){
                alert("Por favor inicia sesión nuevamente.")
                localStorage.removeItem("token")
                sessionStorage.setItem("window", window.location.href)
                window.location.href = "/frontend/login.html"
            }
        }   

    })


loadProjects()