  var config = {
    apiKey: "AIzaSyAOtmF2KkZ4KTb13NI7hTuvee9C5bUd79s",
    authDomain: "project-1-33b60.firebaseapp.com",
    databaseURL: "https://project-1-33b60.firebaseio.com",
    projectId: "project-1-33b60",
    storageBucket: "",
    messagingSenderId: "560777779311"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

 
  var connectionsRef = database.ref("/connections");
  
 
  var connectedRef = database.ref(".info/connected");
  

  connectedRef.on("value", function(snap) {
  
    
    if (snap.val()) {

      var con = connectionsRef.push(true);
      
      con.onDisconnect().remove();
    }
  });
  

  var image ={};

  // Capture Button Click
  $("#picture-submit").on("click", function(event) {
    event.preventDefault();

    image = $("#facebook-link").val();

    database.ref().push({
      image: image,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
      
    });
    $("#emotion-detect-image").attr('src',image)

  });

  database.ref().on("child_added", function(snapshot) {
  
    var sv = snapshot.val();
  
    console.log(sv.image);

    $("#otherImages").prepend($('<img class= "uk-margin-small-top" width= "300px" height="auto">').attr('src', sv.image));
  
   }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

