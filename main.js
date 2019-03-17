import * as d3 from "d3";
import * as THREE from 'three';
import * as CANNON from 'cannon';
import DragControls from 'three-dragcontrols';

const TrackballControls = require('three-trackballcontrols');
let data = require('./data.json');
window.top.forceBallBackground = 0xffffff;

(async () => {
	let width = window.innerWidth;
	let height = window.innerHeight;
	let ordinal = d3.scaleOrdinal(d3.schemeCategory10);
	let color = i => d3.rgb(ordinal(i)).brighter(1.7).toString();
	//let color = i => ['#cc6666','#cccc66','#6666cc','#66cccc','#99cc66','#cc9966','#669999','#999966','#cc6699'][i];
	let typeMap = new Map();
	let typeIndex = 0;
	// let edges = [{source: 0, target: 1}, {source: 0, target: 2},
	// 	{source: 1, target: 3}, {source: 1, target: 4}, {source: 2, target: 5},
	// 	{source: 2, target: 6}, {source: 6, target: 0}];
	(() => {
		let map = new Map();
		let index = 0;
		data.nodes.forEach(node => {
			map.set(node.name, index++);
		});
		data.nodes[0].level = 0;
		data.edges = data.links.map(link => {
			let source = map.get(link.source);
			if (source === undefined)
			{
				data.nodes.push({name: link.source});
				map.set(link.source, index++);
				console.log(source);
			}
			let target = map.get(link.target);
			if (target === undefined)
			{
				data.nodes.push({name: link.target});
				map.set(link.target, index++);
			}
			data.nodes[map.get(link.target)].level = data.nodes[map.get(link.source)].level + 1;
			return {
				source: map.get(link.source), target: map.get(link.target)
			};
		});
		data.nodes.forEach(node => {
			node.color = color(node.level);
		});
	})();
	let nodes = data.nodes;
	let edges = data.edges;
	
	let world = new CANNON.World();
	world.gravity.set(0, 0, 0);
	world.solver.iterations = 20;
	
	let scene = new THREE.Scene();
	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor(window.top.forceBallBackground, 1.0);
	document.body.appendChild(renderer.domElement);
	
	let camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	camera.position.set(0, -300, 300);
	camera.lookAt(0, 0, 0);
	
	window.onresize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};
	
	function createPlane()
	{
		let planeGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
		let planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
		let plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.rotation.x = -1 * Math.PI;
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = -200;
		plane.receiveShadow = true;
		scene.add(plane);
		
		let body = new CANNON.Body({
			mass: 1,
			shape: new CANNON.Plane(),
			type: CANNON.Body.KINEMATIC
		});
		//world.addBody(body);
	}
	
	//createPlane();
	let dragObjects = [];
	
	nodes.forEach((value, index) => {
		function createText()
		{
			let canvas = document.createElement("canvas");
			canvas.width = 512;
			canvas.height = 512;
			let ctx = canvas.getContext("2d");
			ctx.fillStyle = "#000000";
			ctx.font = "75px Yahei";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(value.name, 256, 256, 512);
			let spriteMap = new THREE.CanvasTexture(canvas);
			spriteMap.needsUpdate = true;
			let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
			let sprite = new THREE.Sprite(spriteMaterial);
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
			let sphere_geometry = new THREE.SphereGeometry(10, 32, 32);
			let sphere_material = new THREE.MeshPhongMaterial({
				color: value.color
			});
			let sphere = new THREE.Mesh(sphere_geometry, sphere_material);
			sphere.castShadow = true;
			sphere.receiveShadow = true;
			sphere.frustumCulled = false;
			{
				let num = nodes.length;
				let radius = 50 * num / 2 / Math.PI;
				sphere.position.set(Math.cos(2 * Math.PI / num * index) * radius, Math.sin(2 * Math.PI / num * index) * radius, 0);
			}
			//sphere.position.set(20 * index * THREE.Math.randFloat(1, 2), 20 * index * THREE.Math.randFloat(1, 2), 20 * index * THREE.Math.randFloat(1, 2));
			scene.add(sphere);
			dragObjects.push(sphere);
			value.body = sphere;
			sphere.data = value;
			return sphere;
		}
		
		let sphere = createBody();
		
		let sphere_body = new CANNON.Body({
			mass: 1,
			shape: new CANNON.Sphere(10),
			linearDamping: 0.9,
			angularDamping: 0.9
		});
		sphere_body.position.copy(sphere.position);
		sphere_body.fixedRotation = true;
		world.addBody(sphere_body);
		value.pbody = sphere_body;
	});
	
	edges.forEach((value => {
		let material = new THREE.LineBasicMaterial({vertexColors: true, side: THREE.DoubleSide});
		let geometry = new THREE.Geometry();
		geometry.vertices.push(nodes[value.source].body.position);
		geometry.vertices.push(nodes[value.target].body.position);
		geometry.colors.push(nodes[value.source].body.material.color, nodes[value.target].body.material.color);
		let line = new THREE.Line(geometry, material);
		line.castShadow = true;
		line.receiveShadow = true;
		line.frustumCulled = false;
		scene.add(line);
		value.body = line;
		
		let pbodyA = nodes[value.source].pbody;
		let pbodyB = nodes[value.target].pbody;
		let constraint = new CANNON.DistanceConstraint(pbodyA, pbodyB, 50, 10);
		world.addConstraint(constraint);
	}));
	
	function createLight()
	{
		let light = new THREE.AmbientLight(0xffffff, 0.5);
		light.position.set(0, 10, 0);
		scene.add(light);
		
		light = new THREE.SpotLight(0xffffff, 0.4);
		light.position.set(0, 0, 300);
		light.castShadow = true;
		light.shadow.mapSize.width = 4096;
		light.shadow.mapSize.height = 4096;
		scene.add(light);
		
		light = new THREE.SpotLight(0xffffff, 0.4);
		light.position.set(0, 0, -300);
		light.castShadow = true;
		light.shadow.mapSize.width = 4096;
		light.shadow.mapSize.height = 4096;
		scene.add(light);
	}
	
	createLight();
	const traceballControls = new TrackballControls(camera, renderer.domElement);
	let onDrag = false;
	let existMouseMove = false;
	const dragControls = new DragControls(dragObjects, camera, renderer.domElement);
	dragControls.addEventListener('hoveron', function (event) {
		traceballControls.enabled = false;
	});
	dragControls.addEventListener('hoveroff', function (event) {
		traceballControls.enabled = true;
	});
	dragControls.addEventListener('dragstart', function (event) {
		event.object.data.pbody.type = CANNON.Body.KINEMATIC;
		event.object.data.pbody.updateMassProperties();
		onDrag = true;
	});
	dragControls.addEventListener('drag', function (event) {
		event.object.data.pbody.position.copy(event.object.position);
		existMouseMove = true;
	});
	dragControls.addEventListener('dragend', function (event) {
		event.object.data.pbody.type = CANNON.Body.DYNAMIC;
		event.object.data.pbody.updateMassProperties();
		onDrag = false;
		if (!existMouseMove && !!event.object.data.url && event.object.data.url !== '')
		{
			window.top.open(event.object.data.url);
		}
		existMouseMove = false;
	});
	
	function applyForce()
	{
		if (!onDrag)
		{
			//计算质心
			let massCenter = new THREE.Vector3(0, 0, 0);
			nodes.forEach(value => {
				massCenter.add(value.pbody.position);
			});
			massCenter.divideScalar(nodes.length);
			//计算向心力
			let maxForce = 10 * massCenter.sub(new THREE.Vector3(0, 0, 0)).length();
			let forceCenter = massCenter.negate().clampLength(maxForce, Math.ceil(maxForce));
			//console.log(forceCenter);
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
				if (node !== value && node.pbody.type === CANNON.Body.DYNAMIC)
				{
					let distance = new THREE.Vector3().copy(node.pbody.position).distanceTo(value.pbody.position);
					let maxForce = 100000;
					let force = new THREE.Vector3().copy(node.pbody.position).sub(value.pbody.position).clampLength(maxForce / distance ** 2, Math.ceil(maxForce / distance ** 2));
					node.pbody.force.copy(node.pbody.force.vadd(force));
				}
			});
		});
		edges.forEach(value => {
			value.body.geometry.verticesNeedUpdate = true;
		});
	}
	
	let preSimulate = 5;
	let tick = 0.02;
	console.time();
	for (let i = 0; i < preSimulate / tick; i++)
	{
		world.step(tick);
		applyForce();
	}
	console.timeEnd();
	let lastTime = performance.now();
	let animate = function (now) {
		let timeSpan = now - lastTime;
		//console.log(timeSpan);
		lastTime = now;
		if (timeSpan > 0)
		{
			world.step(Math.min(timeSpan, 100) / 1000);
			applyForce();
		}
		renderer.render(scene, camera);
		traceballControls.update();
		requestAnimationFrame(animate);
	};
	/*setInterval(() => {
		let now = performance.now();
		let timeSpan = now - lastTime;
		lastTime = now;
		world.step(Math.min(timeSpan, 100) / 1000);
		applyForce();
		renderer.render(scene, camera);
		traceballControls.update();
	}, 17);*/
	animate(lastTime);
})
();