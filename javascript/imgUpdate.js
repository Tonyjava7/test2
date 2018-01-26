var city = "";

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
            });
        }
        //geolocator ends here

         // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBn5xUU9cipD3IVxgi750aYFO-bM_AM85A",
            authDomain: "midnightsungiants.firebaseapp.com",
            databaseURL: "https://midnightsungiants.firebaseio.com",
            projectId: "midnightsungiants",
            storageBucket: "midnightsungiants.appspot.com",
            messagingSenderId: "849065062207"
        };

               firebase.initializeApp(config);

        var storageRef = firebase.storage();
        var uploader = document.getElementById('uploader');
        //var fileButton = document.getElementById("Joe");
        //console.log("Hello World. fileButton is " + fileButton);
        $("#fileButton").on("click", "Joe",  function(e) {

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
                $('#well').append('<img src=' + downloadURL + '>');
            });
        });