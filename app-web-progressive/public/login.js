

var login = function(login,passwd){

   var auth = firebase.auth().signInWithEmailAndPassword(email, password);

  console.log(auth);
	
};
