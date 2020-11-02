define(["jquery", "materialize", "router5", "mathjax", "math", "Plotly", "app/routes"], ($, Materialize, router5, MathJax, math, Plotly, routes) => {
	$(function() {
		math.config({
  			number: 'BigNumber',
			precision: 64
		});
		var router = new router5.Router5([
			new router5.RouteNode("def", "/"),
			new router5.RouteNode("config", "/config"),
			new router5.RouteNode("example", "/example?:num"),
			new router5.RouteNode("mod", "/mag?:hor&:ver&:inner&:outer&:vel1&:vel2&:angle&:iter")
		],{
			defaultRoute: "def"
		});
		routes.add_listeners(router, Plotly, math, Materialize);
		router.start();
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, "main"]);
	});
});