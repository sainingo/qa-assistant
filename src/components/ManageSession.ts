export const CheckSession = async ()=>{
    let response = {
        isAuthenticated:''
    }
    const result = await fetch('openmrs/ws/rest/v1/session', {
    method: 'GET',
    redirect: 'follow',
    });
    const [headers, body] = await Promise.all([
    result.headers,
    result.json(),
])
if(body.authenticated == false){
    response.isAuthenticated ='false'
}
if(body.authenticated == true){
    response.isAuthenticated ='true'
}
return response.isAuthenticated
}

export const DeleteSession = async()=>{
    await fetch('openmrs/ws/rest/v1/session', {
    method: 'DELETE',
    })
    .then(() => {
        localStorage.removeItem('userInformation')
        localStorage.removeItem('authenticated')
        window.location.href = "/login"
    })
}
