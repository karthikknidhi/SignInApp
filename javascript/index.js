/*globals $:false , jQuery:false*/
// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

var main = function() {

$("#form1").submit(function( event ) {
  
  var value= $(".feedback-input").val();

if(value !== ""){

	localStorage.setItem("username",value);
  window.location.href = "/index2.html";
	
}else{
	
	alert("Oops!! Please enter your full name");
  
}
return false;
});

	

//second html

$("#form2").submit(function (e) {

    console.log("Im here");
     var allVals = [];

     $('input[type="checkbox"]:checked').each(function () {
     
         allVals.push($(this).attr("name"));
     });
    

var username = localStorage.getItem("username");

  var date = new Date;
  date.setTime(date.getTime());
  var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() ;
  var arr = { "name" : username, "help" :allVals, "time":time, "day":getToday()};
  
$.ajax({
  url: "thankyou",
  type: "POST", 
  data: arr,
  tryCount : 0,
  retryLimit : 3,
  success: function(response) {
    
  console.log(response);


  if(response === "Success"){

      

      window.location.href = "/thankyou.html";
     
    }else{


      console.log("hey thererer");
    }
  },
  error: function(xhr,textStatus) {
    if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }            
            return;
        }

  }
});



return false;
  

 });

function getToday(){

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'/'+dd+'/'+yyyy;


return today;

}



};//end of main

$(document).ready(main);