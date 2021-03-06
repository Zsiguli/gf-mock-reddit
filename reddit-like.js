var classNumber = 0;
var requestedData;
var id;
var domain = 'https://time-radish.glitch.me';
// var domain = 'http://localhost:3000';
var body = document.querySelector('body');
var articleContainer = document.querySelector('.article-container');
var postFormContainer = document.querySelector('.post-form-container');
var newPostBut = document.querySelector('.new-post');
var logoutButton = document.querySelector('.logout');


function lastGetFromServer() {
	var xhr = new XMLHttpRequest();
	method = "GET";

	xhr.open(method, domain + '/logout', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

	// xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200){
    //         var requestedData = JSON.parse(xhr.response);
    //         requestedData = requestedData.posts;
    //         console.log(requestedData);
    //         callback(requestedData);
	// 	}
	// }
	xhr.send();
}
logoutButton.addEventListener('click', function(){
	lastGetFromServer();
})


function getFromServer(callback) {
	var xhr = new XMLHttpRequest();
	method = "GET";

	xhr.open(method, domain + '/posts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

	xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            var requestedData = JSON.parse(xhr.response);
            requestedData = requestedData.posts;
            console.log(requestedData);
            callback(requestedData);
		}
	}
	xhr.send();
}


function postToServer(givenTitle, givenUrl, callback) {
	var xhr = new XMLHttpRequest();
	method = "POST";

	xhr.open(method, domain + '/posts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

	xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            // var requestedData = JSON.parse(xhr.response);
            callback(postCreator);
		}
	}
    var data = {
        title: givenTitle,
        href: givenUrl
    }
	xhr.send(JSON.stringify(data));
}

var upVote = function(id, upArrow){
    console.log(id);
    var xhr = new XMLHttpRequest();
    var url = domain + '/posts/' + id + '/upvote';
    method = 'PUT';

    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    
    upArrow.setAttribute('src', 'upvoted.png');
    xhr.send();
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            getFromServer(postCreator);
        }
    }
}

var downVote = function(id, downArrow){
    var xhr = new XMLHttpRequest();
    var url = domain + '/posts/' + id + '/downvote';
    method = 'PUT';

    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    
    downArrow.setAttribute('src', 'downvoted.png');
    xhr.send();
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            getFromServer(postCreator);
        }
    }
}

var deleteRemove = function(id){
    var xhr = new XMLHttpRequest();
    var url = domain + '/posts/'+ id; 
    method = 'DELETE';
    
    xhr.open(method, url, true);

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(); 
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            getFromServer(postCreator);
        }
    }
}


var logoutPage = function(){
	articleContainer.innerHTML = '';
    newPostBut.style.visibility = 'hidden';
	logoutButton.style.visibility = 'hidden';
}

var postForm = function(){
    
    articleContainer.innerHTML = '';
    newPostBut.style.visibility = 'hidden';
    logoutButton.style.visibility = 'hidden';
    
    var newUrlLabel = document.createElement('label');
    newUrlLabel.setAttribute('class', 'label');
    newUrlLabel.innerHTML = 'Url';
    postFormContainer.appendChild(newUrlLabel);
    
    var newUrlInput = document.createElement('input');
    newUrlInput.setAttribute('class', 'input')
    postFormContainer.appendChild(newUrlInput);
    
    var newTitleLabel = document.createElement('label');
    newTitleLabel.setAttribute('class', 'label');
    newTitleLabel.innerHTML = 'Title';
    postFormContainer.appendChild(newTitleLabel);
    
    var newTitleInput = document.createElement('input');
    newTitleInput.setAttribute('class', 'input');
    postFormContainer.appendChild(newTitleInput);
    
    var options = document.createElement('p');
    options.setAttribute('class', 'label');
    options.innerHTML = 'options';
    postFormContainer.appendChild(options);
    
    var checkbox = document.createElement('input');
    checkbox.setAttribute('class', 'check');
    checkbox.setAttribute('type', 'checkbox');
    postFormContainer.appendChild(checkbox);
    
    var checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('class', 'check-label');
    checkboxLabel.innerHTML = 'post as anonymous';
    postFormContainer.appendChild(checkboxLabel);
    
    var sendPostBut = document.createElement('button');
    sendPostBut.setAttribute('class', 'send-post');
    sendPostBut.innerHTML = 'submit';
    postFormContainer.appendChild(sendPostBut);
	
	newTitleInput.addEventListener('keyup', function(e) {
	    if (e.keyCode === 13) { 
			postToServer(newTitleInput.value, newUrlInput.value, getFromServer);
			postFormContainer.innerHTML = '';
			newPostBut.style.visibility = 'visible';
			logoutButton.style.visibility = 'visible';
	    }
	} )
    
    sendPostBut.addEventListener('click', function(){
        postToServer(newTitleInput.value, newUrlInput.value, getFromServer);
        postFormContainer.innerHTML = '';
        newPostBut.style.visibility = 'visible';
        logoutButton.style.visibility = 'visible';
    });
}

newPostBut.addEventListener('click', postForm);
getFromServer(postCreator);