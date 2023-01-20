const form = document.getElementById('changePassword-form')
form.addEventListener('submit',loginUser)


async function loginUser(event){
event.preventDefault()
const password = document.getElementById('password').value


const result = await fetch('/api/change-password',{
method: 'POST',
headers:{
'content-Type':'application/json'
},
body:JSON.stringify({
   newPassword: password,
   token: localStorage.getItem('token')
})
})
.then((res) => res.json())
if(result.status === "ok"){
alert('Success')
}else{
    alert(result.error)
}
}