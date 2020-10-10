const { Listener } = require('discord-akairo');
const fs = require("fs")
//const config = require('../config'); // Config File
//var guildConf = require('../guildconfig.json');

class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {

        console.log(`Removed from ${guild.name} (${guild.id})`);
        /*
        delete guildConf[guild.id]; // Deletes the Guild ID and Prefix
        fs.writeFile('./storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
            if (err) console.log(err)
        })*/
    }
}

module.exports = GuildDeleteListener;