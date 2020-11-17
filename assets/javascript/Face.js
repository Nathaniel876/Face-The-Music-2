var queryUrl = "https://api-us.faceplusplus.com/facepp/v3/detect"



//Setting up a click listener to dynamically call information from Face++ and LastFM APIs and create content based off the relevant JSON response data
$("#picture-submit").on('click', function () {
    //Empty the submit form and the information displays
    $("#player").empty();
    $("#artist-info").empty();
    $("#artist-name").empty();
    var link = $("#facebook-link").val().trim();
    $("#emotion-detect-image").attr("src", link);
    $("#see-recommendation").text("See our music recommendation for your mood below!")



    var parameters = {
        "api_key": "MQpH7ljShXOJ9zHrKdDM5C6o96A0Qsbp",
        "api_secret": "-9hs9__kJoKpcPpL9fEPWretNJDk40hf",
        "image_url": link,
        "return_attributes": "emotion"
    };

    $.ajax({
        url: queryUrl,
        method: "POST",
        data: parameters
    }).done(function (response) {
        console.log(response);
        var emotionLvls = response.faces[0].attributes.emotion;
        console.log(emotionLvls)
        console.log(emotionLvls.sadness)


        //We will display emotion text of whatever emotion is above 60%, with the rest of the analysis listed below
        if (emotionLvls.sadness > 60) {
            //Display Face++ analysis of uploaded or linked image onto our hmtl
            $("#emotionDetect").text(emotionLvls.sadness + "% sad");
            $("#emot1").text(emotionLvls.sadness +"% sad.")
            $("#emot2").text(emotionLvls.anger + "% angry.");
            $("#emot3").text(emotionLvls.happiness + "% happy.");
            $("#emot4").text(emotionLvls.disgust + "% disgusted.");
            $("#emot5").text(emotionLvls.surprise + "% surprised.");
            $("#emot6").text(emotionLvls.neutral + "% neutral.");
            $("#emot7").text(emotionLvls.fear + "% fearful.");

            //Array of sad songs to pick from
            var sadSongArray = ["nZq_jeYsbTs", "Va_RU-tph-Y", "Na2fIC3CXYE", "4N3N1MlvVc4", "LLwRLC2AB3M", "D_P-v1BVQn8", "Yw9l9jLsyiU", "SfAvnVN72ew"];
            //Array of artists, matching index positions of the respective songs in var sadness
            var sadArtists = ["Radiohead", "The Anniversary", "Nofx", "Gary Jules", "Gemini", "Gilbert O'Sullivan", "Joe Harnell", "Skream"]
            //Determining a random index number for both song and artist arrays
            var randomNumberOne = Math.floor(Math.random() * sadSongArray.length)
            //Applying the random index number to both arrays and setting both resulting index positions to a usabel variable
            var randomSadSong = sadSongArray[randomNumberOne];
            var randomSadArtist = sadArtists[randomNumberOne];
            console.log(randomSadSong)
            console.log(randomSadArtist)
            var newYTiFrame = $("<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" + randomSadSong + "?autoplay=1' origin='http://example.com' frameborder='0'></iframe>")
            $("#player").append(newYTiFrame)

            //Calling LastFM API to gather information on the artist of the current song.
            var lastKey = "ede245c0055f703efd5f136a5301a6bf";
            var queryURLTopTrack = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist=" + randomSadArtist + "&api_key=" + lastKey + "&format=json";

            $.ajax({
                url: queryURLTopTrack,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var topTrack1 = (response.toptracks.track[0].name);
                var topTrack2 = (response.toptracks.track[1].name);
                var topTrack3 = (response.toptracks.track[2].name);
                //Display information gathered from LastFM API
                console.log("Most popular songs: " + topTrack1 + ", " + topTrack2 + ", " + topTrack3)
                $("#artist-name").text(randomSadArtist)
                $("#artist-info").append(topTrack1 + ", " + topTrack2 + ", " + topTrack3 + ".");
            });
        }




        else if (emotionLvls.fear > 60) {
            $("#emotionDetect").text(emotionLvls.fear + "% sad.")
            $("#emot1").text(emotionLvls.fear +"% fearful.")
            $("#emot2").text(emotionLvls.anger + "% angry.");
            $("#emot3").text(emotionLvls.happiness + "% happy.");
            $("#emot4").text(emotionLvls.disgust + "% disgusted.");
            $("#emot5").text(emotionLvls.surprise + "% surprised.");
            $("#emot6").text(emotionLvls.neutral + "% neutral.");
            $("#emot7").text(emotionLvls.sadness + "% sad.");

            //Array of sad songs to pick from
            var sadSongArray = ["nZq_jeYsbTs", "Va_RU-tph-Y", "Na2fIC3CXYE", "4N3N1MlvVc4", "LLwRLC2AB3M", "D_P-v1BVQn8", "Yw9l9jLsyiU", "SfAvnVN72ew"];
            //Array of artists, matching index positions of the respective songs in var sadness
            var sadArtists = ["Radiohead", "The Anniversary", "Nofx", "Gary Jules", "Gemini", "Gilbert O'Sullivan", "Joe Harnell", "Skream"]
            //Determining a random index number for both song and artist arrays
            var randomNumberOne = Math.floor(Math.random() * sadSongArray.length)
            //Applying the random index number to both arrays and setting both resulting index positions to a usabel variable
            var randomSadSong = sadSongArray[randomNumberOne];
            var randomSadArtist = sadArtists[randomNumberOne];
            console.log(randomSadSong)
            console.log(randomSadArtist)
            //We embed the iFrame player and plug in the random song for that emotion 
            var newYTiFrame = $("<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" + randomSadSong + "?autoplay=1' origin='http://example.com' frameborder='0'></iframe>")
            $("#player").append(newYTiFrame)

            //Calling LastFM API to gather information on the artist of the current song.
            var lastKey = "ede245c0055f703efd5f136a5301a6bf";
            var queryURLTopTrack = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist=" + randomSadArtist + "&api_key=" + lastKey + "&format=json";
            $.ajax({
                url: queryURLTopTrack,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var topTrack1 = (response.toptracks.track[0].name);
                var topTrack2 = (response.toptracks.track[1].name);
                var topTrack3 = (response.toptracks.track[2].name);
                console.log("most popular songs: " + topTrack1 + ", " + topTrack2 + ", " + topTrack3)
                //Display information gathered from LastFM API
                $("#artist-name").text(randomSadArtist)
                $("#artist-info").append(topTrack1 + ", " + topTrack2 + ", " + topTrack3 + ".");
            });

        }
        else if (emotionLvls.anger > 60) {
            $("#emotionDetect").text(emotionLvls.anger + "% angry.")
            $("#emot1").text(emotionLvls.anger +"% angry.")
            $("#emot2").text(emotionLvls.sadness + "% sad.");
            $("#emot3").text(emotionLvls.happiness + "% happy.");
            $("#emot4").text(emotionLvls.disgust + "% disgusted.");
            $("#emot5").text(emotionLvls.surprise + "% surprised.");
            $("#emot6").text(emotionLvls.neutral + "% neutral.");
            $("#emot7").text(emotionLvls.fear + "% fearful.");


            //Array of angry songs to pick from
            var angrySongArray = ["CCC8vCxEXQo", "0ZE1bmcWMUY", "Qt616BtpD-w", "RD_kgKyDk6c", "ZrFTR9fucr8", "Wh-Jf_udRhs", "hgER9_Od0Ck", "SVwTF7Nw3-w", "T4B5gT3TtJQ"];
            //Array of artists, matching index positions of the respective songs in var sadness
            var angryArtists = ["Trampa", "August Burns Red", "Hatebreed", "Ramones", "I Wrestled A Bear Once", "Funtcase", "Twine", "Technical Itch", "Hatebreed"];
            var randomNumberOne = Math.floor(Math.random() * angrySongArray.length)
            //Applying the random index number to both arrays and setting both resulting index positions to a usabel variable
            var randomAngrySong = angrySongArray[randomNumberOne];
            var randomAngryArtist = angryArtists[randomNumberOne];
            console.log(randomAngrySong)
            console.log(randomAngryArtist)
            //We embed the iFrame player and plug in the random song for that emotion 
            var newYTiFrame = $("<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" + randomAngrySong + "?autoplay=1' origin='https://example.com' frameborder='0'></iframe>")
            $("#player").append(newYTiFrame)

            //Calling LastFM API to gather information on the artist of the current song.
            var lastKey = "ede245c0055f703efd5f136a5301a6bf";
            var queryURLTopTrack = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist=" + randomAngryArtist + "&api_key=" + lastKey + "&format=json";
            $.ajax({
                url: queryURLTopTrack,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var topTrack1 = (response.toptracks.track[0].name);
                var topTrack2 = (response.toptracks.track[1].name);
                var topTrack3 = (response.toptracks.track[2].name);
                console.log("most popular songs: " + topTrack1 + ", " + topTrack2 + ", " + topTrack3)
                $("#artist-name").text(randomAngryArtist)
                $("#artist-info").append(topTrack1 + ", " + topTrack2 + ", " + topTrack3 + ".");
            });
        }
        else if (emotionLvls.disgust > 60) {
            $("#emotionDetect").text(emotionLvls.disgust + "% angry.")
            $("#emot1").text(emotionLvls.disgust +"% disgusted.")
            $("#emot2").text(emotionLvls.anger + "% angry.");
            $("#emot3").text(emotionLvls.happiness + "% happy.");
            $("#emot4").text(emotionLvls.sadness + "% sad.");
            $("#emot5").text(emotionLvls.surprise + "% surprised.");
            $("#emot6").text(emotionLvls.neutral + "% neutral.");
            $("#emot7").text(emotionLvls.fear + "% fearful.");

            //Array of angry songs to pick from
            var angrySongArray = ["CCC8vCxEXQo", "0ZE1bmcWMUY", "Qt616BtpD-w", "RD_kgKyDk6c", "ZrFTR9fucr8", "Wh-Jf_udRhs", "hgER9_Od0Ck", "SVwTF7Nw3-w", "T4B5gT3TtJQ"];
            //Array of artists, matching index positions of the respective songs in var sadness
            var angryArtists = ["Trampa", "August Burns Red", "Hatebreed", "Ramones", "I Wrestled A Bear Once", "Funtcase", "Twine", "Technical Itch", "Hatebreed"];
            var randomNumberOne = Math.floor(Math.random() * angrySongArray.length);
            //Applying the random index number to both arrays and setting both resulting index positions to a usabel variable
            var randomAngrySong = angrySongArray[randomNumberOne];
            var randomAngryArtist = angryArtists[randomNumberOne];
            console.log(randomAngrySong)
            console.log(randomAngryArtist)
            //We embed the iFrame player and plug in the random song for that emotion 
            var newYTiFrame = $("<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" + randomAngrySong + "?autoplay=1' origin='http://example.com' frameborder='0'></iframe>")
            $("#player").append(newYTiFrame)

            //Calling LastFM API to gather information on the artist of the current song.
            var lastKey = "ede245c0055f703efd5f136a5301a6bf";
            var queryURLTopTrack = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist=" + randomAngryArtist + "&api_key=" + lastKey + "&format=json";
            $.ajax({
                url: queryURLTopTrack,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var topTrack1 = (response.toptracks.track[0].name);
                var topTrack2 = (response.toptracks.track[1].name);
                var topTrack3 = (response.toptracks.track[2].name);
                console.log("most popular songs: " + topTrack1 + ", " + topTrack2 + ", " + topTrack3)
                $("#artist-name").text(randomAngryArtist)
                $("#artist-info").append(topTrack1 + ", " + topTrack2 + ", " + topTrack3 + ".");
            });
        }
        else if (emotionLvls.happiness > 60) {
            $("#emotionDetect").text(emotionLvls.happiness + "% happy.")
            $("#emot1").text(emotionLvls.happiness +"% happy.")
            $("#emot2").text(emotionLvls.anger + "% angry.");
            $("#emot3").text(emotionLvls.sadness + "% sad.");
            $("#emot4").text(emotionLvls.disgust + "% disgusted.");
            $("#emot5").text(emotionLvls.surprise + "% surprised.");
            $("#emot6").text(emotionLvls.neutral + "% neutral.");
            $("#emot7").text(emotionLvls.fear + "% fearful.");
            //Array of happy songs to pick from
            var happySongArray = ["NCkM8zFPALo", "tCnBrrnOefs", "mMfxI3r_LyA", "xumGNwplds8", "GHUc6juS0YQ", "kfVsfOSbJY0"];
            //Array of artists, matching index positions of the respective songs in var sadness
            var happyArtists = ["4AM", "Justice", "Modjo", "Stardust", "James Brown", "Rebecca Black"];
            //Determining a random index number for both song and artist arrays
            var randomNumberOne = Math.floor(Math.random() * happySongArray.length)
            //Applying the random index number to both arrays and setting both resulting index positions to a usabel variable
            var randomHappySong = happySongArray[randomNumberOne];
            var randomHappyArtist = happyArtists[randomNumberOne];
            console.log(randomHappySong)
            console.log(randomHappyArtist)
            //We embed the iFrame player and plug in the random song for that emotion 
            var newYTiFrame = $("<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" + randomHappySong + "?autoplay=1' origin='http://example.com' frameborder='0'></iframe>")
            $("#player").append(newYTiFrame)

            //Calling LastFM API to gather information on the artist of the current song.
            var lastKey = "ede245c0055f703efd5f136a5301a6bf";
            var queryURLTopTrack = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist=" + randomHappyArtist + "&api_key=" + lastKey + "&format=json";
            $.ajax({
                url: queryURLTopTrack,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                //      we will most likely need to build a for loop to iterate over the response track name til a certain point
                var topTrack1 = (response.toptracks.track[0].name);
                var topTrack2 = (response.toptracks.track[1].name);
                var topTrack3 = (response.toptracks.track[2].name);
                console.log("most popular songs: " + topTrack1 + ", " + topTrack2 + ", " + topTrack3)
                $("#artist-name").text(randomHappyArtist)
                $("#artist-info").append(topTrack1 + ", " + topTrack2 + ", " + topTrack3 + ".");
            });
        }
        else if (emotionLvls.neutral > 60) {
            $("#emotionDetect").text(emotionLvls.neutral + "% neutral.")
            $("#emot1").text(emotionLvls.neutral +"% neutral.")
            $("#emot2").text(emotionLvls.anger + "% angry.");
            $("#emot3").text(emotionLvls.happiness + "% happy.");
            $("#emot4").text(emotionLvls.disgust + "% disgusted.");
            $("#emot5").text(emotionLvls.surprise + "% surprised.");
            $("#emot6").text(emotionLvls.sadness + "% sad.");
            $("#emot7").text(emotionLvls.fear + "% fearful.");
            //Array of neutral songs to pick from
            var neutralSongArray = ["6zf6yce6g7g", "yvK3t0TdYfQ", "zfcHq0hhFWg", "EAEKK8xCpBY", "_FrOQC-zEog", "Pz1W1OLkw14", "3Q9rewnLFYw", "slldMEPvUqA", "0KJHH08FPpE", "_BObK59njSg", "Rx6LDRRz2Gs"];
            //Array of artists, matching index positions of the respective songs in var sadness
            var neutralArtists = ["Killedmyself", "Morning High", "Tame Impala", "Dispatch", "Pink Floyd", "High Contrast", "Flux Pavillion", "The Whispers", "Volac", "Washed Out", "Dj Marky"]
            //Determining a random index number for both song and artist arrays
            var randomNumberOne = Math.floor(Math.random() * neutralSongArray.length)
            //Applying the random index number to both arrays and setting both resulting index positions to a usabel variable
            var randomNeutralSong = neutralSongArray[randomNumberOne];
            var randomNeutralArtist = neutralArtists[randomNumberOne];
            console.log(randomNeutralSong)
            console.log(randomNeutralArtist)
            //We embed the iFrame player and plug in the random song for the corresponding emotion 
            var newYTiFrame = $("<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" + randomNeutralSong + "?autoplay=1' origin='http://example.com' frameborder='0'></iframe>")
            $("#player").append(newYTiFrame)

            //Calling LastFM API to gather information on the artist of the current song.
            var lastKey = "ede245c0055f703efd5f136a5301a6bf";
            var queryURLTopTrack = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist=" + randomNeutralArtist + "&api_key=" + lastKey + "&format=json";
            $.ajax({
                url: queryURLTopTrack,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                //      we will most likely need to build a for loop to iterate over the response track name til a certain point
                var topTrack1 = (response.toptracks.track[0].name);
                var topTrack2 = (response.toptracks.track[1].name);
                var topTrack3 = (response.toptracks.track[2].name);
                console.log("most popular songs: " + topTrack1 + ", " + topTrack2 + ", " + topTrack3)
                $("#artist-name").text(randomNeutralArtist)
                $("#artist-info").append(topTrack1 + ", " + topTrack2 + ", " + topTrack3 + ".");
            });
        }
        else if (emotionLvls.surprise > 60) {
            $("#emotionDetect").text(emotionLvls.surprise + "% neutral.")
            $("#emot1").text(emotionLvls.surprise + "% surprise.")
            $("#emot2").text(emotionLvls.anger + "% angry.");
            $("#emot3").text(emotionLvls.happiness + "% happy.");
            $("#emot4").text(emotionLvls.disgust + "% disgusted.");
            $("#emot5").text(emotionLvls.sadness + "% sad.");
            $("#emot6").text(emotionLvls.neutral + "% neutral.");
            $("#emot7").text(emotionLvls.fear + "% fearful.");
            //Array of neutral songs to pick from
            var neutralSongArray = ["6zf6yce6g7g", "yvK3t0TdYfQ", "zfcHq0hhFWg", "EAEKK8xCpBY", "_FrOQC-zEog", "Pz1W1OLkw14", "3Q9rewnLFYw", "slldMEPvUqA", "0KJHH08FPpE", "_BObK59njSg", "Rx6LDRRz2Gs"];
            //Array of artists, matching index positions of the respective songs in var sadness
            var neutralArtists = ["Killedmyself", "Morning High", "Tame Impala", "Dispatch", "Pink Floyd", "High Contrast", "Flux Pavillion", "The Whispers", "Volac", "Washed Out", "Dj Marky"]
            //Determining a random index number for both song and artist arrays
            var randomNumberOne = Math.floor(Math.random() * neutralSongArray.length)
            //Applying the random index number to both arrays and setting both resulting index positions to a usabel variable
            var randomNeutralSong = neutralSongArray[randomNumberOne];
            var randomNeutralArtist = neutralArtists[randomNumberOne];
            console.log(randomNeutralSong)
            console.log(randomNeutralArtist)
            //We embed the iFrame player and plug in the random song for the corresponding emotion 
            var newYTiFrame = $("<iframe id='player' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/" + randomNeutralSong + "?autoplay=1' origin='https://example.com' frameborder='0'></iframe>")
            $("#player").append(newYTiFrame)

            //Calling LastFM API to gather information on the artist of the current song.
            var lastKey = "ede245c0055f703efd5f136a5301a6bf";
            var queryURLTopTrack = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=10&artist=" + randomNeutralArtist + "&api_key=" + lastKey + "&format=json";
            $.ajax({
                url: queryURLTopTrack,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var topTrack1 = (response.toptracks.track[0].name);
                var topTrack2 = (response.toptracks.track[1].name);
                var topTrack3 = (response.toptracks.track[2].name);
                console.log("most popular songs: " + topTrack1 + ", " + topTrack2 + ", " + topTrack3)
                //Display information gathered from LastFM API
                $("#artist-name").text(randomNeutralArtist)
                $("#artist-info").append(topTrack1 + ", " + topTrack2 + ", " + topTrack3 + ".");
            });
        }
        else {
            $("#determine-text").text("Sorry, we couldn't find a strong enough emotion in this picture to make a good music recommendation. Try another picture!");
            $("#emotionDetect").text("");
        }
    });
    $("#facebook-link").val("");
});







