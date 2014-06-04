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