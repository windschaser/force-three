/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data.json":
/*!*******************!*\
  !*** ./data.json ***!
  \*******************/
/*! exports provided: gexf, default */
/***/ (function(module) {

module.exports = {"gexf":{"-xmlns":"http://www.gexf.net/1.2draft","-xmlns:viz":"http://www.gexf.net/1.2draft/viz","-xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","-version":"1.2","-xsi:schemaLocation":"http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd","meta":{"-lastmodifieddate":"2014-01-30","creator":"Gephi 0.8.1"},"graph":{"-defaultedgetype":"undirected","-mode":"static","attributes":{"-class":"node","-mode":"static","attribute":{"-id":"modularity_class","-title":"Modularity Class","-type":"string"}},"nodes":{"node":[{"-id":"0","-label":"Thing","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Thing"}},"viz:size":{"-value":"28.685715"},"viz:position":{"-x":"-266.82776","-y":"299.6904","-z":"0.0"},"viz:color":{"-r":"235","-g":"81","-b":"72"}},{"-id":"1","-label":"address","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Thing"}},"viz:size":{"-value":"18.685715"},"viz:position":{"-x":"-266.82776","-y":"299.6904","-z":"0.0"},"viz:color":{"-r":"235","-g":"81","-b":"72"}},{"-id":"2","-label":"name","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Thing"}},"viz:size":{"-value":"18.685715"},"viz:position":{"-x":"-266.82776","-y":"299.6904","-z":"0.0"},"viz:color":{"-r":"235","-g":"81","-b":"72"}},{"-id":"3","-label":"Place","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Place"}},"viz:size":{"-value":"40.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}},{"-id":"4","-label":"sex","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Place"}},"viz:size":{"-value":"20.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}},{"-id":"5","-label":"age","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Place"}},"viz:size":{"-value":"20.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}},{"-id":"6","-label":"sex","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Place"}},"viz:size":{"-value":"20.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}},{"-id":"7","-label":"Intangible","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Intangible"}},"viz:size":{"-value":"20.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}},{"-id":"8","-label":"SSD","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Intangible"}},"viz:size":{"-value":"20.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}},{"-id":"9","-label":"mouse","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Intangible"}},"viz:size":{"-value":"20.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}},{"-id":"10","-label":"keyboard","attvalues":{"attvalue":{"-for":"modularity_class","-value":"Intangible"}},"viz:size":{"-value":"20.0"},"viz:position":{"-x":"-418.08344","-y":"446.8853","-z":"0.0"},"viz:color":{"-r":"236","-g":"81","-b":"72"}}]},"edges":{"edge":[{"-id":"0","-source":"0","-target":"1"},{"-id":"1","-source":"0","-target":"2"},{"-id":"2","-source":"0","-target":"3"},{"-id":"3","-source":"0","-target":"7"},{"-id":"4","-source":"3","-target":"4"},{"-id":"5","-source":"3","-target":"5"},{"-id":"6","-source":"3","-target":"6"},{"-id":"9","-source":"7","-target":"8"},{"-id":"10","-source":"7","-target":"9"},{"-id":"11","-source":"7","-target":"10"}]}}}};

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var cannon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cannon */ "./node_modules/cannon/build/cannon.js");
/* harmony import */ var cannon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cannon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var three_dragcontrols__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three-dragcontrols */ "./node_modules/three-dragcontrols/lib/index.module.js");





let data = __webpack_require__(/*! ./data.json */ "./data.json");
const TrackballControls = __webpack_require__(/*! three-trackballcontrols */ "./node_modules/three-trackballcontrols/index.js");

(() => {
	let width = 1200;
	let height = 900;
	let color = d3__WEBPACK_IMPORTED_MODULE_0__["scaleOrdinal"](d3__WEBPACK_IMPORTED_MODULE_0__["schemeCategory10"]);
	
	let nodes = [{name: "桂林"}, {name: "广州"},
		{name: "厦门"}, {name: "杭州"},
		{name: "上海"}, {name: "青岛"},
		{name: "天津"}];
	
	let edges = [{source: 0, target: 1}, {source: 0, target: 2},
		{source: 1, target: 3}, {source: 1, target: 4}, {source: 2, target: 5},
		{source: 2, target: 6}, {source: 6, target: 0}];
	
	let world = new cannon__WEBPACK_IMPORTED_MODULE_2__["World"]();
	world.gravity.set(0, 0, 0);
	world.solver.iterations = 20;
	
	let scene = new three__WEBPACK_IMPORTED_MODULE_1__["Scene"]();
	let renderer = new three__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderer"]({antialias: true});
	renderer.setSize(width, height);
	renderer.shadowMapEnabled = true;
	renderer.setClearColor(0x333333, 1.0);
	document.body.appendChild(renderer.domElement);
	
	let camera = new three__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"](45, width / height, 1, 10000);
	camera.position.set(0, -300, 300);
	camera.lookAt(0, 0, 200);
	
	function createPlane()
	{
		let planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__["PlaneGeometry"](300, 300, 10, 10);
		let planeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__["MeshStandardMaterial"]({color: 0xFFFFFF, side: three__WEBPACK_IMPORTED_MODULE_1__["DoubleSide"]});
		let plane = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](planeGeometry, planeMaterial);
		plane.rotation.x = -1 * Math.PI;
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = 0;
		plane.receiveShadow = true;
		scene.add(plane);
		
		let body = new cannon__WEBPACK_IMPORTED_MODULE_2__["Body"]({
			mass: 1,
			shape: new cannon__WEBPACK_IMPORTED_MODULE_2__["Plane"](),
			type: cannon__WEBPACK_IMPORTED_MODULE_2__["Body"].KINEMATIC
		});
		//world.addBody(body);
	}
	
	createPlane();
	let dragObjects = [];
	
	nodes.forEach((value, index) => {
		function createText()
		{
			let canvas = document.createElement("canvas");
			canvas.width = 256;
			canvas.height = 256;
			let ctx = canvas.getContext("2d");
			ctx.fillStyle = "#000000";
			ctx.font = "50px Yahei";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(value.name, 128, 128, 256);
			let spriteMap = new three__WEBPACK_IMPORTED_MODULE_1__["CanvasTexture"](canvas);
			spriteMap.needsUpdate = true;
			let spriteMaterial = new three__WEBPACK_IMPORTED_MODULE_1__["SpriteMaterial"]({map: spriteMap});
			let sprite = new three__WEBPACK_IMPORTED_MODULE_1__["Sprite"](spriteMaterial);
			sprite.scale.set(30, 30, 1);
			sprite.castShadow = true;
			sprite.receiveShadow = true;
			scene.add(sprite);
			value.text = sprite;
			sprite.data = value;
			return sprite
		}
		
		let text = createText();
		
		function createBody()
		{
			let sphere_geometry = new three__WEBPACK_IMPORTED_MODULE_1__["SphereGeometry"](10, 32, 32);
			let sphere_material = new three__WEBPACK_IMPORTED_MODULE_1__["MeshPhongMaterial"]({
				color: d3__WEBPACK_IMPORTED_MODULE_0__["rgb"](color(index)).brighter().toString()
			});
			let sphere = new three__WEBPACK_IMPORTED_MODULE_1__["Mesh"](sphere_geometry, sphere_material);
			sphere.castShadow = true;
			sphere.receiveShadow = true;
			sphere.position.set(50 * index, 50 * index, 100);
			scene.add(sphere);
			dragObjects.push(sphere);
			value.body = sphere;
			sphere.data = value;
			return sphere;
		}
		
		let sphere = createBody();
		
		let sphere_body = new cannon__WEBPACK_IMPORTED_MODULE_2__["Body"]({
			mass: 1,
			shape: new cannon__WEBPACK_IMPORTED_MODULE_2__["Sphere"](10),
			linearDamping: 0.9,
			angularDamping: 0.9
		});
		sphere_body.position.copy(sphere.position);
		sphere_body.fixedRotation = true;
		world.addBody(sphere_body);
		value.pbody = sphere_body;
	});
	
	edges.forEach((value => {
		let material = new three__WEBPACK_IMPORTED_MODULE_1__["LineBasicMaterial"]({vertexColors: true, side: three__WEBPACK_IMPORTED_MODULE_1__["DoubleSide"]});
		let geometry = new three__WEBPACK_IMPORTED_MODULE_1__["Geometry"]();
		geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](-100, 50, 0));
		geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](100, 0, 0));
		geometry.colors.push(new three__WEBPACK_IMPORTED_MODULE_1__["Color"](color(value.source)), new three__WEBPACK_IMPORTED_MODULE_1__["Color"](color(value.target)));
		let line = new three__WEBPACK_IMPORTED_MODULE_1__["Line"](geometry, material);
		line.castShadow = true;
		line.receiveShadow = true;
		scene.add(line);
		value.body = line;
		
		let pbodyA = nodes[value.source].pbody;
		let pbodyB = nodes[value.target].pbody;
		let constraint = new cannon__WEBPACK_IMPORTED_MODULE_2__["DistanceConstraint"](pbodyA, pbodyB, 50, 5);
		world.addConstraint(constraint);
	}));
	
	function createLight()
	{
		let light = new three__WEBPACK_IMPORTED_MODULE_1__["AmbientLight"](0xffffff, 0.5);
		light.position.set(0, 10, 0);
		scene.add(light);
		
		light = new three__WEBPACK_IMPORTED_MODULE_1__["SpotLight"](0xffffff, 0.4);
		light.position.set(100, 100, 300);
		light.castShadow = true;
		light.shadow.mapSize.width = 8192;
		light.shadow.mapSize.height = 8192;
		scene.add(light);
		
		light = new three__WEBPACK_IMPORTED_MODULE_1__["SpotLight"](0xffffff, 0.2);
		light.position.set(-100, -100, 250);
		light.castShadow = true;
		light.shadow.mapSize.width = 8192;
		light.shadow.mapSize.height = 8192;
		scene.add(light);
	}
	
	createLight();
	const traceballControls = new TrackballControls(camera, renderer.domElement);
	let onDrag = false;
	const dragControls = new three_dragcontrols__WEBPACK_IMPORTED_MODULE_3__["default"](dragObjects, camera, renderer.domElement);
	dragControls.addEventListener('hoveron', function (event) {
		traceballControls.enabled = false;
	});
	dragControls.addEventListener('hoveroff', function (event) {
		traceballControls.enabled = true;
	});
	dragControls.addEventListener('dragstart', function (event) {
		event.object.data.pbody.type = cannon__WEBPACK_IMPORTED_MODULE_2__["Body"].KINEMATIC;
		event.object.data.pbody.updateMassProperties();
		onDrag = true;
	});
	dragControls.addEventListener('drag', function (event) {
		event.object.data.pbody.position.copy(event.object.position);
	});
	dragControls.addEventListener('dragend', function (event) {
		event.object.data.pbody.type = cannon__WEBPACK_IMPORTED_MODULE_2__["Body"].DYNAMIC;
		event.object.data.pbody.updateMassProperties();
		onDrag = false;
	});
	let lastTime = performance.now();
	let animate = function (now) {
		requestAnimationFrame(animate);
		let timeSpan = now - lastTime;
		lastTime = now;
		world.step(Math.min(timeSpan, 1000) / 1000);
		if (!onDrag)
		{
			//计算质心
			let massCenter = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 0);
			nodes.forEach(value => {
				massCenter.add(value.pbody.position);
			});
			massCenter.divideScalar(nodes.length);
			//计算向心力
			let maxForce = 0.05 * massCenter.sub(new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 100)).length() ** 2;
			let forceCenter = massCenter.negate().clampLength(maxForce, Math.ceil(maxForce));
			//添加向心力
			nodes.forEach(node => {
				node.pbody.force.copy(node.pbody.force.vadd(forceCenter));
			});
		}
		nodes.forEach(value => {
			value.body.position.copy(value.pbody.position);
			value.body.quaternion.copy(value.pbody.quaternion);
			//计算文本位置
			let ray = camera.position.clone().sub(value.pbody.position).clampLength(11, 12).add(value.pbody.position);
			value.text.position.copy(ray);
			//添加斥力
			nodes.forEach(node => {
				if (node !== value && node.pbody.type === cannon__WEBPACK_IMPORTED_MODULE_2__["Body"].DYNAMIC)
				{
					let distance = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().copy(node.pbody.position).distanceTo(value.pbody.position);
					let maxForce = 100000;
					let force = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"]().copy(node.pbody.position).sub(value.pbody.position).clampLength(maxForce / distance ** 2, Math.ceil(maxForce / distance ** 2));
					node.pbody.force.copy(node.pbody.force.vadd(force));
				}
			});
		});
		edges.forEach(value => {
			value.body.geometry.verticesNeedUpdate = true;
			let bodyA = nodes[value.source].body;
			let bodyB = nodes[value.target].body;
			value.body.geometry.vertices[0] = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](bodyA.position.x, bodyA.position.y, bodyA.position.z);
			value.body.geometry.vertices[1] = new three__WEBPACK_IMPORTED_MODULE_1__["Vector3"](bodyB.position.x, bodyB.position.y, bodyB.position.z);
		});
		renderer.render(scene, camera);
		traceballControls.update();
	};
	animate(lastTime);
})
();

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ })

/******/ });
//# sourceMappingURL=main.c964df8770074a4eb94b.js.map