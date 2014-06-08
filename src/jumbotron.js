var jumbotron = {};

jumbotron.observations = [];
jumbotron.observe = function(observation){
  this.observations.push(observation)
};

jumbotron.construct = function(){}


jumbotron.util = {};

jumbotron.util.mapToUnit = function(corners) {
	// find a transform that will convert corners to
	// 0,0 - 1,0 - 1,1 - 0,1

	// simple transforms only
	var scale = corners[1].x - corners[0].x;
	var xoff = corners[0].x;
	var yoff = corners[0].y;

	m= $M([
		[1/scale, 0,     -xoff/scale],
		[0,     1/scale, -yoff/scale],
		[0,     0,     1]])

	return m;


	// manual to match test value
	// return $M([
	// 	[1/100, 0,     0],
	// 	[0,     1/100, -1.5],
	// 	[0,     0,     1]])

}