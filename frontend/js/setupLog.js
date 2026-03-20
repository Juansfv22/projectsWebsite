/**
 * Authentication UI setup module.
 * 
 * Manages the display of login/logout buttons in the navbar based on authentication state.
 * Handles logout functionality and session redirection.
 */

/**
 * Setup login/logout button UI and return authentication status.
 * 
 * Checks for JWT token in localStorage and displays appropriate button:
 * - If authenticated: shows logout button
 * - If not authenticated: shows login link
 * 
 * Saves current page URL before login to redirect after successful authentication.
 */
export function setupLog(){
    
    const logBtn = document.getElementById("logBtn")
    const token = localStorage.getItem("token")


    if (token) {
        // User is authenticated - show logout button
        logBtn.innerHTML = 
                `<button id="logoutBtn"
                class="px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 transition shadow-md">
                Salir
                </button>`

    } else {
        // User is not authenticated - show login link
        // Store current page URL for post-login redirect
        sessionStorage.setItem("window", window.location.href)
        
        logBtn.innerHTML = 
                `<a href="login.html"
                class="px-4 py-2 rounded-xl font-semibold bg-slate-900/80 hover:bg-slate-900 border border-slate-700 shadow-sm text-slate-50 transition">
                Admin ✨
                </a>`

    }

    // Setup logout button handler if user is authenticated
    const logoutBtn = document.getElementById("logoutBtn")
    logoutBtn?.addEventListener("click", ()=>{
        // Remove token and reload page to show login UI
        localStorage.removeItem("token")
        window.location.reload()
    })

    return token
}