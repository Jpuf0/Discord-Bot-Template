const { Listener } = require('discord-akairo');
const fs = require("fs")
//const config = require('../config'); // Config File
//var guildConf = require('../guildconfig.json');

class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {

        console.log(`Joined ${guild.name} (${guild.id})`);
        /*
        if (!guildConf[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
        guildConf[guild.id] = {
            prefix: config.prefix
        }
        }
        fs.writeFile('./storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
            if (err) console.log(err)
        })*/
    }
}

module.exports = GuildCreateListener;