

//API for the stats page
console.log("api.js is working");

var queryURL;
var seasonStatisticsUrl;
var rankingUrl;
var city=[];
var idnum={};
var cityId;
var userCity;
var roster=[];


function loadCityID() {

// Full schedule for all NBA teams. The API uses and id # for each team. this ID is needed to access data for other statistics.
	queryURL = ["http://api.sportradar.us/nba/trial/v4/en/games/2017/REG/schedule.json?api_key=s2pvp6etztq3d6zcyvquqgt4"];

 jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://stark-chamber-44091.herokuapp.com/' + options.url;
    }

});
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		// console.log(response)

		// v should really be the total number of records in the object, then add an addional if then statement to ensure that each city is only listed once. using 0-100 works for now
	for(var v = 0; v < 100; v++){
	// console.log(response)
	 city[v] = response.games[v].venue.city.toLowerCase();
	 idnum[v] = response.games[v].home.id;

  	}
	// console.log(city)
	// console.log(city[6])
	var a = city.indexOf("Boston");
	console.log(a);
	});
}


	$(document).on("click", "#stats_btn",loadCityID);

function seasonsStats() {

	seasonStatisticsUrl= ["http://api.sportradar.us/nba/trial/v4/en/seasons/2017/REG/teams/"+cityId+"/statistics.json?api_key=s2pvp6etztq3d6zcyvquqgt4"];
//legacy link from API docs with the id filled in

	// seasonStatisticsUrl= ["http://api.sportradar.us/nba/trial/v4/en/seasons/2017/REG/teams/583eca2f-fb46-11e1-82cb-f4ce4684ea4c/statistics.json?api_key=s2pvp6etztq3d6zcyvquqgt4"]

	$.ajax({
		url: seasonStatisticsUrl,
		method: "GET"
	}).done(function(response2) {
		console.log(response2.name);
		console.log(response2.own_record.average.points);
// grab data from api and store
		var name= response2.name;
		var market = response2.market;
		var ppg  =response2.own_record.average.points;
		var turn = response2.own_record.average.turnovers;
		var rebound = response2.own_record.average.rebounds;
		for (var j = 0; j < 15; j++){
		 roster[j] = response2.players[j].full_name;
		 var rosterSpace=roster.join(', ');}
		console.log(ppg);
		// console.log(roster)

//update the dom with a bootstrap card showing stats for the team

		$("#statCards").prepend("<div class='card statCard'><div class='card-body '><h5>"+market+" "+name+"</h5><p>Average : </p><p>  Points per Game:"+ppg+" Rebounds:"+rebound+" Turnovers:"+turn+"</p><p>Roster : </p><p>"+rosterSpace+"</p></div></div>");

});
}
// I would love to show the number of wins each team has but this API requres adding the conference and division into the json

// function getRanking(){

// 	rankingUrl="http://api.sportradar.us/nba/trial/v4/en/seasons/2017/REG/standings.json?api_key=s2pvp6etztq3d6zcyvquqgt4"

// 	$.ajax({
// 		url: rankingUrl,
// 		method: "GET"
// 	}).done(function(response3) {

// 		console.log(response3.conferences[0].divisions[0].teams[0])
// })
// }


$(document).on("click","#btn2",pickCity);
$(document).on("click","#btn2",seasonsStats);





function pickCity() {

userCity = $("#userInputCity").val().trim().toLowerCase();
// console.log(userCity)
// console.log(city)
var a = city.indexOf(userCity);
	console.log(a);

	if (a === -1)
	{
		console.log("name not in database");
		$("#statCards").prepend("<div class='card'>"+userCity+ " 'not found in database'</div>");
	}
		else
        {
        	cityId = idnum[a];
        }
console.log(cityId);

// console.log(a)
// seasonsStats();
}
