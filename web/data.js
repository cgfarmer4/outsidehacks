
var image = new Image();
var canvas = null;

var Pointer = {
	mapS : 1, begS : 1, endS : 1, prvS : 1,
	
	mapX : 0, mapY : 0, prvX : 0, prvY : 0,
	ptrX : 0, ptrY : 0,
	begX : 0, begY : 0
};

$(window).load(function()
{
	image.src = 'map.jpg';
	image.onload = function(e) {
		resize();
	};

	canvas = document.getElementById("canvas");

	var heatmap = document.getElementById("heatmap");
	heatmap.ontouchstart = function(e) {		
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

			Pointer.mapS = Math.max(0.1, Math.min(2.0, (Pointer.endS / Pointer.begS) * Pointer.prvS));
		} else {
			Pointer.mapX = (touches[0].pageX - Pointer.begX) * 1/Pointer.mapS + Pointer.prvX;
			Pointer.mapY = (touches[0].pageY - Pointer.begY) * 1/Pointer.mapS + Pointer.prvY;
		}
		
		draw();
	};
	heatmap.ontouchend = function(e) {	
		Pointer.prvS = Pointer.mapS;
		Pointer.prvX = Pointer.mapX;
		Pointer.prvY = Pointer.mapY;
	};

	var drag = false;
	heatmap.onmousedown = function(e) {
		drag = true;
		Pointer.begX = e.clientX;
		Pointer.begY = e.clientY;
	};
	heatmap.onmouseup = function(e) {
		drag = false;
		Pointer.prvX = Pointer.mapX;
		Pointer.prvY = Pointer.mapY;
	};
	heatmap.onmousemove = function(e) {
		if(drag) {
			Pointer.mapX = (e.clientX - Pointer.begX) * 1/Pointer.mapS + Pointer.prvX;
			Pointer.mapY = (e.clientY - Pointer.begY) * 1/Pointer.mapS + Pointer.prvY;
			draw();
		}
	};

	$('#slider').hide();
	$('#slider').change(function() {
		var val = $(this).val() == 0 ? 12 : $(this).val();
		$('#time').html(val + " P.M.");
		draw();
	});
	$(window).resize(resize);
});

function resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	draw();
}

function getVal()
{
	return $('#slider').val() * 60;
}

function draw()
{
	var g = canvas.getContext('2d');
	g.clearRect(0, 0, canvas.width, canvas.height);
	g.save();
	g.scale(Pointer.mapS, Pointer.mapS);
	g.translate(Pointer.mapX, Pointer.mapY);
	g.drawImage(image, 0,0);

	for(var i in data) {
		var stage = data[i];
		
		var hottness = 0;
		for(var j in stage.artists) {
			var s = stage.artists[j].start_time;
			var d = stage.artists[j].end_time;
			var v = getVal();

			if(v >= s && v <= d) {
				hottness = stage.artists[j].hottness * 500;
				break;
			}
		}

		var x = stage.stage[0];
		var y = stage.stage[1];
		g.beginPath();
		g.arc(x,y, hottness, 0,2*Math.PI);
		var r = g.createRadialGradient(x,y, 1, x,y, hottness);
		r.addColorStop(0, '#f00');
		r.addColorStop(1, 'rgba(0,0,0,0)');
		g.fillStyle = r;
      	g.fill();
	}

	g.restore();
}
