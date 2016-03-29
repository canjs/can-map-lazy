@page can-map-lazy

# can-map-lazy

[![Build Status](https://travis-ci.org/canjs/can-map-lazy.png?branch=master)](https://travis-ci.org/canjs/can-map-lazy)

Lazy initializing maps and lists

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

## AMD use

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
