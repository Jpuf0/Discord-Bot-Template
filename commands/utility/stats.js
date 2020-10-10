const { Command } = require('discord-akairo');
const { version } = require('discord.js');
const si = require('systeminformation');
const os = require('os')
const moment = require("moment");
require("moment-duration-format");

class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: [ 'stats',],
            category: 'utility',
            ownerOnly: false,
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
        const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs], S [ms]");
        const p = this.client.settings.get(message.guild.id, 'prefix') || v2.prefix || this.handler.prefix
        message.channel.send(
            `= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2) + "/" + (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
• CPU Usage  :: ${((await si.processLoad("node")).cpu).toFixed(3)} %
• Uptime     :: ${duration}
• Prefix     :: ${p}
• Shards     :: ${this.client.options.shardCount.toLocaleString()}
• Users      :: ${this.client.users.cache.size.toLocaleString()}
• Servers    :: ${this.client.guilds.cache.size.toLocaleString()}
• Channels   :: ${this.client.channels.cache.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: "asciidoc"}
        );
    }
}
module.exports = StatsCommand;