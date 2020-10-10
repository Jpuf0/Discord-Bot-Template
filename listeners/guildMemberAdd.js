const { Listener } = require('discord-akairo');
const utils = require('../utils');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {

        console.log(`User joined ${member.guild.name} => ${member.user.tag} (${member.user.id})`);


        /*// TODO: Give the user aa role?
        const role = await member.guild.roles.get("725361406190419988");
        if (role) {
            member.roles.add(role).catch(console.error);
        }


        // TODO: Welcome the user to the server?
        const welcomechannel = await member.guild.channels.get("725361406190419988");
        if (welcomechannel) {
            const msg = utils.aliasReplacer("Welcome to {guildname}, {usermention}!", this.client, welcomechannel.guild, member.user);
            if (msg && msg !== "") {
                welcomechannel.send(msg).catch(console.error);
            }
        }*/

    }
}

module.exports = GuildMemberAddListener;