const API_URL = "http://127.0.0.1:8000/auth"

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