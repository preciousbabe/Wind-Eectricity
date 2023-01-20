const form = document.getElementById('reg-form')

form.addEventListener('submit',registerUser)

async function registerUser(event){
event.preventDefault()
const fullname = document.getElementById('fullname').value
const password = document.getElementById('password').value


const result = await fetch('/api/register',{
method: 'POST',
headers:{
'content-Type':'application/json'
},
body:JSON.stringify({
    fullname,
    password
})
})
.then((res) => res.json())
if(result.status === "ok"){
alert('Success')
}else{
    alert(result.error)
}
}