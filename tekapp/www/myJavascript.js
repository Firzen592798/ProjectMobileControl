	function Analog(analogX, analogY, size, transparency){
		this.analogX = analogX;
		this.analogY = analogY;
		this.size = size;
		this.xMovement = 0;
		this.yMovement = 0;
		this.keyUp = 38;
		this.keyLeft = 37;
		this.keyDown = 40;
		this.keyRight = 39;
		var analog;
		var circle;
		var down = false;
		var left = false;
		var right = false;
		var up = false;
		this.getAnalogLayer = function(){
		var text = new Kinetic.Text({
        x: 10,
        y: 10,
        fontFamily: 'Calibri',
        fontSize: 24,
        text: '',
        fill: 'black'
		});

		var layer = new Kinetic.Layer({	});
		var imageCircle = new Image();
	      imageCircle.onload = function(){
	      circle = new Kinetic.Image({
          x: 0,
          y: 0,
		  opacity: 1 - transparency / 100,
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
				opacity: 1 - transparency / 100,
				draggable: true
			});
				
			analog.setDragBoundFunc(function(pos) {
				var x = size / 3 + analogX;
				var y = size / 3 + analogY;
				var radius = size / 3;
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
					opacity: 1 - transparency / 100,
					strokeWidth: 6,
					easing: Kinetic.Easings.Linear,
				  });
				tween.play();
			});
			
			analog.on('dragmove', function() {
				
				//analog.getY() * 1.5 - 100
				xMovement = Math.round((analog.getX() * 1.5 - 100));
				yMovement = Math.round((analog.getY() * 1.5 - 100));
				//alert(analog.getX()+","+xMovement);
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
		
		this.configureKeyboard = function(upKey, leftKey, downKey, rightKey){
			keyDown = downKey;
			keyRight = rightKey;
			keyLeft = leftKey;
			keyUp = upKey;
		}
		
		
		document.onkeyup=keyupfunction;
		function keyupfunction(event){
			event = event || window.event;
			var keycode = event.charCode || event.keyCode;
			var tX = size / 3;
			var tY = size / 3;		
			if(keycode === keyUp){
				up = false;
			}
			if(keycode === keyLeft){
				left = false;
			}
			if(keycode === keyRight){
				right = false;
			}
			if(keycode === keyDown){
				down = false;
			}
			xMovement = 0;
			yMovement = 0;
			if(down){
				tY = Math.min(tY + size / 3, 2 * size / 3);
				yMovement+=100;
			}if(up){
				tY = Math.max(tY - size / 3, 0);
				yMovement-=100;
			}if(right){
				tX = Math.min(tX + size / 3, 2 * size / 3);
 				xMovement+=100;
			}if(left){
				tX = Math.max(tX - size / 3, 0);
				xMovement-=100;
			}
			if(Math.abs(xMovement) == 100 && Math.abs(yMovement) == 100){
				xMovement = xMovement * 0.71;
				yMovement = yMovement * 0.71
			}
			var tween = new Kinetic.Tween({
					x: tX,
					y: tY,
					node: analog, 
					duration: 0.1,
					opacity: 1 - transparency / 100,
					strokeWidth: 6,
					easing: Kinetic.Easings.Linear,
			});
			tween.play();
		}
		
		document.onkeydown=keydownfunction;
		function keydownfunction(event){
			event = event || window.event;
			var keycode = event.charCode || event.keyCode;
			var tX = analog.getX();
			var tY = analog.getY();
			if(keycode === keyUp){
				up = true;
			}
			if(keycode === keyLeft){
				left = true;
			}
			if(keycode === keyRight){
				right = true;
			}
			if(keycode === keyDown){
				down = true;
			}
			xMovement = 0;
			yMovement = 0;
			if(down){
				tY = Math.min(tY + size / 3, 2 * size / 3);
				yMovement+=100;
			}if(up){
				tY = Math.max(tY - size / 3, 0);
				yMovement-=100;
			}if(right){
				tX = Math.min(tX + size / 3, 2 * size / 3);
 				xMovement+=100;
			}if(left){
				tX = Math.max(tX - size / 3, 0);
				xMovement-=100;
			}
			if(Math.abs(xMovement) == 100 && Math.abs(yMovement) == 100){
				xMovement = xMovement * 0.71;
				yMovement = yMovement * 0.71;
				if(tX == 0){
					tX = 2/3*((1 - 0.707106781) / 2) * size;
				}else{
					tX = tX *  (1 - (1 - 0.707106781) / 2);
				}
				if(tY == 0){
					tY = 2/3*((1 - 0.707106781) / 2) * size;
				}else{
					tY = tY *  (1 - (1 - 0.707106781) / 2);
				}
			}
			
			var tw = new Kinetic.Tween({
					x: tX,
					y: tY,
					node: analog, 
					duration: 0.1,
					opacity: 1 - transparency / 100,
					strokeWidth: 6,
					easing: Kinetic.Easings.Linear,
			});
			tw.play();
		}
		return layer;
		
		
	}

	function writeMessage(message) {
        text.setText(message);
        layer.draw();
    }
	
	this.getXMovement = function(){
		return xMovement;
	}
	
	this.getYMovement = function(){
		return yMovement;
	}
}

	
	
