console.log("yes it's running");

var firstChild = document.getElementsByClassName("first-child");
var hideBtn = document.getElementsByClassName("gb_Fc");
var secondChild = document.getElementsByClassName("second-child");


function hidecontent(){
    let addId = document.getElementById("dropdown-section");
    if(addId){
        firstChild[0].removeAttribute("id", "dropdown-section")
        secondChild[0].style.width = "77vw";
        secondChild[0].style.marginLeft = "0px";
    }
    else{
        firstChild[0].setAttribute("id", "dropdown-section")
        secondChild[0].style.width = "100vw";
        secondChild[0].style.marginLeft = "20px";
    }
}

hideBtn[0].addEventListener("click", hidecontent);