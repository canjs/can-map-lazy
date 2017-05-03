# can-map-lazy (DEPRECATED)

[![Greenkeeper badge](https://badges.greenkeeper.io/canjs/can-map-lazy.svg)](https://greenkeeper.io/)

**The `can-map-lazy` plugin has been deprecated**

[![Build Status](https://travis-ci.org/canjs/can-map-lazy.png?branch=master)](https://travis-ci.org/canjs/can-map-lazy)

`can-map-lazy` is a plugin that enables lazy initializing for maps and lists.

## Overview

Just like `can.Map`, `can.LazyMap` provides a way to listen for and keep track of changes to objects. But unlike Map, a LazyMap only initializes data when bound, set or read. For lazy observable arrays, `can.LazyList` is also available.

### Limitations of LazyMaps

Although passing all original [can.Map] and [can.List] tests, `can.LazyMap` and `can.LazyList` do not work with the [can.Map.attributes], [can.Map.setter], [can.Map.delegate], [can.Map.backup]
and [can.Map.validations] plugins.

Additionally, If all properties of a LazyMap or LazyList are being read, bound or set, initialization time can be slightly higher than using a Map or List.

### Working with LazyMaps

`can.LazyMap` and `can.LazyList` are API compatible with [can.Map] and [can.List]. 

To create a LazyMap, use `new can.LazyMap([props])`. Properties should be read or set using `[can.Map.prototype.attr attr]`, never directly.

```
// chores is just a normal Array initially
var lazyPerson = new can.LazyMap({
  name: 'Bob',
  chores: ['dishes', 'garbage']
});

lazyPerson.attr('chores') // Now chores is a can.List
```

### See Also

For information on manipulating attributes, see [can.Map.prototype.attr](https://canjs.com/docs/can.Map.prototype.attr.html). To see what events are fired on property changes and how to listen for those events see [can.Map.prototype.bind](https://canjs.com/docs/can.Map.prototype.bind.html).


## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'can-map-lazy';
```

### CommonJS use

Use `require` to load `can-map-lazy` and everything else
needed to create a template that uses `can-map-lazy`:

```js
var plugin = require("can-map-lazy");
```

### AMD use

Configure the `can` and `jquery` paths and the `can-map-lazy` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'can-map-lazy',
		    	location: 'node_modules/can-map-lazy/dist/amd',
		    	main: 'lib/can-map-lazy'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/can-map-lazy/dist/global/can-map-lazy.js'></script>
```

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
