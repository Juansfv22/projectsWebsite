export function createProjectCard(project){
    const card = document.createElement("div")

    // Agregamos 'flex' y 'items-start' para alinear imagen y texto
    card.className = "bg-white p-5 rounded-lg shadow hover:shadow-lg transition-all duration-500 flex gap-4"

    // Usamos el placeholder si no hay imagen
    const imgSrc = project.image_url || "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"

    card.innerHTML = `
        <div class="flex-shrink-0 w-40 h-30">
        <img src="${imgSrc}" alt="${project.name}" 
        class="w-full h-full object-cover rounded-md shadow-sm">
        </div>

        <div class="flex-grow min-w-0">
        <h3 class="text-lg font-bold mb-2 truncate">
            ${project.name}
        </h3>

        <p class="text-gray-600 text-sm line-clamp-2">
            <strong>Descripción:</strong> ${project.description || "Sin descripción aún."}
        </p>

        <p class="text-gray-600 text-sm mt-1 italic">
            <strong>Contenido:</strong> ${project.attachment || "Sin contenido aún."}
        </p>

        <a
        href="/frontend/project.html?id=${project.id}"
        class="text-blue-600 hover:underline cursor-pointer"
        >
        Ver proyecto
        </a>
        </div>
    `

    return card
}
