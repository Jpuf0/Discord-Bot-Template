const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MagicBallCommand extends Command {
    constructor() {
        super('8ball', {
            aliases: [ '8ball', "ball" ],
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
                    default: "daily",
                }
            ],
            description: {
                content: [
                    'randomly roles a phrase like an 8 ball',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message, args){
        if (args.type === null || args.type == ""){
            message.channel.send("You need to enter a message.")
            return;
        }

        switch (args.type) {
            case 'yiff':
                var _response = [
                    "as i see it, yes.", 
                    "ask again watew.",
                    "bettew nyot teww chu nyow.",
                    "cannyot pwedict nyow.",
                    "concentwate and ask again.",
                    "don’t count on it.",
                    "it is cewtain.",
                    "it is decidedwy so.",
                    "most wikewy.",
                    "my wepwy is nyo.",
                    "my souwces say nyo.",
                    "outwook nyot so good.",
                    "outwook good.",
                    "wepwy hazy, twy again.",
                    "signs point to yes.",
                    "vewy doubtfuw.",
                    "without a doubt.",
                    "yes.",
                    "yes – definyitewy.",
                    "you mway wewy on it."
                ]
            default:
                var _response = [
                    "As I see it, yes.", 
                    "Ask again later.",
                    "Better not tell you now.",
                    "Cannot predict now.",
                    "Concentrate and ask again.",
                    "Don’t count on it.",
                    "It is certain.",
                    "It is decidedly so.",
                    "Most likely.",
                    "My reply is no.",
                    "My sources say no.",
                    "Outlook not so good.",
                    "Outlook good.",
                    "Reply hazy, try again.",
                    "Signs point to yes.",
                    "Very doubtful.",
                    "Without a doubt.",
                    "Yes.",
                    "Yes – definitely.",
                    "You may rely on it.",]
                break;
        }
        
        const _response_length = _response.length
        const random_number = Math.floor(Math.random() * _response_length)
        const _response_splash = _response[random_number]
        message.channel.send(":8ball: The 8 Ball Says: " + _response_splash)
    }
}

module.exports = MagicBallCommand;