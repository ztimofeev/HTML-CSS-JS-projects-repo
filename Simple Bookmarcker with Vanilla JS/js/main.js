
// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    e.preventDefault();
    var sitename = e.target['sitename'].value;
    var site_url = e.target['site_url'].value;

    if(!validateForm(sitename, site_url)){
        return false;
    }

    var bookmark = {
        name: sitename,
        url: site_url
    }

    /*
    // Local storage:
        localStorage.setItem('test','Hello World');
        // Fetch data from localstorage:
        console.log(localStorage.getItem('test'));
        //Remove data from localstorage:
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add to araay
        bookmarks.push(bookmark);
        // Re-set back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();
};

//Delete bookmark function
function deleteBookmark(url) {
    // Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url === url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
        // Re-set bookmarks into localStorage after deleting
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        // REfetch bookmarks
        fetchBookmarks();
    }
}

//Fetch bookmarks:
function fetchBookmarks(){
    // Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarksResult = document.getElementById('bookmarksResults');
    //Build output
    bookmarksResult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML += '<div class="well">' +
                                     '<h3>' + name + ' ' +
                                     '<div style="float:right"><a class="btn btn-success" target="_blank" href="' + url + '">Visit</a>' +
                                     ' <a class="btn btn-danger" href="#" onclick="deleteBookmark(\'' + url + '\')">Delete</a></div>' +
                                     '</h3></div>';
    }
}

function validateForm(sitename, site_url){
    if(!sitename || !site_url){
        alert('Please fill the form!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!site_url.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}



//
