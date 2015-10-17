//All your JS code goes here
//global variables to hold the button elements in the html
var loadButton;
var showButton;
var jsonData;
var counter = 0;
		
//on page load add listeners to the two buttons
document.addEventListener("DOMContentLoaded", function(){
        //get the element from the HTML file and assign it to this variable
        //then add the event listener and the function that happens when clicked
        loadButton = document.getElementById("loadBtn");
        loadButton.addEventListener("click", getData);
        //same for the show button
        showButton = document.getElementById("showBtn");
        showButton.addEventListener("click", showData);   		
});

function getData(){
    var req = new XMLHttpRequest( );
    req.open('GET', "users.json", true );
    req.onreadystatechange = function( ){
        if( req.readyState == 4){
            if( req.status == 200){
                //we have the info.xml page loaded
                console.log(req.responseText);
                    
                //HERE IM SAVING THIS JSON DATA TO THIS VARIABLE
                jsonData = JSON.parse(req.responseText);
            }

	loadButton.className = "btn disabled";
	showButton.className = "btn enabled";
	loadButton.removeEventListener("click", getData);
        }

    };
    req.send( null ); 
}


String.prototype.capitalize = function (){
	return this.charAt(0).toUpperCase() + this.slice(1);
};



  function showData(){

    //Define the Main variables
    var jsImg = document.createElement("img");
    var name = document.createElement("h2");
    var email= document.createElement("h3");
    
  showButton.innerHTML= "Show Next";
    // Define the Json Source for the variables
    jsImg.src = jsonData[counter].image;
	name.innerHTML = jsonData[counter].firstName.capitalize() + " " + jsonData[counter].lastName.capitalize();
	email.innerHTML = '<a href = "mailto:' + jsonData[counter].email + '">' + jsonData[counter].email + '</a>';

    //create a variable to hold the OUTPUT div for the person's data
    var div = document.querySelector("#output1");
        
    //CLEAR THE DIV BEFORE ADDING NEW PERSON
    div.innerHTML = "";
    //semantically insert the person name h2 tag into this div
	div.appendChild(jsImg);
	div.appendChild(name);
	div.appendChild(email);

	sideBar ();
    counter++;
};



function sideBar(){
    
	var previousUser = jsonData[counter - 1];
	if (!previousUser) {
		return;
	}
	
	// define side bar variables
	var holder = document.createElement("div");
	var thumb = document.createElement("img");
	var name2 = document.createElement("h3");
	var email2= document.createElement("h3");
	
	//source location for Vars
	thumb.src = previousUser.thumbnail;
	email2.innerHTML = '<a href = "mailto:' + previousUser.email + '">' + previousUser.firstName.capitalize()+ " " + previousUser.lastName.capitalize() + '</a>';
	
	var div2 = document.querySelector("#output2");
	
	holder.appendChild(thumb);
	holder.appendChild(email2);
	
	div2.appendChild(holder);
	
	if (counter >= 0) {
		div2.removeChild(div2.firstChild);
	}
}
