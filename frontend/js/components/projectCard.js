/**
 * Project card component module.
 * 
 * Creates reusable project card elements for displaying in the projects list.
 * Each card shows project thumbnail, name, Stack, and link to details page.
 */

/**
 * Create a project card DOM element.
 * 
 * Builds an interactive card displaying project summary information.
 * Card includes project image (with fallback), name, technology Stack, and link to detail page.
 * Images are loaded from frontend/images/ directory using project ID.
 */
export function createProjectCard(project){
    const card = document.createElement("div")

    // Tailwind breakpoint for responsive design
    const breakpoint = "min-[530px]"

    // Apply card styling with Tailwind CSS
    // 'flex' align image and content side by side
    card.className = "group bg-white/80 backdrop-blur p-5 rounded-2xl shadow-lg shadow-slate-900/5 border-4 border-details-green hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex gap-4"

    // Build local image path based on project ID
    // Images should be stored as frontend/images/image{id}.png
    const imgSrc = `/images/imagen${project.id}.png`

    card.innerHTML = `
        <!-- IZQUIERDA -->
        <div class="flex flex-col justify-around items-center ${breakpoint}:items-start shrink-0 w-[7rem] sm:w-32">
            <div class="rounded-xl overflow-hidden">
                <img src="${imgSrc}" alt="${project.name}" 
                onerror="this.onerror=null;this.src='/images/default.png';"
                class="w-full h-full object-contain">
            </div>

            <!-- LINK MOBILE -->
            <a
                href="project.html?id=${project.id}"
                class="mt-2 ${breakpoint}:hidden inline-flex items-center gap-1 text-sm text-details-green font-courier font-bold tracking-tighter hover:text-back-blue transition cursor-pointer"
            >
                Ver proyecto <span class="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
        </div>

        <!-- DERECHA -->
        <div class="flex-grow min-w-0 h-full flex flex-col gap-3 ${breakpoint}:justify-between">
            <h3 class="text-lg font-extrabold tracking-tight line-clamp-3">
                ${project.name}
            </h3>

            <p class="text-slate-600 text-sm line-clamp-4">
                <span class="font-semibold text-slate-700">Stack:</span> ${project.Stack || ""}
            </p>

            <!-- LINK DESKTOP -->
            <a
                href="project.html?id=${project.id}"
                class="hidden ${breakpoint}:inline-flex items-center gap-1 text-sm text-details-green font-courier font-bold tracking-tighter hover:text-back-blue transition cursor-pointer"
            >
                Ver proyecto <span class="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
        </div>
    `

    return card
}
