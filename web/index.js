$(window).load(function()
{
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var heatmap = heatmapFactory.create({"element": "heatmap"});


	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 70;

	heatmap.store.setDataSet({ max: 10, data: [{x: centerX, y: centerY, count: radius}]});

	var context = canvas.getContext('2d');

	$('#slider').hide();
	$('#slider').change(function() {
		var val = $(this).val() == 0 ? 12 : $(this).val();
		$('#time').html(val + " P.M.");
	});

	/*
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'green';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = '#003300';
	context.stroke();
*/


/*
	expand = function(e) {
		var item = $(this).parent().find(".item-more");
		item.toggle();
		if (item.is(":visible")) {
			$(this).html('less');
		} else {
			$(this).html('more');
		}
	}

	play_pause = function(e) {
		if($(this).data("play") == "play") {
			$(this).data("play", "pause");
			$(this).html("&#10074;&#10074;")
		} else {
			$(this).data("play", "play");
			$(this).html("&#9654;")
		}
	}

	highlight = function(e) {
		// set all the other background colors regular
		$('.item-container').css('background-color', '#FFF');
		$('.item-container').css('color', '#000');
		$('.location').css('color', '#333')
		$('.date').css('color', '#333')
		$('.more-button').css('color', '#427fed')

		// set the selected one blue
		$(this).parent().css('background-color', '#428bca');
		$(this).parent().css('color', '#FFF')
		$(this).parent().find('.location').css('color', '#FFF')
		$(this).parent().find('.date').css('color', '#FFF')
		$(this).parent().find('.more-button').css('color', '#FFF')
	}

	shift = function(e) {
		if($(this).parent().find('#title').is(":visible")) {
			$(this).parent().find('#title').toggle();
			$(this).css('left', 'auto');
			$(this).css('right', '0px');
			$('#settings-button').hide();
			$('#sidebar').toggle();
		} else {
			$(this).parent().find('#title').toggle();
			$(this).css('left', '0px');
			$(this).css('right', 'auto');
			$('#settings-button').show();
			$('#sidebar').toggle();
		}
	}

	hide_show = function(e) {
		$('#play-wrapper').toggle();
	}

	var old_width = $(window).width();
	resize = function(e) {
		if(($(window).width() < 800) && (old_width > 800)) {
			// window moved from big to small
			$('#sidebar-button').show();
			$('#settings-button').show();
			$('#sidebar-button').css('left', '0px');
			$('#sidebar-button').css('right', 'auto');
			$('#title').css('display', 'block');
			$('#sidebar').hide();
			$('#play-wrapper').hide();
			old_width = $(window).width();
		}
		if(($(window).width() > 800) && (old_width < 800)) {
			// window moved from small to big
			$('#sidebar-button').hide();
			$('#settings-button').hide();
			$('#title').css('display', 'block');
			$('#sidebar').show();
			$('#play-wrapper').show();
			old_width = $(window).width();
		}
	}

	$('.more-button').click(expand);
	$('#play').click(play_pause);
	$('.title').click(highlight);
	$('#sidebar-button').click(shift);
	$('#settings-button').click(hide_show);
	$(window).resize(resize);
*/
});
