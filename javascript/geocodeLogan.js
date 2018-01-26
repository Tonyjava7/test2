$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyCWGmHUJjfT193FB4EjMqd49SAqb5AYwVs",
    authDomain: "test-project-d958e.firebaseapp.com",
    databaseURL: "https://test-project-d958e.firebaseio.com",
    projectId: "test-project-d958e",
    storageBucket: "test-project-d958e.appspot.com",
    messagingSenderId: "496730470430"
  };
  firebase.initializeApp(config);

  var city = "";
  var state = "";

  //geolocator starts here
  var key = "a9a61bb81ae8bbec";
  navigator.geolocation.getCurrentPosition(success, error);
  function error() {
      alert("Sorry, we're unable to retrieve your location.");
  }
  function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      $.getJSON("https://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + latitude + "," + longitude + ".json", function(data) {
          city = data.location.city;
          state = data.location.state;

        // Push to DATABASE
        var dataRef = firebase.database();
        var photo = "";

        var array = ["Chicago", "New York", "Phoenix"];
        localStorage.setItem("array", JSON.stringify(array));
        var storedArray = JSON.parse(localStorage.getItem("array"));
        var time = "";
        var date = "";
        var counter = 1;
        var storageRef = firebase.storage();
        var uploader = document.getElementById('uploader');
        var fileButton = document.getElementById('fileButton');

        function tableFunction() {
          time = moment(moment()).format("hh:mm A");
          date = moment().format("L");

          dataRef.ref().push({
            city: city,
            state: state,
            time: time,
            date: date
          });
        };

        dataRef.ref().on("child_added", function (snapshot) {
          if (array.indexOf(city) === -1) {
            array.push(city);
            $(".eventTable").append("<tr><td id='date'>"+snapshot.val().date+
            "</td><td id='time'>"+snapshot.val().time+"</td><td>"+
            snapshot.val().city+", "+snapshot.val().state+"</td><td id='counter'>"+counter+"</td></tr>");
          } else {
            counter++;
            $("#counter").html(counter);
            $("#date").html(snapshot.val().date);
            $("#time").html(snapshot.val().time);
            }
        });

        // Push to STORAGE
        fileButton.addEventListener('change', function(e) {
            event.preventDefault();
            var file = e.target.files[0];
            var dataRef = storageRef.ref('img/' + file.name);
            var metadata = {
                customMetadata: {
                    'city': city
                }
            };
            var task = dataRef.put(file, metadata);
            task.on('state_changed', function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                }, function error(err) {}, function complete() {
                    var downloadURL = task.snapshot.downloadURL;
                    $('#well').prepend('<img class="photos" src=' + downloadURL + '>');
                    tableFunction();
                    });

                });
      });
  };
});
