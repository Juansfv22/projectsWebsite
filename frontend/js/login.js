/**
 * Admin login page module.
 * 
 * Handles user authentication through login form.
 * Stores JWT token and manages redirection after successful login/logout.
 */

import { login } from "./api/authApi.js"

/**
 * Redirect to stored page or homepage.
 * 
 * After successful login, redirects to the original page that required authentication.
 * If no stored page, redirects to homepage.
 */
function redirect(){

    const redirectUrl = sessionStorage.getItem("window")
    if (redirectUrl) {
        sessionStorage.removeItem("window")
        window.location.href = redirectUrl
    } else {
        window.location.href = "index.html"
    }
}


// Setup login button click handler
document.getElementById("loginBtn")
.addEventListener("click", async ()=>{

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    try{
        // Send login credentials to backend
        const data = await login(username,password)
        
        // Store JWT token for authenticated requests
        localStorage.setItem("token", data.access_token)
        
        // Redirect to original page or homepage
        redirect()

    }catch{
        // Show error message on failed login
        alert("Credenciales incorrectas.")

    }

})


// Setup cancel button click handler
document.getElementById("cancelBtn").
addEventListener("click", ()=>{
    // Clear any stored token and redirect home
    localStorage.removeItem("token")
    redirect()

})
