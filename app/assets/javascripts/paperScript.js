var app = app || {};

$(document).ready(function() {
	app.canvas.init();
});

app.canvas = {
	init: function() {
		this.setupPaperJS();
		this.setupDefaults();
		this.setupSockets();
		this.setupEvents();
	},

	setupPaperJS: function() {
		paper.install(window);
		paper.setup('drawsomeCanv');
	},

	setupDefaults: function() {
		this.tool = new Tool();
		this.path = undefined;
		this.strokeColor = 'black';
		this.strokeWidth = 1;
	},

	setupSockets: function() {
		this.dispatcher = new WebSocketRails(window.location.host + '/websocket');
		var channel = this.dispatcher.subscribe('game');

		channel.bind('draw', function(data) {
		  app.canvas.path = app.canvas.path || new Path();
		  if (data.new_path) {
		  	path = new Path();
		  }

		  strokeColor = data.stroke_color;
		  strokeWidth = data.stroke_width;

		  console.log('adding point..');
		  app.canvas.addPoint({x: data.x_pos, y: data.y_pos});
		});
	},

	setupEvents: function() {
		this.tool.onMouseDown = this.mouseDownEvent;
		this.tool.onMouseDrag = this.mouseDragEvent;
		$('.color').on('click', this.changeColorEvent);
		$('#strokeWidth').on('input', this.changeStrokeWidthEvent);
	},

	mouseDownEvent: function(e) {
		path = new Path();

		var data = {
	    xPos: e.point.x,
	    yPos: e.point.y,
	    newPath: true,
	    strokeColor: this.strokeColor,
	    strokeWidth: this.strokeWidth
	  };

		app.canvas.dispatcher.trigger('game.draw', data);

		app.canvas.addPoint(e.point);
	},

	mouseDragEvent: function(e) {
		var data = {
	    xPos: e.point.x,
	    yPos: e.point.y,
	    strokeColor: this.strokeColor,
	    strokeWidth: this.strokeWidth
	  };

		app.canvas.dispatcher.trigger('game.draw', data);

		app.canvas.addPoint(e.point);
	},

	changeColorEvent: function() {
		var classes = $(this).attr('class').split(' ');
		app.canvas.strokeColor = classes[1];
	},

	changeStrokeWidthEvent: function() {
		app.canvas.strokeWidth = $(this).val();
	},

	addPoint: function(point) {
		strokeColor = this.strokeColor || 'black';
		strokeWidth = this.strokeWidth || 1;

		path.strokeColor = strokeColor;
		path.strokeWidth = strokeWidth;
		path.add(point);
		view.draw();	
	}

};





