var appEndpoint = "http://localhost:3000/protected";

var authenticationEnpoint = "http://localhost:3001";

function reqListener () {
    console.log(this.responseText);
    var responseJson = null;
    if (this.response) {
        responseJson = JSON.parse(this.response);
    }
    if (this.status === 200 && responseJson) {
        // success, get JWT
        var token = responseJson.token;

        // set as cookie
        Cookies("jwt", token);

        document.getElementById("result").innerHTML = token;
    } else {
        // error
        var errorText = this.status;
        if (responseJson && responseJson.message) {
            errorText += " " + responseJson.message;
        } else {
            errorText += " " + this.responseText;
        }
        document.getElementById("result").innerHTML = errorText;
    }
}

function submitForm(form, event) {
    event.preventDefault();
    // get form data
    var formData = new FormData(form);
    // prepare request
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);
    xhr.open("POST", authenticationEnpoint + "/login");
    xhr.setRequestHeader("Content-Type", "application/json");
    // create JSON from form data
    var jsonString = JSON.stringify({
        "username": formData.get("username"),
        "password": formData.get("password")
    })
    // send
    xhr.send(jsonString);
}
