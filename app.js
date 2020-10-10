const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('./config');
const utils = require('./utils');
const Enmap = require('enmap');
const { threshold } = require('jimp');

class DiscordClient extends AkairoClient {
    constructor() {
        super({ ownerID: config.ownerid }, {
            disableEveryone: false,
            disabledEvents: [
                'TYPING_START',
                'USER_NOTE_UPDATE',
                'PRESENCE_UPDATE',
                'VOICE_STATE_UPDATE',
                'CHANNEL_PINS_UPDATE'
            ],
        });
        this.points = new Enmap({name: "points"});
        this.config = config;
        this.cron = false;
        this.statusMessages= [
            { type: "WATCHING", message: "over {globalguilds} Servers" },
            { type: "WATCHING", message: "Use {prefix}Help" }
        ];

        this.commandHandler = new CommandHandler(this, {
            automateCategories: true,
            commandUtilLifetime: 600000,
            directory: "./commands/",
            prefix: (message) => {
                if (message.guild) {
                    return this.settings.get(message.guild.id, 'prefix', '!');
                }
            },
            handleEdits: true,
            commandUtil: true,
            defaultCooldown: 1000,
            allowMention: true,
            argumentDefaults: {
                prompt: {
                    modifyStart: (message, text) => {
                        const embed = new Discord.MessageEmbed()
                            .setDescription(text)
                            .setColor(this.config.color)
                            .setFooter(`Type exit to cancel.`);
                        return { embed }; // const content = 'Hi'; return { embed, content }
                    },
                    modifyRetry: (message, text) => {
                        const embed = new Discord.MessageEmbed()
                            .setDescription(text)
                            .setColor(this.config.color)
                            .setFooter(`Type exit to cancel.`);
                        return { embed };
                    },
                    cancelWord: 'exit',
                    timeout: 'Time ran out, command has been cancelled.',
                    ended: 'Too many retries, command has been cancelled.',
                    cancel: 'Command has been cancelled.',
                    retry: 'I\'m a bit confused, try typing it differently?',
                    retries: 2,
                    time: 30000
                }
            },
        });
        this.inhibitorHandler = new InhibitorHandler(this, {
            automateCategories: true,
            directory: './inhibitors/',
        });
        this.listenerHandler = new ListenerHandler(this, {
            automateCategories: true,
            directory: './listeners/',
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            process: process,
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler,
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();

    }
    async login(token) {
        return super.login(token);
    }
}

const client = new DiscordClient();

client.login(config.token)