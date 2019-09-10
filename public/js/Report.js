var app = this.app || {};

function report(){
    console.log("Report function has been called");
    const Http = new XMLHttpRequest();
    const url='https://emhamei4p1.execute-api.us-west-1.amazonaws.com/default/reportTreeIssueV2';
    Http.open("POST", url);
    
    
    // Http.setRequestHeader("Access-Control-Allow-Origin","Public Tree Map");

    Http.send({
        "locationCoord": "-118.469757, 34.017029",
        "location": "This is a test",
        "treeIssue": "Inspection",
        "description": "Hi Pete, this is a test"
      });

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText);
        
        console.log("Headers: "+Http.getAllResponseHeaders());
    }
    console.log("DONE");

}