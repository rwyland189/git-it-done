// Ensure javascript file is linked correctly
var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();

