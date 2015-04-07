/**
 * @constructor
 */
function Simplify(number){    
    this.numberInitial = number;                                              
    this.lastResult = null;
    this.currentLine = 0;
    this.currentDivident = number;
    this.currentDivisor = 2;
    this.currentNumber = 0;
    this.arrResults = new  Array();    
}            
/**
 * divNumber
 */
Simplify.prototype.divNumber = function (divident,divisor) {
    return divident / divisor;        
}            
/**
 * isDivExact 
 */
Simplify.prototype.isDivExact = function (divident,divisor) {
    if ((divident % divisor ) === 0) {
        return true;                            
    }
    return false;
}            
/**
 * simplifyNextNumber
 */            
Simplify.prototype.simplifyNextNumber = function() {
	if(this.currentDivident === ""){
		return false;
	}
    if (this.currentDivident == 1 || this.currentDivident == 0) {                    
        return false;            
    }
    /*incremet the divisor in case of don't be  exact the div*/
    while(!this.isDivExact(this.currentDivident ,this.currentDivisor)){                                    
        this.currentDivisor ++;                
    }
    this.lastResult =  {
        result:this.divNumber(this.currentDivident, this.currentDivisor),
        divisor:this.currentDivisor,
        divident:this.currentDivident
    };
    this.currentLine ++;
    this.currentNumber = this.lastResult.result;
    this.currentDivident = this.lastResult.result;                
    this.arrResults.push(this.lastResult);
    
    return this.lastResult;       
}
/**
 * simplify
 */            
Simplify.prototype.simplify = function() {
    while(this.simplifyNextNumber()){ }
    return this.arrResults;
}
/**
 * getSimplifyAt
 */            
Simplify.prototype.getSimplifyAt = function(position) {
    if (this.arrResults.length >= position) {
        return this.arrResults[position - 1];
    }    
    this.simplify();
    if (this.arrResults.length >= position) {
        return this.arrResults[position - 1];
    }
    return false;
}
/**
 * getMCD
 */
function getMCD(){
    var params = new Array();
    var commonNumbers = new Array();
    for (i = 0; i < params.length; i++) {        
        for (c = 0; c < params[i].length; c++) {
            var number = params[i][c].divisor;
            
            
        }   
    }
    return false;
}

function getSimplify(arrNumbers,onSimplifyResult){
	
	$("#divResult").html("");	
	
	var divtableContainer = $("#templates > .divtableContainer").clone();				
		
	for(var c = 0;c < arrNumbers.length;c++){
	
		var tablesolutionResult  = divtableContainer.find(".solutionResult").clone();
	
		var simplify = new Simplify(arrNumbers[c]);
		simplify.simplify();        			
		
		tablesolutionResult.attr("id",arrNumbers[c]);
		
		var fila = simplify.arrResults;

		for( i = 0;i < fila.length; i++){						
			var result= 
			"<tr>" +
				"<td data=\"" + fila[i].divident + "\" class=\"lineVerti\">" + fila[i].divident + "</td>" +
				"<td data=\"" + fila[i].divisor + "\"  class=\"divisor\">" + fila[i].divisor + "</td>" +								
			"</tr>";				
			if(i == (fila.length -1) ){
				result += 
				"<tr>" +						
					"<td data=\"" + fila[i].result + "\" class=\"lineVerti\" >" + fila[i].result+ "</td>" +					
					"<td> </td>" +
				"</tr>";
			}			
			tablesolutionResult.append(result);
		}	
		$("#divResult").append(tablesolutionResult).show();			
	}	
	 
	if(onSimplifyResultExercise!=null){
		onSimplifyResultExercise(simplify);
	}
}

//@ sourceURL=jsmatematicas.js