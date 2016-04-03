@function can.Lazy.map
@parent can-map-lazy
@description Create observable objects that initialize on demand.

@signature `new can.LazyMap([props])`

Creates a new instance of can.LazyMap.

@param {Object} [props] Properties and values to initialize the Map with.
@return {can.LazyMap} An instance of `can.LazyMap` with the properties from _props_.

@body

Just like `can.Map`, `can.LazyMap` provides a way to listen for and keep track of changes to objects. But unlike Map, a LazyMap only initializes data when bound, set or read. For lazy observable arrays, `can.LazyList` is also available.

This on demand initialization of nested data can yield big performance improvements when using large datasets that are deeply nested data where only a fraction of the properties are accessed or bound to.