// flashScreen = function(reps, pause, delay, color) {
// 	if (reps == 0)
// 		return false;
		
// 	h1Title = $('h1').css('color');
// 	$('h1').css('color', color);
// 	setTimeout("$('h1').css('color', h1);", pause);
// 	_reps = reps;
// 	_pause = pause;
// 	_delay = delay;
// 	_color = color;
		
// 	setTimeout('flashScreen(_reps - 1, _pause, _delay, _color);', _delay);
// }				
// $(document).ready(function() { flashScreen(10, 100, 300, '#a00'); });




function gameController($scope){
	$scope.rows=[['','',''],['','',''],['','','']];	
	var player= 0;
	$scope.check=function(r,c){
		if (player === 1) {
		// console.log($scope.rows[r][c]);
			$scope.rows[r][c]= 'X';
			console.log(r, c); // 1
			player = player%2 + 1;
		} else { 
			$scope.rows[r][c]= 'O';
			console.log(r, c);
			player = player%2 + 1;
		}

		function matchrow(rowNum){
			if (rows[rowNum][0]==rows[rowNum][1] && rows[rowNum][1]==rows[rowNum][2]){ 
					alert("You Win");
			}
			}//end of function matchrow

		function matchcol(colNum){
		if (rows[0][colNum]==rows[1][colNum] && rows[1][colNum]==rows[2][colNum]){
			
			alert("You Win");
		}
	}//end of matchcol


	function matchDiag(diagNum){
		var x=false;
		if(rows[0][0]== rows[1][1] && rows[1][1]==rows[2][2]){
			alert("You Win") ;
		}
		else if (rows[2][0]==rows[1][1] && rows[1][1]==rows[0][2]){
			alert("You Win");
		}	
		
	}//end of matchdiag
//////////////////////////////////
};// end of function check
}
/////////////
	