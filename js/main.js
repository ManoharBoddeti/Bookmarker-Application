// listen for submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark

function saveBookmark(e){
    // console.log('It Works');

    // Get form value
    var siteName =document.getElementById('siteName').value;
    var siteUrl =document.getElementById('siteUrl').value;
    // console.log(siteName);
    // console.log(siteUrl);

    if(!validataForm(siteName, siteUrl)){
        return false;
    }


    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // console.log(bookmark);

    

    // Local Storage
        // localStorage.setItem('test', 'Hello World');
        // console.log(localStorage.getItem('test'));
        // localStorage.removeItem('test');
        // console.log(localStorage.getItem('test'));
       
        if(localStorage.getItem('bookmarks') === null){
        // init array
        var bookmarks = [];
            // add to array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }else {
            // Get bookmarks from local storage
          var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //   Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to loacalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        }

        // clear form
        document.getElementById('myForm').reset();

        //   Re -fetch bookmarks
        fetchBookmarks();

    // prevent form from submitting
    e.preventDefault();
}


// Delete Bookmark
    function deleteBookmark(url){
    //  console.log(url);
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //  Remove from array
            bookmarks.splice(i, 1);
        }
    }
          // Re-set back to loacalStorage
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        //   Re -fetch bookmarks
        fetchBookmarks();


    }

// Fetch bookmarks
function fetchBookmarks(){
    // GET bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // console.log(bookmarks);
    // Get output Id
    var bookmarksResults =document.getElementById('bookmarksResults');

    // Build outPut
    bookmarksResults.innerHTML ="";
        for(var i = 0; i < bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url =  bookmarks[i].url;

            bookmarksResults.innerHTML += 
            '<div class="well">' +
            '<h3>'+name+
            '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
            '<a onClick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>'+
            '</div>';
            
        }
}

function validataForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;

    }
    return true;
}
