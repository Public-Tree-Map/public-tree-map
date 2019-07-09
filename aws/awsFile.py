from botocore.vendored import requests
#This import only will work in AWS, for running yourself just import requests


#This file uses aws to create a serverless form to submit to the city

#This is a sample event
#{
#  "locationCoordinate": "-118.469757, 34.017029",
#  "location": "This is a test",
#  "treeIssue": "Inspection",
#  "description": "Fish taste good"
#}

def lambda_handler(event, context):
    print("GO FISH")
    r = requests.post(
        "https://user.govoutreach.com/santamonica/support.php?cmd=newcase", 
        data={
            "classificationId":"30642",
            "locationCoord":event["locationCoordinate"],
                #"-118.485100"+", "+"34.011730",
            "location":event["location"],
            "treeIssue": event["treeIssue"],
            "description": (event["description"]+" -- This report was brought to you by the Public Tree Map Project")
        })
    print(r.status_code)
    return {
        'status_code':'200'
    }
