goog.provide("asiker.simplify");
/**
 * @constructor
 */
function Term() {
	this.Literal = [ {
		Letter : null,
		Exponent : null
	} ];
	this.Sign = '+'
	this.Coefficient = {
		Number : 1,
		expression : null
	};
	this.hasparentheses = false;

}
/* Method divTerm */
Term.prototype.divTerm = function(term) {

	var termResult = new Term();
	termResult.Literal = new Array();

	var coefficent = this.Coefficient.Number / term.Coefficient.Number;
	termResult.Coefficient.Number = coefficent;
	termResult.Sign = this.Sign;

	if (term.Literal.length !== 0) {
		var arrLetters = this.getLetters();
		for ( var c = 0; c < arrLetters.length; c++) {
			var item = arrLetters[c];
			var letterFind = term.findLetter(item.Letter);
			if (letterFind === null) {
				termResult.Literal.push(item);
			} else {

				var exponent = item.Exponent - letterFind.Exponent;
				if (exponent > 0) {
					termResult.Literal.push({
						Letter : letterFind.Letter,
						Exponent : exponent
					});
				}
			}
		}
	} else {
		termResult.Literal = this.Literal;
	}
	return termResult;
}
/* Method getLetters */
Term.prototype.getLetters = function() {
	var letters = new Array();
	for ( var c = 0; c < this.Literal.length; c++) {
		letters.push(this.Literal[c]);
	}
	return letters;
}
/* Method findLetter */
Term.prototype.findLetter = function(letterToFind) {
	for ( var c = 0; c < this.Literal.length; c++) {
		if (this.Literal[c].Letter === letterToFind) {
			return this.Literal[c];
		}
	}
	return null;
}

//window['Term'] = Term;

/**
 * @constructor
 */
function Expression(strInput) {

	this.StrInput = strInput;
	this.Terms = null;

	if (this.StrInput == null) {
		return null;
	}
}
/* method GetExpressionMonomial */
Expression.prototype.GetExpressionMonomial = function() {
	var expression = null;
	var terms = null;

	terms = this.StrInput.replace(/[\s]/g, '').match(/(\+|\-)?(\s)*[\w\^*]+/g);

	if (terms != null) {
		expression = new Array();

		/* build the expression */
		for ( var c = 0; c < terms.length; c++) {
			var term = new Term();
			var strTerm = terms[c];

			/* add Coefficient */
			var coefficient = strTerm.match(/^[\+\-]?\d*/g)[0].match(/\d+/g);
			term.Coefficient.Number = coefficient !== null ? parseInt(
					coefficient[0], 10) : 1;
			/* add sign */
			var sign = strTerm.match(/[\+\-]/g);
			term.Sign = sign === null ? "+" : sign[0];

			/* add Literals */
			var arrLiterals = strTerm.match(/[a-z]{1}(\^\d*)?/g);

			term.Literal = new Array();

			for ( var i = 0; arrLiterals !== null && i < arrLiterals.length; i++) {

				var strLetter = arrLiterals[i].match(/[a-z]/g);
				var strExponent = arrLiterals[i].match(/\d+/g);
				term.Literal.push({
					Letter : strLetter[0],
					Exponent : strExponent !== null ? parseInt(strExponent[0],
							10) : 1
				});

			}
			/* add term */
			expression.push(term);
		}
	}
	this.Terms = expression;
	return expression;
}
/* method GetMCM */
Expression.prototype.GetMCM = function() {
	var coefficients = new Array();
	for ( var c = 0; c < this.Terms.length; c++) {
		coefficients.push(this.Terms[c].Coefficient.Number);
	}
	return GetMCM(coefficients);
}
/* method GetMCD */
Expression.prototype.GetMCD = function() {
	var coefficients = new Array();
	for ( var c = 0; c < this.Terms.length; c++) {
		coefficients.push(this.Terms[c].Coefficient.Number);
	}
	this.MCDNumber = GetMCD(coefficients);
	return this.MCDNumber;
}
/* method GetCommonTerm */
Expression.prototype.GetCommonLetters = function() {
	var arrReturnLetters = new Array();
	var letters = this.Terms[0].Literal;
	for ( var l = 0; l < letters.length; l++) {

		var arrlettersMatch = this.StrInput.match(eval("/" + letters[l].Letter
				+ "(\\^\\d+)?/g"));

		if (arrlettersMatch.length >= this.Terms.length) {
			/* oder */
			arrlettersMatch.sort();
			var termMatch = arrlettersMatch[0];

			var letter = termMatch.match(/[a-z]/g).join().replace(/,/g, '');

			var exponent = termMatch.match(/\d+/g) != null ? termMatch.match(
					/\d+/g).join().replace(/,/g, '') : 1;

			arrReturnLetters.push({
				Letter : letter,
				Exponent : exponent
			});
		}
	}

	return arrReturnLetters;
}
/* function FactorGetCommon */
Expression.prototype.FactorGetCommon = function() {

	var literal = this.GetCommonLetters();

	var factorCommon = new Term();
	factorCommon.Literal = literal;

	var number = this.GetMCD();
	factorCommon.Coefficient.Number = number;

	return factorCommon;
}
/* function GetSolution */
Expression.prototype.GetSolution = function() {
	var arrSolution = new Array();
	var terms = this.GetExpressionMonomial();
	var factorCommon = this.FactorGetCommon();

	var hasMCD = factorCommon.Coefficient.Number > 1 ? true : false;
	var hasCommonLetters = factorCommon.Literal.length != 0 ? true : false;

	if (hasCommonLetters || hasMCD) {

		for ( var l = 0; l < terms.length; l++) {
			arrSolution.push(terms[l].divTerm(factorCommon));
		}
	} else {
		arrSolution = terms;
	}

	var objSolution = {
		factorCommon : factorCommon,
		hasMCD : hasMCD,
		hasCommonLetters : hasCommonLetters,
		solution : arrSolution,
		terms : terms,
		strExpression : this.StrInput
	}

	return objSolution;
}

//window['Expression'] = Expression;

/* function MCD */
function GetMCD(arrNumbers) {
	arrNumbers.sort();
	var a = arrNumbers[0];
	for ( var c = 1; c < arrNumbers.length; c++) {
		a = MCD(a, arrNumbers[c]);
	}

	return a;

	function MCD(a, b) {
		if (a < b) {
			var temp = a;
			a = b;
			b = temp;
		}
		if (b == 0)
			return a;
		else
			return MCD(b, a % b);
	}
}
/* function MCM */
function GetMCM(arrNumbers) {
	arrNumbers.sort();
	var a = arrNumbers[0];
	for ( var c = 1; c < arrNumbers.length; c++) {
		a = MCM(a, arrNumbers[c]);
	}
	return a;

	function MCM(a, b) {
		return (a / GetMCD([ a, b ])) * b;
	}
}



/**
 * @constructor
 */
function Solution(txtInput, IddivSolution, onResult) {

	//debugger;
	var expression = new Expression(txtInput);

	if (expression == null) {
		onResult("Expression null");
		return null;
	}
	var solution = expression.GetSolution();
	var factorComun = solution.factorCommon;
	var resultado = solution.solution;

	var arrstring = new Array();

	var divSolution = document.getElementById(IddivSolution);

	if (factorComun.Coefficient.Number !== 1) {
		arrstring.push(factorComun.Coefficient.Number);
	} else if (factorComun.Literal.length === 0) {
		arrstring.push(factorComun.Coefficient.Number);
	}

	for ( var c = 0; factorComun.Literal != null
			&& c < factorComun.Literal.length; c++) {
		arrstring.push(factorComun.Literal[c].Letter);

		if (factorComun.Literal[c].Exponent > 1) {
			arrstring.push('^' + factorComun.Literal[c].Exponent);
		}
	}

	arrstring.push("(");
	for ( var l = 0; l < resultado.length; l++) {
		if (l > 0) {
			arrstring.push(resultado[l].Sign);
		}

		if (resultado[l].Coefficient.Number !== 1) {
			arrstring.push(resultado[l].Coefficient.Number);
		} else if (resultado[l].Literal.length === 0) {
			arrstring.push(resultado[l].Coefficient.Number);
		}

		for ( var c = 0; c < resultado[l].Literal.length; c++) {
			if (resultado[l].Literal[c] === null)
				continue;
			arrstring.push(resultado[l].Literal[c].Letter);
			if (resultado[l].Literal[c].Exponent > 1) {
				arrstring.push('^' + resultado[l].Literal[c].Exponent);
			}
		}

	}
	arrstring.push(")");	
	divSolution.innerHTML =	renderExpression(arrstring.join().replace(/,/g, ''));
	divSolution.style.display = 'block';
	
	if (onResult != null) {
		onResult(solution);
	}

}


//@ sourceURL=JsfactorCommon.js