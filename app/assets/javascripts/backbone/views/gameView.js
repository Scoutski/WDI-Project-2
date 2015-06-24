var app = app || {}
app.GameView = Backbone.View.extend({
	el: '#main',
	events:{},
	initialize:function(){
		var view = this;

		app.dispatcher.bind('game.my_turn', function(data) {
			console.log(data);
			view.getRole(data);
		});

		// app.gameChannel.bind('tell_player_start', function(){
		// 	debugger;
		// 	console.log("New round starting");
		// 	app.router.navigate('game',true);
		// });

	},
	getRole: function(data){
		if (data.my_turn){
	  		this.drawView(data);  
		} else {
	  		this.guessView(data);
		};
	},

	guessView: function(data){
		// this.$el.append("You're going to be guessing shit!");
		// var canvasTemplate = new app.CanvasView();
		// canvasTemplate.renderGuesser();
		// debugger;
		$('#main').empty();
		this.$el.append("You're going to be drawing shit!");
		app.guessCanvasView = new app.CanvasView();
		app.guessCanvasView.renderGuesser();
		app.chatBox = new app.ChatboxView();
		app.chatBox.render();
	},

	drawView: function(data){
		// debugger;
		this.$el.append("You're going to be drawing shit!");

		app.drawCanvasView = new app.CanvasView();
		app.drawCanvasView.renderDrawer();
	},
	renderStatus: function(){
		//GAME LOGIC TO HANDLE WHAT GETS DISPLAYED IN THE STATUS BAR
		//GOES HERE
		statusBar.render("This is a message");
	},
	render: function(){

		console.log("Triggering get role call");
		app.dispatcher.trigger('game.get_role');
		
		chatBoxTemplate = $('#chatBoxTemplate').html();
		this.$el.html("Hello, ");
	},
});