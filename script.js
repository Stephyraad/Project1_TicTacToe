
//dependency injection FIREBASE

var myGame = angular.module("TicTacToeApp", ["firebase"] );



var playerNum;

function gameController($scope, $timeout, $firebase){
	var ticTacRef = new Firebase("https://project1-tictactoe.firebaseio.com/");
		

///////////////////////////////////////////////////////////////////////
//  START FIREBASE

	var lastGame;
			// Ask for all existing game info from firebase
			ticTacRef.once('value', function(gamesSnapshot) {
				// get the actual games data
			  var games = gamesSnapshot.val();
				if(games == null)
				{
					// No games at all, so make a new game -- As if we're Areg
					lastGame = ticTacRef.push( {waiting: true} );
					playerNum = 1;
				}
				else	// I do have at least one game out there...
				{
				  var keys = Object.keys(games);
				  var lastGameKey = keys[ keys.length - 1 ];
				  var lastGame = games[ lastGameKey ];
					console.log("This person's game: " + lastGameKey);
				  if(lastGame.waiting)
				  {
				  	// Currently someone is waiting -- Areg is there and we're Rocky
				  	// Grab from Firebase its last game object
				  	lastGame = ticTacRef.child(lastGameKey);
				  	// Set a new game on this
				  	lastGame.set( {
				  		waiting:false, 
				  		moves: 0, 
				  		player: 0, 
				  		//won: false, 
				  		rows: [['','',''],['','',''],['','','']] 
				  	} );
				  	playerNum = 2;
				  }
				  else
				  {
				  	// Make a new game -- As if we're Areg
						lastGame = ticTacRef.push( {waiting: true} );
						playerNum = 1;
				  }
				}
				// Attach the last game to what we're up to
			  $scope.game = $firebase(lastGame);
			});

///  	END FIREBASE
//////////////////////////////////////////////////////////////////////////////////////////////

	//var $scope.game.player= 0;
	// var $scope.game.moves=0;
	$scope.check=function(r,c){
		if ($scope.game.rows[r][c]== ''){
			if ($scope.game.player === 1) {
			// console.log($scope.game.rows[r][c]);
				$scope.game.rows[r][c]= 'X';
			} 
			else { 
				$scope.game.rows[r][c]= 'O';
				console.log(r, c);
			}
			$scope.game.player = $scope.game.player%2 + 1;
			$scope.game.moves++;
			$scope.game.$save();
			if ($scope.game.moves > 4) {
				checkWin(r,c,$scope.game.player);
			} 		
			else if ($scope.game.moves==9){
				window.setTimeout(timeOut2(), 1200); //Tie BACKGROUND			
				//alert("its a tie");
				console.log($scope.game.moves);
			}

		}// end of first if
		else{
			alert("Cell Taken! Please pick another cell")
		}
	}// end of check function

			function timeOut(){
				document.getElementById("winningback").style.display="inline-block";
				}//wining background
			function timeOut2(){
				document.getElementById("tieBack").style.display="inline-block";
			}

			function checkWin(rowNum,colNum,player){
				matchrow(rowNum, $scope.game.player);
				matchcol(colNum, $scope.game.player);
				matchDiag( $scope.game.player);
			};
	

			function matchrow(rowNum,player){
					console.log($scope.game.rows[rowNum]);
					if ($scope.game.rows[rowNum][0]==$scope.game.rows[rowNum][1] && $scope.game.rows[rowNum][1]==$scope.game.rows[rowNum][2]){ 
							console.log("it works");
							$timeout(timeOut, 1200);
							console.log( "player " + player +" Wins!!!");
							 //WINNING BACKGROUND
						}
					}//end of function matchrow

			function matchcol(colNum,player){
					if ($scope.game.rows[0][colNum]==$scope.game.rows[1][colNum] && $scope.game.rows[1][colNum]==$scope.game.rows[2][colNum]){
							console.log("it works");
							$timeout(timeOut, 1200);
							console.log( "player " + player +" Wins!!!");
							 //WINNING BACKGROUND
						}
					}//end of matchcol

			function matchDiag(player){
				//var x=false;
				if($scope.game.rows[0][0]!=='' && $scope.game.rows[0][0]== $scope.game.rows[1][1] && $scope.game.rows[1][1]==$scope.game.rows[2][2]){
					console.log("it works2");
					$timeout(timeOut2, 1200);
					console.log( "Player " + player +" Wins!!!");
					 //WINNING BACKGROUND
					}
				else if ($scope.game.rows[2][0]!=='' && $scope.game.rows[2][0]==$scope.game.rows[1][1] && $scope.game.rows[1][1]==$scope.game.rows[0][2]){
					console.log("it works3");
					$timeout(timeOut2, 1200);
					console.log( "Player " + player +" Wins!!!");
					 //WINNING BACKGROUND
					}	
				}//end of matchdiag
	}//end of gameController

	