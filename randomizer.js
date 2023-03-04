const axios = require('axios');
const API_KEY = 'your-api-key';
const STEAM_ID = 'your-steam-id';

function minToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;
    return `${hours} hours and ${remainderMinutes} minutes`
}

axios({
    method: 'GET',
    url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + STEAM_ID + '&format=json'
})
    .then(function (response) {
        const games = response.data.response.games;
        const gameData = games.map(game => ({ name: game.name, playtime_forever: game.playtime_forever }));
        const randomIndex = Math.floor(Math.random() * gameData.length);
        const randomGame = gameData[randomIndex];
        const name = randomGame.name;
        const playtimeMinutes = randomGame.playtime_forever;
        const playtimeHours = minToHours(playtimeMinutes);
        console.log(`Random game: ${name} - Playtime: ${playtimeHours}`)
    })