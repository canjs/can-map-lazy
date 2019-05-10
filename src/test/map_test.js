/* jshint asi:true*/
require('../can-map-lazy');
require('can/compute/compute');
require('steal-qunit');

QUnit.module('can/map/lazy')

QUnit.test("Basic Map", 4, function(assert) {

	var state = new can.LazyMap({
		category: 5,
		productType: 4
	});

	state.bind("change", function (ev, attr, how, val, old) {
		assert.equal(attr, "category", "correct change name")
		assert.equal(how, "set")
		assert.equal(val, 6, "correct")
		assert.equal(old, 5, "correct")
	});

	state.attr("category", 6);

	state.unbind("change");

});

QUnit.test("Nested Map", 5, function(assert) {
	var me = new can.LazyMap({
		name: {
			first: "Justin",
			last: "Meyer"
		}
	});

	assert.ok(me.attr("name") instanceof can.LazyMap);

	me.bind("change", function (ev, attr, how, val, old) {
		assert.equal(attr, "name.first", "correct change name")
		assert.equal(how, "set")
		assert.equal(val, "Brian", "correct")
		assert.equal(old, "Justin", "correct")
	})

	me.attr("name.first", "Brian");

	me.unbind("change")

})

QUnit.test("remove attr", function(assert) {
	var state = new can.LazyMap({
		category: 5,
		productType: 4
	});
	state.removeAttr("category");
	assert.deepEqual(can.LazyMap.keys(state), ["productType"], "one property");
});

QUnit.test("nested event handlers are not run by changing the parent property (#280)", function(assert) {

	var person = new can.LazyMap({
		name: {
			first: "Justin"
		}
	})
	person.bind("name.first", function (ev, newName) {
		assert.ok(false, "name.first should never be called")
		//equal(newName, "hank", "name.first handler called back with correct new name")
	});
	person.bind("name", function () {
		assert.ok(true, "name event triggered")
	})

	person.attr("name", {
		first: "Hank"
	});

});

QUnit.test("cyclical objects (#521)", 0, function(assert) {
	// Not supported by LazyMap
	/*
	var foo = {};
	foo.foo = foo;

	var fooed = new can.LazyMap(foo);

	ok(true, "did not cause infinite recursion");

	ok(fooed.attr('foo') === fooed, "map points to itself")

	var me = {
		name: "Justin"
	}
	var references = {
		husband: me,
		friend: me
	}
	var ref = new can.LazyMap(references)

	ok(ref.attr('husband') === ref.attr('friend'), "multiple properties point to the same thing")
	*/
})

QUnit.test('Getting attribute that is a can.compute should return the compute and not the value of the compute (#530)', function(assert) {
	var compute = can.compute('before');
	var map = new can.LazyMap({
		time: compute
	});

	assert.equal(map.time, compute, 'dot notation call of time is compute');
	assert.equal(map.attr('time'), compute, '.attr() call of time is compute');
})

QUnit.test('_cid add to original object', function(assert) {
	var map = new can.LazyMap(),
		obj = {
			'name': 'thecountofzero'
		};

	map.attr('myObj', obj);
	assert.ok(!obj._cid, '_cid not added to original object');
})

QUnit.test("can.each used with maps", function(assert) {
	can.each(new can.LazyMap({
		foo: "bar"
	}), function (val, attr) {

		if (attr === "foo") {
			assert.equal(val, "bar")
		} else {
			assert.ok(false, "no properties other should be called " + attr)
		}

	})
})

QUnit.test("can.Map serialize triggers reading (#626)", function(assert) {
	var old = can.__observe;

	var attributesRead = [];
	var readingTriggeredForKeys = false;

	can.__observe = function (object, attribute) {
		if (attribute === "__keys") {
			readingTriggeredForKeys = true;
		} else {
			attributesRead.push(attribute);
		}
	};

	var testMap = new can.LazyMap({
		cats: "meow",
		dogs: "bark"
	});

	// We need the original serialize since it can possibly be monkey patched
	testMap.serialize = can.LazyMap.prototype.serialize;
	testMap.serialize();


	assert.ok( can.inArray("cats", attributesRead ) !== -1 && can.inArray( "dogs", attributesRead ) !== -1,  "map serialization triggered __reading on all attributes");

	assert.ok(readingTriggeredForKeys, "map serialization triggered __reading for __keys");

	can.__observe = old;
});

QUnit.test("Test top level attributes", 7, function(assert) {
	var test = new can.LazyMap({
		'my.enable': false,
		'my.item': true,
		'my.count': 0,
		'my.newCount': 1,
		'my': {
			'value': true,
			'nested': {
				'value': 100
			}
		}
	});

	assert.equal(test.attr('my.value'), true, 'correct');
	assert.equal(test.attr('my.nested.value'), 100, 'correct');
	assert.ok(test.attr("my.nested") instanceof can.LazyMap);

	assert.equal(test.attr('my.enable'), false, 'falsey (false) value accessed correctly');
	assert.equal(test.attr('my.item'), true, 'truthey (true) value accessed correctly');
	assert.equal(test.attr('my.count'), 0, 'falsey (0) value accessed correctly');
	assert.equal(test.attr('my.newCount'), 1, 'falsey (1) value accessed correctly');
});
