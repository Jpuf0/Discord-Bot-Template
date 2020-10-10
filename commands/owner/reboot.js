const { Command } = require('discord-akairo');
const { Discord } = require('discord.js');
const moment = require('moment')
require("moment-duration-format")
const { Utils, guildCount, globalUsers } = require('../../utils')

class RebootCommand extends Command {
    constructor() {
        super('reboot', {
            aliases: [ 'reboot',],
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
                    id: '_text',
                    type: 'string',
                    default: null,
                }
            ],
            description: {
                content: [
                    '',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message, args){
        await message.reply("Bot Shutting down");
        console.log(`bot shutdown: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
        this.client.destroy();
        process.exit(0)
    }
}
module.exports = RebootCommand;