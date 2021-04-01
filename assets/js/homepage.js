
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");

// Ensure javascript file is linked correctly
var getUserRepos = function(user) {
    // Format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the url
    fetch (apiUrl).then(function(response) {
        // Request was successful
        if (response.ok) {
            // Before we can use the response data in our code, we have to format the response as JSON
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        }
        else {
            alert("Error: " + response.statusText);
        }
    })
    // Handle network errors
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()`
        alert("Unable to connect to GitHubt");
    });
};

var response = fetch("https://api.github.com/users/octocat/repos");

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // Get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
};

// Accept both the array of repository data and the term we search for as parameters
var displayRepos = function(repos, searchTerm) {
    // Check if API returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // Clear old content
    repoContainerEl.textContent = "";
    repoSearchTermEl.textContent = searchTerm;

    // Loop over repos
    for (var i = 0; i < repos.length; i++) {
        // Format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // Create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center"

        // Create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // Append title to container
        repoEl.appendChild(titleEl);

        // Create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // Check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // Append status to container
        repoEl.appendChild(statusEl);

        // Append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

