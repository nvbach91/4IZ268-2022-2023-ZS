$(document).ready(function () {
    var movieArray = [];
    var collection1 = [];
    var collection2 = [];
    var collection3 = [];
    var collection4 = [];
    var preset_1 = [680, 68718, 16869, 24, 273248, 393, 466272];
    var preset_2 = [1359, 155, 49026, 272, 1124, 359724, 318846];
    var preset_3 = [680, 68718, 16869, 24, 273248, 393, 466272];
    removeMovie();
    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            insertMovie();
        }

    });
    $("#preset1").click(function (e) {
        EmptyDiv();
        Preset_1(preset_1);
    });
    $("#preset2").click(function (e) {
        EmptyDiv();
        Preset_1(preset_2);

    });
    $("#preset3").click(function (e) {
        EmptyDiv();
        Preset_1(preset_3);

    });
    
    save(collbtn1, collection1);
    save(collbtn2, collection2);
    save(collbtn3, collection3);
    save(collbtn4, collection4);
    loadColl(loadcoll1, collection1);
    loadColl(loadcoll2, collection2);
    loadColl(loadcoll3, collection3);
    loadColl(loadcoll4, collection4);


    function insertMovie() {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?language=en-US&query=" + $("#search").val(),
            data: { "api_key": "b7854263a802fd8b2b3d55ac2161b4ff" },
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result["results"].length == 0) {
                    return alert("This movie does not exist.");
                }
                else if (movieArray.includes(result["results"][0]["id"])) {
                    return alert("This movie was already added.");

                }
                else {
                    var movie = $("<div class=\"movie p-3\"></div>");
                    var image = result["results"][0]["poster_path"] == null ? "img/noimage.jpg" : "https://image.tmdb.org/t/p/w300" + result["results"][0]["poster_path"];
                    movie.append("<div class=\"result bg-light pb-1\" resourceId=\"" + result["results"][0]["id"] + "\">" + "<img src=\"" + image + "\" alt=\"" + result["results"][0]["title"] + "\"/>" + "<p class=\"d-flex justify-content-evenly align-items-center mt-3\"><a>" + result["results"][0]["title"] + "</a><span class=\"bg-dark text-light p-1 rounded \">" + result["results"][0]["vote_average"] + "</span><button class=\"removeMovie btn btn-danger\" type=\"button\">X</button></p></div>");
                    $(movie).hide().appendTo("#main").fadeIn("slow");
                    movieArray.push(result["results"][0]["id"]);
                }
            }
        })
    }
    function removeMovie() {
        $("#main").delegate(".removeMovie", "click", function () {
            var id = $(this).closest(".result").attr("resourceId");
            let index = movieArray.indexOf(id);
            movieArray.splice(index);
            $(this).closest(".movie").fadeOut(600, function () { $(this).closest(".movie").remove(); });
        });
    }
    function Validate() {
        var errorMessage = "";
        if ($("#search").val() == "") {
            errorMessage += "► Enter Search Text";
            alert(errorMessage);

        }
        return errorMessage;
    }



    function Preset_1(preset) {
        for (i = 0; i < preset.length; i++) {
            $.ajax({

                url: "https://api.themoviedb.org/3/movie/" + preset[i],
                data: { "api_key": "b7854263a802fd8b2b3d55ac2161b4ff" },
                dataType: "json",
                success: function (result) {

                    console.log(result);
                    var movie = $("<div class=\"movie p-3\"></div>");
                    var image = result["poster_path"] == null ? "noimage.jpg" : "https://image.tmdb.org/t/p/w300" + result["poster_path"];
                    movie.append("<div class=\"result bg-light pb-1\" resourceId=\"" + result["id"] + "\">" + "<img src=\"" + image + "\" alt=\"" + result["title"] + "\"/>" + "<p class=\"d-flex justify-content-evenly align-items-center mt-3\"><a>" + result["title"] + "</a><span class=\"bg-dark text-light p-1 rounded \">" + result["vote_average"] + "</span></p></div>");
                    $(movie).hide().appendTo("#main").fadeIn("slow");
                }
            })
        }

    }


    function save(btn, coll) {
        $(btn).click(function (e) {
            coll.push(movieArray);
            movieArray = [];

        });
    }
    function loadColl(btn, coll) {
        $(btn).click(function (e) {
            EmptyDiv();
            Preset_1(coll);

        });
    }



    function EmptyDiv() {
        $("#main").empty();

    }

    $(document).ajaxStart(function () {
        $("#loading").removeClass("d-none");
        $("body").addClass("opacity-25 blur")
    });

    $(document).ajaxStop(function () {
        $("#loading").addClass("d-none");
        $("body").removeClass("opacity-25 blur");
    });
})
