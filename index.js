// ck name and password
document.getElementById("btn").addEventListener('click',function(){
    let name = document.getElementById('name').value;
    let password = document.getElementById("password").value;

    if(name == ""){
        alert("Enter Your Name")
        
    }
    else {
        if(password === "123456"){
     document.getElementById("welcome").showModal();
     document.getElementById("lock").style.display = "none"
     document.getElementById("nav").style.display = "block";
     
           }

           else{
            alert('wrong password')
           }
    }
    
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
})
 
// logout btn
document.getElementById("logout").addEventListener('click',function(){
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
        newDiv.innerHTML = `<button  id="btn-${elements.level_no}" onclick="displayAnother(${elements.level_no})"
         class="btn btn-outline btn-primary hover:text-black hover:bg-slate-200 ">
         <img src="./assets/fa-book-open.png" alt=""> Lesson-${elements.level_no}</button>`
        
        vocabulariesSection.append(newDiv);
        });
    
      
    })
}
allBtn()

 

// api 2 fetch
const displayMeanings = () => {

fetch(`https://openapi.programming-hero.com/api/level/6`)
.then(res => res.json())
.then(data => {
    console.log(data)
    display(data.data)
})
}


const display = (data) =>{

const dectription = document.getElementById("btn-description")
dectription.innerHTML = ""
if(data.length === 0){
   document.getElementById("no-select").style.display = "block"
}
else{
    document.getElementById("no-select").style.display = "none"
}
data.forEach(element => {
    console.log(element.level_no)
    
    let div = document.createElement("div");
     
    div.innerHTML = `  
    <div class="mt-[40px]  bg-[#F8F8F8]
      p-[30px] rounded-[24px] ">
  
      <div class="bg-white  text-center rounded-[12px] p-[10px]">
                 <h1 class="text-[32px] text-[#000000] font-bold">${element.word}</h1>
                 <p class="text-[20px] font-bold text-[#000000]">Meaning / Pronounciation</p>
                 <h1 class="text-[32px] font-bold text-[#18181B]">"${element.meaning} / ${element.pronunciation}"</h1>
  
          <div class="flex justify-between p-[56px]">
      <div onclick="wordDetails(${element.id})" class="bg-[#1A91FF1A] h-9 w-9 rounded-[12px] p-[10px]">
      <img src="./assets/fa-book-open.png" alt="">
      </div>
          <div  class="bg-[#1A91FF1A] h-9 w-9 rounded-[12px] p-[10px]">
      <img src="./assets/fa-arrow-right-from-bracket.png" alt="">
      </div>
  
      </div>
  
       </div>
      </div> 

        `
        dectription.append(div)
});

}


// cng id in api url
const displayAnother = (id) => {


const url = `https://openapi.programming-hero.com/api/level/${id}`

fetch(url)
.then(res => res.json())
.then(data=>{
    removeActive();
    const clickbtn = document.getElementById(`btn-${id}`)
    clickbtn.classList.add("active")
    // console.log(clickbtn)
 display(data.data)
})
}

// remove active class
function removeActive() {
    const activebtn = document.getElementsByClassName("active")
    for(let btn of activebtn){
        btn.classList.remove("active")
    }
    console.log(activebtn)
}


const wordDetails = (detail) => {
    const url = `https://openapi.programming-hero.com/api/word/${detail}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
       displayWordDetail(data.data)
    })

}

const displayWordDetail = (word) => {
    document.getElementById("word_details").showModal()
    const wordDetailsDisplay =
     document.getElementById("wordDetailsDisplay")
     wordDetailsDisplay.innerHTML = `

      <h2>Meaning</h2>
      <h2>${word.meaning} </h2>

      <p class="mt-[5px]">Example</p>
      <p>${word.sentence}</p>

      <p class="mt-[5px]">সমার্থক শব্দ গুলো</p>
     
       <div class="mb-[15px]">
       <button class="btn bg-[#EDF7FF]">${word.synonyms[0]}</button>
        <button class="btn bg-[#EDF7FF]">${word.synonyms[1]}</button>
        <button class="btn bg-[#EDF7FF]">${word.synonyms[2]}</button> 
        </div>
      
     `
console.log(word)
}

