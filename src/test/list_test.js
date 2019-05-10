require('steal-qunit');
require('../can-map-lazy');

QUnit.module('can/list/lazy');
QUnit.test('list attr changes length', function(assert) {
	var l = new can.LazyList([
		0,
		1,
		2
	]);
	l.attr(3, 3);
	assert.equal(l.length, 4);
});
QUnit.test('list splice', function(assert) {
	var l = new can.LazyList([
		0,
		1,
		2,
		3
	]),
		first = true;
	l.bind('change', function (ev, attr, how, newVals, oldVals) {
		assert.equal(attr, '1');
		if (first) {
			assert.equal(how, 'remove', 'removing items');
			assert.equal(newVals, undefined, 'no new Vals');
		} else {
			assert.deepEqual(newVals, [
				'a',
				'b'
			], 'got the right newVals');
			assert.equal(how, 'add', 'adding items');
		}
		first = false;
	});
	l.splice(1, 2, 'a', 'b');
	assert.deepEqual(l.serialize(), [
		0,
		'a',
		'b',
		3
	], 'serialized');
});
QUnit.test('list pop', function(assert) {
	var l = new can.LazyList([
		0,
		1,
		2,
		3
	]);
	l.bind('change', function (ev, attr, how, newVals, oldVals) {
		assert.equal(attr, '3');
		assert.equal(how, 'remove');
		assert.equal(newVals, undefined);
		assert.deepEqual(oldVals, [3]);
	});
	l.pop();
	assert.deepEqual(l.serialize(), [
		0,
		1,
		2
	]);
});
QUnit.test('remove nested property in item of array map', function(assert) {
	var state = new can.LazyList([{
		nested: true
	}]);
	state.bind('change', function (ev, attr, how, newVal, old) {
		assert.equal(attr, '0.nested');
		assert.equal(how, 'remove');
		assert.deepEqual(old, true);
	});
	state.removeAttr('0.nested');
	assert.equal(undefined, state.attr('0.nested'));
});
QUnit.test('pop unbinds', 4, function(assert) {
	var l = new can.LazyList([{
		foo: 'bar'
	}]);
	var o = l.attr(0),
		count = 0;
	l.bind('change', function (ev, attr, how, newVal, oldVal) {
		count++;
		if (count === 1) {
			assert.equal(attr, '0.foo', 'count is set');
		} else if (count === 2) {
			assert.equal(how, 'remove');
			assert.equal(attr, '0');
		} else {
			assert.ok(false, 'called too many times');
		}
	});
	assert.equal(o.attr('foo'), 'bar');
	o.attr('foo', 'car');
	l.pop();
	o.attr('foo', 'bad');
});
QUnit.test('splice unbinds', 4, function(assert) {
	var l = new can.LazyList([{
		foo: 'bar'
	}]);
	var o = l.attr(0),
		count = 0;
	l.bind('change', function (ev, attr, how, newVal, oldVal) {
		count++;
		if (count === 1) {
			assert.equal(attr, '0.foo', 'count is set');
		} else if (count === 2) {
			assert.equal(how, 'remove');
			assert.equal(attr, '0');
		} else {
			assert.ok(false, 'called too many times');
		}
	});
	assert.equal(o.attr('foo'), 'bar');
	o.attr('foo', 'car');
	l.splice(0, 1);
	o.attr('foo', 'bad');
});
QUnit.test('always gets right attr even after moving array items', function(assert) {
	var l = new can.LazyList([{
		foo: 'bar'
	}]);
	var o = l.attr(0);
	l.unshift('A new Value');
	l.bind('change', function (ev, attr, how) {
		assert.equal(attr, '1.foo');
	});
	o.attr('foo', 'led you');
});
QUnit.test('Array accessor methods', 11, function(assert) {
	var l = new can.LazyList([
		'a',
		'b',
		'c'
	]),
		sliced = l.slice(2),
		joined = l.join(' | '),
		concatenated = l.concat([
			2,
			1
		], new can.LazyList([0]));
	assert.ok(sliced instanceof can.LazyList, 'Slice is an Observable list');
	assert.equal(sliced.length, 1, 'Sliced off two elements');
	assert.equal(sliced[0], 'c', 'Single element as expected');
	assert.equal(joined, 'a | b | c', 'Joined list properly');
	assert.ok(concatenated instanceof can.LazyList, 'Concatenated is an Observable list');
	assert.deepEqual(concatenated.serialize(), [
		'a',
		'b',
		'c',
		2,
		1,
		0
	], 'List concatenated properly');
	l.forEach(function (letter, index) {
		assert.ok(true, 'Iteration');
		if (index === 0) {
			assert.equal(letter, 'a', 'First letter right');
		}
		if (index === 2) {
			assert.equal(letter, 'c', 'Last letter right');
		}
	});
});
QUnit.test('splice removes items in IE (#562)', function(assert) {
	var l = new can.LazyList(['a']);
	l.splice(0, 1);
	assert.ok(!l.attr(0), 'all props are removed');
});
