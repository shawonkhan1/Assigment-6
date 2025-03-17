// ck name and password
document.getElementById("btn").addEventListener('click',function(){
    let name = document.getElementById('name').value;
    let password = document.getElementById("password").value.trim();

    if(name == ""){
       
        Swal.fire({
            title: "Name?",
            text: " Please enter your Name!",
            icon: "question"
          });
        
    }
    else {
        if(password == ""){
          
            Swal.fire({
                title: "Password?",
                text: "Please enter your password!",
                icon: "question"
              });
            
        }

    else{
        if(password === "123456"){
            Swal.fire({
                title: "অভিনন্দন",
                text: " চলুন, আজ নতুন কিছু শেখা যাক...",
                icon: "success",
                didOpen: () => {
                    $(".swal2-popup").draggable(); // ড্র্যাগেবল করতে jQuery UI ব্যবহার
                }
            });
            

            document.getElementById("lock").style.display = "none"
            document.getElementById("nav").style.display = "block";
            
    }
       
    
      else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Password.Contact admin to get your Login Code!",
            
          });
     }
    }
        
    }
    
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
})
 
// logout btn
document.getElementById("logout").addEventListener('click',function(){

    Swal.fire("Enter Your Name And Password");

  document.getElementById('lock').style.display = "block"
  document.getElementById('nav').style.display = "none"
})


// all btn added in api
function allBtn(){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data =>{
        
        
        data.data.forEach(elements => {
            // console.log(elements.id)
        let vocabulariesSection = document.getElementById("btn-8")
       
        let newDiv = document.createElement("div");
    
        
        newDiv.classList.add('fle')
        newDiv.innerHTML = `<button  id="btn-${elements.level_no}" onclick="displayAnother(${elements.level_no});   showSpinner();"
         class="btn btn-outline btn-primary hover:text-black hover:bg-slate-200 ">
         <img src="./assets/fa-book-open.png" alt=""> Lesson-${elements.level_no}</button>`
        
        vocabulariesSection.append(newDiv);
        });
    
      
    })
}

allBtn()


// spinner add function
function showSpinner() {
    document.getElementById("spinner").style.display = "flex";
    setTimeout(function() {
      document.getElementById("spinner").style.display = "none";
    }, 200);
  }
 


// api 2 fetch and send data to display
const displayMeanings = () => {
fetch(`https://openapi.programming-hero.com/api/level/6`)
.then(res => res.json())
.then(data => {
    
    display(data.data)
})
}


// displayMeanings to get data and click btn to showing items 
const display = (data) =>{

const dectription = document.getElementById("btn-description")

dectription.innerHTML = ""

if(data.length === 0){
   document.getElementById("next_lesson").style.display = "block"
}
else{
    document.getElementById("next_lesson").style.display = "none"
}
data.forEach(element => {
    
    let div = document.createElement("div");
     
    div.innerHTML = `  
    <div class="mt-[40px]  bg-[#F8F8F8]
      p-[30px] rounded-[24px] ">
  
      <div class="bg-white  text-center rounded-[12px] p-[10px]">
                 <h1 class="text-[32px] text-[#000000] font-bold">${element.word || "অর্থ নেই"}</h1>
                 <p class="text-[20px] font-bold text-[#000000]">Meaning / Pronounciation</p>
                 <h1 class="text-[32px] font-bold text-[#18181B]">"${element.meaning || "অর্থ নেই"} 
                 / ${element.pronunciation || "অর্থ নেই"}"</h1>
  
          <div class="flex justify-between p-[56px]">
      <div onclick="wordDetails(${element.id})" class="bg-[#1A91FF1A] h-9 w-9 rounded-[12px] p-[5px]">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARBJREFUSEvFVYsNAiEMfbeJTqJuopOok6iTqJOok+i9C5DC8SmBi00uGIG+vr62DFjYhoX9QwOwBcBvY9b3uD4AfMzK30nLAawAXIzTnA8C7gBwnVkK4ATgWJE+Or+N53nPsxhArXPp8ByChABMy6si8vAomRyMNtNeCHAv5Nye/2aCIMja7kuAvRFVUxQ5AN6n6FN1SYCW3IdBOS0kAEuSLHoYoycLjwHFpcg9UuR0kAx6ArjgJUCpgiTjkshXU67VImvKlIFEReZAI4seGrDZyMJjoBluGgaugmKd3DoqvCaLAfA/TUen0lgcdrxIFgSpGdeesBL9bw+ODYJs7GefTO6xU5+tT2aPmaR69JuAfhqfOBmWkGQAAAAAAElFTkSuQmCC"/>
      </div>
          <div  class="bg-[#1A91FF1A] h-9 w-9 rounded-[12px] p-[5px]">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR9JREFUSEu1lYERgjAQBJ9OtBOtRK1ErUQ7kU60E2WZHPNEMEGSzDAOyN/93X1CY5VXUxnf/iW4dI1xJddSgp2Znc2MX9U+zOxkZq8ptiUEdAy4lmrf4QEk95gkh8B37etVC/GhA98EJSOSFEHc9RQBz2jiFkj23X0by9RL8jcZnsvgGKxRM4BD0i+v4Bk6yAH3tdQBSMjC2Cp0T6CwlhJQdw1jKxXkQOgjBWsIZAtZMLaDTaUU+GbVaI9digD/8Z1RJQfdFyOQJdUIskJeM6bYwxLGsNl8Bn435oyqaqnDIjYcu3nwPw55CpQCAPD21zmm8eSd2aNirus5ZV4Bs/8FnqPAk8Zqih3XnsSrKf7BidX0Z01qpb4Hqfrk/9UJPgboRxnEEZWEAAAAAElFTkSuQmCC"/>



      </div>
  
      </div>
  
       </div>
      </div> 

        `
        dectription.append(div)
});

}


// cng id in api url  👉👉 id reachive by 7 btn to dynamic in allBtn
const displayAnother = (id) => {


const url = `https://openapi.programming-hero.com/api/level/${id}`

fetch(url)
.then(res => res.json())
.then(data=>{

document.getElementById("no-select").style.display = "none"

    removeActive();
    const clickbtn = document.getElementById(`btn-${id}`)
    clickbtn.classList.add("active")
 display(data.data)
})
}

// remove active class
function removeActive() {
    const activebtn = document.getElementsByClassName("active")
    for(let btn of activebtn){
        btn.classList.remove("active")
    }
  
}

// wordDetails function
const wordDetails = (detail) => {
    const url = `https://openapi.programming-hero.com/api/word/${detail}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
       displayWordDetail(data.data)
    })

}



// wordDetails to take data and showing word details
const displayWordDetail = (word) => {

    
    document.getElementById("word_details").showModal()
    const wordDetailsDisplay =
     document.getElementById("wordDetailsDisplay")
    
    
   

     wordDetailsDisplay.innerHTML = `

     <h2 class="text-[20px] font-bold">${word.word} : ${word.pronunciation} </h2>

      <h2 class="text-[20px] font-bold">Meaning</h2>
      <h2>${word.meaning || "অর্থ পাওয়া যায়নি"} </h2>

      <p class="mt-[5px] text-[20px] font-bold">Example</p>
      <p>${word.sentence}</p>

      <p class="mt-[5px] text-[20px] font-bold">সমার্থক শব্দ গুলো</p>
     
       <div class="mb-[15px]">
       <button class="btn bg-[#EDF7FF]">${word.synonyms[0] || "সমার্থক শব্দ নেই"}</button>
        <button class="btn bg-[#EDF7FF]">${word.synonyms[1] || "সমার্থক শব্দ নেই"}</button>
        <button class="btn bg-[#EDF7FF]">${word.synonyms[2] || "সমার্থক শব্দ নেই"}</button> 
        </div>
      
     `

}



