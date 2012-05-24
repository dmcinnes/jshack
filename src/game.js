window.onload = function() {
        
        Crafty.init();

        Crafty.sprite(128, "web/images/sprite.png", {
                grass: [0,0,1,1],
                stone: [1,0,1,1]
        });


        iso = Crafty.isometric.size(128);
        var z = 0;
        for(var i = 20; i >= 0; i--) {
                for(var y = 0; y < 20; y++) {
                        var which =  Math.round(Math.random());
                        var tile = Crafty.e("2D, DOM, "+ (!which ? "grass" : "stone") +", Mouse")
                        .attr('z',i+1 * y+1).areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32]).bind("click", function(e) {
                                //destroy on right click
                                if(e.button === 2) this.destroy();
                        }).bind("mouseover", function() {
                                if(this.has("grass")) {
                                        this.sprite(0,1,1,1);
                                } else {
                                        this.sprite(1,1,1,1);
                                }
                        }).bind("mouseout", function() {
                                if(this.has("grass")) {
                                        this.sprite(0,0,1,1);
                                } else {
                                        this.sprite(1,0,1,1);
                                }
                        });

                        iso.place(i,y,0, tile);
                }
        }
        
        z = i*y + 100;
        
        var even = false
        for (var i=0; i < 200; i++) {
          even = !even;
          
          var multiple = even ? -1 : 1
          //Ball
          Crafty.e("2D, DOM, Color, Collision")
          	.color('rgb(0,0,255)')
          	.attr({ x: Math.random()*300, y: Math.random()*150, w: 10, h: 10,z:z ,
          			dX: Crafty.math.randomInt(2, 7) * multiple, 
          			dY: Crafty.math.randomInt(2, 7) * multiple }) 
          	.bind('EnterFrame', function () {
          		//hit floor or roof
          		if (this.y <= 0 || this.y >= 290)
          			this.dY *= -1;

          		if (this.x > 600) {
          			this.x = 300;
          			Crafty("LeftPoints").each(function () { 
          				this.text(++this.points + " Points") });
          		}
          		if (this.x < 10) {
          			this.x = 300;
          			Crafty("RightPoints").each(function () { 
          				this.text(++this.points + " Points") });
          		}

          		this.x += this.dX;
          		this.y += this.dY;
          	})
          	.onHit('Paddle', function () {
          	this.dX *= -1;
          })
        };
        Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
                if(e.button > 1) return;
                var base = {x: e.clientX, y: e.clientY};

                function scroll(e) {
                        var dx = base.x - e.clientX,
                                dy = base.y - e.clientY;
                                base = {x: e.clientX, y: e.clientY};
                        Crafty.viewport.x -= dx;
                        Crafty.viewport.y -= dy;
                };

                Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
                Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
                        Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
                });
        });
};
