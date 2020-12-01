define(["jquery", "materialize", "router5", "mathjax", "math", "Plotly", "app/routes"], ($, Materialize, router5, MathJax, math, Plotly, routes) => {
	$(function() {
		math.config({
  			number: 'BigNumber',
			precision: 64
		});
		var router = new router5.Router5([
			new router5.RouteNode("def", "/"),
			new router5.RouteNode("configEllipse", "/configEllipse"),
			new router5.RouteNode("configRectangle", "/configRectangle"),
			new router5.RouteNode("configAnnulus", "/configAnnulus"),
			new router5.RouteNode("example", "/example?:num"),
			new router5.RouteNode("ellipse", "/ellipse?:hor&:ver&:inner&:outer&:theta&:phi&:iter"),
			new router5.RouteNode("rectangle", "/rectangle?:hor&:ver&:inner&:outer&:horPoint&:verPoint&:phi&:iter"),
			new router5.RouteNode("annulus", "/annulus?:rad1&:rad2&:inner&:middle&:outer&:theta&:phi&:iter")
		],{
			defaultRoute: "def"
		});
		routes.add_listeners(router, Plotly, math, Materialize);
		router.start();
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
	});
});