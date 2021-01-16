const BASE_URL = 'http://localhost:3000'

function  extractJsonFromBody(response){
    return response.json()
}




export function fetchComputers() {
    return fetch(`${BASE_URL}/computers`)
    .then( extractJsonFromBody)
}

export function fetchComputerById(id) {
    return fetch(`${BASE_URL}/computers/${id}`)
    .then( extractJsonFromBody)
}