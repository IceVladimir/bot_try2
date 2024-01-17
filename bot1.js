
const express = require('express')
const app = express(), port=3001
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const CharacterAI = require("node_characterai_edited2");
const characterAI = new CharacterAI();	
var cd = false;

app.get('/', (req, res) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
})

app.post('/', function(req, res) {
(async () => {
if(cd == false){
  cd = true;
  await characterAI.authenticateAsGuest();
  //var new_token = await characterAI.getToken1();
  //console.log(new_token);
  //var new_uuid = await characterAI.getUuid1();
  //console.log(new_uuid);
  if(req.body.token != ""){
  await characterAI.setToken(req.body.token, req.body.uuid)
  }
  // Place your character's id here
  const characterId = "v3lyisRb7INyd5BUdUKEKS1-MUTBom9dY9qV9-2ioTE";

  const chat = await characterAI.createOrContinueChat(characterId);

  // Send a message
  const response = await chat.sendAndAwaitResponse(req.body.msg, true);
	
	
  //console.log(response.text);
  var new_token = await characterAI.getToken1();
  var new_uuid = await characterAI.getUuid1();
  await characterAI.unauthenticate2();
  cd = false;
  res.send({
    'Answer': response.text,
	'Token': new_token,
	'Uuid': new_uuid,
  });
}else{
	console.log("CD!!!");
	res.send({
    'Answer': 'CD',
	'Token': 'CD',
	'Uuid': 'CD'
  });
}	
})();
});
app.listen(port, () =>{
	console.log('server started on ' + process.env.DOMAIN + ":" + port)
})