
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
