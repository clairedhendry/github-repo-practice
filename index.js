"use strict"

const token = //authentication token



function fetchRepos(userName) {
    const options = {
        headers: new Headers({
            "Authentication": token})
        }
    
    const fetchName = `https://api.github.com/users/:${userName}/repos`
    
    fetch(fetchName, options)
    
    .then(response => {
        if (response.ok) {
            return response.json();
        } throw new Error(response.statusText);
    })
    .then(responseJson => displayRepos(responseJson))
    .catch(err => {
        $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayRepos(responseJson) {
    console.log(responseJson);
    $(".repo-list").empty();

    for (let i = 0; i < responseJson.message.length; i++) {
        let list = generateLi(responseJson, i);
        $(".repo-list").append(list);
    }
    
}

function generateLi(responseJson, i) {
    return `<li>
    <h3><a href="${responseJson.message[i].url}">${responseJson.message[i].title}</a></h3>
    </li>`
}

function getInput() {
    $("#submit").on("click", function(event) {
        event.preventDefault();
        const value = $("input#input").val();

        fetchRepos(value)
    })
}

$(getInput);