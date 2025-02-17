let userName = document.getElementById("user-name")
let password = document.getElementById("password")
let submit = document.getElementById("submit")
document.getElementById("user-profile").classList.add("hidden")
let loginData = {}
/* -------------------------------------------------------------------------- */
 let url_post_data = "https://assiut-robotics-zeta.vercel.app/members/login"
 
 submit.addEventListener("click" , function(e){
  e.preventDefault()
  loginData =  { 
    email : `${userName.value}` ,
    password : `${password.value}`
    // email : `mostafa7.11m@gmail.com` ,
    // password : `01032161126@Mm`
      }
      console.log("----");
      
fetch(url_post_data , {
        method : "POST",
        headers: {
          "Content-Type": "application/json"
          },
        body : JSON.stringify(loginData),
  })
        .then((res)=>res.json())
        .then((result)=>{
          localStorage.setItem("token" , JSON.stringify(result.data.token))
          isValidToken()
        }).catch((error) => {
          console.log(error);
        })
        
})
/* -------------------------------------------------------------------------- */
 let url_get_data = "https://assiut-robotics-zeta.vercel.app/members/verify"

    function isValidToken(){
      let token = JSON.parse(localStorage.getItem("token"))
      // console.log(token);
      if(token != null){
        fetch(url_get_data, {
              method: 'GET', 
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            })
            .then(response => response.json())
            .then((result) => {
                dispalyMemberData(result.data)
              })
              .catch((error) => {
                  console.log(error)
                  localStorage.removeItem("token");
              });
                
       }else{
          console.log("localStorage is Null");
          // document.getElementById("log-in").classList.toggle("hidden")
       }
      }
      isValidToken()
      
  function dispalyMemberData(data){

    console.log("ok");
    
    document.getElementById("log-in").classList.toggle("hidden")
    document.getElementById("user-profile").classList.toggle("hidden")
    document.getElementById("name").innerHTML = data.name
    document.getElementById("email").innerHTML = data.email
    document.getElementById("phone").innerHTML = data.phoneNumber
    document.getElementById("gender").innerHTML = data.gender
    document.getElementById("committee").innerHTML = data.committee
    document.getElementById("role").innerHTML = data.role
 

 }





