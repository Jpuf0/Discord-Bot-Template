const { Listener } = require('discord-akairo');
const Enmap = require('enmap');
//const utils = require('../utils');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        
        /* if (message.author.bot) {
            return;
        } */
        if (!message.guild) {
            return;
        }

        if (message.content) {

            // TODO: Filter Bad Words?
            const m = message.content.toLowerCase();
            if (m.includes('badword1') || m.includes('badword2') || m.includes('badword3')) {
                message.reply('Please don\'t use language like that in here.');
                message.delete();
                return;
            }

            // TODO: Block invites from non admins?
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                const invite = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z0-9]/gi;
                if (invite.test(message.content)) {
                    message.reply('Invites are not permitted here.');
                    message.delete();
                }
            }
            const _message = message.content
            if (message.content) {
                console.log(message.guild.name, "-", message.channel.name, "-", message.author.username,":", _message)
            }

        }
        
        if (message.guild){
            
            this.client.points.ensure(`${message.guild.id}-${message.author.id}`, {
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
                level: 1
            });

            const key = `${message.guild.id}-${message.author.id}`;
            const curLevel = Math.floor(0.1 * Math.sqrt(this.client.points.get(key, "points")));
    
            // Act upon level up by sending a message and updating the user's level in enmap.
            if (this.client.points.get(key, "level") < curLevel) {
                message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
                this.client.points.set(key, curLevel, "level");
            }
            this.client.points.inc(key, "points");

        }
    }
}

module.exports = MessageListener;