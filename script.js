

function gameController($scope){
	$scope.rows=[['','',''],['','',''],['','','']];	
	var player= 0;
	$scope.check=function(r,c){
		if (player === 1) {
		// console.log($scope.rows[r][c]);
			$scope.rows[r][c]= 'X';
			
			player = player%2 + 1;
		} else { 
			$scope.rows[r][c]= 'O';
			console.log(r, c);
			player = player%2 + 1;
		}
		matchrow(r);
		matchcol(c);
		matchDiag(r);
		};//end of check function

		function matchrow(rowNum){
			console.log($scope.rows[rowNum]);
			if ($scope.rows[rowNum][0]==$scope.rows[rowNum][1] && $scope.rows[rowNum][1]==$scope.rows[rowNum][2]){ 
					console.log("it works");
					alert("You Win");
			}
			}//end of function matchrow

		function matchcol(colNum){
		if ($scope.rows[0][colNum]==$scope.rows[1][colNum] && $scope.rows[1][colNum]==$scope.rows[2][colNum]){
			onsole.log("it works");
			alert("You Win");
		}
	}//end of matchcol


	function matchDiag(){
		var x=false;
		if($scope.rows[0][0]== $scope.rows[1][1] && $scope.rows[1][1]==$scope.rows[2][2]){
			alert("You Win") ;
		}
		else if ($scope.rows[2][0]==$scope.rows[1][1] && $scope.rows[1][1]==$scope.rows[0][2]){
			alert("You Win");
		}	
		
	}//end of matchdiag
//////////////////////////////////
// end of function check
}
/////////////
	