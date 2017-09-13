function loadfunction() { 

$.ajax({ 

  url: "/data",
  type: "GET", 
  tryCount : 0,
  retryLimit : 3,
success: function(response) {

for( i = 0 ;i< response.length;i++){
  
         tabBody=document.getElementById("table");
         row=document.createElement("tr");
         cell1 = document.createElement("td");
         cell2 = document.createElement("td");
         cell3 = document.createElement("td");
         cell4 = document.createElement("td");
         textnode1=document.createTextNode(response[i].username);
         textnode2=document.createTextNode(response[i].help);
         textnode3=document.createTextNode(response[i].date);
         textnode4=document.createTextNode(response[i].time);
         cell1.appendChild(textnode1);
         cell2.appendChild(textnode2);
         cell3.appendChild(textnode3);
         cell4.appendChild(textnode4);
         row.appendChild(cell1);
         row.appendChild(cell2);
         row.appendChild(cell3);
         row.appendChild(cell4);
         tabBody.appendChild(row);

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












}

window.onload = loadfunction;



