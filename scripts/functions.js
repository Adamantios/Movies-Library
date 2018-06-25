function showItems() {
    hide("edit-form-wrapper");
    hide("select-movie-dialog");
    show("page");

    let xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("movie-table").innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", "getMovies.php", true);
    xmlhttp.send();
}

function deleteItem() {
    show("select-movie-dialog");
    hide("edit-form-wrapper");
    hide("page");

    document.getElementById("select-movie-message").innerHTML = "Please select the movie to delete:";
    document.getElementById("selected-function").value = "delete";

    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("edMovie").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("GET", "getMoviesList.php", true);
    xmlhttp.send();
}

function editItem() {
    show("select-movie-dialog");
    hide("edit-form-wrapper");
    hide("page");

    document.getElementById("select-movie-message").innerHTML = "Please select the movie to edit:";
    document.getElementById("selected-function").value = "edit";

    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("edMovie").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("GET", "getMoviesList.php", true);
    xmlhttp.send();
}

function getMovieDetails() {
    let o = document.getElementById("edMovie");
    let movieID = o.options[o.selectedIndex].value;
    let movieName = o.options[o.selectedIndex].text;

    if (movieID === '-1')
        return;

    let xmlhttp;
    if (document.getElementById("selected-function").value === "delete") {

        if (!confirm("Do you want to delete the movie '" + movieName + "'?"))
            return;

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

                alert(xmlhttp.responseText);

                showItems();
            }
        };

        xmlhttp.open("GET", "deleteMovie.php?id=" + movieID, true);
        xmlhttp.send();

        return;
    }

    hide("select-movie-dialog");
    show("edit-form-wrapper");
    document.getElementById("movieID").value = movieID;
    document.getElementById("formTitle").innerHTML = "Edit existing Movie";
    document.getElementById("movieTitle").value = "";
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {

        let xmlDoc, genreID;
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            xmlDoc = xmlhttp.responseXML;
            movieName = xmlDoc.getElementsByTagName("movieName")[0].childNodes[0].nodeValue;
            genreID = xmlDoc.getElementsByTagName("genreId")[0].childNodes[0].nodeValue;
            document.getElementById("movieTitle").value = movieName;
            fillGenresDropDownList(genreID);
        }
    };

    xmlhttp.open("GET", "getMovie.php?id=" + movieID, true);
    xmlhttp.send();
}

function fillGenresDropDownList(selectedGenre) {
    let xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            document.getElementById("genre").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("GET", "getGenres.php?id=" + selectedGenre, true);
    xmlhttp.send();
}

function addItem() {
    hide("page");
    hide("select-movie-dialog");
    show("edit-form-wrapper");
    document.getElementById("movieID").value = "-1";
    document.getElementById("formTitle").innerHTML = "Add New Movie";
    document.getElementById("movieTitle").value = "";
    fillGenresDropDownList("-1");
}

function saveMovie() {
    let itemID = document.getElementById("movieID").value;
    let itemName = document.getElementById("movieTitle").value;
    let o = document.getElementById("genre");
    let itemGenre = o.options[o.selectedIndex].value;

    let xmlhttp;
    if (confirm('Do you want to save this movie?')) {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                alert(xmlhttp.responseText);
                showItems();
            }
        };

        let url = (itemID === "-1" ? "addMovie.php" : "updateMovie.php") +
            "?itemID=" + itemID + "&itemName=" + itemName + "&itemGenre=" + itemGenre;

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function show(objectName) {
    document.getElementById(objectName).style.display = 'block';
}

function hide(objectName) {
    document.getElementById(objectName).style.display = 'none';
}
