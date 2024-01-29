
const express = require('express')
const app = express(), port=3001
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const CharacterAI = require("node_characterai_edited2");
//const characterAI = new CharacterAI();	
const arr_of_puppets = new Map();
const {v4 : uuidv4} = require('uuid')

app.get('/', (req, res) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
})

app.post('/', function(req, res) {
(async () => {
  var select_uuid = uuidv4();
  arr_of_puppets.set(select_uuid, new CharacterAI());
  await arr_of_puppets.get(select_uuid).authenticateAsGuest();
  //var new_token = await characterAI.getToken1();
  //console.log(new_token);
  //var new_uuid = await characterAI.getUuid1();
  //console.log(new_uuid);
  if(req.body.token != ""){
  await arr_of_puppets.get(select_uuid).setToken(req.body.token, req.body.uuid)
  }
  // Place your character's id here
  const characterId = "mXzyPFgxh0IMoydznW110YnhiHF6ITNfiKAGklhsrjU";

  const chat = await arr_of_puppets.get(select_uuid).createOrContinueChat(characterId);

  // Send a message
  const response = await chat.sendAndAwaitResponse(req.body.msg, true);
	
	
  //console.log(response.text);
  var new_token = await arr_of_puppets.get(select_uuid).getToken1();
  var new_uuid = await arr_of_puppets.get(select_uuid).getUuid1();
  await arr_of_puppets.get(select_uuid).unauthenticate2();
  arr_of_puppets.delete(select_uuid)
  res.send({
    'Answer': response.text,
	'Token': new_token,
	'Uuid': new_uuid,
  });

})();
});
app.listen(port, () =>{
	console.log('server started on ' + process.env.DOMAIN + ":" + port)
})