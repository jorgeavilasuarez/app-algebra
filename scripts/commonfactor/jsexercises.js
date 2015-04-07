var isShowExercises = true;
var arrExpressions = [ 'a^2+ab', 'x^2+x', '3a^3+a^2', 'x^3+4x^4', '5m^2+15m^3',
		'ab-bc', 'x^2y+x^2z', '2a^2x+6ax^2', '15c^3d^2+60c^2d^3' ];

function renderExpression(strExpression){
	var arrLetters = strExpression.toCharArray();
	var arrContentHtml = new Array();
	
	for ( var i = 0; i < arrLetters.length; i++) {
		/* si es parentesis*/
		if(arrLetters[i].hasParentheses()){
			arrContentHtml.push('<span class=\'stlsign\'>');
			arrContentHtml.push(arrLetters[i]);
			arrContentHtml.push('</span>');
		}else
		/* si es letra */
		if (arrLetters[i].isLetter()) {
			arrContentHtml.push('<span class=\'stlletter\'>');
			arrContentHtml.push(arrLetters[i]);
			arrContentHtml.push('</span>');
			/* si es signo */
		} else if (arrLetters[i].isSign()) {
			arrContentHtml.push('<span class=\'stlsign\'>');
			arrContentHtml.push(arrLetters[i]);
			arrContentHtml.push('</span>');
			/* si es numero */
		} else if (arrLetters[i].isInteger()) {
			if (arrLetters[i - 1] != null
					&& arrLetters[i - 1].isPotentiation()) {
				arrContentHtml.push('<sup>');
				arrContentHtml.push(arrLetters[i]);
				arrContentHtml.push('</sup>');
			} else {
				arrContentHtml.push('<span class=\'stlnumber\'>');
				arrContentHtml.push(arrLetters[i]);
				arrContentHtml.push('</span>');
			}
		}
	}
	return arrContentHtml.join('');
}
		
$(function() {
	/* items de los ejercicios */
	var divexamples = $("#examples");
	var arrContentHtml = new Array();
	for ( var c = 0; c < arrExpressions.length; c++) {
		arrContentHtml.push('<a  href=\"javascript:void(0);\" data=\"'
				+ arrExpressions[c] + '\">');		
		arrContentHtml.push(renderExpression(arrExpressions[c]));
		arrContentHtml.push('</a>');
	}
	arrContentHtml.push('<div style=\"clear: both;\"></div>');
	divexamples.html(arrContentHtml.join(''));
	/* eventos click */
	$("#ListExercices a").click(function() {
		var expression = $(this).attr('data');
		if (expression == null) {
			return false;
		}
		Loading();

		/* llamamos la funcion para la solucion de los ejercicios */
		try {

			Solution(expression, 'resultOperation', onResultExercise);
		} catch (ex) {
			$.getScript("/scripts/commonfactor/jsfactorcommon.js",function(data) {
				Solution(expression, 'resultOperation',
						onResultExercise);
				});
		}				
	});
	/* event of button hide or show exercises */
	$("#closeExercises").click(function() {
		if (isShowExercises) {
			$("#ListExercices").hide('fast');
			$(this).html("&raquo;");
			isShowExercises = false;
		} else {
			$("#ListExercices").show('fast');
			$(this).html("&laquo;");
			isShowExercises = true;
		}
	});

	$("#closeInfo").click(function() {
		$("#infoListExercices").hide('fast');

	});

});

function onResultExercise(solution) {
    if(solution.hasMCD){
		var arrNumbers = new Array();
	
		for(var c = 0;c < solution.terms.length;c++){
			arrNumbers.push(solution.terms[c].Coefficient.Number);
		}	
		/* llamamos la funcion para la solucion de los ejercicios */
		try {
			getSimplify(arrNumbers,  onSimplifyResultExercise);
		} catch (ex) {			
			$.getScript("/scripts/simplify/jsmatematicas.js",function() {
				getSimplify(arrNumbers,  onSimplifyResultExercise);
			});
		}
    }else{
	$("#divResult").hide();
		Loading();
	}
	
}
function onSimplifyResultExercise(datos){	
	Loading();
}

//@ sourceURL=JsExcercices.js