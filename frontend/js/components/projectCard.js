/**
 * Project card component module.
 * 
 * Creates reusable project card elements for displaying in the projects list.
 * Each card shows project thumbnail, name, stack, and link to details page.
 */

/**
 * Create a project card DOM element.
 * 
 * Builds an interactive card displaying project summary information.
 * Card includes project image (with fallback), name, technology stack, and link to detail page.
 * Images are loaded from frontend/images/ directory using project ID.
 */
export function createProjectCard(project){
    const card = document.createElement("div")

    // Apply card styling with Tailwind CSS
    // 'flex' and 'items-start' align image and content side by side
    card.className = "group bg-white/80 backdrop-blur p-5 rounded-2xl shadow-lg shadow-slate-900/5 border border-white/60 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex gap-4"

    // Build local image path based on project ID
    // Images should be stored as frontend/images/image{id}.jpg
    const imgSrc = `/images/image${project.id}.jpg`

    card.innerHTML = `
        <div class="flex-shrink-0 w-28 h-20 sm:w-36 sm:h-24">
        <img src="${imgSrc}" alt="${project.name}" 
        onerror="this.onerror=null;this.src='/images/default.jpg';"
        class="w-full h-full object-cover rounded-xl shadow-sm ring-1 ring-black/5">
        </div>

        <div class="flex-grow min-w-0">
        <h3 class="text-lg font-extrabold tracking-tight mb-2 truncate">
        ${project.name}
        </h3>

        <p class="text-slate-600 text-sm line-clamp-2">
        <span class="font-semibold text-slate-700">Stack:</span> ${project.stack || ""}
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
