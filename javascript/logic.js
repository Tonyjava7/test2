/**
 * firebaseConfig is the configuration information for firebase
 * @type {Object}
 */


 

/**
 * displayEventScreen displays the event screen
 */
let displayEventScreen = function()
{
	let event_div = document.getElementById("table_screen"); 
	event_div.style.display = "block";

}; // End of displayEventScreen()

/**
 * displayPage is the event listener for the navigation items
 * @param  {Object} event - The click event on a navigation item
 */
let displayPage = function(event)
{
	// Get handles to all the divs representing top level screensl
    let event_div = document.getElementById("table_screen"); 
    let picture_div = document.getElementById("picture_screen");
    let stats_div = document.getElementById("stats_screen");


    // Set the display of all the top level divs to "none"
    event_div.style.display = "none";
    picture_div.style.display = "none";
    stats_div.style.display = "none";
    
    // Get the data-name of the object that was clicked
    let name = event.target.getAttribute("data-name");
    console.log("name is " + name);

    // Set the display of one of the top level divs to
    // "block" so that it will be seen.
    switch (name)
    {
    	case "event_screen_nav":
            event_div.style.display = "block";
            break;

        case "picture_screen_nav":
            picture_div.style.display = "block";
            break;

        case "stats_screen_nav":
        	stats_div.style.display = "block";
        	break;

    } // End of switch (name)

}; // End of let displayPage = function(event)

/**
 * The ready function
 */
$( document ).ready(function() 
{
    // Add a click event listener to all elements with a class of "nav-link"
    $(document).on("click", ".nav-link", displayPage);

    // Display the event screen
    displayEventScreen();

   

}); // End of ready()
