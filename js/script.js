$(document).ready(() => {
    $('#searchByTitle').click((e) => {
        let searchTextByTitle = $('#searchTextByTitle').val();
        let searchTextByYear = $('#searchTextByYear').val();
        if (searchTextByYear != '') {
            let searchTextByTitleAndYear = searchTextByTitle + '.' + searchTextByYear;
            //console.log('searchTextByTitleAndYear' + searchTextByTitleAndYear);
            getMoviesByNameAndYear(searchTextByTitleAndYear);
        }
        else {
            getMoviesByName(searchTextByTitle);
        }
        e.preventDefault();
    });
    $('#searchByID').click((e) => {
        let searchTextByID = $('#searchTextByID').val();
        getMoviesByID(searchTextByID);
        e.preventDefault();
    });

});

function getMoviesByName(searchTextByTitle) {
    // API call to get user details
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com?s=' + searchTextByTitle + '&apikey=f04988f0',
        success: (response) => {
            console.log(response);
            console.log(response.Response);
            if (response.Response == 'False') {
                $('#movies').html("<h4><img src='images/cinema.png'/> Movie Not Found.</h4>");
            }
            else {
                let movies = response.Search;
                let output = '';
                for(allmovies of movies) {
                    if (allmovies.Poster == 'N/A') {
                        console.log(allmovies.Poster);
                        allmovies.Poster = 'https://cdn.amctheatres.com/Media/Default/Images/noposter.jpg';
                    }
                    output += ` <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class ="well text-center">
                                        <img src="${allmovies.Poster}"/>
                                        <h5>${allmovies.Title}</h5>
                                        <a class="btn btn-primary" style="margin-bottom:15px" href="#">Movie Details</a>
                                     </div>
                                 </div>`;
                    $('#movies').html(output);

                }
            }
            /* $.each(movies, (index, movies) => {
                 output += ` <div class="col-md-3">
                                     <div class ="well text-center">
                                         <img src="${movies.Poster}"/>
                                         <h5>${movies.Title}</h5>
                                      </div>
                                  </div>`;
                 $('#movies').html(output);
             });*/
            /*for(allmovies of movies) {
                output += ` <div class="col-md-3">
                                    <div class ="well text-center">
                                        <img src="${allmovies.Poster}"/>
                                        <h5>${allmovies.Title}</h5>
                                     </div>
                                 </div>`;
                $('#movies').html(output);
            }*/

        },
        error: (data) => { // in case of error response

            $('#movies').html("<h4><img src='images/cinema.png'/> Movie Not Found.</h4>");
        },

    });// end ajax call 
}

function getMoviesByNameAndYear(searchTextByTitleAndYear) {
    // API call to get user details
    let output = searchTextByTitleAndYear.split('.');
    let searchTextByTitle = output[0];
    let searchTextByYear = output[1];
    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com?t=' + searchTextByTitle + '&y=' + searchTextByYear + '&apikey=f04988f0',
        success: (response) => {
            console.log(response);
            console.log(response.Response);
            if (response.Response == 'False') {
                $('#movies').html("<h4><img src='images/cinema.png'/> Movie Not Found.</h4>");
            }
            else {
                let movies = response;
                let output = '';
                if (movies.Poster == 'N/A') {
                    console.log(movies.Poster);
                    movies.Poster = 'https://cdn.amctheatres.com/Media/Default/Images/noposter.jpg';
                }
                output = ` <div class="col-md-3 col-sm-6">
                                    <div class ="well text-center">
                                        <img src="${movies.Poster}"/>
                                        <h5>${movies.Title}</h5>
                                     </div>
                                 </div>`;
                $('#movies').html(output);

            }
        },
        error: (data) => { // in case of error response

            $('#movies').html("<h4><img src='images/cinema.png'/> Movie Not Found.</h4>");
        },

    });// end ajax call 
}
function getMoviesByID(searchTextByID) {
    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://www.omdbapi.com?i=' + searchTextByID + '&apikey=f04988f0',

        success: (response) => {
            console.log(response);
            console.log(response.Response);
            if (response.Response == 'False') {
                $('#movies').html("<h4><img src='images/cinema.png'/> Movie Not Found.</h4>");
            }
            else {
                let movies = response;
                let output = '';
                if (movies.Poster == 'N/A') {
                    console.log(movies.Poster);
                    movies.Poster = 'https://www.theyoungfolks.com/wp-content/uploads/2015/12/Image-not-found.gif';
                }
                output = ` <div class="col-md-3 col-sm-6">
                                    <div class ="well text-center">
                                        <img src="${movies.Poster}"/>
                                        <h5>${movies.Title}</h5>
                                     </div>
                                 </div>`;
                $('#movies').html(output);
            }
        }, error: (data) => { // in case of error response

            $('#movies').html("<h4><img src='images/cinema.png'/> Movie Not Found.</h4>");
        },

        timeout: 3000 // this is in milli seconds

    });// end ajax call 
}
