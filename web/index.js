
var image = new Image();
var canvas = null;
var heatmap = null;

var Pointer = {
	mapS : 1, begS : 1, endS : 1, prvS : 1,
	
	mapX : 0, mapY : 0, prvX : 0, prvY : 0,
	ptrX : 0, ptrY : 0,
	begX : 0, begY : 0
};

$(window).load(function()
{
	image.src = 'map.png';

	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var drag = false;

	heatmap = document.getElementById("heatmap");
	heatmap.ontouchstart = function(e) {
		drag = true;
		
		var touches = e.targetTouches;
		if(touches.length == 2) {
			Pointer.begS = Math.sqrt(
				Math.pow(touches[0].pageX - touches[1].pageX, 2) +
				Math.pow(touches[0].pageY - touches[1].pageY, 2));
		} else {
			Pointer.begX = touches[0].pageX;
			Pointer.begY = touches[0].pageY;
		}
	};
	heatmap.ontouchmove = function(e) {
		e.preventDefault();

		var touches = e.targetTouches;
		if(touches.length == 2) {
			Pointer.endS = Math.sqrt(
				Math.pow(touches[0].pageX - touches[1].pageX, 2) +
				Math.pow(touches[0].pageY - touches[1].pageY, 2));

			Pointer.mapS = Math.max(0.5, Math.min(2.0, (Pointer.endS / Pointer.begS) * Pointer.prvS));
		} else {
			Pointer.mapX = (touches[0].pageX - Pointer.begX) * 1/Pointer.mapS + Pointer.prvX;
			Pointer.mapY = (touches[0].pageY - Pointer.begY) * 1/Pointer.mapS + Pointer.prvY;
		}
		
		var g = canvas.getContext('2d');
		g.clearRect(0, 0, canvas.width, canvas.height);
		g.save();
		g.scale(Pointer.mapS, Pointer.mapS);
		g.translate(Pointer.mapX, Pointer.mapY)
		g.drawImage(image, 0,0);
		g.restore();
	};
	heatmap.ontouchend = function(e) {	
		drag = false;
//		if(touches.length == 2) {
			Pointer.prvS = Pointer.mapS;
//		} else {
			Pointer.prvX = Pointer.mapX;
			Pointer.prvY = Pointer.mapY;
//		}
	};
/*
	$('#heatmap').on('mousedown', function(e) {
		drag = true;
		Pointer.begX = e.clientX;
		Pointer.begY = e.clientY;

		Pointer.ptrX = Pointer.begX * 1/Pointer.mapS - Pointer.mapX;
		Pointer.ptrY = Pointer.begY * 1/Pointer.mapS - Pointer.mapY;
	});
	$('#heatmap').on('mouseup', function(e) {
		drag = false;
		Pointer.prvX = Pointer.mapX;
		Pointer.prvY = Pointer.mapY;
	});
	$('#heatmap').on('mousemove', function(e) {
		
		Pointer.mapX = (e.clientX - Pointer.begX) * 1/Pointer.mapS + Pointer.prvX;
		Pointer.mapY = (e.clientY - Pointer.begY) * 1/Pointer.mapS + Pointer.prvY;
		if(drag) {
			var g = canvas.getContext('2d');
			g.clearRect(0, 0, canvas.width, canvas.height);
			g.save();
			g.scale(Pointer.mapS, Pointer.mapS);
			g.translate(Pointer.mapX, Pointer.mapY)
			g.drawImage(image, 0,0);
			g.restore();
		}
	});
*/	


	heatmap = heatmapFactory.create({"element": "heatmap"});
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 70;

	heatmap.store.setDataSet({ max: 10, data: [{x: centerX, y: centerY, count: radius}]});

	$('#slider').hide();
	$('#slider').change(function() {
		var val = $(this).val() == 0 ? 12 : $(this).val();
		$('#time').html(val + " P.M.");
	});
});
