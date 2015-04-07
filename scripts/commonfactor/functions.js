String.prototype.trim = function() {
	return this.replace(/\s/g, "");
}
String.prototype.toCharArray = function() {
	return this.split('');
}
String.prototype.isInteger = function() {
	return (/\d/g).test(this);
}
String.prototype.isLetter = function() {
	return (/^[a-z]{1}$/g).test(this);
}
String.prototype.isparentheses = function() {
	return (/^[\(\)]{1}$/g).test(this);
}
String.prototype.isSign = function() {
	return (/^[\+\-]{1}$/g).test(this);
}
String.prototype.isPotentiation = function() {
	return (/^[\^]{1}$/g).test(this);
}

String.prototype.getFirstNumber = function() {
	var result = (/\d+/g).exec(this);
	return result != null ? result.toString() : null;
}

String.prototype.hasParentheses = function() {
	var result = (/[\(\)]/g).exec(this);
	return result != null ? result.toString() : null;
}

$(function() {
	$.ajaxSetup({
		cache : false
	});

	$("#viewExecercises").click(function() {
		Loading();
		$(this).hide('fast');
		$.get(this.href, function(data) {
			Loading();
			$("#divExercices").hide().html(data).show('fast');
		});
		return false;
	});		

});

function Loading() {
	$(".loading,#imgLoading").toggle();
}

