export function setupLog(){
    
    const logBtn = document.getElementById("logBtn")
    const token = localStorage.getItem("token")


    if (token) {

        logBtn.innerHTML = 
                `<button id="logoutBtn"
                class="px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 transition shadow-sm">
                Salir
                </button>`

    } else {

        sessionStorage.setItem("window", window.location.href)
        
        logBtn.innerHTML = 
                `<a href="login.html"
                class="px-4 py-2 rounded-xl font-semibold bg-white/80 hover:bg-white border border-white/60 shadow-sm text-slate-800 transition">
                Admin ✨
                </a>`

    }

    const logoutBtn = document.getElementById("logoutBtn")
    logoutBtn?.addEventListener("click", ()=>{
        localStorage.removeItem("token")
        window.location.reload()
    })

    return token
}