var contentLoaded = 0;

$('html,body').animate({scrollTop:0},100);

$('*').addClass('disable_scroll');

function loading_finished()
{
	$(window).scrollTop(0);
	$('html,body').animate({scrollTop:0},100);

	$('.preload').each(function(){
		if(($(this).attr('id')=="custom_navbar")||($(this).attr('id')=="outer_text_header"))
		{
			//not removing now
		}
		else
		{
			$(this).removeClass('preload');
		}
		
	});

	var snap_loader = Snap('#loading_screen');

	var transformPercentage = 1;
	timer= setInterval(function(){
			
			snap_loader.select('#background').attr({style:"transform:translate(-"+transformPercentage+"%,0%);"});
			$('#outer_container').css("transform","translate("+(100-transformPercentage)+"%,0%);");	
			transformPercentage += 1;
			if(transformPercentage>100)
			{
				clearInterval(timer);
				$('body').attr("style","background-color:black;");
				$('html,body').animate({scrollTop:0},100);
				
				setTimeout(function(){
					movement = 31;
					
					cartimer= setInterval(function(){
						snap_loader.select('#car').attr({style:"transition-duration:5;transform:translate("+movement+"%,0%);"});
						movement += 0.5;
						if(movement>220)
						{
							$('#loader').hide();
							$('#outer_text_header').removeClass('preload');
							$('#custom_navbar').removeClass('preload');
							clearInterval(cartimer);
							$('*').removeClass('disable_scroll');
						}
					},2);	
				},1500);
			}
		},5);
}

var snap_loader;

function loading_percent()
{
	
	var n_percent = parseInt((contentLoaded/9)*100);
	var c_percent = parseInt($('#percent').html());
	
	function inc_percent() {
		setTimeout(function () {
			c_percent = parseInt($('#percent').html());
			if(n_percent>c_percent && n_percent<=100) {
				c_percent++;
				$('#percent').html(c_percent);
				snap_loader.select('#car').attr({style:"transition-duration:5;transform:translate("+((-129)+(c_percent*1.6))+"%,0%);"});
				if(c_percent < 100) {
					inc_percent();
				} else {
					$('#loadingLabel').hide();					
					loading_finished();
				}
			}
		},100);
	}
	inc_percent();
}

var outer_theatre = document.getElementById('outer_theatre');
var counter = document.getElementById('counter');
var corridor = document.getElementById('corridor');
var inner_theatre = document.getElementById('inner_theatre');
var loader_screen = document.getElementById('loading_screen');

outer_theatre.addEventListener('load', function (){
	contentLoaded++;
	loading_percent();
});
counter.addEventListener('load', function (){
	contentLoaded++;
	loading_percent();
});
corridor.addEventListener('load', function (){
	contentLoaded++;
	loading_percent();
});
inner_theatre.addEventListener('load', function (){
	contentLoaded++;
	loading_percent();
});

window.addEventListener('load', function (){
	contentLoaded++;
	loading_percent();
});

loader_screen.addEventListener('load', function (){
	contentLoaded++;
	$('.preload').css("display","block");
	snap_loader = Snap('#loading_screen');
	loading_percent();
});

var genre_data; //this will contain the object of all the data of that genre 


function genre_events(data_id)
{
	
	$('.allGenres_row').hide(400);
	setTimeout(function(){
		$('#genre_logo').attr("data","assets/inner_theatre_elements/"+data_id+".svg");
		$('#event_background_logo').attr("data","assets/inner_theatre_elements/"+data_id+".svg");
		$('#genre').show(400);
	},400);

	var genre_name;
	if(data_id=='humorfest') genre_name = 'Humor Fest'
	else genre_name = data_id.charAt(0).toUpperCase() + data_id.slice(1);
	
	genre_data = data['message'][genre_name];
	var number_of_events = genre_data.length;
	if(number_of_events>9)
	{
		console.log('The maximum number of events per genre set by the developer was 9, to change this feature contact @bajadunga');
	}
	else if(number_of_events%2==0)
	{
		var temp = [4,6,2,8,1,9,3,7]; //@bajadunga or @boga for logic
		for(i=0;i<number_of_events;i++)
		{
			$('#event_'+temp[i]).html(genre_data[i]['event']);
			$('#event_'+temp[i]).attr("data-id",i);
		}
	}
	else
	{
		var temp = [5,4,6,2,8,1,9,3,7]; //@bajadunga or @boga for logic
		for(i=0;i<number_of_events;i++)
		{
			$('#event_'+temp[i]).html(genre_data[i]['event']);
			$('#event_'+temp[i]).attr("data-id",i);
		}
	}
}

function event_data(event_index)
{
	var event_object = genre_data[event_index];
	
	$('#event_title').html(event_object['event']);
	$('#event_tagline').html(event_object['tagline']);
	$('#event_writeup').html(event_object['writeup']);

	var registration_status = parseInt(event_object['event_status']);

	if(registration_status == 1)
	{
		$('#register').show();
		$('#registration_closed').hide();
	}
	else
	{
		$('#register').hide();
		$('#registration_closed').show();
	}

	var rules = event_object['rules'];
	var ruleString="";
	$.each(rules,function(index,val){
		if(index.toLowerCase() != "general")
		{
			ruleString += "<p>"+index+":</p>";
		}
		ruleString += "<ul>";
		$.each(val,function(i,rule)
		{
			ruleString += "<li>"+(i+1)+". "+rule+"</li>";
		});
		ruleString += "</ul>";
	});
	$('#rules').html(ruleString);

	$('#genre').hide(400);
	setTimeout(function(){
		$('#event').show(400);
	},400);
}




window.onload = function () 
{
	ion.sound({
	    sounds: [
	        {
	            name: "back_music",
	            preload: true,
	            loop: true
	        }
	    ],

	    path: "",
	    preload: true,
	    multiplay: false,
	    volume: 0.2,

	    scope: this, // optional scope
	});

	$('#mute').click(function () {
		$('#mute').hide();
		$('#unmute').show();
		ion.sound.play('back_music');
	});
	$('#unmute').click(function () {
		$('#mute').show();
		$('#unmute').hide();
		ion.sound.stop('back_music');
	});

	function show_modal(id) {
		$('.custom_modal').each(function () {
			$(this).addClass('fadeOut');
		});
		$('.custom_modal').each(function () {
			if($(this).attr('data-id') == id) {
				$(this).removeClass('fadeOut');
				$(this).show();
			}
		});
	}

	// Navbar animations
	$('.modal_close').click(function () {
		$('.custom_modal').each(function () {
			$(this).addClass('fadeOut');
			$(this).fadeOut(1000);
		});
	});

	$('#custom_navbar').click(function () {
		$('#custom_navbar').css('background-color','#091114');
		$('#nav_tabs_grp').show();
	});

	$('.nav-tab').click(function () {
		$('.modal_close').click();
		var id = $(this).attr('data-id');
		if(id=="home") {
			$('html, body').animate({
		        scrollTop: 0
		    }, 3000);
		}
		if(id=="events") {
			$('html, body').animate({
		        scrollTop: (4000 + 2*$('#outer_container').height() + 2000*0.204)
		    }, 2000);
		}
		if(id=="pronites") {
			if($(window).scrollTop() > 2900 && $(window).scrollTop() < 3700) {
		    	var time = 500;
		    } else {
		    	var time = 2500;
		    }
			$('html, body').animate({
		        scrollTop: (2000 + $('#outer_container').height() + 2000*0.264)
		    }, 2000);
		    setTimeout(function () {
		    	show_modal(id);
		    },time);
		}
		if(id=="faq") {
			if($(window).scrollTop() > 2900 && $(window).scrollTop() < 3700) {
		    	var time = 500;
		    } else {
		    	var time = 2500;
		    }
			$('html, body').animate({
		        scrollTop: 3300
		    }, 2000);
		    setTimeout(function () {
		    	show_modal(id);
		    },time);
		}
		if(id=="testimonials") {
			if($(window).scrollTop() > 2900 && $(window).scrollTop() < 3700) {
		    	var time = 500;
		    } else {
		    	var time = 2500;
		    }
			$('html, body').animate({
		        scrollTop: 3300
		    }, 2000);
		    setTimeout(function () {
		    	show_modal(id);
		    },time);
		}
	});

	//Start loading SVGs of genre
	$('.genre_box').each( function(elem,i){
		var data_id = $(this).attr('data-id');
		$('#genre_logo').attr("data","assets/inner_theatre_elements/"+data_id+".svg");
	}); 

	//Object ids of the scenes
	var outer_theatre = document.getElementById('outer_theatre');
	var counter = document.getElementById('counter');
	var corridor = document.getElementById('corridor');
	var inner_theatre = document.getElementById('inner_theatre');
	

	//Parameter used for checking the loading conditions
	var outer_theatre_load = false;
	var counter_load = false;
	var corridor_load = false;
	var inner_theatre_load = false;
	

	//Snap Object of all the scenes
	var snap_outer_theatre;
	var snap_counter;
	var snap_corridor;
	var snap_inner_theatre;

	//Initiating Scroll Magic
	var controller = new ScrollMagic.Controller();

	/*----------------------Outer Theatre Animations-------------------------*/

	//Non scroll animations

	outer_theatre.addEventListener('load', function () {
		snap_outer_theatre = Snap('#outer_theatre');
		outer_theatre_load = true;

		
		var svg_wrapper = '#wrapper';
		var moon = '#Moon';
		var clouds = ['#XMLID_5208_', '#XMLID_5207_'];
		var central_building = '#central_building';
		var buildings = ['#XMLID_5585_','#XMLID_5343_', '#XMLID_5248_', '#XMLID_1977_', '#XMLID_2780_'];
		var building_min_max = [[5606,5713],[5377,5581],[5253,5333],[2008,2627]];
		var street_light = ['#XMLID_13_','#XMLID_903_']
		var b_lights_top = [1911,1827];
		var b_lights_right = [1571,1738];
		var b_lights_bottom = [1740,1825];
		var b_lights_left = [1569,1559];

			
		snap_outer_theatre.select(moon).attr({
			transform: "translate(0, 100)"
		});

		snap_outer_theatre.select(outer_theatre_wrapper).animate({
			opacity:1
		},100);

		function animate_moon() {
			snap_outer_theatre.select(moon).animate({
				transform: "translate(0, -50)"
			},10000);
		}
			
		function animate_clouds_1() {
			snap_outer_theatre.select(clouds[0]).animate({
				transform: "translate(-25,0)"
			},5000);
		}

		function animate_clouds_2() {
			snap_outer_theatre.select(clouds[1]).animate({
				transform: "translate(0,-10)"
			},5000);
		}

		// var b1 = 0;

		function animate_building_lights(i,b1) {
			setTimeout(function () {
				snap_outer_theatre.select('#XMLID_'+(b1+building_min_max[i][0])+'_').removeClass('st203').removeClass('st202');
				b1++;
				if(snap_outer_theatre.select('#XMLID_'+(b1+building_min_max[i][0])+'_').attr('x') > 0) {
					if(Math.random() > 0.5) {
						snap_outer_theatre.select('#XMLID_'+(b1+building_min_max[i][0])+'_').animate({fill:'#FFD762'},4000);
					} else {
						snap_outer_theatre.select('#XMLID_'+(b1+building_min_max[i][0])+'_').animate({fill:'#1C3D5F'},4000);
					}
					// if(b1%2 == 0) {
					// 	snap_outer_theatre.select('#XMLID_'+(b1+building_min_max[i][0])+'_').animate({fill:'#ffffff'},100);
					// }
				}
				if((b1+building_min_max[i][0])<=building_min_max[i][1]) {
					animate_building_lights(i, b1);
				} else {
					b1 = 0;
					animate_building_lights(i,b1);
				}
			},500);
		}

		// var b2 = 108;
		function animate_building_lights_rev(i,b2) {
			setTimeout(function () {
				// console.log(b2+'_'+i);
				snap_outer_theatre.select('#XMLID_'+(b2+building_min_max[i][0])+'_').removeClass('st203').removeClass('st202');
				b2--;
				if(snap_outer_theatre.select('#XMLID_'+(b2+building_min_max[i][0])+'_').attr('x') > 0) {
					if(Math.random() > 0.5) {
						snap_outer_theatre.select('#XMLID_'+(b2+building_min_max[i][0])+'_').animate({fill:'#FFD762'},200);
					} else {
						snap_outer_theatre.select('#XMLID_'+(b2+building_min_max[i][0])+'_').animate({fill:'#1C3D5F'},200);
					}
					// if(b2%2 == 0) {
					// 	snap_outer_theatre.select('#XMLID_'+(b2+building_min_max[0][0])+'_').animate({fill:'#ffffff'},100);
					// }
				}
				if(b2>0) {
					animate_building_lights_rev(i,b2);
				} else {
					b2 = 108;
					animate_building_lights_rev(i,b2);
				}
			},500);
		}

		var c1 = b_lights_top[0];
		function board_lights_top() {
			setTimeout(function () {
				snap_outer_theatre.select('#XMLID_'+c1+'_').removeClass('st203').animate({fill:'white'},600);
				if(c1!= b_lights_top) {
					snap_outer_theatre.select('#XMLID_'+(c1 - 2)+'_').removeClass('st203').animate({fill:'#FFD762'},400);
				}
				if(c1>b_lights_top[1]) {
					board_lights_top();
				}
				c1-=2;
			},500);
		}

		l1 = 2;
		function animate_street_light() {
			setTimeout(function () {
				if((l1%2) == 0) {
					snap_outer_theatre.select(street_light[0]).animate({opacity:1},3000).animate({opacity:0.5},1000);
				} else {
					snap_outer_theatre.select(street_light[1]).animate({opacity:1},3000).animate({opacity:0.5},1000);
				}
				l1++;
				animate_street_light();
			},5000);
		}
			
		animate_moon();
		animate_clouds_1();
		animate_clouds_2();
		animate_building_lights(0,0);
		animate_building_lights_rev(0,108);
		animate_building_lights(2,0);
		animate_building_lights_rev(2,81);
		animate_building_lights(1,0);
		animate_building_lights_rev(1,306);
		animate_street_light();
		// board_lights_top();

		snap_outer_theatre.select(svg_wrapper).mousemove(function(event) {
	        var x = event.pageX;
	        var y = event.pageY;
	        var win_height = $(window).height();
			var win_width = $(window).width();
	        var r_pos = (win_width/2) - x;

	    	snap_outer_theatre.select(moon).attr({
	    		transform: "translate("+(-r_pos*0.001)+", -50)"
	    	});
	    	snap_outer_theatre.select(clouds[0]).attr({
	    		transform: "translate("+(-25+r_pos*0.002)+", 0)"
	    	});
	    	snap_outer_theatre.select(clouds[1]).attr({
	    		transform: "translate("+(-r_pos*0.002)+", -10)"
	    	});
	    	snap_outer_theatre.select(buildings[0]).attr({
	    		transform: "translate("+(-r_pos*0.001)+", 0)"
	    	});
	    	snap_outer_theatre.select(buildings[1]).attr({
	    		transform: "translate("+(r_pos*0.001)+", 0)"
	    	});
	    	snap_outer_theatre.select(buildings[2]).attr({
	    		transform: "translate("+(-r_pos*0.001)+", 0)"
	    	});
	    	snap_outer_theatre.select(buildings[3]).attr({
	    		transform: "translate("+(-r_pos*0.001)+", 0)"
	    	});
	    	snap_outer_theatre.select(buildings[4]).attr({
	    		transform: "translate("+(r_pos*0.002)+", 0)"
	    	});
	    	snap_outer_theatre.select(central_building).attr({
	    		transform: "translate("+(r_pos*0.001)+", 0)"
	    	});
	    });

	    // To hide active navbar on click outside navbar --rty
	    snap_outer_theatre.select(svg_wrapper).click(function () {
	    	$('#nav_tabs_grp').fadeOut();
			$('#custom_navbar').css('background-color','');
	    });
	});

	//On Scroll Animations

	var outerDoorR = "#door_2_";
	var outerDoorL = "#doorcopy_1_";
	var outer_theatre_wrapper = '#wrapper';
	
	var outer_ht = parseInt($('#outer_container').css('height'));

	var scroll_dir1;
	var outer_theatre_scene = new ScrollMagic.Scene({triggerElement: '#outer_container', duration:2000, offset:(outer_ht/2 -36)})
		.setPin('#outer_container')
		.addTo(controller)
		.addIndicators()
		.on("update", function (e) {
			$("#scrollDirection").text(e.target.controller().info("scrollDirection"));
			scroll_dir1 = e.target.controller().info("scrollDirection");
		})
		.on("enter leave", function (e) {
			$("#state").text(e.type == "enter" ? "inside" : "outside");
			if(e.type == 'enter') {
				$('#unmute').hide();
				$('#mute').hide();
				ion.sound.stop('back_music');
			}
		})
		.on("start end", function (e) {
			$("#lastHit").text(e.type == "start" ? "top" : "bottom");
		})
		.on("progress", function (e) {
			$("#progress").text(e.progress.toFixed(3));
			
			var progress = parseFloat(e.progress.toFixed(3));
			if(outer_theatre_load == true)
			{
				if(progress > 0.1) {
					$('#outer_text_header').fadeOut(500);
				}
				if(progress < 0.1) {
					$('#outer_text_header').show();
				}
				if(progress < 0.5) {
				var scale = 1+(0.75*progress);
				$('#outer_container').css("transform-origin","62% 48%");
				$('#outer_container').css('transform','scale('+scale+')');
				}

				if(progress<0.6)
				{
					snap_outer_theatre.select(outer_theatre_wrapper).animate({
						opacity:1
					},100);
					snap_outer_theatre.select(outerDoorL).attr({style:"transform-origin:left; transform:rotateY(0deg)"});
					snap_outer_theatre.select(outerDoorR).attr({style:"transform-origin:right; transform:rotateY(0deg)"});
				}

				if(progress > 0.6) {
					var angle = (progress-0.6)*225; // to make it 90 in the end
					var opac = 1 - (progress-0.6)*2.5;
					snap_outer_theatre.select(outerDoorL).attr({style:"transform-origin:left; transform:rotateY("+angle+"deg)"});
					snap_outer_theatre.select(outerDoorR).attr({style:"transform-origin:right; transform:rotateY("+angle+"deg)"});
					snap_outer_theatre.select(outer_theatre_wrapper).animate({
						opacity:opac
					},100);
				}
				if(progress >= 1 && scroll_dir1 == 'FORWARD') {
			    	scroll_dir2 = 'REVERSE';
			    	$('html, body').animate({
			    		 scrollTop: (2000 + $('#outer_container').height() + 2000*0.264)
			    	},1000);
				}
			}
		});

	/*---------------------------------------------------------------------------------*/

	/*------------------------Counter Screen Animations--------------------------------*/
	
	//Non scroll animations

	counter.addEventListener('load', function() {

		snap_counter = Snap('#counter');
		counter_load = true;
		
		var svg_wrapper = '#counter_wrapper';
		var corridor = '#Corridor';
		var chairs = '#XMLID_366_';
		var table = '#Counter';
		var banners = '#Top_Banners';
		var events = '#Events';
		var login = '#Monitor_2';
		var register = '#Monitor_1';
		var faq = '#Register';
		var events = '#Events';
		var table_posters = ['#contact_us', '#pronites', '#sponsors'];
		var front_lights = ['#XMLID_170_', "#XMLID_171_", "#XMLID_172_", '#XMLID_168_','#XMLID_167_', '#XMLID_2_'];

		//Initially keeping it black
		snap_counter.select(svg_wrapper).animate({
				opacity:0
			},100);

		snap_counter.select('#contact_us').attr({
			cursor:'pointer'
		});
		snap_counter.select('#contact_us').click(function () {
			alert('new_window');
		});
		snap_counter.select('#pronites').attr({
			cursor:'pointer'
		});
		snap_counter.select('#pronites').click(function () {
			show_modal('pronites');
		});
		snap_counter.select('#sponsors').attr({
			cursor:'pointer'
		});
		snap_counter.select('#sponsors').click(function () {
			alert('new_window');
		});
		snap_counter.select(login).attr({
			cursor:'pointer'
		});
		snap_counter.select(login).click(function () {
			alert('new_window');
		});
		snap_counter.select(register).attr({
			cursor:'pointer'
		});
		snap_counter.select(register).click(function () {
			alert('new_window');
			alert($(window).scrollTop());
		});
		snap_counter.select(faq).attr({
			cursor:'pointer'
		});
		snap_counter.select(faq).click(function () {
			show_modal('faq');
		});
		snap_counter.select(events).attr({
			cursor:'pointer'
		});
		snap_counter.select(events).click(function () {
			//
		});
			
		var i = 0;
		function animate_front_lights() {
			setTimeout(function () {
				snap_counter.select(front_lights[i]).animate({opacity:0.2},1000);//.animate({opacity:0.15},100);
				i++;
				if(i<front_lights.length) {
					animate_front_lights();
				}
			},200);
		}

		var j=0;
		function animate_table_posters() {
			setTimeout(function () {
				snap_counter.select(table_posters[j]).animate({opacity:1}, 10000);
				j++;
				if(j<table_posters.length) {
					animate_table_posters();
				}
			},200);
		}

		var c_flag = false; 
		$(window).scroll(function () { 
		    //You've scrolled this much:
		    if($(window).scrollTop() > 2900 && $(window).scrollTop() <3100 && c_flag == false) {
		    	c_flag = true;
		    	animate_front_lights();
		    	animate_table_posters();
		    }
		});
		snap_counter.select(svg_wrapper).mousemove(function(event) {
	        var x = event.pageX;
	        var y = event.pageY;
	        var win_height = $(window).height();
			var win_width = $(window).width();
	        var r_pos = (win_width/2) - x;
	    	// console.log(x + '  '+ y);
	    	// console.log(r_pos);
	    	snap_counter.select(chairs).attr({
	    		transform: "translate("+(-r_pos*0.005)+", 0)"
	    	});
	    	snap_counter.select(table).attr({
	    		transform: "translate("+(r_pos*0.001)+", 0)"
	    	});
	    	snap_counter.select(banners).attr({
	    		transform: "translate("+(r_pos*0.001)+", 0)"
	    	});
	    	snap_counter.select(corridor).attr({
	    		transform: "translate("+(-r_pos*0.002)+", 0)"
	    	});

	    });

		// To hide active navbar on click outside navbar --rty
		snap_counter.select(svg_wrapper).click(function () {
	    	$('#nav_tabs_grp').fadeOut();
			$('#custom_navbar').css('background-color','');
	    });

	    snap_counter.select(events).click(function () {
	    	$('html, body').animate({
	    		scrollTop: (4000 + 2*$('#outer_container').height() + 2000*0.204)
	    	},1000);
	    });
	});

	//On Scroll animations

	var counter_wrapper = '#counter_wrapper';
	var counter_ht = parseInt($('#counter_container').css('height'));

	// var music_flag = false;
	var scroll_dir2;
	var counter_scene = new ScrollMagic.Scene({triggerElement: "#counter_container", duration:2000,offset:(outer_ht/2 -36)})
			.setPin('#counter_container')
			.addTo(controller)
			// .addIndicators() // add indicators (requires plugin)
			.on("update", function (e) {
				$("#scrollDirection").text(e.target.controller().info("scrollDirection"));
				scroll_dir2 = e.target.controller().info("scrollDirection");
				console.log(scroll_dir2);
			})
			.on("enter leave", function (e) {
				$("#state").text(e.type == "enter" ? "inside" : "outside");
				if(e.type == 'enter') {
					$('#unmute').show();
					ion.sound.play('back_music');
				}
			})
			.on("start end", function (e) {
				$("#lastHit").text(e.type == "start" ? "top" : "bottom");
			})
			.on("progress", function (e) {
				$("#progress").text(e.progress.toFixed(3));
				
				var progress = parseFloat(e.progress.toFixed(3));

				if(counter_load == true)
				{
					if(progress<0.2)
					{
						snap_counter.select(counter_wrapper).animate({
							opacity:progress*5
						},100);
					}
					else if(progress>0.7)
					{
						snap_counter.select(counter_wrapper).animate({
							opacity:(1-progress)*3.33
						},100);
					}
					else
					{
						snap_counter.select(counter_wrapper).animate({
							opacity:1
						},100);
					}
					if(progress < 0.5) {
						var scale = 1+(0.1*(progress-0.2));
						$('#counter_container').css('transform','scale('+scale+')');
					}
					if(progress > 0.5) {
						var scale = 1.79*(progress - 0.51) + 1.029;
						var left = -1030.23*(progress-0.51);
						$('#counter_container').css('left', left).css('transform','scale('+scale+')');
					}

					if(progress >= 1 && scroll_dir2 == 'FORWARD') {
						scroll_dir2 = 'REVERSE';
						console.log(scroll_dir2);
						$('html, body').animate({
				    		scrollTop: (4000 + 2*$('#outer_container').height() + 2000*0.204)
				    	},1000);
					}
				}
			});

	/*---------------------------------------------------------------------------------*/

	/*----------------------Corridor Animations----------------------------------------*/

	//Non Scroll Animations

	corridor.addEventListener('load', function() {

		snap_corridor = Snap('#corridor');
		corridor_load = true;

		var svg_wrapper = '#corridor_wrapper';
		var stop = false;
		var poster1 = {img:".st40",light:".st38"};  // Dance
		var poster2 = {img:".st42",light:".st41"};  // Dramatics
		var poster3 = {img:".st44",light:".st43"};  // Music
		var poster4 = {img:".st46",light:".st45"};  // HumorFest
		var poster5 = {img:".st48",light:".st47"};	// FilmFest			

		var poster6 = {img:".st57",light:".st56"};  // Literary
		var poster7 = {img:".st59",light:".st58"};  // Quiz
		var poster8 = {img:".st61",light:".st60"};  // FineArts
		var poster9 = {img:".st63",light:".st62"};  // Social
		var poster10 = {img:".st65",light:".st64"};	// Informals	

		var posters = [poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10];
		var p_type = ['dance', 'dramatics', 'music', 'humorfest', 'photography', 'literary', 'quiz', 'finearts', 'social', 'informals'];
		var ceiling = "#Ceiling";
		var floor	= "#Floor";
		var front_wall = "#Front_wall";
		var left_wall  = "#Left_wall";
		var right_wall = "#Right_wall";

		function move_to_theatre() {
			$('html, body').animate({
				scrollTop: (6000+ (3*$('#outer_container').height()) + 2000*0.64)
			},2000);
		}

		
		// To hide active navbar on click outside navbar --rty
		snap_corridor.select(svg_wrapper).click(function () {
	    	$('#nav_tabs_grp').fadeOut();
			$('#custom_navbar').css('background-color','');
	    });


		for(var i=0; i<posters.length;i++) {
			snap_corridor.select(posters[i]['img']).attr({cursor:'pointer'})
		}
		//Initially keeping it black
		snap_corridor.select(svg_wrapper).animate({
				opacity:0
			},100);
		
		snap_corridor.select(poster1['img']).click(function () {
			genre_events('dance');
			move_to_theatre();
		});
		snap_corridor.select(poster2['img']).click(function () {
			genre_events('dramatics');
			move_to_theatre();
		});
		snap_corridor.select(poster3['img']).click(function () {
			genre_events('music');
			move_to_theatre();
		});
		snap_corridor.select(poster4['img']).click(function () {
			genre_events('humorfest');
			move_to_theatre();
		});
		snap_corridor.select(poster5['img']).click(function () {
			genre_events('photography');
			move_to_theatre();
		});
		snap_corridor.select(poster6['img']).click(function () {
			genre_events('literary');
			move_to_theatre();
		});
		snap_corridor.select(poster7['img']).click(function () {
			genre_events('quiz');
			move_to_theatre();
		});
		snap_corridor.select(poster8['img']).click(function () {
			genre_events('finearts');
			move_to_theatre();
		});
		snap_corridor.select(poster9['img']).click(function () {
			genre_events('social');
			move_to_theatre();
		});
		snap_corridor.select(poster10['img']).click(function () {
			genre_events('informals');
			move_to_theatre();
		});
		
	});

	

	//On Scroll Animations

	var corridor_wrapper = '#corridor_wrapper';

	var scroll_dir3;
	var corridor_ht = parseInt($('#corridor_container').css('height'));
	var corridor_scene = new ScrollMagic.Scene({triggerElement: "#corridor_container", duration:2000,offset:(outer_ht/2 -36)})
			.setPin('#corridor_container')
			.addTo(controller)
			// .addIndicators()
			.on("update", function (e) {
				$("#scrollDirection").text(e.target.controller().info("scrollDirection"));
				scroll_dir3 = e.target.controller().info("scrollDirection");
			})
			.on("enter leave", function (e) {
				$("#state").text(e.type == "enter" ? "inside" : "outside");
				if(e.type == 'enter') {
					ion.sound.volume({volume: 0.2});
				}
				if(e.type == 'leave') {
					ion.sound.volume({volume: 0.2});
				}
			})
			.on("start end", function (e) {
				$("#lastHit").text(e.type == "start" ? "top" : "bottom");
			})
			.on("progress", function (e) {
				$("#progress").text(e.progress.toFixed(3));
				
				var progress = parseFloat(e.progress.toFixed(3));

				if(corridor_load == true)
				{
					if(progress<0.2)
					{
						snap_corridor.select(corridor_wrapper).animate({
							opacity:progress*4
						},100);
						$("#corridor").css("transform","scale(1)");
					}
					else if(progress>0.8)
					{
						snap_corridor.select(corridor_wrapper).animate({
							opacity:(1-progress)*5
						},100);
					}
					else
					{
						snap_corridor.select(corridor_wrapper).animate({
							opacity:0.8
						},100);

						var scale = 2*((progress/0.6)-0.34) + 1; //equation came by keeping ankits range same but in my limits (contact @bajadunga)
						
						$("#corridor").css("transform","scale("+scale+")");
					}

					if(progress>0.4)
					{
						var angle = 150*(progress-0.4);
						snap_corridor.select("#door1").attr({style:"transform:rotateY("+angle+"deg)"});
						snap_corridor.select("#door2").attr({style:"transform:rotateY("+angle+"deg)"});	
					}
					else
					{
						snap_corridor.select("#door1").attr({style:"transform:rotateY(0deg)"});
						snap_corridor.select("#door2").attr({style:"transform:rotateY(0deg)"});	
					}

					if(progress >=1 && scroll_dir3 == 'FORWARD') {
						scroll_dir3 = 'REVERSE';
						console.log(scroll_dir3);
						$('html, body').animate({
				    		scrollTop: (6000+ (3*$('#outer_container').height()) + 2000*0.64)
				    	},1000);
					}			

				}
			});


	/*---------------------------------------------------------------------------------*/

	/*----------------------Inner Theatre Animations-----------------------------------*/

	//Non Scroll Animations

	inner_theatre.addEventListener('load', function() {

		snap_inner_theatre = Snap('#inner_theatre');
		inner_theatre_load = true;

		var svg_wrapper = '#inner_theatre_wrapper';

		//Initially keeping it black
		snap_inner_theatre.select(svg_wrapper).animate({
				opacity:0
			},100);

		
		//hiding the screen
		snap_inner_theatre.select('#SCREEN_1_').animate({
				opacity:0
			},100);
		$('.allGenres_row').css("opacity",0);

		//getting size of screen and position
		var screen_data = snap_inner_theatre.select('#SCREEN_1_').getBBox();


		$('.theatre_screen').css('height',(screen_data.height/1366)*($('#inner_theatre').width())+2);
		$('.theatre_screen').css('width',(screen_data.width/768)*($('#inner_theatre').height())+1);
		$('.theatre_screen').css('left',(screen_data.x/1366)*($('#inner_theatre').width())-2);
		$('.theatre_screen').css('top',(screen_data.y/768)*($('#inner_theatre').height()));

		initial_screen_top = (screen_data.y/768)*($('#inner_theatre').height());


		//On Screen Animations

		$('.genre_box').click(function()
		{
			genre_events($(this).attr('data-id'));
		});

		$('.events').click(function()
		{
			event_data($(this).attr('data-id'));
		});

		$("#genre_close").click(function()
		{
			$('#genre').hide(400);
			setTimeout(function(){
				$('#genre_logo').attr("data","");
				$('#event_background_logo').attr("data","");
				$(".events").attr("data-id","");
				$(".events").html("");
				$('.allGenres_row').show(400)
			},300);
		});

		$("#event_close").click(function()
		{
			$('#event').hide(400);
			setTimeout(function(){
				$('#genre').show(400);
			},300);
		});

		$('#event_wrapper').hover(function () 
		{
			$('*').addClass('disable_scroll');
			$('#event_wrapper').removeClass('disable_scroll');
		}, function () 
		{
			$('*').removeClass('disable_scroll');
		});
		
		snap_inner_theatre.select('#back').attr({cursor:'pointer'});
		snap_inner_theatre.select('#back').click(function () {
			$('html, body').animate({
				scrollTop: (4000 + 2*$('#outer_container').height() + 2000*0.204)
			},1000);
		});
		snap_inner_theatre.select('#exit').attr({cursor:'pointer'});
		snap_inner_theatre.select('#exit').click(function () {
			$('html, body').animate({
				scrollTop: 0
			},2000);
		});


		// To hide active navbar on click outside navbar --rty
		snap_inner_theatre.select(inner_theatre_wrapper).click(function () {
	    	$('#nav_tabs_grp').fadeOut();
			$('#custom_navbar').css('background-color','');
	    });

	});
	//On Scroll Animations

	var inner_theatre_wrapper = '#inner_theatre_wrapper';

	var theatre_ht = parseInt($('#theatre_container').css('height'));

	var inner_theatre_scene = new ScrollMagic.Scene({triggerElement: '#theatre_container', duration:2000, offset:(outer_ht/2 -36)})
			.setPin('#theatre_container')
			.addTo(controller)
			// .addIndicators()
			.on("update", function (e) {
				$("#scrollDirection").text(e.target.controller().info("scrollDirection"));
			})
			.on("enter leave", function (e) {
				$("#state").text(e.type == "enter" ? "inside" : "outside");
			})
			.on("start end", function (e) {
				$("#lastHit").text(e.type == "start" ? "top" : "bottom");
			})
			.on("progress", function (e) {
				$("#progress").text(e.progress.toFixed(3));
				
				var progress = parseFloat(e.progress.toFixed(3));

				if(inner_theatre_load == true)
				{
					if(progress<0.1)
					{
						snap_inner_theatre.select(inner_theatre_wrapper).animate({
							opacity:progress*5.5 //So that the final opacity is 0.55
						},100);
						$('.allGenres_row').css("opacity",progress*5.5);
						$('#genre').css("opacity",progress*5.5);
						$('#event').css("opacity",progress*5.5);
					}
					else
					{
						snap_inner_theatre.select(inner_theatre_wrapper).animate({
							opacity:0.55
						},100);
						snap_inner_theatre.select('#back').animate({
							opacity:1
						},500);
						snap_inner_theatre.select('#exit').animate({
							opacity:1
						},500);
						$('#genre').css("opacity",1);
						$('.allGenres_row').css("opacity",1);
						$('#event').css("opacity",1);
					}

					if(progress>0.2)
					{
						if(progress>0.65)
						{
							$('#inner_theatre').css('transform','scale(2.2)');
							var new_top = (1-(2.2-1)/5.5)*initial_screen_top;
							$('.theatre_screen').css('transform','scale(2.2)');
							$('.theatre_screen').css('top',new_top);
						}
						else
						{
							var scale = 1+(2*(progress-0.2));
							$('#inner_theatre').css('transform','scale('+scale+')');

							var new_top = (1-(scale-1)/5.5)*initial_screen_top;
							$('.theatre_screen').css('transform','scale('+scale+')');
							$('.theatre_screen').css('top',new_top);
						}
					}
					else
					{
						$('#inner_theatre').css('transform','scale(1)');
						var new_top = (1-(1-1)/5.5)*initial_screen_top;
						$('.theatre_screen').css('transform','scale(1)');
						$('.theatre_screen').css('top',new_top);
					}
					if(progress >=0.93) {
						// scroll_dir3 = 'REVERSE';
						// console.log(scroll_dir3);
						$('html, body').animate({
				    		scrollTop: (6000+ (3*$('#outer_container').height()) + 2000*0.93)
				    	},50);
					}	
				}
			});


	/*---------------------------------------------------------------------------------*/				
}