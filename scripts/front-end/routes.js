define(["jquery", "app/functions"], ($, functions) => {
	var exports = {};

	// Adds all necessary front-end listeners
	exports.add_listeners = (router, Plotly, math, Materialize) => {

		// Default route is designed to introduce all the necessary details
		router.addRouteListener("def", (toState, fromState) => {
			var main = $("main");
			main.empty();
			functions.sideNavInitial(0, "home");
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$.get("/client/cases.html").done(function(cases) {
					main.append(cases);
					functions.handle_links(router);
					functions.messageHandler(0);
					$("select").material_select();
					MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
				});
			});
		});

		// This route is meant to simply be a collector of initial conditions for an elliptical table
		router.addRouteListener("configEllipse", (toState, fromState) => {
			var main = $("main");
			main.empty();
			functions.sideNavInitial(0, "changeEllipse");
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$.get("/client/ellipse.html").done(function(table) {
					main.append(table);
					$.get("/client/mainEllipse.html").done(function(primary) {
						main.append(primary);
						functions.handle_links(router);
						functions.config(router, "ellipse");
						functions.messageHandler(0);
						$("select").material_select();
						Materialize.updateTextFields();
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					});
				});
			});
		});

		// This route is meant to simply be a collector of initial conditions for a rectangular table
		router.addRouteListener("configRectangle", (toState, fromState) => {
			var main = $("main");
			main.empty();
			functions.sideNavInitial(0, "changeRectangle");
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$.get("/client/rectangle.html").done(function(table) {
					main.append(table);
					$.get("/client/mainRectangle.html").done(function(primary) {
						main.append(primary);
						functions.handle_links(router);
						functions.config(router, "rectangle");
						functions.messageHandler(0);
						$("select").material_select();
						Materialize.updateTextFields();
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					});
				});
			});
		});

		// This route is meant to simply be a collector of initial conditions for an annular table
		router.addRouteListener("configAnnulus", (toState, fromState) => {
			var main = $("main");
			main.empty();
			functions.sideNavInitial(0, "changeAnnulus");
			$.get("/client/introAnnulus.html").done(function(intro) {
				main.append(intro);
				$.get("/client/annulus.html").done(function(table) {
					main.append(table);
					$.get("/client/mainAnnulus.html").done(function(primary) {
						main.append(primary);
						functions.handle_links(router);
						functions.config(router, "annulus");
						functions.messageHandler(0);
						$("select").material_select();
						Materialize.updateTextFields();
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
			functions.sideNavInitial(1, "example" + num);
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
					$("select").material_select();
					functions.handle_links(router);
					MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
				});
			});
		});

		// This route takes in initial conditions and provides a visual of the trajectory for an elliptical table
		router.addRouteListener("ellipse", (toState, fromState) => {
			var main = $("main");
			main.empty();
			functions.sideNavInitial(0, "changeEllipse");
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$.get("/client/ellipse.html").done(function(table) {
					main.append(table);
					$.get("/client/mainEllipse.html").done(function(result) {
						main.append(result);
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
							iterations = parseInt(toState.params.iter),
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
						// Materialize.updateTextFields();

						// Collecting Data

						// Add starting point
						iterX.push(point.x);
						iterY.push(point.y);

						var funcArclength = function(t) {
							return math.sqrt((math.pow(a, 2) * math.pow(math.cos(t), 2)) +
								(math.pow(b, 2) * math.pow(math.sin(t), 2)));
						};

						for(var i = 0; i < iterations; i++) {
							// Inner Dynamics
							if(innerMagneticField != Infinity) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegionEllipse(check, a, b) == 1) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(innerMagneticField == 0) {
									point = functions.plotting(point, a, b,
										iterX, iterY, innerMagneticField, null,
										outerMagneticField, scaleFactor, 0, "ellipse");
								}
								else {
									point = functions.magneticPlotting(point, a, b,
										iterX, iterY, innerScaling, innerMagneticField,
										null, outerMagneticField, 0, "ellipse");
								}
							}

							// Outer Dynamics
							if(outerMagneticField != Infinity) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegionEllipse(check, a, b) == 0) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(outerMagneticField != 0) {
									point = functions.magneticPlotting(point, a, b,
										iterX, iterY, outerScaling, innerMagneticField,
										null, outerMagneticField, 1, "ellipse");
								}
								else {
									point = functions.plotting(point, a, b,
										iterX, iterY, innerMagneticField, null,
										outerMagneticField, scaleFactor, 1, "ellipse");
								}
								if(innerMagneticField != Infinity) {
									check = functions.evaluateTrajectoryStep(math.pow(10, -2),
										point.x, point.y, point.v_x, point.v_y);
									if(functions.checkRegionEllipse(check, a, b) == 1) {
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

						if(iterations <= 200) {
							var layout = {
							  	grid: {rows: 1, columns: 1, pattern: "independent"},
							  	showlegend: false,
							  	xaxis: {
							  		range: [-(max + scaleFactor), max + scaleFactor],
							  		title: "$\\mathbf{x}_1-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
							  	},
					  			yaxis: {
					  				range: [-(max + scaleFactor), max + scaleFactor],
					  				title: "$\\mathbf{x}_2-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
					  			},
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
						}
						else {
							var layout = {
							  	grid: {rows: 1, columns: 1, pattern: "independent"},
							  	showlegend: false,
							  	xaxis: {
							  		range: [-(max + scaleFactor), max + scaleFactor],
							  		title: "$\\mathbf{x}_1-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
							  	},
					  			yaxis: {
					  				range: [-(max + scaleFactor), max + scaleFactor],
					  				title: "$\\mathbf{x}_2-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
					  			},
					  			title: "Particle Trajectory"
							};
						}


						var layoutBirk = {
						  	grid: {rows: 1, columns: 1, pattern: "independent"},
						  	showlegend: false,
						  	xaxis: {
						  		range: [0, 2.05 * Math.PI * max],
						  		title: "$\\text{Arc Length}$",
							    showticklabels: true,
							    tickangle: "auto",
							    exponentformat: "e",
							    showexponent: "all"
						  	},
				  			yaxis: {
				  				range: [-1.05, 1.05],
				  				title: "$\\cos(\\varphi)$",
							    showticklabels: true,
							    tickangle: "auto",
							    exponentformat: "e",
							    showexponent: "all"
				  			},
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
								if(iterations <= 200) {
									var container = [],
										curX = [],
										displayX = [],
										curY = [],
										displayY = [],
										add = 0;
									if(iterations < 100) {
										add = parseInt(.01 * iterX.length);
									}
									else {
										add = parseInt(.005 * iterX.length);
									}
									for(var i = 0; i < iterX.length; i += add) {
										count++;
										displayX = [];
										displayY = [];
										curX = iterX.slice(0, i);
										curY = iterY.slice(0, i);
										for(var j = 0; j < curX.length; j++) {
											if(j % 100 == 0 || curX[j] == null || j == curX.length - 1) {
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
								}
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

						$(".button-collapse").sideNav({ "menuWidth": "350px" });
						main.css("margin-bottom", "60px");
						functions.handle_links(router);
						functions.config(router, "ellipse");
						$("select").material_select();
						Materialize.updateTextFields();
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					});
				});
			});
		});

		// This route takes in initial conditions and provides a visual of the trajectory for a rectangular table
		router.addRouteListener("rectangle", (toState, fromState) => {
			var main = $("main");
			main.empty();
			functions.sideNavInitial(0, "changeRectangle");
			$.get("/client/intro.html").done(function(intro) {
				main.append(intro);
				$.get("/client/rectangle.html").done(function(table) {
					main.append(table);
					$.get("/client/mainRectangle.html").done(function(result) {
						main.append(result);
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
						// $("#Birk").remove();
						// var birk = $("<div>").attr("id", "Birk").css({
						// 		"display": "flex",
						// 		"align-items": "center",
						// 		"justify-content": "center"
						// 	}),
						// 	wrapper = $("<div>").addClass("preloader-wrapper big active"),
						// 	spinner = $("<div>").addClass("spinner-layer spinner-red-only"),
						// 	clipper1 = $("<div>").addClass("circle-clipper left").append(
						// 		$("<div>").addClass("circle")),
						// 	patch = $("<div>").addClass("gap-patch").append(
						// 		$("<div>").addClass("circle")),
						// 	clipper2 = $("<div>").addClass("circle-clipper right").append(
						// 		$("<div>").addClass("circle"));
						// spinner.append(clipper1, patch, clipper2);
						// wrapper.append(spinner);
						// birk.append(wrapper);
						// $("main").append(birk);

						// Initial Conditions
						var innerMagneticField = 0,
							outerMagneticField = 0;

						toState.params.inner == "Inf" ? innerMagneticField = Infinity
							: innerMagneticField = parseFloat(toState.params.inner);
						toState.params.outer == "Inf" ? outerMagneticField = Infinity
							: outerMagneticField = parseFloat(toState.params.outer);

						var x1 = parseFloat(toState.params.horPoint),
							x2 = parseFloat(toState.params.verPoint),
							phi = math.bignumber(toState.params.phi) * (Math.PI / 180),
							a = math.abs(parseFloat(toState.params.hor)),
							b = math.abs(parseFloat(toState.params.ver)),
							max = math.max(a,b),
							iterations = parseInt(toState.params.iter),
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
							x: x1,
							y: x2,
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
						$("#variable5").val(toState.params.horPoint);
						$("#variable6").val(toState.params.verPoint);
						$("#variable7").val(toState.params.phi);
						$("#variable8").val(toState.params.iter);
						// Materialize.updateTextFields();

						// Collecting Data

						// Add starting point
						iterX.push(point.x);
						iterY.push(point.y);

						var funcArclength = function(t) {
							return math.sqrt((math.pow(a, 2) * math.pow(math.cos(t), 2)) +
								(math.pow(b, 2) * math.pow(math.sin(t), 2)));
						};

						for(var i = 0; i < iterations; i++) {
							// Inner Dynamics
							if(innerMagneticField != Infinity) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegionRectangle(check, a, b) == 1) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(innerMagneticField == 0) {
									point = functions.plotting(point, a, b,
										iterX, iterY, innerMagneticField, null,
										outerMagneticField, scaleFactor, 0, "rectangle");
								}
								else {
									point = functions.magneticPlotting(point, a, b,
										iterX, iterY, innerScaling, innerMagneticField,
										null, outerMagneticField, 0, "rectangle");
								}
							}

							// Outer Dynamics
							if(outerMagneticField != Infinity) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegionRectangle(check, a, b) == 0) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(outerMagneticField != 0) {
									point = functions.magneticPlotting(point, a, b,
										iterX, iterY, outerScaling, innerMagneticField,
										null, outerMagneticField, 1, "rectangle");
								}
								else {
									point = functions.plotting(point, a, b,
										iterX, iterY, innerMagneticField, null,
										outerMagneticField, scaleFactor, 1, "rectangle");
								}
								if(innerMagneticField != Infinity) {
									check = functions.evaluateTrajectoryStep(math.pow(10, -2),
										point.x, point.y, point.v_x, point.v_y);
									if(functions.checkRegionRectangle(check, a, b) == 1) {
										point.v_x *= -1;
										point.v_y *= -1;
									}
								}
							}

							// phi = math.acos(point.x / a);

							// if(point.x == 0 && point.y == b) { phi = 0; }
							// else if(point.x == 0 && point.y == -b) { phi = Math.PI; }
							// else if(point.x < 0 && point.y < 0) {
							// 	phi += 2 * (Math.PI - phi);
							// }
							// else if(point.x > 0 && point.y < 0) {
							// 	phi = math.asin(point.y / b) + (2 * Math.PI);
							// }

							// arrBirkX.push(functions.riemannSum(funcArclength, 0, phi, math.pow(10, 4)));
							// arrBirkY.push(functions.dotProduct({x: point.v_x, y: point.v_y},
							// 	{x: -a * (point.y / b), y: b * (point.x / a)})
							// 	/ math.sqrt(math.pow(a * (point.y / b), 2) + math.pow(b * (point.x / a), 2)));

						}

						// Plotting Data

						var arrX = [],
							arrY = [];

						for(var i = 0; i <= 2 * a; i += 0.001) {
							arrX.push(-a + i);
							arrY.push(b);
						}

						for(var i = 0; i <= 2 * b; i += 0.001) {
							arrX.push(a);
							arrY.push(b - i);
						}

						for(var i = 0; i <= 2 * a; i += 0.001) {
							arrX.push(a - i);
							arrY.push(-b);
						}

						for(var i = 0; i <= 2 * b; i += 0.001) {
							arrX.push(-a);
							arrY.push(-b + i);
						}

						var trace1 = {
						  	x: arrX,
						  	y: arrY,
						 	name: "Rectangle",
						  	type: "scatter",
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

						if(iterations <= 200) {
							var layout = {
							  	grid: {rows: 1, columns: 1, pattern: "independent"},
							  	showlegend: false,
							  	xaxis: {
							  		range: [-(max + scaleFactor), max + scaleFactor],
							  		title: "$\\mathbf{x}_1-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
							  	},
					  			yaxis: {
					  				range: [-(max + scaleFactor), max + scaleFactor],
					  				title: "$\\mathbf{x}_2-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
					  			},
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
						}
						else {
							var layout = {
							  	grid: {rows: 1, columns: 1, pattern: "independent"},
							  	showlegend: false,
							  	xaxis: {
							  		range: [-(max + scaleFactor), max + scaleFactor],
							  		title: "$\\mathbf{x}_1-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
							  	},
					  			yaxis: {
					  				range: [-(max + scaleFactor), max + scaleFactor],
					  				title: "$\\mathbf{x}_2-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
					  			},
					  			title: "Particle Trajectory"
							};
						}


						var layoutBirk = {
						  	grid: {rows: 1, columns: 1, pattern: "independent"},
						  	showlegend: false,
						  	xaxis: {
						  		range: [0, 2.05 * Math.PI * max],
						  		title: "$\\text{Arc Length}$",
							    showticklabels: true,
							    tickangle: "auto",
							    exponentformat: "e",
							    showexponent: "all"
						  	},
				  			yaxis: {
				  				range: [-1.05, 1.05],
				  				title: "$\\cos(\\varphi)$",
							    showticklabels: true,
							    tickangle: "auto",
							    exponentformat: "e",
							    showexponent: "all"
				  			},
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
								if(iterations <= 200) {
									var container = [],
										curX = [],
										displayX = [],
										curY = [],
										displayY = [],
										add = 0;
									if(iterations < 100) {
										add = parseInt(.01 * iterX.length);
									}
									else {
										add = parseInt(.005 * iterX.length);
									}
									for(var i = 0; i < iterX.length; i += add) {
										count++;
										displayX = [];
										displayY = [];
										curX = iterX.slice(0, i);
										curY = iterY.slice(0, i);
										for(var j = 0; j < curX.length; j++) {
											if(j % 100 == 0 || curX[j] == null || j == curX.length - 1) {
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
								}
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
						// main.append(birk);
						// Plotly.newPlot("Birk", dataBirk, layoutBirk, {scrollZoom: true, responsive: true});
						// $("#Birk").children().first().children().first().children().first().css({
						// 	"border-style": "solid",
						// 	"border-radius": "100px"
						// });

						$(".button-collapse").sideNav({ "menuWidth": "350px" });
						main.css("margin-bottom", "60px");
						functions.handle_links(router);
						functions.config(router, "rectangle");
						$("select").material_select();
						Materialize.updateTextFields();
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					});
				});
			});
		});




















		// This route takes in initial conditions and provides a visual of the trajectory for an annular table
		router.addRouteListener("annulus", (toState, fromState) => {
			var main = $("main");
			main.empty();
			functions.sideNavInitial(0, "changeAnnulus");
			$.get("/client/introAnnulus.html").done(function(intro) {
				main.append(intro);
				$.get("/client/annulus.html").done(function(table) {
					main.append(table);
					$.get("/client/mainAnnulus.html").done(function(result) {
						main.append(result);
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
						// $("#Birk").remove();
						// var birk = $("<div>").attr("id", "Birk").css({
						// 		"display": "flex",
						// 		"align-items": "center",
						// 		"justify-content": "center"
						// 	}),
						// 	wrapper = $("<div>").addClass("preloader-wrapper big active"),
						// 	spinner = $("<div>").addClass("spinner-layer spinner-red-only"),
						// 	clipper1 = $("<div>").addClass("circle-clipper left").append(
						// 		$("<div>").addClass("circle")),
						// 	patch = $("<div>").addClass("gap-patch").append(
						// 		$("<div>").addClass("circle")),
						// 	clipper2 = $("<div>").addClass("circle-clipper right").append(
						// 		$("<div>").addClass("circle"));
						// spinner.append(clipper1, patch, clipper2);
						// wrapper.append(spinner);
						// birk.append(wrapper);
						// $("main").append(birk);

						// Initial Conditions
						var innerMagneticField = 0,
							middleMagneticField = 0,
							outerMagneticField = 0;

						toState.params.inner == "Inf" ? innerMagneticField = Infinity
							: innerMagneticField = parseFloat(toState.params.inner);
						toState.params.middle == "Inf" ? middleMagneticField = Infinity
							: middleMagneticField = parseFloat(toState.params.middle);
						toState.params.outer == "Inf" ? outerMagneticField = Infinity
							: outerMagneticField = parseFloat(toState.params.outer);

						var theta = math.bignumber(toState.params.theta) * (Math.PI / 180),
							phi = math.bignumber(toState.params.phi) * (Math.PI / 180),
							rad1 = math.abs(parseFloat(toState.params.rad1)),
							rad2 = math.abs(parseFloat(toState.params.rad2)),
							max = math.max(rad1, rad2),
							iterations = parseInt(toState.params.iter),
							param = 0,
							steps = 0,
							stop = 0,
							iterX = [],
							iterY = [],
							// arrBirkX = [],
							// arrBirkY = [],
							coefficientList = [],
							check = 0,
							mass = 1,
							charge = -1,
							outerScaling = (charge * outerMagneticField) / mass,
							middleScaling = (charge * middleMagneticField) / mass,
							innerScaling = (charge * innerMagneticField) / mass;

						var point = {
							x: rad1 * math.cos(theta),
							y: rad1 * math.sin(theta),
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
						$("#variable1").val(rad1);
						$("#variable2").val(rad2);
						$("#variable4").val(middleMagneticField);
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
							$("#variable5").val(null);
						}
						else {
							$("#outerInf").attr("checked", false);
							$("#variable5").val(outerMagneticField);
						}
						$("#variable6").val(toState.params.theta);
						$("#variable7").val(toState.params.phi);
						$("#variable8").val(toState.params.iter);
						// Materialize.updateTextFields();

						// Collecting Data

						// Add starting point
						iterX.push(point.x);
						iterY.push(point.y);

						// var funcArclength = function(t) {
						// 	return math.sqrt((math.pow(a, 2) * math.pow(math.cos(t), 2)) +
						// 		(math.pow(b, 2) * math.pow(math.sin(t), 2)));
						// };

						// console.log(point);

						for(var i = 0; i < iterations; i++) {
							// Inner Dynamics
							if(innerMagneticField != Infinity) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegionEllipse(check, rad1, rad1) == 1) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(innerMagneticField == 0) {
									point = functions.plotting(point, rad1, rad1,
										iterX, iterY, innerMagneticField, null,
										middleMagneticField, scaleFactor, 0, "ellipse");
								}
								else {
									point = functions.magneticPlotting(point, rad1, rad1,
										iterX, iterY, innerScaling, innerMagneticField, null,
										middleMagneticField, 0, "ellipse");
								}
							}

							// Middle Dynamics
							check = functions.evaluateTrajectoryStep(math.pow(10, -2),
								point.x, point.y, point.v_x, point.v_y);
							if(functions.checkRegionAnnulus(check, rad1, rad2) == 1) {
								point.v_x *= -1;
								point.v_y *= -1;
							}
							if(middleMagneticField == 0) {
								point = functions.plotting(point, rad1, rad2,
									iterX, iterY, innerMagneticField,
									middleMagneticField, outerMagneticField,
									scaleFactor, 2, "annulus");
							}
							else {
								point = functions.magneticPlottingAnnulus(point, rad1, rad2,
									iterX, iterY, middleScaling);
							}

							// Outer Dynamics
							if(functions.annulusBoundary(point, rad2) == 1) {
								if(outerMagneticField != Infinity) {
									check = functions.evaluateTrajectoryStep(math.pow(10, -2),
										point.x, point.y, point.v_x, point.v_y);
									if(functions.checkRegionEllipse(check, rad2, rad2) == 0) {
										point.v_x *= -1;
										point.v_y *= -1;
									}
									if(outerMagneticField != 0) {
										point = functions.magneticPlotting(point, rad2, rad2,
											iterX, iterY, outerScaling, innerMagneticField,
											null, outerMagneticField, 1, "ellipse");
									}
									else {
										point = functions.plotting(point, rad2, rad2,
											iterX, iterY, innerMagneticField, null,
											outerMagneticField, scaleFactor, 1, "ellipse");
									}
								}
							}

							// Middle Dynamics
							if(functions.annulusBoundary(point, rad2) == 1) {
								check = functions.evaluateTrajectoryStep(math.pow(10, -2),
									point.x, point.y, point.v_x, point.v_y);
								if(functions.checkRegionAnnulus(check, rad1, rad2) == 1) {
									point.v_x *= -1;
									point.v_y *= -1;
								}
								if(middleMagneticField == 0) {
									point = functions.plotting(point, rad1, rad2,
										iterX, iterY, innerMagneticField,
										middleMagneticField, outerMagneticField,
										scaleFactor, 2, "annulus");
								}
								else {
									point = functions.magneticPlottingAnnulus(point, rad1, rad2,
										iterX, iterY, middleScaling);
								}
							}

							// phi = math.acos(point.x / a);

							// if(point.x == 0 && point.y == b) { phi = 0; }
							// else if(point.x == 0 && point.y == -b) { phi = Math.PI; }
							// else if(point.x < 0 && point.y < 0) {
							// 	phi += 2 * (Math.PI - phi);
							// }
							// else if(point.x > 0 && point.y < 0) {
							// 	phi = math.asin(point.y / b) + (2 * Math.PI);
							// }

							// arrBirkX.push(functions.riemannSum(funcArclength, 0, phi, math.pow(10, 4)));
							// arrBirkY.push(functions.dotProduct({x: point.v_x, y: point.v_y},
							// 	{x: -a * (point.y / b), y: b * (point.x / a)})
							// 	/ math.sqrt(math.pow(a * (point.y / b), 2) + math.pow(b * (point.x / a), 2)));
						}

						// Plotting Data

						var arrX = [],
							arrY = [],
							top = math.evaluate(2 * math.pi);

						for(var i = 0; i < top; i += 0.01) {
							arrX.push(rad1 * math.cos(i));
							arrY.push(rad1 * math.sin(i));
						}
						arrX.push(null);
						arrY.push(null);
						for(var i = 0; i < top; i += 0.01) {
							arrX.push(rad2 * math.cos(i));
							arrY.push(rad2 * math.sin(i));
						}

						var trace1 = {
						  	x: arrX,
						  	y: arrY,
						 	name: "Annulus",
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

						// var trace3 = {
						//   	x: arrBirkX,
						//   	y: arrBirkY,
						//  	name: "",
						//  	mode: "markers",
						//   	type: "scatter"
						// };

						var data = [trace1, trace2, {x: [], y: []}];
							// dataBirk = [trace3];

						if(iterations <= 200) {
							var layout = {
							  	grid: {rows: 1, columns: 1, pattern: "independent"},
							  	showlegend: false,
							  	xaxis: {
							  		range: [-(max + scaleFactor), max + scaleFactor],
							  		title: "$\\mathbf{x}_1-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
							  	},
					  			yaxis: {
					  				range: [-(max + scaleFactor), max + scaleFactor],
					  				title: "$\\mathbf{x}_2-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
					  			},
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
						}
						else {
							var layout = {
							  	grid: {rows: 1, columns: 1, pattern: "independent"},
							  	showlegend: false,
							  	xaxis: {
							  		range: [-(max + scaleFactor), max + scaleFactor],
							  		title: "$\\mathbf{x}_1-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
							  	},
					  			yaxis: {
					  				range: [-(max + scaleFactor), max + scaleFactor],
					  				title: "$\\mathbf{x}_2-\\text{axis}$",
								    showticklabels: true,
								    tickangle: "auto",
								    exponentformat: "e",
								    showexponent: "all"
					  			},
					  			title: "Particle Trajectory"
							};
						}


						// var layoutBirk = {
						//   	grid: {rows: 1, columns: 1, pattern: "independent"},
						//   	showlegend: false,
						//   	xaxis: {
						//   		range: [0, 2.05 * Math.PI * max],
						//   		title: "$\\text{Arc Length}$",
						// 	    showticklabels: true,
						// 	    tickangle: "auto",
						// 	    exponentformat: "e",
						// 	    showexponent: "all"
						//   	},
				  // 			yaxis: {
				  // 				range: [-1.05, 1.05],
				  // 				title: "$\\cos(\\varphi)$",
						// 	    showticklabels: true,
						// 	    tickangle: "auto",
						// 	    exponentformat: "e",
						// 	    showexponent: "all"
				  // 			},
				  // 			title: "Birkhoff Coordinates"
						// };

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
								if(iterations <= 200) {
									var container = [],
										curX = [],
										displayX = [],
										curY = [],
										displayY = [],
										add = 0;
									if(iterations < 100) {
										add = parseInt(.01 * iterX.length);
									}
									else {
										add = parseInt(.005 * iterX.length);
									}
									for(var i = 0; i < iterX.length; i += add) {
										count++;
										displayX = [];
										displayY = [];
										curX = iterX.slice(0, i);
										curY = iterY.slice(0, i);
										for(var j = 0; j < curX.length; j++) {
											if(j % 100 == 0 || curX[j] == null || j == curX.length - 1) {
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
								}
							});
						$("#trajecPhoto").children().first().children().first().children().first().css({
							"border-style": "solid",
							"border-radius": "100px"
						});

						// $("#Birk").remove();
						// birk = $("<div>").attr("id", "Birk").css({
						// 	"margin": "0 auto",
						// 	"width": "700px",
						// 	"height": "700px",
						// 	"padding-top": "30px"
						// });
						// main.append(birk);
						// Plotly.newPlot("Birk", dataBirk, layoutBirk, {scrollZoom: true, responsive: true});
						// $("#Birk").children().first().children().first().children().first().css({
						// 	"border-style": "solid",
						// 	"border-radius": "100px"
						// });

						$(".button-collapse").sideNav({ "menuWidth": "350px" });
						main.css("margin-bottom", "60px");
						functions.handle_links(router);
						functions.config(router, "annulus");
						$("select").material_select();
						Materialize.updateTextFields();
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					});
				});
			});
		});










































	};

	return exports;
});