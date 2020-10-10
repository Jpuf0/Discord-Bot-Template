const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('isomorphic-fetch');
const { invalid } = require('moment');

class KillCommand extends Command {
    constructor() {
        super('kill', {
            aliases: [ 'kill' ],
            category: 'fun',
            ownerOnly: false,
            channel: '',
            typing: false,
            editable: false,
            cooldown: 1000,
            userPermissions: [],
            clientPermissions: [ 'SEND_MESSAGES' ],
            args: [
                {
                    id: 'type',
                    type: 'string',
                    default: null,
                }
            ],
            description: {
                content: [
                    'gets data from url',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message, args){
        const images = ['https://media1.tenor.com/images/0a14155abb57a006877f73870896dabe/tenor.gif?itemid=13754720','https://media1.tenor.com/images/d42b8c67ceb776052cadb53306dd2b12/tenor.gif?itemid=16751402','https://media1.tenor.com/images/901fb75df0b988793ff887248a29509a/tenor.gif?itemid=4893283','https://cdn.zerotwo.dev/SHOOT/a4c62263-fb0d-43d5-bfdd-53ad703817f7.gif']
        var items = images[Math.floor(Math.random() * images.length)];
        let user = message.mentions.users.first()
        const msg = new MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`${message.author.username} killed ${user.toString()}`)
            .setImage(items)
        message.channel.send(msg)
    };
} 

module.exports = KillCommand;