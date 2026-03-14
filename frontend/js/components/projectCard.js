export function createProjectCard(project){
    const card = document.createElement("div")

    // Agregamos 'flex' y 'items-start' para alinear imagen y texto
    card.className = "group bg-white/80 backdrop-blur p-5 rounded-2xl shadow-lg shadow-slate-900/5 border border-white/60 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex gap-4"

    // Usamos el placeholder si no hay imagen
    const imgSrc = project.image_url || "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"

    card.innerHTML = `
        <div class="flex-shrink-0 w-28 h-20 sm:w-36 sm:h-24">
        <img src="${imgSrc}" alt="${project.name}" 
        class="w-full h-full object-cover rounded-xl shadow-sm ring-1 ring-black/5">
        </div>

        <div class="flex-grow min-w-0">
        <h3 class="text-lg font-extrabold tracking-tight mb-2 truncate">
            ${project.name}
        </h3>

        <p class="text-slate-600 text-sm line-clamp-2">
            <span class="font-semibold text-slate-700">Descripción:</span> ${project.description || "Sin descripción aún."}
        </p>

        <p class="text-slate-600 text-sm mt-1">
            <span class="font-semibold text-slate-700">Contenido:</span> ${project.attachment || "Sin contenido aún."}
        </p>

        <a
        href="project.html?id=${project.id}"
        class="inline-flex items-center gap-2 mt-3 text-sky-700 font-semibold hover:text-fuchsia-700 transition cursor-pointer"
        >
        Ver proyecto <span class="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        </div>
    `

    return card
}
