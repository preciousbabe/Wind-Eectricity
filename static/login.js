const form = document.getElementById('login-form')

form.addEventListener('submit',loginUser)

async function loginUser(event){
event.preventDefault()
const fullname = document.getElementById('fullname').value
const password = document.getElementById('password').value


const result = await fetch('/api/login',{
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
console.log('Got the token', result.data)
localStorage.setItem('token', result.data)
alert('Success')

}else{
    alert(result.error)
}
}