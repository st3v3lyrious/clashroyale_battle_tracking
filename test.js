const request = require("request");
const config = require("./conf.json");
const war_data = require("./warday_data.json");

// console.log(war_data)
// war_data = JSON.parse(war_data);
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
};