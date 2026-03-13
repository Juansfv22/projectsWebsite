export function setupLog(){
    
    const logBtn = document.getElementById("logBtn")
    const token = localStorage.getItem("token")


    if (token) {

        logBtn.innerHTML = 
                `<button id="logoutBtn"
                class="bg-red-500 text-white px-3 py-1 rounded">
                Logout
                </button>`

    } else {

        sessionStorage.setItem("window", window.location.href)
        
        logBtn.innerHTML = 
                `<a href="/frontend/login.html"
                class="bg-white text-blue-600 px-3 py-1 rounded">
                Admin
                </a>`

    }

    const logoutBtn = document.getElementById("logoutBtn")
    logoutBtn?.addEventListener("click", ()=>{
        localStorage.removeItem("token")
        window.location.reload()
    })

    return token
}