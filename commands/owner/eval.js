const { Command } = require('discord-akairo');
const { inspect } = require('util');


class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: [ 'Eval', ],
            category: 'owner',
            ownerOnly: true,
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
                    'Eval Command',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message){

        const args = message.content.split(' ');
        const command = args.shift().toLowerCase();


        let evaled;
        try {
            evaled = await eval(args.join(' '));
            
            message.channel.send(inspect(evaled))
            .catch(error => {
                if(error.code == 50035){
                    // message.reply("Result Over 2000 Characters long, Check Console")
                    console.log("Error Cause: " + error.name)
                }
            });
            console.log(inspect(evaled));
        }
        catch(err) {
            console.error(err);
            message.reply(`${err}`, {code: "js"});
        }
    }
}

module.exports = EvalCommand;