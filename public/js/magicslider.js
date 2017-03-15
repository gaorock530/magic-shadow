/*
*-----------------------------------------------------------
*   Magic Slider
*   designed by Magic
*	V 1.0.0
*
*-----------------------------------------------------------
*/

;(function(window, $) {
	//using Strict Mode for javascript
	"use strict";

	var MagicSlider = function (id, options) {
		var _id;
		//test 1st argument
		try {
			_id = $(id);

			if (_id.length !== 1) {
				throw new Error('1st argument is NOT valid!');
			}

		} catch (e) {
			throw(e);
		}
		//test 2nd argument
		if (typeof options !== 'object' && options) throw ('2nd argument must be Object!');

		//default propreties
		var _options = {
			speed: 1000,
			delay: 1500,
			fullscreen: false,
			autoscroll: true,
			controls: true,
      hover:false,
			top: 0,
			width: 600,
			height: 300,
			dir: true,
			autohide: false,
      url: '/pics/'
		};

		var valid = true;
		//sign options new value to _options
		for(var key in options) {
			switch(key){
				case 'speed':
					if (options[key]<500 || options[key]>1000) valid = false;
					break;
				case 'delay':
					if (options[key]<1500 || options[key]>5000) valid = false;
					break;
			}
			if (typeof _options[key] !== 'undefined' && valid) _options[key] = options[key];
			valid = true;
		}


		//create new Object
		return new MagicSlider.init(id, _options).init();
	};


	MagicSlider.prototype = {
		init: function () {
			var self = this;
			self.wrapper = $(this.id);
			self.inner = $(this.id + ' ul');
			self.slides = $(this.id + ' li');

			self.wrapper.css({
				position:'relative',
				top: this.options.top + 'px',
				width: this.options.width + 'px',
				height: this.options.height + 'px',
				margin: '0 auto',
				overflow: 'hidden',
			});

			self.inner.css({
				position: 'relative',
				display: 'block',
				width: '100%',
				height:'100%',
			});
			self.slides.css({
				position: 'absolute',
				display: 'block',
				width: '100%',
				height:'100%',
			});

			//Setup indivitual img for li
			for(var i = 0; i<self.slides.length;i++){
				self.slides.eq(i).css({
					'background-image': 'url("'+self.options.url+'red'+self.slides.eq(i).attr('links')+'.JPG")',
					'background-repeat': 'no-repeat',
					'background-size': 'cover',
          'background-position' : 'center',
					'z-index': self.slides.length - i
				});
			}

			//Add control arrows
			if (self.options.controls) {
				self.arrowLeft = $('<div></div>');
				self.arrowLeft.css({
					position: 'absolute',
					top: 0,
					width: 80 +'px',
					height: '100%',
					left: 0,
					'background': 'url('+self.options.url+'arrow.svg) no-repeat',
					'background-position': '30px',
					'z-index': self.slides.length+1
				});
				self.inner.append(self.arrowLeft);


				self.arrowRight = $('<div></div>');
				self.arrowRight.css({
					position: 'absolute',
					top: 0,
					width: 80 +'px',
					height: '100%',
					right:0,
					'background': 'url('+self.options.url+'arrow.svg) no-repeat',
					'background-position': '-50px',
					'z-index': self.slides.length+1
				});
				self.inner.append(self.arrowRight);

			}



			this.addListener();


			if (this.options.autoscroll) this.run();






			return this;
		},
		addListener: function(){
			var self = this;

      $(window).resize(function() {
        var newWidth = $(window).width();
        var newHeight = $(window).height();
        clearInterval(self.timer);
        self.timer = setInterval(function () {
          self.run();
        },100);

        if (newWidth <= 1200) {
          self.wrapper.width('1200px');
          self.options.width = 1200;
        }else{
          self.wrapper.width(newWidth);
          self.options.width = newWidth;
        }
        self.wrapper.height(newHeight);
        self.options.height = newHeight;
        for(var i=0;i<self.slides.length;i++){
          if (self.current !== i) self.slides.eq(i).css({'z-index': 0});
        }
        self.slides.eq((self.current-1 < 0)? self.slides.length-1 : self.current-1).css({left:-self.options.width,'z-index':1});
        self.slides.eq((self.current+1 === self.slides.length)? 0 : self.current+1).css({left:self.options.width,'z-index':1});
        self.slides.eq(self.current).css({'z-index':self.slides.length-1});

      });

			if (self.options.autoscroll && self.options.hover) {
				self.wrapper.mouseover(function(){
					self.stop();
				}).mouseout(function(){
					self.run();
				});
			}
			if (self.options.controls) {
				self.arrowLeft.click(function(){
					if (!self.onmove) self.move(true);
				}).mouseover(function(){
          self.stop();
					$(this).css({
						'background-color': 'rgba(0,0,0,0.3)',
						cursor: 'pointer'
					});
				}).mouseout(function(){
          self.run();
					$(this).css({
						'background-color': 'rgba(0,0,0,0)',
						cursor: 'pointer'
					});
				});
				self.arrowRight.click(function(){
					if (!self.onmove) self.move(false);
				}).mouseover(function(){
          self.stop();
					$(this).css({
						'background-color': 'rgba(0,0,0,0.3)',
						cursor: 'pointer'
					});
				}).mouseout(function(){
          self.run();
					$(this).css({
						'background-color': 'rgba(0,0,0,0)',
						cursor: 'pointer'
					});
				});
			}
		},

		run: function () {
			var self = this;
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				self.move(self.options.dir);
			},self.options.delay);

		},
		stop: function () {
			clearInterval(this.timer);
		},

		move: function(e) {
			if (e) this.next();
			else this.prev();
		},

		next: function (){
			var self = this;
			self.onmove = true;
			if (self.current >= self.slides.length-1){

				self.slides.eq(0).css({left:self.options.width+'px','z-index':self.slides.length-1});
				self.slides.eq(0).stop(true, true).animate({left:0},self.options.speed);

				self.slides.eq(self.current).stop(true, true).animate({left:-self.options.width+'px','z-index':self.slides.length},self.options.speed,function(){
					self.current = 0;
					self.onmove = false;
				});


			} else{

				self.slides.eq(self.current+1).css({left:self.options.width+'px','z-index':self.slides.length-1});
				self.slides.eq(self.current+1).stop(true, true).animate({left:0},self.options.speed);

				self.slides.eq(self.current).stop(true, true).animate({left:-self.options.width+'px','z-index':self.slides.length},self.options.speed,function(){
					self.current++;
					self.onmove = false;
				});
			}

		},
		prev: function() {
			var self = this;
			self.onmove = true;
			if (self.current === 0 ){
				// self.current = self.slides.length;
				self.slides.eq(self.slides.length-1).css({
					left:-self.options.width+'px',
					'z-index':self.slides.length-1
				});
				self.slides.eq(self.slides.length-1).stop(true, true).animate({left:0},self.options.speed);

				self.slides.eq(0).stop(true, true).animate({left:self.options.width+'px','z-index':self.slides.length},self.options.speed,function(){
					self.current = self.slides.length-1;
					self.onmove = false;
				});


			} else{
				//self.current--;
				self.slides.eq(self.current-1).css({
					left:-self.options.width+'px',
					'z-index': self.slides.length-1
				});
				self.slides.eq(self.current-1).stop(true, true).animate({left:0},self.options.speed);

				self.slides.eq(self.current).stop(true, true).animate({left:self.options.width+'px','z-index':self.slides.length},self.options.speed,function(){
					self.current--;
					self.onmove = false;
				});
			}

		}

	};

	MagicSlider.init = function (id, options) {
		this.id = id;
		this.options = options;
		this.current = 0;
		this.timer = null;
		this.wrapper = null;
		this.inner = null;
		this.slides = null;
		this.onmove = false;
		this.arrowLeft = null;
		this.arrowRight = null;
	};

	MagicSlider.init.prototype = MagicSlider.prototype;

	window.MagicSlider = window._MS = MagicSlider;





})(window, jQuery);
