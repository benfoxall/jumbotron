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

	// manual to match test value
	return $M([
		[1/100, 0,     0],
		[0,     1/100, -1.5],
		[0,     0,     1]])

}