describe('.observe', function(){

	before(function(){
		jumbotron.observe(detections.a)
	})

	it('stored the response of detect in .observations', function(){
		jumbotron.observations.should.containEql(detections.a)
	})

})

describe('.construct', function(){

	before(function(){
		jumbotron.construct()
	})

	it('transformed clients appropriately')
	it('gave a width and height in the correct ratio')

	describe('with more observations', function(){

		it('returned markers obscured by some observations');
		it('corrected erronous observations');

	})

})

describe('recognition', function(){

	// given several images

	it('identified markers')
	it('positioned markers')

})

describe('utils', function(){

	describe('mapToUnit', function(){
		var corners = detections.a[2].corners,
			transform,   // the matrix transform that will be generated
			transformed; // the corners transformed by the matrix

		before(function(){
			transform = jumbotron.util.mapToUnit(corners);
			// use the computed tranform matrix to re-transform the corners
			transformed = corners.map(function(corner){
				var vector = $V([corner.x,corner.y,1]);
				return transform.x(vector)
			});
		});

		it('returned a matrix', function(){
			transform.should.be.an.instanceOf(Matrix);
		})
		it('maps corner 0 to 0,0', function(){
			match_point(transformed[0], [0,0], .1)
		})

		it('maps corner 1 to 1,0', function(){
			match_point(transformed[1], [1,0], .1)
		})

		it('maps corner 2 to 1,1', function(){
			match_point(transformed[2], [1,1], .1)
		})

		it('maps corner 3 to 0,1', function(){
			match_point(transformed[3], [0,1], .1)
		})

	})

})


function match_point(vector, array, accuracy){
	try{
		vector.elements[0].should.be.approximately(array[0],accuracy)
		vector.elements[1].should.be.approximately(array[1],accuracy)	
	} catch (e){
		throw new Error("expected " + vector.inspect() +
				 " to be [" + array.join(',') + '] ' + 
				 '(± ' + accuracy + ')')
	}
}