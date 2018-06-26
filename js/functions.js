// Initialize
    var peer = new Peer('', {host: 'localhost', port: 9000, path: '/peerjs'});
    var conn;
	var friendID;
	
	
	peer.on('open', function(id) {
		console.log('My peer ID is: ' + id);
		document.getElementById('ownID').innerHTML += id;
});
	peer.on('connection', function (conn) {
			console.log("Connected to by " + conn.peer);
			document.getElementById("friendID").value = conn.peer;
			document.getElementById("statusCon").innerHTML = "Status: Connected";

		conn.on('open', function(){
			conn.on('data', function(data){
				var chats = document.getElementById("chatRoll").innerHTML;
				
				if (chats === 'No history yet') {
			document.getElementById("chatRoll").innerHTML = 'Friend: ' + data;
			
		} else {
			document.getElementById("chatRoll").innerHTML += '<br>' + 'Friend: ' + data;
		}				  
			});
		});
		});
	//Functions
	function connectPeer() {
		friendID = document.getElementById("friendID").value;
		conn = peer.connect(friendID);
	}
	
	function sendMessage() {
		var message = document.getElementById("messBox").value;
		if (!!message) {
			for (var currentPeerId in peer.connections) {
				if (!peer.connections.hasOwnProperty(currentPeerId)) {
					return;
				}
				
				var connectionsWithCurrentPeer = peer.connections[currentPeerId];

				for (var i=0; i<connectionsWithCurrentPeer.length; i++) {
					connectionsWithCurrentPeer[i].send(message);
				}
				outputMessages(message);
			}
	}
}
	function outputMessages(message) {
		var chats = document.getElementById("chatRoll").innerHTML;
		
		if (chats === 'No history yet') {
			document.getElementById("chatRoll").innerHTML = 'You: ' + message;		
		} else {
			document.getElementById("chatRoll").innerHTML += '<br>' + 'You: ' + message;
		}
		document.getElementById("messBox").value = "";
	}
	