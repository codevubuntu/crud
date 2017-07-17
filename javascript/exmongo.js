function monControl($scope,$http){
	$scope.edit=false;
	$scope.chercher=function(){
		$http.post('/api/chercher/'+$scope.recherche).success(function(data){
			if(data!='err'){
				$scope.resultat=data;
			}
			});
		};
	$scope.affiche=function(){
		$http.get('/api/affiche').success(function(data){
			if(data!='err'){
				$scope.listePerso=data;
			}
		})
	};
	$scope.traitForm=function(){
		$http.post('/api/formulaire',$scope.perso).success(function(data){
			if (data=='err'){
				alert("Désolé un problème est survenu lors de l'enregistrement");
			}
			else{
				$scope.perso={};
				$scope.affiche();
			}
		})
	};
	$scope.edition=function(p){
		$scope.edit=true;
		$scope.fiche=p;
		};
	$scope.traitEd=function(){
		$http.put('/api/edit/'+$scope.fiche._id,$scope.fiche).success(function(data){
		if(data=='err'){
				alert("Désolé un problème est survenu lors de l'enregistrement");
		}else{
				$scope.edit=false;
				$scope.perso={};
				$scope.affiche();
				}
			});
		};
	$scope.supr=function(fiche){
	$http.delete('/api/suppr/'+fiche._id).success(function(data){
			if (data=='err'){
				alert("Désolé un problème est survenu lors de la suppression");
			}
			else{
			$scope.affiche();
			}
	})
	}	;
	$scope.affiche();
}
		
