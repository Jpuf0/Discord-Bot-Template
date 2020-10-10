const { Command } = require('discord-akairo');
const fetch = require('isomorphic-fetch');
const  config = require('../../config')
class Add_LevelCommand extends Command {
    constructor() {
        super('add_level', {
            aliases: [ 'addLevel', 'add' ],
            category: 'owner',
            ownerOnly: false,
            channel: '',
            typing: false,
            editable: false,
            cooldown: 1000,
            userPermissions: [],
            clientPermissions: [ 'SEND_MESSAGES' ],
            args: [
                {
                    id: 'user',
                    type: 'string',
                    default: null,
                },
                {
                    id: 'levels',
                    type: 'int',
                    default: null,
                },
                {
                    id: 'data',
                    type: 'string',
                    default: null,
                }
            ],
            description: {
                content: [
                    'Adds levels to User',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message, args) {
        // Limited to guild owner - adjust to your own preference!
        if(message.author.id !== message.guild.ownerID || message.author.id  !== config.ownerid) 
            return message.reply("You're not the boss of me, you can't do that!");

        console.log(args);
        const user = message.mentions.users.first() || this.client.users.cache.get(args.user);
        if(!user) return message.reply("You must mention someone or give their ID!");
        parseInt()
        const pointsToAdd = parseInt(args.levels, 10);
        if(!pointsToAdd) 
            return message.reply("You didn't tell me how many points to give...")

        // Ensure there is a points entry for this user.
        this.client.points.ensure(`${message.guild.id}-${user.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 1
        });

        // Get their current points.
        let userPoints = this.client.points.get(`${message.guild.id}-${user.id}`, "points");
        userPoints += pointsToAdd;

        // And we save it!
        this.client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")

        message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`);
    }
}

module.exports = Add_LevelCommand;