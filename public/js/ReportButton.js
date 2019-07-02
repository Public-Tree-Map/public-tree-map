
function reportButton() {
  //print(); PRINT FUCTION ACTUALLY CALLS PRINTER LOL
  document.getElementById('ReportForm').style.visibility="visible"
}
function closeForm() {
  //print(); PRINT FUCTION ACTUALLY CALLS PRINTER LOL
  document.getElementById('ReportForm').style.visibility="hidden"
}
function report() {
  document.getElementById('ReportForm').style.visibility="hidden"
 var obj = {
  classificationId:"30642",
  locationCoord:"34.012764, -118.474392",
  location:"1325 pearl street, Santa Monica",
  treeIssue: "Inspection",
  description: "This is a test",
//  "firstName":"Ben",
//  "lastName": "S",
//  "email":"Sbenjamin@gmail.com",
//  "phone":"3104631095",
//  "altPhone":"",
//  "address":"1329",
//  "city":"santa monica",
//  "state":"California",

}
postData(url="https://user.govoutreach.com/santamonica/support.php?cmd=newcase",data=obj)
}

function postData(url = '', data = {}) {
  // Default options are marked with *
    
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin',
        Origin: "https://app.govoutreach.com", // include,, *same-origin, omit
        headers: {
         // Origin:"https://app.govoutreach.com"
          //"Origin":"
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(response => response.json()).catch(
       print()
      
    ); // parses JSON response into native Javascript objects 
}

// function submitForm(){
//   const HTTP = XMLHttpRequest();
//   const url = "https://user.govoutreach.com/santamonica/support.php?cmd=newcase";
//   const method = "POST";
//   const postData =  {          
//   "classificationId":"30642",
//   "locationCoord":long+", "+lat,
//   "location":"",
//   "treeIssue": IssueOtions.responseText,
//   "description": ReportDescription.responseText,
//   };


//   //ALWAYS
//   const shouldBeAsync = true;

//   const request = new XMLHttpRequest();

//   request.onload = function () {
//     var status = request.status; //UNUSED
//     var data = request.responseText; //UNUSED
//   }

//   request.open(method, url, shouldBeAsync);

//   request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

//   request.send(postData);
// }
