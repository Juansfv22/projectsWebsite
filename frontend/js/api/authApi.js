/**
 * Authentication API client module.
 * 
 * Handles API calls for admin authentication and JWT token retrieval.
 * Communicates with the backend /auth endpoint.
 */

const API_URL = "/auth"

/**
 * Login to admin account with username and password.
 * 
 * Sends credentials to backend and retrieves JWT token on success.
 * Token is stored in localStorage for authenticated requests.
 */
export async function login(username, password){

    const response = await fetch(API_URL + "/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    })

    if(!response.ok){
        throw new Error("Login incorrecto")
    }

    return await response.json()
}