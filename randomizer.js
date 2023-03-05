const axios = require('axios');
const API_KEY = '';
const STEAM_ID = '';

function minToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;
    return `${hours} hours and ${remainderMinutes} minutes`
}

axios({
    method: 'GET',
    url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + STEAM_ID + '&format=json&include_appinfo=1'
})
    .then(function (response) {
        const games = response.data.response.games;
        const gameData = games.map(games => ({ name: games.name, playtime_forever: games.playtime_forever }));
        const randomIndex = Math.floor(Math.random() * gameData.length);
        const randomGame = gameData[randomIndex];
        const name = randomGame.name;
        const playtimeMinutes = randomGame.playtime_forever;
        const playtimeHours = minToHours(playtimeMinutes);
        console.log(`Random game: ${name} - Playtime: ${playtimeHours}`)
    })