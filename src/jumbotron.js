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

// extract mapings from each marker to another 
// once they have been transformed to be 1x1
jumbotron.util.extractOffsets = function(markers){
	var vectors = markers.map(jumbotron.util.vectors);

	return markers.map(function(marker, i){
		var v = vectors[i];

		// the transform to make this normal
		var transform = jumbotron.util.mapToUnit(v);

		// vectors to all markers
		return markers.map(function(m,j){
			var vector = vectors[j][0]
			// debugger;
			return transform.x(vector)
		})	
	})
}


// extract mapings from each marker to another 
// once they have been transformed to be 1x1
jumbotron.util.extractOffsets = function(markers){
	var vectors = markers.map(jumbotron.util.vectors);

	return markers.map(function(marker, i){
		var v = vectors[i];

		// the transform to make this normal
		var transform = jumbotron.util.mapToUnit(v);

		// vectors to all markers
		return markers.map(function(m,j){
			var vector = vectors[j][0]
			// debugger;
			return transform.x(vector)
		})	
	})
}



// extract mapings from each marker to another 
// once they have been transformed to be 1x1
jumbotron.util.extractOffsets2 = function(markers){
	// debugger;

	var grid = {};

	var vectors = markers.map(jumbotron.util.vectors);
	var ids     = markers.map(function(m){return m.id});

	markers.map(function(marker, i){
		var v = vectors[i];

		// the transform to make this normal
		var transform = jumbotron.util.mapToUnit(v);

		// vectors to all markers
		return markers.map(function(m,j){
			var vector = vectors[j][0]
			// debugger;
			// return transform.x(vector);

			if(i !== j) 
				grid[ids[i] + '-' + ids[j]] = transform.x(vector);
		})	
	});


	return grid;
}


jumbotron.marker = {};

jumbotron.marker.generate = function(i){

	var w = false, b = true

	var rows =[
		[b, w, b, b, b, b, b],
		[b, w, b, w, w, w, b],
		[b, b, w, b, b, w, b],
		[b, b, w, w, w, b, b],

		[b, b, b, b, b, b, b] // border
	];


	return [
		rows[4],
		rows[i >> 8 & 3],
		rows[i >> 6 & 3],
		rows[i >> 4 & 3],
		rows[i >> 2 & 3],
		rows[i & 3],
		rows[4]
	]
}

