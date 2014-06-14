var jumbotron = {};

jumbotron.observations = [];
jumbotron.observe = function(observation){
  this.observations.push(observation)
};

jumbotron.construct = function(){}


jumbotron.util = {};

jumbotron.util.vectors = function(marker){
	return marker.corners.map(function(c){
		return $V([c.x, c.y, 1]);
	})
}

jumbotron.util.mapToUnit = function(corners) {
	// find a transform that will convert corners to
	// 0,0 - 1,0 - 1,1 - 0,1

	// translate, scale & rotate based on first two points
	var xoff = corners[0].e(1),
		yoff = corners[0].e(2),
		xdiff = corners[1].e(1) - corners[0].e(1),
		ydiff = corners[1].e(2) - corners[0].e(2), //opp
		width = Math.sqrt((xdiff*xdiff) + (ydiff*ydiff));

	// what angle we turn it by to line up the first two points
	var angle = -Math.atan2(ydiff, xdiff);


	var s = $M([
		[1/width, 0,     0],
		[0,     1/width, 0],
		[0,     0,     1]])
	
	var t = $M([
		[1, 0,     -xoff],
		[0,     1, -yoff],
		[0,     0,     1]])
	
	var r = Matrix.RotationZ(angle);

	return s.x(r.x(t));
}