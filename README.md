# MidnightSunGiants

Project title: MidnightSunGiants.

Team members: ["Candace Joyner", "Charles Roberts", "Logan", "Tony Chung"].

Project description: 
We will be creating a web-app that will connect attendees and vendors at various sporting events.  The purpose is to share live pics, videos, and comments as well as reserach player stats, news, and TMZ worthy info.  

The users can connect and socialize with other event users by taking and uploading pictures as well as commenting on each other's pics/posts.  Users can share stats and news.  They can also socialize in other meaningful ways.  

The web-app will match the location with the time to show that the user is at an event which can be shared with other users and vendors.  We will use eventful.API to match the user and event, and use mysportsfeeds.API to gather sports stats.

We will create 2 screens: 1 for user interface and 1 for vendor and after-event usage.

Project tasks before next meetup:

1. Create the firebase database. (Tony)
2. Figure out how to upload pictures to firebase. (Tony and Logan)
3. Create the HTML & CSS framework. (Charles)
4. Research API interface. (Candace)

Firebase:

<script src="https://www.gstatic.com/firebasejs/4.8.2/firebase.js"></script>
<script>
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
</script>
