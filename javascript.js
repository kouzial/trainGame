  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMR6sWNqXd2qinLyqvV4H5saJl2JJZjdY",
    authDomain: "form-1eaae.firebaseapp.com",
    databaseURL: "https://form-1eaae.firebaseio.com",
    storageBucket: "form-1eaae.appspot.com",
    messagingSenderId: "939275184666"
  };
  firebase.initializeApp(config);

      // Create a variable to reference the database
      var database = firebase.database();




      // Capture Button Click
      $("#addbtn").on("click", function() {
        event.preventDefault()

   
        name = $("#name").val().trim();
        destination = $("#role").val().trim();
        first = $("#start").val().trim();
        frequency = $("#monthly").val().trim();

        database.ref().push({
          name: name,
          destination: destination,
          first: first,
          frequency: frequency
        });


      });

      // Function to make the calculation

          var calcNext = function (first, freq) {
      first = first.split(":");
      first = parseInt(first[0] * 60) + parseInt(first[1]);
      var nowMin = moment().get("minute");
      var nowHour = moment().get("hour");
      var now = parseInt(nowHour * 60) + parseInt(nowMin);
      var diff = now - first;
      var minToNext = (freq - (diff % freq));
      var next = minToNext + now;
      var nextHour = Math.floor(next / 60);
      var nextMin = next % 60;
      return {next:nextHour + ":" + nextMin,minToNext:minToNext};
    }


      database.ref().on("child_added", function(snapshot) {
     // Log everything that's coming out of snapshot
     console.log(snapshot.val());
     var data = snapshot.val();
     var name = data.name;
     var destination = data.destination;
     var first = data.first;
     var frequency = data.frequency;
     var nextCalc = calcNext(first, frequency);
     var next = nextCalc.next;
     var minutes = nextCalc.minToNext;
     var trTag = $("<tr>");

     trTag.append("<td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>"  + "<td>" + next + "</td>" + "<td>" + minutes + "</td>" );
     $("#tbody").append(trTag);

    // Handle the errors
    }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
    });

