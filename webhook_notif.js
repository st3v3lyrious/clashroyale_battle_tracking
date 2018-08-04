const request = require("request-promise");
const config = require("./conf.json");

let options = { method: 'GET',
  url: `https://api.royaleapi.com/clan/${config.clan_tag}/war`,
  headers: { Authorization: `Bearer ${config.token}` }
};

let webhook_options = {
  webhook_url: `${config.webhook_url}`,
  avatar_url: `${config.avatar_url}`,
  headers: { "Content-Type": "application/json" },
};


request(options, function (error, response, body) {
  if (error) throw new Error(error);
  if(response.statusCode === 200) {
    let war_data = JSON.parse(body);
    if(war_data.state == 'warDay') {
      let warday_summary = `It's war day! There are ${war_data.clan.participants} participants in this war.`;
      request
        .post(webhook_options.webhook_url)
        .form({
          username: `${config.webhook_username}`,
          content: '```css' +'\n' + warday_summary + '\n' +'```',
          avatar_url: webhook_options.avatar_url
        })
        .then(function() {
          if(war_data.clan.battlesPlayed !== war_data.clan.participants) {
            for(i = 0; i<war_data.participants.length; i++){
              if(war_data.participants[i].battlesPlayed === 0){
                request
                  .post(webhook_options.webhook_url)
                  .form({
                    username: `${config.webhook_username}`,
                    content: '```css' +'\n' +`${war_data.participants[i].name} hasn't played all his battles` + '\n' +'```',
                    avatar_url: webhook_options.avatar_url
                  })
              }
            }
          }
        })
    } else {
      let collectionday_summary = `It's collection day! There are currently ${war_data.clan.participants} participants in this war.`;
      request
        .post(webhook_options.webhook_url)
        .form({
          username: `${config.webhook_username}`,
          content: '```css' +'\n' + collectionday_summary + '\n' +'```',
          avatar_url: webhook_options.avatar_url
        })
        .then(function() {
          for(i = 0; i<war_data.participants.length; i++){
            if(war_data.participants[i].battlesPlayed !== 3){
              request
              .post(webhook_options.webhook_url)
              .form({
                username: `${config.webhook_username}`,
                content: '```css' +'\n' + `${war_data.participants[i].name} hasn't played all his battles` + '\n' +'```',
                avatar_url: webhook_options.avatar_url
              })
            }
          }
        }).catch(function(error) {
          console.log("An error happened", error);
        })
    }
  }else {
    console.log('The request failed');
  }
});