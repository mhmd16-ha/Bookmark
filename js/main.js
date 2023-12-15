var siteName = document.getElementById("SiteName");
var siteURL = document.getElementById("SiteURL");
var submitBtn=document.querySelector(".btn-orange");
submitBtn.addEventListener("click",addSite)



var listOfSite = [];
if(localStorage.getItem("listOfSite")!=null){
listOfSite=JSON.parse(localStorage.getItem("listOfSite"));
displayData();
}
function addSite() {
  if(siteNameValidation()==true&&siteURLValidation()==true){
    var site={
      name:siteName.value,
      url:siteURL.value,
    }
    listOfSite.push(site);
    localStorage.setItem("listOfSite",JSON.stringify(listOfSite));
    clearData()
    displayData();
  }else{
    submitBtn.setAttribute("data-bs-toggle","modal")
    submitBtn.setAttribute("data-bs-target","#staticBackdrop")
  }
 
}
function clearData(){
  siteName.value="";
  siteURL.value="";
  siteName.classList.remove("is-valid")
  siteName.classList.remove("is-invalid")
  siteURL.classList.remove("is-valid")
  siteURL.classList.remove("is-invalid")
}
function displayData(){
  temp= " ";
  for (var i = 0; i < listOfSite.length; i++) {
    temp+=`<tr>
    <td>`+(i+1)+`</td>
    <td>`+listOfSite[i].name+`</td>
    <td><button onclick="visitSite(`+i+`)" class="btn btn-green"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
    <td><button onclick="deleteSite(`+i+`)" class="btn btn-red"><i class="fa-solid fa-trash-can"></i> Delete</button></td></tr>`
  }
  document.getElementById("tableBody").innerHTML=temp;
}
function visitSite(index){
  window.open("http://"+listOfSite[index].url);
}
function deleteSite(index){
listOfSite.splice(index,1);
localStorage.setItem("listOfSite",JSON.stringify(listOfSite))
displayData();
}
function siteNameValidation(){
  var regex=/^([A-Za-z0-9]{3,}\s?([A-Za-z0-9])*)+$/
  if(regex.test(siteName.value)==true){
    siteName.classList.add("is-valid")
    siteName.classList.remove("is-invalid")
    return true;
  }else{
    siteName.classList.add("is-invalid")
    siteName.classList.remove("is-valid")
    return false;
  }
}
function siteURLValidation(){
  var regex=/^[A-Za-z0-9]{3,}\.[A-Za-z0-9]{2,4}$/
  if(regex.test(siteURL.value)==true){
    siteURL.classList.add("is-valid")
    siteURL.classList.remove("is-invalid")
    return true;
  }else{
    siteURL.classList.add("is-invalid")
    siteURL.classList.remove("is-valid")
    return false;
  }
}

// var deleteBtns=Array.from(document.querySelectorAll(".btn-red"));
// for(var i=0;i<deleteBtns.length;i++){
//    deleteBtns[i].addEventListener("click",function(e){
//     console.log(deleteBtns.indexOf(e.target));
// deleteSite(deleteBtns.indexOf(e.target))
//   })
// }