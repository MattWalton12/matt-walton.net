$(document).ready(function() {
	var projects = $(".project");
	for (i=0; i<projects.length; i++) {
		$(projects[i]).css("background-color", tinycolor({h: 100 + 250 / projects.length * i, s: 0.4, v: 0.5}).setAlpha(0.95).toRgbString());
	}

	$(".project-container").css("margin-left", window.innerWidth /2 - 480 + "px");
});