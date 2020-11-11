define(["jquery", "app/functions", "math"], ($, functions, math) => {
	var exports = {};

	// Handles all links on the page
	exports.handle_links = function(router) {
		$("a").on("click", function(e) {
			e.preventDefault();
			var id = $(this).attr("id");
			if(id == "source") {
				window.open("https://github.com/nathanmarianovsky/Billiard-Dynamics", "_blank");
			}
			else if(id == "home") {
				router.navigate("def");
			}
			else if(id == "configuration") {
				router.navigate("config");
			}
			else if(id.split("example")[0] == "") {
				router.navigate("example", {num: id.split("example")[1]});
			}
			else if(id == "config") {
				var indicator = 1,
					mag1 = 0,
					mag2 = 0;
				for(var i = 1; i < 8; i++) {
					if(String($("#variable" + i).val()).length == 0) {
						if(i == 3) {
							if(!$("#innerInf").is(":checked")) {
								indicator = 0;
							}
						}
						else if(i == 4) {
							if(!$("#outerInf").is(":checked")) {
								indicator = 0;
							}
						}
						else {
							indicator = 0;
						}
					}
				}
				if(parseInt($("#variable7").val()) < 1) { indicator = 0; }
				if(indicator == 1) {
					$("#innerInf").is(":checked") == true ? mag1 = "Inf"
						: mag1 = $("#variable3").val();
					$("#outerInf").is(":checked") == true ? mag2 = "Inf"
						: mag2 = $("#variable4").val();
					router.navigate("mod", {
						hor: $("#variable1").val(),
						ver: $("#variable2").val(),
						inner: mag1,
						outer: mag2,
						theta: $("#variable5").val(),
						phi: $("#variable6").val(),
						iter: $("#variable7").val(),
					});
				}
				else if(parseInt($("#variable7").val()) < 1) {
					alert("The number of iterations must be a positive integer!");
				}
				else {
					alert("All of the requested information is necessary! Please " +
						"fill in whatever data is missing and submit again.");
				}
			}
		});
	};



	exports.messageHandler = function(closed) {
		if(closed == 1) {
			$(".notes_table > tbody > tr").hide();
		}
		$(".notes_table > thead > tr").click(function() {
       		var obj = $(this).closest(".notes_table").find("tbody > tr");
       		obj.slideToggle();
    	});
	};



	// Returns the dot product of vectors v and w
	exports.dotProduct = function(v, w) {
		return (v.x * w.x) + (v.y * w.y);
	};



	// Normalizes a given vector v
	exports.normalizeVector = function(v) {
		var firstComponent = v.x / math.sqrt(exports.dotProduct(v, v)),
			secondComponent = v.y / math.sqrt(exports.dotProduct(v, v));
		return {x: firstComponent, y: secondComponent};
	};



	// Returns the coefficients for the trajectory carved out due to the magnetic field
	exports.evaluateCoefficients = function(x_1, x_2, v_1, v_2) {
		return [x_1, v_1, x_2, v_2];
	};



	// Given the coefficients of the magnetic trajectory this returns a point on the trajectory at time t
	exports.evaluateMagneticTrajectory = function(t, A, B, C, D, K) {
		var value1 = math.sin(math.abs(K) * t),
			value2 = math.cos(math.abs(K) * t),
			firstComponent = A + ((B / math.abs(K)) * value1) + ((D / K) * (1 - value2)),
			secondComponent = C + ((D / math.abs(K)) * value1) + ((B / K) * (value2 - 1)),
			firstVelocityComponent = (B * value2) + (D * math.sign(K) * value1),
			secondVelocityComponent = (D * value2) - (B * math.sign(K) * value1);
		return {x: firstComponent, y: secondComponent,
			v_x: firstVelocityComponent, v_y: secondVelocityComponent};
	};



	// Given a point and velocity this returns the point on the boundary along which a particle travels a straight line to reach
	exports.evaluateTrajectory = function(x_1, x_2, v_1, v_2, xLength, yLength) {
		var value1 = (math.pow(v_1, 2) / math.pow(xLength, 2)) +
				(math.pow(v_2, 2) / math.pow(yLength, 2)),
			value2 = ((x_1 * v_1) / math.pow(xLength, 2)) +
				((x_2 * v_2) / math.pow(yLength, 2)),
			intersectionTime = (-2 * value2) / value1,
			firstComponent = (intersectionTime * v_1) + x_1,
			secondComponent = (intersectionTime * v_2) + x_2
		return {x: firstComponent, y: secondComponent,
			v_x: v_1, v_y: v_2};
	};



	// Used to traverse an inner straight line step by step
	exports.evaluateTrajectoryStep = function(t, x_1, x_2, v_1, v_2) {
		return {x: x_1 + (t * v_1), y: x_2 + (t * v_2), v_x: v_1, v_y: v_2};
	};



	// Used to reflect a trajectory according to the law of reflection
	exports.reflectTrajectory = function(x_1, x_2, v_1, v_2, xLength, yLength) {
		var comp1 = (yLength / xLength) * x_1,
			comp2 = (xLength / yLength) * x_2,
			norm = exports.normalizeVector({x: -comp1, y: -comp2}),
			tmp = 2 * exports.dotProduct({x: v_1, y: v_2}, norm);
		return {x: x_1, y: x_2, v_x: v_1 - (tmp * norm.x),
			v_y: v_2 - (tmp * norm.y)};
	};



	// This represents the implicit function assocaited to the ellipse and is used by the bisection method to determine its roots
	exports.magneticFunction = function(t, A, B, C, D, K, xLength, yLength) {
		var value1 = math.sin(math.abs(K) * t),
			value2 = math.cos(math.abs(K) * t),
			firstComponent = A + ((B / math.abs(K)) * value1) + ((D / K) * (1 - value2)),
			secondComponent = C + ((D / math.abs(K)) * value1) + ((B / K) * (value2 - 1));
		return math.pow(firstComponent / xLength, 2) +
			math.pow(secondComponent / yLength, 2) - 1;
	};



	// Checks whether a given point is outside the ellipse
	exports.checkRegion = function(info, xLength, yLength, math) {
		return math.pow(info.x / xLength, 2) + math.pow(info.y / yLength, 2) > 1 ? 1 : 0;
	};



	// The bisection method returns an approximation of a root given an interval that contains it
	exports.bisection = function(interval, func, err, A, B, C, D, K, xLength, yLength) {
		var attempt = (interval[0] + interval[1]) / 2,
			evaluation = func(attempt, A, B, C, D, K, xLength, yLength);
		while(math.abs(evaluation) > err) {
			if(func(interval[0], A, B, C, D, K, xLength, yLength) > 0 &&
				func(interval[1], A, B, C, D, K, xLength, yLength) < 0) {
				if(evaluation > 0) {
					interval[0] = attempt;
				}
				else {
					interval[1] = attempt;
				}
			}
			else if(func(interval[0], A, B, C, D, K, xLength, yLength) < 0 &&
				func(interval[1], A, B, C, D, K, xLength, yLength) > 0) {
				if(evaluation > 0) {
					interval[1] = attempt;
				}
				else {
					interval[0] = attempt;
				}
			}
			attempt = (interval[0] + interval[1]) / 2;
			evaluation = func(attempt, A, B, C, D, K, xLength, yLength);
		}
		return attempt;
	}



	// Records the points attained along a non-magnetic trajectory inside the ellipse
	exports.plotting = function(point, math, xLength, yLength, iterX, iterY, innerMagneticField, outerMagneticField, scale, ver) {
		if(ver == 0) {
			if(outerMagneticField == Infinity) {
				point = exports.evaluateTrajectory(point.x, point.y,
					point.v_x, point.v_y, xLength, yLength);
				iterX.push(point.x);
				iterY.push(point.y);
				point = exports.reflectTrajectory(point.x, point.y,
					point.v_x, point.v_y, xLength, yLength);
			}
			else {
				var check = exports.evaluateTrajectoryStep(math.pow(10, -4),
					point.x, point.y, point.v_x, point.v_y);
				if(exports.checkRegion(check, xLength, yLength, math) == 0) {
					while(exports.checkRegion(point, xLength, yLength, math) == 0) {
						point = exports.evaluateTrajectoryStep(math.pow(10, -4),
							point.x, point.y, point.v_x, point.v_y);
						iterX.push(point.x);
						iterY.push(point.y);
					}
				}
			}
		}
		else {
			var reverseArrX = [],
				reverseArrY = [];
			var pointIter = {
				x: point.x,
				y: point.y,
				v_x: point.v_x,
				v_y: point.v_y
			};
			var max = math.max(xLength, yLength);
			var check = exports.evaluateTrajectoryStep(math.pow(10, -2),
					pointIter.x, pointIter.y, pointIter.v_x, pointIter.v_y);
			if(exports.checkRegion(check, xLength, yLength, math) == 0) {
				pointIter.v_x *= -1;
				pointIter.v_y *= -1;
			}
			while((-(max + scale) <= pointIter.x) && (pointIter.x <= max + scale)
				&& (-(max + scale) <= pointIter.y) && (pointIter.y <= max + scale)) {
				pointIter = exports.evaluateTrajectoryStep(math.pow(10, -4),
					pointIter.x, pointIter.y, pointIter.v_x, pointIter.v_y);
				iterX.push(pointIter.x);
				iterY.push(pointIter.y);
			}
			pointIter = exports.evaluateTrajectory(point.x, point.y, -point.v_x, -point.v_y,
				xLength, yLength);
			point = pointIter;
			iterX.push(null);
			iterY.push(null);
			reverseArrX.push(pointIter.x);
			reverseArrY.push(pointIter.y);
			while((-(max + scale) <= pointIter.x) && (pointIter.x <= max + scale)
				&& (-(max + scale) <= pointIter.y) && (pointIter.y <= max + scale)) {
				pointIter = exports.evaluateTrajectoryStep(math.pow(10, -4),
					pointIter.x, pointIter.y, pointIter.v_x, pointIter.v_y);
				reverseArrX.push(pointIter.x);
				reverseArrY.push(pointIter.y);
			}
			for(var i = 1; i < reverseArrX.length + 1; i++) {
				iterX.push(reverseArrX[reverseArrX.length - i]);
				iterY.push(reverseArrY[reverseArrY.length - i]);
			}
			if(innerMagneticField == Infinity) {
				point = exports.reflectTrajectory(point.x, point.y,
					-point.v_x, -point.v_y, xLength, yLength);
			}
			else {
				check = exports.evaluateTrajectoryStep(math.pow(10, -2),
					point.x, point.y, point.v_x, point.v_y);
				if(exports.checkRegion(check, xLength, yLength, math) == 1) {
					point.v_x *= -1;
					point.v_y *= -1;
				}
			}
		}
		return point;
	};



	// Records the points attained along a magnetic trajectory in the plane
	exports.magneticPlotting = function(point, math, xLength, yLength, iterX, iterY, scaling, innerMagneticField, outerMagneticField, ver) {
		var coefficientList = exports.evaluateCoefficients(point.x, point.y, point.v_x, point.v_y),
			param = 0,
			steps = 0,
			index = 0,
			sum = 0,
			bound = math.pow(10, 6),
			index = math.pow(10, -3.5),
			indexArr = [math.pow(10, -2.5), math.pow(10, -3.2), 
				math.pow(10, -3.8), math.pow(10, -4.5), math.pow(10, -3.5)];
		for(var i = 0; i < 5; i++) {
			var check = exports.evaluateMagneticTrajectory(indexArr[i],
				coefficientList[0], coefficientList[1], coefficientList[2],
				coefficientList[3], scaling);
			if(exports.checkRegion(check, xLength, yLength, math) == ver) { sum++; }
		}

		if(sum > 1) {
			point = check;
			while(exports.checkRegion(point, xLength, yLength, math) == ver) {
				if(steps >= bound) { break; }
				else { steps++; }
				param += index;
				point = exports.evaluateMagneticTrajectory(param, coefficientList[0],
					coefficientList[1], coefficientList[2], coefficientList[3], scaling);
				iterX.push(point.x);
				iterY.push(point.y);
			}
		}
		else {
			while(exports.checkRegion(point, xLength, yLength, math) == ver) {
				if(steps >= bound) { break; }
				else { steps++; }
				param -= index;
				console.log(point);
				point = exports.evaluateMagneticTrajectory(param, coefficientList[0],
					coefficientList[1], coefficientList[2], coefficientList[3], scaling);
				iterX.push(point.x);
				iterY.push(point.y);
			}
		}
		if(outerMagneticField == Infinity && ver == 0) {
			point = exports.reflectTrajectory(point.x, point.y,
				point.v_x, point.v_y, xLength, yLength);
		}
		if(innerMagneticField == Infinity && ver == 1) {
			point = exports.reflectTrajectory(point.x, point.y,
				point.v_x, point.v_y, xLength, yLength);
		}
		return point;
	};



	// Tells whether at least two of the given values are true (or equal to 1)
	exports.checker = function(bool1, bool2, bool3) {
		var hold = 0;
		if((bool1 == 1 && bool2 == 1) || (bool1 == 1 && bool3 == 1) ||
			(bool2 == 1 && bool3 == 1)) {
			hold = 1;
		}
		return hold;
	};



	// Approximates an integral with a given integrand and domain via a Riemann sum
	exports.riemannSum = function(func, a, b, n) {
		var delta = (b - a) / n,
			x = 0,
			sum = 0;
		for(var i = 0; i < n; i++) {
			x = a + (delta * i);
			sum += func(x);
		}
		return sum * delta;
	};

	return exports;
});