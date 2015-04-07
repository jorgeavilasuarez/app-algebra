jQuery.extend({
	getStyleCss : function(path, onResult) {
		var head = $("head");
		/* creamos un id valido */
		var id = path.match(/[\w\.\d\-]+(\.css)$/g).join('').replace(/[\.\-]/g,
				'');
		/* verificamos que el css ya este localmente */
		if (head.find("#" + id).length === 0) {
			$.get(path, function(a, b, c) {
				var content = new Array();
				content.push("<style id=\"" + id + "\" type=\"text/css\">");
				content.push(a);
				content.push("</style>");
				head.append(content.join('\n'));
				if (onResult != null) {
					onResult();
				}
			});
		} else {
			if (onResult != null) {
				onResult();
			}
		}
	}
});