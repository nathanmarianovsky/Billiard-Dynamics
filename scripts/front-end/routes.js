define(["jquery", "app/functions"], ($, functions) => {
	var exports = {};

	// Adds all necessary front-end listeners
	exports.add_listeners = (router, Plotly, math, Materialize) => {

		// Default route is designed to introduce all the necessary details
		router.addRouteListener("def", (toState, fromState) => {
			$("main").empty();
			$.get("/client/intro.html").done(function(intro) {
				$("main").append(intro);
				$(".indicator").hide();
				$.get("/client/cases.html").done(function(cases) {
					$("main").append(cases);
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
			$("main").empty();
			$.get("/client/intro.html").done(function(intro) {
				$("main").append(intro);
				$(".indicator").hide();
				$.get("/client/main.html").done(function(main) {
					$("main").append(main);
					$("select").material_select();
					Materialize.updateTextFields();
					functions.handle_links(router);
					functions.messageHandler(0);
					MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
				});
			});
		});

		// This route displays the preset examples
		router.addRouteListener("example", (toState, fromState) => {
			var num = parseInt(toState.params.num);
			$("main").empty();
			$(".indicator").show();
			$.get("/client/intro.html").done(function(intro) {
				$("main").append(intro);
				$.get("/client/example.html").done(function(result) {
					$("main").append(result);
					functions.messageHandler(0);
					$("#intro table tbody tr").hide();
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
						$("main").append(bdy);
					}

					MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					functions.handle_links(router);
				});
			});
		});

		// This route takes in initial conditions and provides a visual of the trajectory
		router.addRouteListener("mod", (toState, fromState) => {
			$("main").empty();
			$.get("/client/intro.html").done(function(intro) {
				$("main").append(intro);
				$.get("/client/main.html").done(function(result) {
					$("main").append(result);
					MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
					$(".indicator").hide();
					functions.messageHandler(1);
					$("#myDiv").remove();
					var myDiv = $("<div>").attr("id", "myDiv").css({
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
					myDiv.append(wrapper);
					$("main").append(myDiv);
					$("select").material_select();

					// Initial Conditions
					var innerMagneticField = 0,
						outerMagneticField = 0;

					toState.params.inner == "Inf" ? innerMagneticField = Infinity
						: innerMagneticField = parseFloat(toState.params.inner);
					toState.params.outer == "Inf" ? outerMagneticField = Infinity
						: outerMagneticField = parseFloat(toState.params.outer);

					var theta = 0,
						a = math.abs(parseFloat(toState.params.hor)),
						b = math.abs(parseFloat(toState.params.ver)),
						max = math.max(a,b),
						param = 0,
						steps = 0,
						stop = 0,
						iterX = [],
						iterY = [],
						coefficientList = [],
						check = 0,
						mass = 1,
						charge = -1,
						outerScaling = (charge * outerMagneticField) / mass,
						innerScaling = (charge * innerMagneticField) / mass,
						velocity = functions.normalizeVector({
							x: math.bignumber(toState.params.vel1),
							y: math.bignumber(toState.params.vel2)
						});

					var point = {
						x: a * math.cos(math.bignumber(toState.params.angle) * (Math.PI / 180)),
						y: b * math.sin(math.bignumber(toState.params.angle) * (Math.PI / 180)),
						v_x: velocity.x,
						v_y: velocity.y
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
					$("#variable5").val(toState.params.vel1);
					$("#variable6").val(toState.params.vel2);
					$("#variable7").val(toState.params.angle);
					$("#variable8").val(toState.params.iter);
					Materialize.updateTextFields();

					// Collecting Data

					// Add starting point
					iterX.push(point.x);
					iterY.push(point.y);

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
						// console.log("inner");
						// console.log(point);

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
						}
						// console.log("outer");
						// console.log(point);
						// console.log(i);
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

					var data = [trace1, trace2];

					var layout = {
					  	grid: {rows: 1, columns: 1, pattern: 'independent'},
					  	showlegend: false,
					  	xaxis: {range: [-(max + scaleFactor), max + scaleFactor]},
			  			yaxis: {range: [-(max + scaleFactor), max + scaleFactor]}
					};

					$("#myDiv").remove();
					myDiv = $("<div>").attr("id", "myDiv").css({
						"margin": "0 auto",
						"width": "700px",
						"height": "700px" 
					});
					$("main").append(myDiv);
					Plotly.newPlot("myDiv", data, layout, {scrollZoom: true, responsive: true});
					$("#myDiv").children().first().children().first().children().first().css({
						"border-style": "solid",
						"border-radius": "100px"
					});

					functions.handle_links(router);
				});
			});
		});
	};

	return exports;
});