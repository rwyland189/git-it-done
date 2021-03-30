// Ensure javascript file is linked correctly
var getUserRepos = function(user) {
    // Format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the url
    fetch (apiUrl).then(function(response) {
        // Before we can use the response data in our code, we have to format the response as JSON
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

var response = fetch("https://api.github.com/users/octocat/repos");
console.log(response);

getUserRepos();

