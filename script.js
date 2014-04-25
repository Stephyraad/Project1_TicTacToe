
//dependency injection FIREBASE

var myGame = angular.module("TicTacToeApp", ["firebase"] );



var playerNum;

function gameController($scope, $firebase){
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
				  	lastGame.set( {waiting:false, moves: 0, player: 0, won: false, rows: [['','',''],['','',''],['','','']] } );
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

	//var player= 0;
	var moves=0;
	$scope.check=function(r,c){
		if ($scope.game.rows[r][c]== ''){
			if (player === 1) {
			// console.log($scope.game.rows[r][c]);
				$scope.game.rows[r][c]= 'X';
			} 
			else { 
				$scope.game.rows[r][c]= 'O';
				console.log(r, c);
			}
			player = player%2 + 1;
			moves++;
			$scope.game.$save();
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
					console.log($scope.game.rows[rowNum]);
					if ($scope.game.rows[rowNum][0]==$scope.game.rows[rowNum][1] && $scope.game.rows[rowNum][1]==$scope.game.rows[rowNum][2]){ 
							console.log("it works");
							window.setTimeout(timeOut, 1200);
							console.log( "Player " + player +" Wins!!!");
							 //WINNING BACKGROUND
						}
					}//end of function matchrow

			function matchcol(colNum,player){
					if ($scope.game.rows[0][colNum]==$scope.game.rows[1][colNum] && $scope.game.rows[1][colNum]==$scope.game.rows[2][colNum]){
							console.log("it works");
							window.setTimeout(timeOut, 1200);
							console.log( "Player " + player +" Wins!!!");
							 //WINNING BACKGROUND
						}
					}//end of matchcol

			function matchDiag(player){
				//var x=false;
				if($scope.game.rows[0][0]!=='' && $scope.game.rows[0][0]== $scope.game.rows[1][1] && $scope.game.rows[1][1]==$scope.game.rows[2][2]){
					console.log("it works2");
					window.setTimeout(timeOut, 1200);
					console.log( "Player " + player +" Wins!!!");
					 //WINNING BACKGROUND
					}
				else if ($scope.game.rows[2][0]!=='' && $scope.game.rows[2][0]==$scope.game.rows[1][1] && $scope.game.rows[1][1]==$scope.game.rows[0][2]){
					console.log("it works3");
					window.setTimeout(timeOut, 1200);
					console.log( "Player " + player +" Wins!!!");
					 //WINNING BACKGROUND
					}	
				}//end of matchdiag
	}//end of gameController

	