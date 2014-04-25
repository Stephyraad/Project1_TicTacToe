

function gameController($scope){
	$scope.rows=[['','',''],['','',''],['','','']];	
	var player= 0;
	var moves=0;
	$scope.check=function(r,c){
		if ($scope.rows[r][c]== ''){
			if (player === 1) {
			// console.log($scope.rows[r][c]);
				$scope.rows[r][c]= 'X';
			} 
			else { 
				$scope.rows[r][c]= 'O';
				console.log(r, c);
			}
			player = player%2 + 1;
			moves++;
			if (moves > 4) {
				checkWin(r,c,player);
			} 		
			else if (moves==9){
				window.setTimeout(timeOut2(), 1200); //Tie BACKGROUND			
				//alert("its a tie");
				console.log(moves);
			}

		}// end of first if
		else{
			alert("Cell Taken! Please pick another cell")
		}
	}// end of check function

			function timeOut(){
				document.getElementById("winningbackO").style.display="inline-block";
				}//wining background
			function timeOut2(){
				document.getElementById("tieBack").style.display="inline-block";
			}

			function checkWin(rowNum,colNum,player){
				matchrow(rowNum, player);
				matchcol(colNum, player);
				matchDiag(player);
			};
	

			function matchrow(rowNum,player){
					console.log($scope.rows[rowNum]);
					if ($scope.rows[rowNum][0]==$scope.rows[rowNum][1] && $scope.rows[rowNum][1]==$scope.rows[rowNum][2]){ 
							console.log("it works");
							window.setTimeout(timeOut, 1200);
							console.log( "Player " + player +" Wins!!!");
							 //WINNING BACKGROUND
						}
					}//end of function matchrow

			function matchcol(colNum,player){
					if ($scope.rows[0][colNum]==$scope.rows[1][colNum] && $scope.rows[1][colNum]==$scope.rows[2][colNum]){
							console.log("it works");
							window.setTimeout(timeOut, 1200);
							console.log( "Player " + player +" Wins!!!");
							 //WINNING BACKGROUND
						}
					}//end of matchcol

			function matchDiag(player){
				//var x=false;
				if($scope.rows[0][0]!=='' && $scope.rows[0][0]== $scope.rows[1][1] && $scope.rows[1][1]==$scope.rows[2][2]){
					console.log("it works2");
					window.setTimeout(timeOut, 1200);
					console.log( "Player " + player +" Wins!!!");
					 //WINNING BACKGROUND
					}
				else if ($scope.rows[2][0]!=='' && $scope.rows[2][0]==$scope.rows[1][1] && $scope.rows[1][1]==$scope.rows[0][2]){
					console.log("it works3");
					window.setTimeout(timeOut, 1200);
					console.log( "Player " + player +" Wins!!!");
					 //WINNING BACKGROUND
					}	
				}//end of matchdiag


		

	}//end of gameController

	