import { login } from "./api/authApi.js"

function redirect(){

    const redirectUrl = sessionStorage.getItem("window")
    if (redirectUrl) {
        sessionStorage.removeItem("window")
        window.location.href = redirectUrl
    } else {
        window.location.href = "index.html"
    }
}


document.getElementById("loginBtn")
.addEventListener("click", async ()=>{

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    try{

        const data = await login(username,password)
        localStorage.setItem("token", data.access_token)
        redirect()

    }catch{

        alert("Credenciales incorrectas.")

    }

})


document.getElementById("cancelBtn").
addEventListener("click", ()=>{

    localStorage.removeItem("token")
    redirect()

})
