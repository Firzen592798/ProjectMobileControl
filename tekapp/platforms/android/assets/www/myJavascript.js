		var xMovement = 0;
		var yMovement = 0;

	var analog;
	var circle;
	var layer;  

	layer = new Kinetic.Layer({
	    width: 300,
        height: 300
	});


	var text = new Kinetic.Text({
        x: 10,
        y: 10,
        fontFamily: 'Calibri',
        fontSize: 24,
        text: '',
        fill: 'black'
    });
	

	function drawAnalog(analogX, analogY, size){
	
		var imageCircle = new Image();
	      imageCircle.onload = function(){
	      circle = new Kinetic.Image({
          x: 0,
          y: 0,
          image: imageCircle,
          width: size,
          height: size,
        });
	};
	imageCircle.src = 'circulo.png';
	  
		layer.setWidth(size);
		layer.setHeight(size);
		layer.setX(analogX);
		layer.setY(analogY);
		
		
		var imageAnalogic = new Image();
		imageAnalogic.onload = function() {
			analog = new Kinetic.Image({
				x: size / 3,
				y: size / 3,
				image: imageAnalogic,
				width: size / 3, //100
				height: size / 3,
				draggable: true
			});
				
			analog.setDragBoundFunc(function(pos) {
				var x = size / 3 + analogX;
				var y = size / 3 + analogY;
				var radius = size * 3 / 10;
				var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
				if(scale < 1){
				  return {
					y: Math.round((pos.y - y) * scale + y),
					x: Math.round((pos.x - x) * scale + x)
				  };
				  }
				else
				  return pos;
			   
			   });        
			
			analog.on('mouseup', function() {
				//writeMessage(analog.getX()+","+analog.getY());
			});
				  
			analog.on('dragend', function() {
				xMovement = 0;
				yMovement = 0;
				//writeMessage(analog.getX()+","+analog.getY());
					  var tween = new Kinetic.Tween({
					x: size / 3,
					y: size / 3,
					node: analog, 
					duration: 0.1,

					opacity: 1,
					strokeWidth: 6,
					easing: Kinetic.Easings.Linear,
				  });
				tween.play();
			});
			
			analog.on('dragmove', function() {
				//writeMessage(analog.getX()+","+analog.getY());
				xMovement = parseInt((analog.getX() - size / 3) * 10/ (size * 3 / 100));
				yMovement = parseInt((analog.getY() - size / 3)  * 10 / (size * 3 / 100));
				//writeMessage(xMovement+","+yMovement);
			});

			analog.on('touchend', function() {
				layer.draw();
				mousedown = 0;
			});

			layer.add(circle);
			layer.add(analog);
			layer.add(text);
		};
		imageAnalogic.src = 'analog.png';
	}

	function writeMessage(message) {
        //text.setText(message);
        //layer.draw();
    }
	
	function getXMovement(){
		return xMovement;
	}
	
	function getYMovement(){
		return yMovement;
	}
	
