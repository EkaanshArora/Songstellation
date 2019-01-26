/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var epJS = function(tag_id, params){
  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');
  
  /* particles.js variables with default values */
  this.epJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        bubble:{
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse:{
          distance: 200,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
      mouse:{}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var epJS = this.epJS;
  
  /* params settings */
  if(params){
    Object.deepExtend(epJS, params);
  }

  epJS.tmp.obj = {
    size_value: epJS.particles.size.value,
    size_anim_speed: epJS.particles.size.anim.speed,
    move_speed: epJS.particles.move.speed,
    line_linked_distance: epJS.particles.line_linked.distance,
    line_linked_width: epJS.particles.line_linked.width,
    mode_grab_distance: epJS.interactivity.modes.grab.distance,
    mode_bubble_distance: epJS.interactivity.modes.bubble.distance,
    mode_bubble_size: epJS.interactivity.modes.bubble.size,
    mode_repulse_distance: epJS.interactivity.modes.repulse.distance
  };


  epJS.fn.retinaInit = function(){

    if(epJS.retina_detect && window.devicePixelRatio > 1){
      epJS.canvas.pxratio = window.devicePixelRatio; 
      epJS.tmp.retina = true;
    } 
    else{
      epJS.canvas.pxratio = 1;
      epJS.tmp.retina = false;
    }

    epJS.canvas.w = epJS.canvas.el.offsetWidth * epJS.canvas.pxratio;
    epJS.canvas.h = epJS.canvas.el.offsetHeight * epJS.canvas.pxratio;

    epJS.particles.size.value = epJS.tmp.obj.size_value * epJS.canvas.pxratio;
    epJS.particles.size.anim.speed = epJS.tmp.obj.size_anim_speed * epJS.canvas.pxratio;
    epJS.particles.move.speed = epJS.tmp.obj.move_speed * epJS.canvas.pxratio;
    epJS.particles.line_linked.distance = epJS.tmp.obj.line_linked_distance * epJS.canvas.pxratio;
    epJS.interactivity.modes.grab.distance = epJS.tmp.obj.mode_grab_distance * epJS.canvas.pxratio;
    epJS.interactivity.modes.bubble.distance = epJS.tmp.obj.mode_bubble_distance * epJS.canvas.pxratio;
    epJS.particles.line_linked.width = epJS.tmp.obj.line_linked_width * epJS.canvas.pxratio;
    epJS.interactivity.modes.bubble.size = epJS.tmp.obj.mode_bubble_size * epJS.canvas.pxratio;
    epJS.interactivity.modes.repulse.distance = epJS.tmp.obj.mode_repulse_distance * epJS.canvas.pxratio;

  };



  /* ---------- epJS functions - canvas ------------ */

  epJS.fn.canvasInit = function(){
    epJS.canvas.ctx = epJS.canvas.el.getContext('2d');
  };

  epJS.fn.canvasSize = function(){

    epJS.canvas.el.width = epJS.canvas.w;
    epJS.canvas.el.height = epJS.canvas.h;

    if(epJS && epJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          epJS.canvas.w = epJS.canvas.el.offsetWidth;
          epJS.canvas.h = epJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(epJS.tmp.retina){
            epJS.canvas.w *= epJS.canvas.pxratio;
            epJS.canvas.h *= epJS.canvas.pxratio;
          }

          epJS.canvas.el.width = epJS.canvas.w;
          epJS.canvas.el.height = epJS.canvas.h;

          /* repaint canvas on anim disabled */
          if(!epJS.particles.move.enable){
            epJS.fn.particlesEmpty();
            epJS.fn.particlesCreate();
            epJS.fn.particlesDraw();
            epJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        epJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  epJS.fn.canvasPaint = function(){
    epJS.canvas.ctx.fillRect(0, 0, epJS.canvas.w, epJS.canvas.h);
  };

  epJS.fn.canvasClear = function(){
    epJS.canvas.ctx.clearRect(0, 0, epJS.canvas.w, epJS.canvas.h);
  };


  /* --------- epJS functions - particles ----------- */

  epJS.fn.particle = function(color, opacity, position){

    /* size */
    this.radius = (epJS.particles.size.random ? Math.random() : 1) * epJS.particles.size.value;
    if(epJS.particles.size.anim.enable){
      this.size_status = false;
      this.vs = epJS.particles.size.anim.speed / 100;
      if(!epJS.particles.size.anim.sync){
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * epJS.canvas.w;
    this.y = position ? position.y : Math.random() * epJS.canvas.h;

    /* check position  - into the canvas */
    if(this.x > epJS.canvas.w - this.radius*2 - canvasPadding) this.x = this.x - this.radius - canvasPadding;
    else if(this.x < this.radius*2 + canvasPadding) this.x = this.x + this.radius+canvasPadding;
    if(this.y > epJS.canvas.h - this.radius*2 - canvasPadding) this.y = this.y - this.radius-canvasPadding;
    else if(this.y < this.radius*2 + canvasPadding) this.y = this.y + this.radius+canvasPadding;

    /* check position - avoid overlap */
    if(epJS.particles.move.bounce){
      epJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if(typeof(color.value) == 'object'){

      if(color.value instanceof Array){
        var color_selected = color.value[Math.floor(Math.random() * epJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      }else{
        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if(color.value == 'random'){
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if(typeof(color.value) == 'string'){
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (epJS.particles.opacity.random ? Math.random() : 1) * epJS.particles.opacity.value;
    if(epJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = epJS.particles.opacity.anim.speed / 100;
      if(!epJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {}
    switch(epJS.particles.move.direction){
      case 'top':
        velbase = { x:0, y:-1 };
      break;
      case 'top-right':
        velbase = { x:0.5, y:-0.5 };
      break;
      case 'right':
        velbase = { x:1, y:-0 };
      break;
      case 'bottom-right':
        velbase = { x:0.5, y:0.5 };
      break;
      case 'bottom':
        velbase = { x:0, y:1 };
      break;
      case 'bottom-left':
        velbase = { x:-0.5, y:1 };
      break;
      case 'left':
        velbase = { x:-1, y:0 };
      break;
      case 'top-left':
        velbase = { x:-0.5, y:-0.5 };
      break;
      default:
        velbase = { x:0, y:0 };
      break;
    }

    if(epJS.particles.move.straight){
      this.vx = velbase.x;
      this.vy = velbase.y;
      if(epJS.particles.move.random){
        this.vx = this.vx * (Math.random());
        this.vy = this.vy * (Math.random());
      }
    }else{
      this.vx = velbase.x + Math.random()-0.5;
      this.vy = velbase.y + Math.random()-0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    

    /* if shape is image */

    var shape_type = epJS.particles.shape.type;
    if(typeof(shape_type) == 'object'){
      if(shape_type instanceof Array){
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    }else{
      this.shape = shape_type;
    }

    if(this.shape == 'image'){
      var sh = epJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }
      if(!this.img.ratio) this.img.ratio = 1;
      if(epJS.tmp.img_type == 'svg' && epJS.tmp.source_svg != undefined){
        epJS.fn.vendors.createSvgImg(this);
        if(epJS.tmp.pushing){
          this.img.loaded = false;
        }
      }
    }

    

  };


  epJS.fn.particle.prototype.draw = function() {

    var p = this;
    if(p.radius_bubble != undefined){
      var radius = p.radius_bubble; 
    }else{
      var radius = p.radius;
    }

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
    }

    epJS.canvas.ctx.fillStyle = color_value;
    epJS.canvas.ctx.beginPath();
    switch(p.shape){

      case 'circle':
        epJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        epJS.canvas.ctx.font = trackFontSize;
        epJS.canvas.ctx.fillStyle = "white";
        epJS.canvas.ctx.textAlign = "center";
        epJS.canvas.ctx.shadowBlur = 0;
        epJS.canvas.ctx.fillText(titleArray[p.index].replace(/ *\([^)]*\) */g, ""), p.x, p.y + 35);
      break;

      case 'edge':
        epJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2);
      break;

      case 'triangle':
        epJS.fn.vendors.drawShape(epJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2);
      break;

      case 'polygon':
        epJS.fn.vendors.drawShape(
          epJS.canvas.ctx,
          p.x - radius / (epJS.particles.shape.polygon.nb_sides/3.5), // startX
          p.y - radius / (2.66/3.5), // startY
          radius*2.66 / (epJS.particles.shape.polygon.nb_sides/3), // sideLength
          epJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
      break;

      case 'star':
        epJS.fn.vendors.drawShape(
          epJS.canvas.ctx,
          p.x - radius*2 / (epJS.particles.shape.polygon.nb_sides/4), // startX
          p.y - radius / (2*2.66/3.5), // startY
          radius*2*2.66 / (epJS.particles.shape.polygon.nb_sides/3), // sideLength
          epJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
      break;

      case 'image':

        function draw(){
          epJS.canvas.ctx.drawImage(
            img_obj,
            p.x-radius,
            p.y-radius,
            radius*2,
            radius*2 / p.img.ratio
          );
        }

        if(epJS.tmp.img_type == 'svg'){
          var img_obj = p.img.obj;
        }else{
          var img_obj = epJS.tmp.img_obj;
        }

        if(img_obj){
          draw();
        }

      break;

    }

    epJS.canvas.ctx.closePath();

    if(epJS.particles.shape.stroke.width > 0){
      epJS.canvas.ctx.strokeStyle = epJS.particles.shape.stroke.color;
      epJS.canvas.ctx.lineWidth = epJS.particles.shape.stroke.width;
      epJS.canvas.ctx.stroke();
    }
    
    epJS.canvas.ctx.fill();
    
  };


  epJS.fn.particlesCreate = function(){
    for(var i = 0; i < epJS.particles.number.value; i++) {
      epJS.particles.array.push(new epJS.fn.particle(epJS.particles.color, epJS.particles.opacity.value));
    }
  };

  epJS.fn.particlesUpdate = function(){

    for(var i = 0; i < epJS.particles.array.length; i++){

      /* the particle */
      var p = epJS.particles.array[i];
      p.index=i;
      // var d = ( dx = epJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = epJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if(epJS.particles.move.enable){
        var ms = epJS.particles.move.speed/2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if(epJS.particles.opacity.anim.enable) {
        if(p.opacity_status == true) {
          if(p.opacity >= epJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        }else {
          if(p.opacity <= epJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if(p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if(epJS.particles.size.anim.enable){
        if(p.size_status == true){
          if(p.radius >= epJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        }else{
          if(p.radius <= epJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if(p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if(epJS.particles.move.out_mode == 'bounce'){
        var new_pos = {
          x_left: p.radius,
          x_right:  epJS.canvas.w,
          y_top: p.radius,
          y_bottom: epJS.canvas.h
        }
      }else{
        var new_pos = {
          x_left: -p.radius,
          x_right: epJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: epJS.canvas.h + p.radius
        }
      }

      if(p.x - p.radius > epJS.canvas.w){
        p.x = new_pos.x_left;
        p.y = Math.random() * epJS.canvas.h;
      }
      else if(p.x + p.radius < 0){
        p.x = new_pos.x_right;
        p.y = Math.random() * epJS.canvas.h;
      }
      if(p.y - p.radius > epJS.canvas.h){
        p.y = new_pos.y_top;
        p.x = Math.random() * epJS.canvas.w;
      }
      else if(p.y + p.radius < 0){
        p.y = new_pos.y_bottom;
        p.x = Math.random() * epJS.canvas.w;
      }

      /* out of canvas modes + canvasPadding */
      switch(epJS.particles.move.out_mode){
        case 'bounce':
          if (p.x + p.radius + canvasPadding > epJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius - canvasPadding < 0) p.vx = -p.vx;
          if (p.y + p.radius + canvasPadding > epJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius - canvasPadding < 0) p.vy = -p.vy;
        break;
      }

      /* events */
      if(isInArray('grab', epJS.interactivity.events.onhover.mode)){
        epJS.fn.modes.grabParticle(p);
      }

      if(isInArray('bubble', epJS.interactivity.events.onhover.mode) || isInArray('bubble', epJS.interactivity.events.onclick.mode)){
        epJS.fn.modes.bubbleParticle(p);
      }

      if(isInArray('repulse', epJS.interactivity.events.onhover.mode) || isInArray('repulse', epJS.interactivity.events.onclick.mode)){
        epJS.fn.modes.repulseParticle(p);
      }
      
      /* interaction auto between particles */
      if(epJS.particles.line_linked.enable || epJS.particles.move.attract.enable){
        for(var j = i + 1; j < epJS.particles.array.length; j++){
          var p2 = epJS.particles.array[j];

          /* link particles */
          if(epJS.particles.line_linked.enable){
            epJS.fn.interact.linkParticles(p,p2);
          }

          /* attract particles */
          if(epJS.particles.move.attract.enable){
            epJS.fn.interact.attractParticles(p,p2);
          }

          /* bounce particles */
          if(epJS.particles.move.bounce){
            epJS.fn.interact.bounceParticles(p,p2);
          }

        }
      }
    }

  };

  epJS.fn.particlesDraw = function(){

    /* clear canvas */
    epJS.canvas.ctx.clearRect(0, 0, epJS.canvas.w, epJS.canvas.h);

    /* update each particles param */
    epJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < epJS.particles.array.length; i++){
      var p = epJS.particles.array[i];
      p.draw();
    }

  };

  epJS.fn.particlesEmpty = function(){
    epJS.particles.array = [];
  };

  epJS.fn.particlesRefresh = function(){

    /* init all */
    cancelRequestAnimFrame(epJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(epJS.fn.drawAnimFrame);
    epJS.tmp.source_svg = undefined;
    epJS.tmp.img_obj = undefined;
    epJS.tmp.count_svg = 0;
    epJS.fn.particlesEmpty();
    epJS.fn.canvasClear();
    
    /* restart */
    epJS.fn.vendors.start();

  };


  /* ---------- epJS functions - particles interaction ------------ */

  epJS.fn.interact.linkParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if(dist <= epJS.particles.line_linked.distance){

      var opacity_line = epJS.particles.line_linked.opacity - (dist / (1/epJS.particles.line_linked.opacity)) / epJS.particles.line_linked.distance;

      if(opacity_line > 0){        
        
        /* style */
        var color_line = epJS.particles.line_linked.color_rgb_line;
        epJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
        epJS.canvas.ctx.lineWidth = epJS.particles.line_linked.width;
        //epJS.canvas.ctx.lineCap = 'round'; /* performance issue */
        
        /* path */
        epJS.canvas.ctx.beginPath();
        epJS.canvas.ctx.moveTo(p1.x, p1.y);
        epJS.canvas.ctx.lineTo(p2.x, p2.y);
        epJS.canvas.ctx.stroke();
        epJS.canvas.ctx.closePath();

      }

    }

  };


  epJS.fn.interact.attractParticles  = function(p1, p2){

    /* condensed particles */
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    if(dist <= epJS.particles.line_linked.distance){

      var ax = dx/(epJS.particles.move.attract.rotateX*1000),
          ay = dy/(epJS.particles.move.attract.rotateY*1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;

    }
    

  }


  epJS.fn.interact.bounceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy),
        dist_p = p1.radius+p2.radius;

    if(dist <= dist_p){
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }


  /* ---------- epJS functions - modes events ------------ edit me for width canvas when changing text */

  epJS.fn.modes.pushParticles = function(nb, pos){

    epJS.tmp.pushing = true;

    for(var i = 0; i < nb; i++){
      epJS.particles.array.push(
        new epJS.fn.particle(
          epJS.particles.color,
          epJS.particles.opacity.value,
          {
            'x': pos ? pos.pos_x : Math.random() * epJS.canvas.w,
            'y': pos ? pos.pos_y : Math.random() * epJS.canvas.h
          }
        )
      )
      if(i == nb-1){
        if(!epJS.particles.move.enable){
          epJS.fn.particlesDraw();
        }
        epJS.tmp.pushing = false;
      }
    }

  };


  epJS.fn.modes.removeParticles = function(nb){

    epJS.particles.array.splice(0, nb);
    if(!epJS.particles.move.enable){
      epJS.fn.particlesDraw();
    }

  };


  epJS.fn.modes.bubbleParticle = function(p){

    /* on hover event */
    if(epJS.interactivity.events.onhover.enable && isInArray('bubble', epJS.interactivity.events.onhover.mode)){

      var dx_mouse = p.x - epJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - epJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
          ratio = 1 - dist_mouse / epJS.interactivity.modes.bubble.distance;

      function init(){
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if(dist_mouse <= epJS.interactivity.modes.bubble.distance){

        if(ratio >= 0 && epJS.interactivity.status == 'mousemove'){
          var rectw=epJS.canvas.ctx.measureText(artistArray[p.index].replace(/ *\([^)]*\) */g, "")).width;
          var recth=epJS.canvas.ctx.measureText('M').width;
          epJS.canvas.ctx.font = trackFontSize;
          epJS.canvas.ctx.fillRect(p.x-rectw/2-10, p.y-recth-30, rectw+20, recth+20);
          epJS.canvas.ctx.fillStyle = "black";
          epJS.canvas.ctx.shadowBlur = 0;
          epJS.canvas.ctx.fillText(artistArray[p.index].replace(/ *\([^)]*\) */g, ""),p.x, p.y-20);
          p.vx=0;
          p.vy=0;
        }

      }else{
        init();
      }

      /* mouseleave */
      if(epJS.interactivity.status == 'mouseleave'){
        init();
        p.vx=p.vx_i;
        p.vy=p.vy_i
      }
    }

    /* on click event */
    else if(epJS.interactivity.events.onclick.enable && isInArray('bubble', epJS.interactivity.events.onclick.mode)){


      if(epJS.tmp.bubble_clicking){
        var dx_mouse = p.x - epJS.interactivity.mouse.click_pos_x,
            dy_mouse = p.y - epJS.interactivity.mouse.click_pos_y,
            dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
            time_spent = (new Date().getTime() - epJS.interactivity.mouse.click_time)/1000;

        if(time_spent > epJS.interactivity.modes.bubble.duration){
          epJS.tmp.bubble_duration_end = true;
        }

        if(time_spent > epJS.interactivity.modes.bubble.duration*2){
          epJS.tmp.bubble_clicking = false;
          epJS.tmp.bubble_duration_end = false;
        }
      }


      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id){

        if(bubble_param != particles_param){

          if(!epJS.tmp.bubble_duration_end){
            if(dist_mouse <= epJS.interactivity.modes.bubble.distance){
              if(p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if(obj != bubble_param){
                var value = p_obj - (time_spent * (p_obj - bubble_param) / epJS.interactivity.modes.bubble.duration);
                if(id == 'size') p.radius_bubble = value;
                if(id == 'opacity') p.opacity_bubble = value;
              }
            }else{
              if(id == 'size') p.radius_bubble = undefined;
              if(id == 'opacity') p.opacity_bubble = undefined;
            }
          }else{
            if(p_obj_bubble != undefined){
              var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / epJS.interactivity.modes.bubble.duration),
                  dif = bubble_param - value_tmp;
                  value = bubble_param + dif;
              if(id == 'size') p.radius_bubble = value;
              if(id == 'opacity') p.opacity_bubble = value;
            }
          }

        }

      }

      if(epJS.tmp.bubble_clicking){
        /* size */
        process(epJS.interactivity.modes.bubble.size, epJS.particles.size.value, p.radius_bubble, p.radius, 'size');
        /* opacity */
        process(epJS.interactivity.modes.bubble.opacity, epJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
      }

    }

  };


  epJS.fn.modes.repulseParticle = function(p){

    if(epJS.interactivity.events.onhover.enable && isInArray('repulse', epJS.interactivity.events.onhover.mode) && epJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - epJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - epJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      var normVec = {x: dx_mouse/dist_mouse, y: dy_mouse/dist_mouse},
          repulseRadius = epJS.interactivity.modes.repulse.distance,
          velocity = 100,
          repulseFactor = clamp((1/repulseRadius)*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity, 0, 50);
      
      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      }

      if(epJS.particles.move.out_mode == 'bounce'){
        if(pos.x - p.radius > 0 && pos.x + p.radius < epJS.canvas.w) p.x = pos.x;
        if(pos.y - p.radius > 0 && pos.y + p.radius < epJS.canvas.h) p.y = pos.y;
      }else{
        p.x = pos.x;
        p.y = pos.y;
      }
    
    }


    else if(epJS.interactivity.events.onclick.enable && isInArray('repulse', epJS.interactivity.events.onclick.mode)) {

      if(!epJS.tmp.repulse_finish){
        epJS.tmp.repulse_count++;
        if(epJS.tmp.repulse_count == epJS.particles.array.length){
          epJS.tmp.repulse_finish = true;
        }
      }

      if(epJS.tmp.repulse_clicking){

        var repulseRadius = Math.pow(epJS.interactivity.modes.repulse.distance/6, 3);

        var dx = epJS.interactivity.mouse.click_pos_x - p.x,
            dy = epJS.interactivity.mouse.click_pos_y - p.y,
            d = dx*dx + dy*dy;

        var force = -repulseRadius / d * 1;

        function process(){

          var f = Math.atan2(dy,dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if(epJS.particles.move.out_mode == 'bounce'){
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            }
            if (pos.x + p.radius > epJS.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > epJS.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }

        }

        // default
        if(d <= repulseRadius){
          process();
        }

        // bang - slow motion mode
        // if(!epJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }
        

      }else{

        if(epJS.tmp.repulse_clicking == false){

          p.vx = p.vx_i;
          p.vy = p.vy_i;
        
        }

      }

    }

  }
  
  
  epJS.fn.modes.grabParticle = function(p){

    if(epJS.interactivity.events.onhover.enable && epJS.interactivity.status == 'mousemove'){

      var dx_mouse = p.x - epJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - epJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if(dist_mouse <= epJS.interactivity.modes.grab.distance){

        var opacity_line = epJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1/epJS.interactivity.modes.grab.line_linked.opacity)) / epJS.interactivity.modes.grab.distance;

        if(opacity_line > 0){

          /* style */
          var color_line = epJS.particles.line_linked.color_rgb_line;
          epJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
          epJS.canvas.ctx.lineWidth = epJS.particles.line_linked.width;
          //epJS.canvas.ctx.lineCap = 'round'; /* performance issue */
          
          /* path */
          epJS.canvas.ctx.beginPath();
          epJS.canvas.ctx.moveTo(p.x, p.y);
          epJS.canvas.ctx.lineTo(epJS.interactivity.mouse.pos_x, epJS.interactivity.mouse.pos_y);
          epJS.canvas.ctx.stroke();
          epJS.canvas.ctx.closePath();

        }

      }

    }

  };



  /* ---------- epJS functions - vendors ------------ */

  epJS.fn.vendors.eventsListeners = function(){

    /* events target element */
    if(epJS.interactivity.detect_on == 'window'){
      epJS.interactivity.el = window;
    }else{
      epJS.interactivity.el = epJS.canvas.el;
    }


    /* detect mouse pos - on hover / click event */
    if(epJS.interactivity.events.onhover.enable || epJS.interactivity.events.onclick.enable){

      /* el on mousemove */
      epJS.interactivity.el.addEventListener('mousemove', function(e){

        if(epJS.interactivity.el == window){
          var pos_x = e.clientX,
              pos_y = e.clientY;
        }
        else{
          var pos_x = e.offsetX || e.clientX,
              pos_y = e.offsetY || e.clientY;
        }

        epJS.interactivity.mouse.pos_x = pos_x;
        epJS.interactivity.mouse.pos_y = pos_y;

        if(epJS.tmp.retina){
          epJS.interactivity.mouse.pos_x *= epJS.canvas.pxratio;
          epJS.interactivity.mouse.pos_y *= epJS.canvas.pxratio;
        }

        epJS.interactivity.status = 'mousemove';

      });

      /* el on onmouseleave */
      epJS.interactivity.el.addEventListener('mouseleave', function(e){

        epJS.interactivity.mouse.pos_x = null;
        epJS.interactivity.mouse.pos_y = null;
        epJS.interactivity.status = 'mouseleave';

      });

    }

    /* on click event */
    if(epJS.interactivity.events.onclick.enable){

      epJS.interactivity.el.addEventListener('click', function(){

        epJS.interactivity.mouse.click_pos_x = epJS.interactivity.mouse.pos_x;
        epJS.interactivity.mouse.click_pos_y = epJS.interactivity.mouse.pos_y;
        epJS.interactivity.mouse.click_time = new Date().getTime();

        if(epJS.interactivity.events.onclick.enable){

          switch(epJS.interactivity.events.onclick.mode){

            case 'push':
              if(epJS.particles.move.enable){
                epJS.fn.modes.pushParticles(epJS.interactivity.modes.push.particles_nb, epJS.interactivity.mouse);
              }else{
                if(epJS.interactivity.modes.push.particles_nb == 1){
                  epJS.fn.modes.pushParticles(epJS.interactivity.modes.push.particles_nb, epJS.interactivity.mouse);
                }
                else if(epJS.interactivity.modes.push.particles_nb > 1){
                  epJS.fn.modes.pushParticles(epJS.interactivity.modes.push.particles_nb);
                }
              }
            break;

            case 'remove':
              epJS.fn.modes.removeParticles(epJS.interactivity.modes.remove.particles_nb);
            break;

            case 'bubble':
              epJS.tmp.bubble_clicking = true;
            break;

            case 'repulse':
              epJS.tmp.repulse_clicking = true;
              epJS.tmp.repulse_count = 0;
              epJS.tmp.repulse_finish = false;
              setTimeout(function(){
                epJS.tmp.repulse_clicking = false;
              }, epJS.interactivity.modes.repulse.duration*1000)
            break;

          }

        }

      });
        
    }


  };

  epJS.fn.vendors.densityAutoParticles = function(){

    if(epJS.particles.number.density.enable){

      /* calc area */
      var area = epJS.canvas.el.width * epJS.canvas.el.height / 1000;
      if(epJS.tmp.retina){
        area = area/(epJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * epJS.particles.number.value / epJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = epJS.particles.array.length - nb_particles;
      if(missing_particles < 0) epJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else epJS.fn.modes.removeParticles(missing_particles);

    }

  };


  epJS.fn.vendors.checkOverlap = function(p1, position){
    for(var i = 0; i < epJS.particles.array.length; i++){
      var p2 = epJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx*dx + dy*dy);

      if(dist <= p1.radius + p2.radius){
        p1.x = position ? position.x : Math.random() * epJS.canvas.w;
        p1.y = position ? position.y : Math.random() * epJS.canvas.h;
        epJS.fn.vendors.checkOverlap(p1);
      }
    }
  };


  epJS.fn.vendors.createSvgImg = function(p){

    /* set color to svg element */
    var svgXml = epJS.tmp.source_svg,
        rgbHex = /#([0-9A-F]{3,6})/gi,
        coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
          if(p.color.rgb){
            var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+p.opacity+')';
          }else{
            var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+p.opacity+')';
          }
          return color_value;
        });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {type: 'image/svg+xml;charset=utf-8'}),
        DOMURL = window.URL || window.webkitURL || window,
        url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener('load', function(){
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      epJS.tmp.count_svg++;
    });
    img.src = url;

  };


  epJS.fn.vendors.destroyepJS = function(){
    cancelAnimationFrame(epJS.fn.drawAnimFrame);
    canvas_el.remove();
    epJSDom = null;
  };


  epJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator){

    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0,0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength,0);
      c.translate(sideLength,0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();

  };

  epJS.fn.vendors.exportImg = function(){
    window.open(epJS.canvas.el.toDataURL('image/png'), '_blank');
  };


  epJS.fn.vendors.loadImg = function(type){

    epJS.tmp.img_error = undefined;

    if(epJS.particles.shape.image.src != ''){

      if(type == 'svg'){

        var xhr = new XMLHttpRequest();
        xhr.open('GET', epJS.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              epJS.tmp.source_svg = data.currentTarget.response;
              epJS.fn.vendors.checkBeforeDraw();
            }else{
              console.log('Error epJS - Image not found');
              epJS.tmp.img_error = true;
            }
          }
        }
        xhr.send();

      }else{

        var img = new Image();
        img.addEventListener('load', function(){
          epJS.tmp.img_obj = img;
          epJS.fn.vendors.checkBeforeDraw();
        });
        img.src = epJS.particles.shape.image.src;

      }

    }else{
      console.log('Error epJS - No image.src');
      epJS.tmp.img_error = true;
    }

  };


  epJS.fn.vendors.draw = function(){

    if(epJS.particles.shape.type == 'image'){

      if(epJS.tmp.img_type == 'svg'){

        if(epJS.tmp.count_svg >= epJS.particles.number.value){
          epJS.fn.particlesDraw();
          if(!epJS.particles.move.enable) cancelRequestAnimFrame(epJS.fn.drawAnimFrame);
          else epJS.fn.drawAnimFrame = requestAnimFrame(epJS.fn.vendors.draw);
        }else{
          //console.log('still loading...');
          if(!epJS.tmp.img_error) epJS.fn.drawAnimFrame = requestAnimFrame(epJS.fn.vendors.draw);
        }

      }else{

        if(epJS.tmp.img_obj != undefined){
          epJS.fn.particlesDraw();
          if(!epJS.particles.move.enable) cancelRequestAnimFrame(epJS.fn.drawAnimFrame);
          else epJS.fn.drawAnimFrame = requestAnimFrame(epJS.fn.vendors.draw);
        }else{
          if(!epJS.tmp.img_error) epJS.fn.drawAnimFrame = requestAnimFrame(epJS.fn.vendors.draw);
        }

      }

    }else{
      epJS.fn.particlesDraw();
      if(!epJS.particles.move.enable) cancelRequestAnimFrame(epJS.fn.drawAnimFrame);
      else epJS.fn.drawAnimFrame = requestAnimFrame(epJS.fn.vendors.draw);
    }

  };


  epJS.fn.vendors.checkBeforeDraw = function(){

    // if shape is image
    if(epJS.particles.shape.type == 'image'){

      if(epJS.tmp.img_type == 'svg' && epJS.tmp.source_svg == undefined){
        epJS.tmp.checkAnimFrame = requestAnimFrame(check);
      }else{
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(epJS.tmp.checkAnimFrame);
        if(!epJS.tmp.img_error){
          epJS.fn.vendors.init();
          epJS.fn.vendors.draw();
        }
        
      }

    }else{
      epJS.fn.vendors.init();
      epJS.fn.vendors.draw();
    }

  };


  epJS.fn.vendors.init = function(){

    /* init canvas + particles */
    epJS.fn.retinaInit();
    epJS.fn.canvasInit();
    epJS.fn.canvasSize();
    epJS.fn.canvasPaint();
    epJS.fn.particlesCreate();
    epJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    epJS.particles.line_linked.color_rgb_line = hexToRgb(epJS.particles.line_linked.color);

  };


  epJS.fn.vendors.start = function(){

    if(isInArray('image', epJS.particles.shape.type)){
      epJS.tmp.img_type = epJS.particles.shape.image.src.substr(epJS.particles.shape.image.src.length - 3);
      epJS.fn.vendors.loadImg(epJS.tmp.img_type);
    }else{
      epJS.fn.vendors.checkBeforeDraw();
    }

  };




  /* ---------- epJS - start ------------ */


  epJS.fn.vendors.eventsListeners();

  epJS.fn.vendors.start();
  


};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.epJSDom = [];
window.particlesJSedit = function(tag_id, params){

  //console.log(params);
  
  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* epJS elements */
  var epJS_tag = document.getElementById(tag_id),
      epJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = epJS_tag.getElementsByClassName(epJS_canvas_class);

  /* remove canvas if exists into the epJS target tag */
  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      epJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = epJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    epJSDom.push(new epJS(tag_id, params));
  }

};

window.particlesJSedit.load = function(tag_id, path_config_json, callback){

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJSedit(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error epJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error epJS - File config not found');
      }
    }
  };
  xhr.send();
};