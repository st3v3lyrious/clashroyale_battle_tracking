const request = require("request");
const config = require("./conf.json");

let options = { method: 'GET',
  url: `https://api.royaleapi.com/clan/${config.clan_tag}/war`,
  headers: { Authorization: `Bearer ${config.token}` }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  if(response.statusCode === 200){
    let war_data = JSON.parse(body);
    if(war_data.state == 'warDay'){
      console.log(`It's war day! There are ${war_data.clan.participants} participants in this war.`)
      if(war_data.clan.battlesPlayed !== war_data.clan.participants){
        for(i = 0; i<war_data.participants.length; i++){
          if(war_data.participants[i].battlesPlayed === 0){
            console.log(`${war_data.participants[i].name} hasn't played all his battles`)
          }
        }
      }
    } else {
      console.log(`It's collection day! There are currently ${war_data.clan.participants} participants in this war.`)
      for(i = 0; i<war_data.participants.length; i++){
        if(war_data.participants[i].battlesPlayed !== 3){
          console.log(`${war_data.participants[i].name} hasn't played all his battles`)
        }
      }
    }
  }else {
    console.log('The request failed');
  }
});