define(["jquery", "app/functions"], ($, functions) => {
	var exports = {};

	// Adds all necessary front-end listeners
	exports.add_listeners = (router, Plotly, math, Materialize) => {

		// Default route is designed to introduce all the necessary details
		router.addRouteListener("def", (toState, fromState) => {
			var main = $("main");
			main.empty();
			$("#configuration").css({
				"cursor": "pointer",
				"color": "white"
			});
			$("#configuration").parent().removeClass("active");
			$("#home").on("click", function(event) {
				event.preventDefault();
			}).css({
				"cursor": "inherit",
				"color": "#EDCF40"
			});
			$("#home").parent().addClass("active");
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$(".indicator").hide();
				$.get("/client/cases.html").done(function(cases) {
					main.append(cases);
					$("select").material_select();
					Materialize.updateTextFields();
					functions.handle_links(router);
					functions.messageHandler(0);
					MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
				});
			});
		});

		// This route is meant to simply be a collector of initial conditions
		router.addRouteListener("config", (toState, fromState) => {
			var main = $("main");
			main.empty();
			$("#home").css({
				"cursor": "pointer",
				"color": "white"
			});
			$("#home").parent().removeClass("active");
			$("#configuration").on("click", function(event) {
				event.preventDefault();
			}).css({
				"cursor": "inherit",
				"color": "#EDCF40"
			});
			$("#configuration").parent().addClass("active");
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$(".indicator").hide();
				$.get("/client/ellipse.html").done(function(table) {
					main.append(table);
					$.get("/client/main.html").done(function(primary) {
						main.append(primary);
						$("select").material_select();
						Materialize.updateTextFields();
						functions.handle_links(router);
						functions.messageHandler(0);
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					});
				});
			});
		});

		// This route displays the preset examples
		router.addRouteListener("example", (toState, fromState) => {
			var num = parseInt(toState.params.num),
				main = $("main");
			main.empty();
			$("#home").css({
				"cursor": "pointer",
				"color": "white"
			});
			$("#home").parent().removeClass("active");
			$("#configuration").css({
				"cursor": "pointer",
				"color": "white"
			});
			$("#configuration").parent().removeClass("active");
			$("#home").parent().removeClass("active");
			$("#home").parent().removeClass("active");
			$(".indicator").show();
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$.get("/client/example.html").done(function(result) {
					main.append(result);
					functions.messageHandler(0);
					$("#intro > table > tbody > tr").hide();
					var str = "All of the following visualizations are associated" +
						" to the scenario where:",
						info = $("<div>").addClass("latex_equation"),
						a = 0, b = 0, B1 = 0, B2 = 0, v1 = 0, v_2 = 0, ang = 0;
					if(num == 1) {
						a = "1"; b = "1"; B1 = "0"; B2 = "1";
						v1 = "-1"; v2 = "-1"; ang = "40";
					}
					else if(num == 2) {
						a = "1"; b = "1"; B1 = "-2"; B2 = "0";
						v1 = "-1"; v2 = "-1"; ang = "80";
					}
					else if(num == 3) {
						a = "1"; b = "1"; B1 = "1.5"; B2 = "\\infty";
						v1 = "-1"; v2 = "-1"; ang = "80";
					}
					else if(num == 4) {
						a = "1"; b = "1"; B1 = "3"; B2 = "0.5";
						v1 = "-1"; v2 = "0"; ang = "0";
					}
					else if(num == 5) {
						a = "1"; b = "1"; B1 = "\\infty"; B2 = "0.5";
						v1 = "-1"; v2 = "1"; ang = "70";
					}
					else if(num == 6) {
						a = "1"; b = "1"; B1 = "1"; B2 = "0";
						v1 = "-1"; v2 = "-1"; ang = "70";
					}
					else if(num == 7) {
						a = "2"; b = "1"; B1 = "0"; B2 = "\\infty";
						v1 = "-1"; v2 = "2"; ang = "160";
					}
					else if(num == 8) {
						a = "2"; b = "1"; B1 = "1"; B2 = "\\infty";
						v1 = "-1"; v2 = "3"; ang = "140";
					}
					else if(num == 9) {
						a = "3"; b = "1"; B1 = "\\infty"; B2 = "-1";
						v1 = "-1"; v2 = "1"; ang = "70";
					}
					else if(num == 10) {
						a = "3"; b = "1"; B1 = "-4"; B2 = "0";
						v1 = "-1"; v2 = "1"; ang = "90";
					}
					info.append("$a = " + a + ", \\hspace{.3cm} b = " + b +
							", \\hspace{.3cm} B_1 = " + B1 + ", \\hspace{.3cm} B_2 = " + B2 +
							", \\hspace{.3cm} \\mathbf{\\dot{x}}_{1}(0) = " + v1 +
							", \\hspace{.3cm} \\mathbf{\\dot{x}}_{2}(0) = " + v2 +
							", \\hspace{.3cm} \\text{and} \\hspace{.3cm} \\theta = " +
							ang + "^\\circ$");
					$("#fill").append(str, info);
					for(var i = 1; i < 7; i++) {
						var prepare = "/client/img/example" + num + "/example" +
							num + "-" + i + ".png",
							image = $("<img>").attr("src", prepare).css({
								"border-bottom-left-radius": "15px",
								"border-bottom-right-radius": "15px"
							});
						var temp = "";
						if(i == 1) { temp = "15 Iterations"; }
						else if(i == 2) { temp = "25 Iterations"; }
						else if(i == 3) { temp = "50 Iterations"; }
						else if(i == 4) { temp = "75 Iterations"; }
						else if(i == 5) { temp = "125 Iterations"; }
						else if(i == 6) { temp = "200 Iterations"; }
						var title = $("<div>").text(temp).css({
								"height": "50px",
								"background-color": "white",
								"border-bottom": "0.8mm solid black",
								"border-top-left-radius": "15px",
								"border-top-right-radius": "15px",
								"text-align": "center",
								"line-height": "45px",
								"font-size": "18px"
							});
							bdy = $("<div>").append(title, image).css({
								"width": "707px",
								"height": "807px",
								"background-color": "white",
								"border": "1mm solid black",
								"border-radius": "15px",
								"margin": "0 auto 40px auto"
							});
						main.append(bdy);
					}
					MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					functions.handle_links(router);
				});
			});
		});

		// This route takes in initial conditions and provides a visual of the trajectory
		router.addRouteListener("mod", (toState, fromState) => {
			var main = $("main");
			main.empty();
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$.get("/client/ellipse.html").done(function(table) {
					main.append(table);
					$.get("/client/main.html").done(function(result) {
						main.append(result);
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
						$(".indicator").hide();
						functions.messageHandler(1);
						$("#trajecPhoto").remove();
						var trajecPhoto = $("<div>").attr("id", "trajecPhoto").css({
								"display": "flex",
								"align-items": "center",
								"justify-content": "center"
							}),
							wrapper = $("<div>").addClass("preloader-wrapper big active"),
							spinner = $("<div>").addClass("spinner-layer spinner-red-only"),
							clipper1 = $("<div>").addClass("circle-clipper left").append(
								$("<div>").addClass("circle")),
							patch = $("<div>").addClass("gap-patch").append(
								$("<div>").addClass("circle")),
							clipper2 = $("<div>").addClass("circle-clipper right").append(
								$("<div>").addClass("circle"));
						spinner.append(clipper1, patch, clipper2);
						wrapper.append(spinner);
						trajecPhoto.append(wrapper);
						$("#Birk").remove();
						var birk = $("<div>").attr("id", "Birk").css({
								"display": "flex",
								"align-items": "center",
								"justify-content": "center"
							}),
							wrapper = $("<div>").addClass("preloader-wrapper big active"),
							spinner = $("<div>").addClass("spinner-layer spinner-red-only"),
							clipper1 = $("<div>").addClass("circle-clipper left").append(
								$("<div>").addClass("circle")),
							patch = $("<div>").addClass("gap-patch").append(
								$("<div>").addClass("circle")),
							clipper2 = $("<div>").addClass("circle-clipper right").append(
								$("<div>").addClass("circle"));
						spinner.append(clipper1, patch, clipper2);
						wrapper.append(spinner);
						birk.append(wrapper);
						$("main").append(birk);
						$("select").material_select();

						// Initial Conditions
						var innerMagneticField = 0,
							outerMagneticField = 0;

						toState.params.inner == "Inf" ? innerMagneticField = Infinity
							: innerMagneticField = parseFloat(toState.params.inner);
						toState.params.outer == "Inf" ? outerMagneticField = Infinity
							: outerMagneticField = parseFloat(toState.params.outer);

						var theta = math.bignumber(toState.params.theta) * (Math.PI / 180),
							phi = math.bignumber(toState.params.phi) * (Math.PI / 180),
							a = math.abs(parseFloat(toState.params.hor)),
							b = math.abs(parseFloat(toState.params.ver)),
							max = math.max(a,b),
							param = 0,
							steps = 0,
							stop = 0,
							iterX = [],
							iterY = [],
							arrBirkX = [],
							arrBirkY = [],
							coefficientList = [],
							check = 0,
							mass = 1,
							charge = -1,
							outerScaling = (charge * outerMagneticField) / mass,
							innerScaling = (charge * innerMagneticField) / mass;

						var point = {
							x: a * math.cos(theta),
							y: b * math.sin(theta),
							v_x: math.cos(phi),
							v_y: math.sin(phi)
						};

						var scaleFactor = .5;
						if(outerMagneticField != 0 && outerMagneticField != Infinity) {
							scaleFactor *= (5 / math.abs(outerMagneticField));
						}
						else if(outerMagneticField == Infinity) {
							scaleFactor = 1;
						}

						// Prefill the table with the current data
						$("#variable1").val(a);
						$("#variable2").val(b);
						if(innerMagneticField == Infinity) {
							$("#innerInf").attr("checked", true);
							$("#variable3").val(null);
						}
						else {
							$("#innerInf").attr("checked", false);
							$("#variable3").val(innerMagneticField);
						}
						if(outerMagneticField == Infinity) {
							$("#outerInf").attr("checked", true);
							$("#variable4").val(null);
						}
						else {
							$("#outerInf").attr("checked", false);
							$("#variable4").val(outerMagneticField);
						}
						$("#variable5").val(toState.params.theta);
						$("#variable6").val(toState.params.phi);
						$("#variable7").val(toState.params.iter);
						Materialize.updateTextFields();

						// Collecting Data

						// Add starting point
						iterX.push(point.x);
						iterY.push(point.y);

						var funcArclength = function(t) {
							return math.sqrt((math.pow(a, 2) * math.pow(math.cos(t), 2)) +
								(math.pow(b, 2) * math.pow(math.sin(t), 2)));
						};

						for(var i = 0; i < parseInt(toState.params.iter); i++) {
							// Inner Dynamics
							if(innerMagneticField != Infinity) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegion(check, a, b, math) == 1) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(innerMagneticField == 0) {
									point = functions.plotting(point, math, a, b,
										iterX, iterY, innerMagneticField,
										outerMagneticField, scaleFactor, 0);
								}
								else {
									point = functions.magneticPlotting(point, math, a, b,
										iterX, iterY, innerScaling, innerMagneticField,
										outerMagneticField, 0);
								}
							}

							// Outer Dynamics
							if(outerMagneticField != Infinity) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegion(check, a, b, math) == 0) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(outerMagneticField != 0) {
									point = functions.magneticPlotting(point, math, a, b,
										iterX, iterY, outerScaling, innerMagneticField,
										outerMagneticField, 1);
								}
								else {
									point = functions.plotting(point, math, a, b,
										iterX, iterY, innerMagneticField,
										outerMagneticField, scaleFactor, 1);
								}
								if(innerMagneticField != Infinity) {
									check = functions.evaluateTrajectoryStep(math.pow(10, -2),
										point.x, point.y, point.v_x, point.v_y);
									if(functions.checkRegion(check, a, b, math) == 1) {
										point.v_x *= -1;
										point.v_y *= -1;
									}
								}
							}

							phi = math.acos(point.x / a);

							if(point.x == 0 && point.y == b) { phi = 0; }
							else if(point.x == 0 && point.y == -b) { phi = Math.PI; }
							else if(point.x < 0 && point.y < 0) {
								phi += 2 * (Math.PI - phi);
							}
							else if(point.x > 0 && point.y < 0) {
								phi = math.asin(point.y / b) + (2 * Math.PI);
							}

							arrBirkX.push(functions.riemannSum(funcArclength, 0, phi, math.pow(10, 4)));
							arrBirkY.push(functions.dotProduct({x: point.v_x, y: point.v_y},
								{x: -a * (point.y / b), y: b * (point.x / a)})
								/ math.sqrt(math.pow(a * (point.y / b), 2) + math.pow(b * (point.x / a), 2)));
						}

						// Plotting Data

						var arrX = [],
							arrY = [],
							top = math.evaluate(2 * math.pi);

						for(var i = 0; i < top; i += 0.01) {
							arrX.push(a * math.cos(i));
							arrY.push(b * math.sin(i));
						}

						var trace1 = {
						  	x: arrX,
						  	y: arrY,
						 	name: "Ellipse",
						  	type: "scatter"
						};

						var trace2 = {
							x: iterX,
							y: iterY,
							name: "Trajectory",
							type: "scatter",
							mode: "lines",
							connectgaps: false
						};

						var trace3 = {
						  	x: arrBirkX,
						  	y: arrBirkY,
						 	name: "",
						 	mode: "markers",
						  	type: "scatter"
						};

						var data = [trace1, trace2, {x: [], y: []}],
							dataBirk = [trace3];

						var layout = {
						  	grid: {rows: 1, columns: 1, pattern: "independent"},
						  	showlegend: false,
						  	xaxis: {range: [-(max + scaleFactor), max + scaleFactor]},
				  			yaxis: {range: [-(max + scaleFactor), max + scaleFactor]},
				  			title: "Particle Trajectory",
				  			updatemenus: [{
							      	x: 0,
							      	y: 1,
							      	yanchor: "bottom",
							      	xanchor: "left",
							      	showactive: false,
							      	direction: "right",
							      	type: "buttons",
							      	pad: {b: 0, l: 180},
							      	buttons: [{
							        	method: "animate",
							        	args: [null, {
							          		mode: "immediate",
							          		fromcurrent: true,
							          		transition: {duration: 1},
							          		frame: {duration: 100, redraw: false}
					        			}
				        			],
							        label: "Play"
						      	}, {
								        method: 'animate',
								        args: [[null], {
								          	mode: "immediate",
								          	transition: {duration: 0},
								          	frame: {duration: 0, redraw: false}
								        }
						        	],
							        label: "Pause"
					      		}, {
							        	method: "animate",
							        	args: [null, {
							          		mode: "immediate",
							          		fromcurrent: false,
							          		transition: {duration: 1},
							          		frame: {duration: 100, redraw: false}
							        	}
						        	],
							        label: "Restart"
						      	}]
				      		}]
						};

						var layoutBirk = {
						  	grid: {rows: 1, columns: 1, pattern: "independent"},
						  	showlegend: false,
						  	xaxis: {range: [0, 2.05 * Math.PI * max]},
				  			yaxis: {range: [-1.05, 1.05]},
				  			title: "Birkhoff Coordinates"
						};

						$("#trajecPhoto").remove();
						trajecPhoto = $("<div>").attr("id", "trajecPhoto").css({
							"margin": "0 auto",
							"width": "700px",
							"height": "700px" 
						});
						main.append(trajecPhoto);
						var count = 0;
						Plotly.newPlot("trajecPhoto", data, layout, {scrollZoom: true, responsive: true})
							.then(function() {
								var container = [],
									curX = [],
									displayX = [],
									curY = [],
									displayY = [],
									add = parseInt(.01 * iterX.length);
								// container.push({
								// 	data: [
								// 		{x: arrX, y: arrY},
								// 		{x: iterX.slice(0, 1), y: iterY.slice(0, 1)}
								// 	],
								// 	name: "frame1"
								// });
								// container.push({
								// 	data: [
								// 		{x: arrX, y: arrY},
								// 		{x: iterX.slice(0, 10000), y: iterY.slice(0, 10000)}
								// 	],
								// 	name: "frame2"
								// });
								for(var i = 0; i < iterX.length; i += add) {
									count++;
									displayX = [];
									displayY = [];
									curX = iterX.slice(0, i);
									curY = iterY.slice(0, i);
									for(var j = 0; j < curX.length; j++) {
										if(j % 100 == 0) {
											displayX.push(curX[j]);
											displayY.push(curY[j]);
										}
									}
									container.push({
										data: [
											{x: arrX, y: arrY},
											{x: displayX, y: displayY},
											{
												x: [displayX[displayX.length - 1]],
												y: [displayY[displayY.length - 1]],
												mode: "markers",
												marker: { size: 15, color: "black" }
											}
										],
										name: "frame" + count
									});
								}
								Plotly.addFrames("trajecPhoto", container);
							});
						$("#trajecPhoto").children().first().children().first().children().first().css({
							"border-style": "solid",
							"border-radius": "100px"
						});

						$("#Birk").remove();
						birk = $("<div>").attr("id", "Birk").css({
							"margin": "0 auto",
							"width": "700px",
							"height": "700px",
							"padding-top": "30px"
						});
						main.append(birk);
						Plotly.newPlot("Birk", dataBirk, layoutBirk, {scrollZoom: true, responsive: true});
						$("#Birk").children().first().children().first().children().first().css({
							"border-style": "solid",
							"border-radius": "100px"
						});

						var animation = $("<div>").attr("id", "animation").css({
							"margin": "0 auto",
							"width": "700px",
							"height": "100px",
							"background-color": "white",
							"border": "0.8mm solid black",
							"border-radius": "15px",
							"margin-bottom": "20px"
						}).append(
							$("<div>").attr("id", "animateTitle").text("Title Here").css({
								"margin": "0 auto",
								"text-align": "center",
								"font-size": "20px",
								"border-bottom": "0.6mm solid black",
								"height": "40px"
							}),
							$("<div>").css({
								"height": "60px",
								"display": "flex",
								"align-items": "center"
								}).append($("<a>").attr("id", "animate").addClass("waves-effect blue waves-light btn")
								.append($("<i>").addClass("material-icons right").text("cloud")).text("button").css({
									"margin": "0 auto"
								}))
						);
						// $("main").append(animation);
						$(".information").after(animation);

						main.css("margin-bottom", "60px");

						functions.handle_links(router);

						// $("main").append($("<a>").attr("id", "animate").addClass("waves-effect blue waves-light btn")
						// 	.append($("<i>").addClass("material-icons right").text("cloud")).text("button"));

						function startAnimation() {
							var list = [],
								frames = [],
								transitions = [];
							for(var i = 1; i < count + 1; i++) {
								list.push("frame" + i);
								frames.push({duration: 100});
								transitions.push({duration: 1, easing: "cubic-in"});
							}
						 	Plotly.animate("trajecPhoto", list, {
							    frame: frames,
							    transition: transitions,
							    mode: 'afterall'
						  	});
						}

						$("#animate").on("click", function(e) {
							startAnimation();
						});
					});
				});
			});
		});
	};

	return exports;
});