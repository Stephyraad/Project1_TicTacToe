/*function gameController($scope){
	$scope.grid= new grid();
	function grid($scope){
		this.rows=[['0','0','0'],['0','0','0'],['0','0','0']];
	}



	" {cellclick: c == 1, cellclick2: c== 2}">
}*/

function gameController($scope){
	$scope.rows=[['','',''],['','',''],['','','']];	
	var player= 0;
	$scope.check=function(r,c){
		if (player == 1) {
		// console.log($scope.rows[r][c]);
			$scope.rows[r][c]= 'X';
			console.log(r, c); // 1
			player = player%2 + 1;
		} else { 
			$scope.rows[r][c]= 'O';
			console.log(r, c);
			player = player%2 + 1;
		}
	};
}