const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class OwOCommand extends Command {
    constructor() {
        super('owo', {
            aliases: [ 'owoify', 'owo' ],
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
                    id: '_text',
                    type: 'string',
                    default: null,
                }
            ],
            description: {
                content: [
                    'OwOifys your text',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message, args){
        let text = Array.from(message.content);
        
        let stutterChance = 0.1
        let prefixChance = 0.05
        let suffixChance = 0.15    

        let words = {
            love: 'wuv',
            mr: 'mistuh',
            dog: 'doggo',
            cat: 'kitteh',
            hello: 'henwo',
            hell: 'heck',
            fuck: 'fwick',
            fuk: 'fwick',
            shit: 'shoot',
            friend: 'fwend',
            stop: 'stawp',
            god: 'gosh',
            dick: 'peepee',
            penis: 'peepee'
        }
        let suffixes = [
            '(ﾉ´ з `)ノ',
            '( ´ ▽ ` ).｡ｏ♡',
            '(´,,•ω•,,)♡',
            '(*≧▽≦)',
            'ɾ⚈▿⚈ɹ',
            '( ﾟ∀ ﾟ)',
            '( ・ ̫・)',
            '( •́ .̫ •̀ )',
            '(▰˘v˘▰)',
            '(・ω・)',
            '✾(〜 ☌ω☌)〜✾',
            '(ᗒᗨᗕ)',
            '(・`ω´・)',
            ':3',
            '>:3',
            'hehe',
            'xox',
            '>3<',
            'murr~',
            'UwU',
            '*gwomps*'
        ]
        let prefixes = [
            'OwO',
            'OwO whats this?',
            '*unbuttons shirt*',
            '*nuzzles*',
            '*waises paw*',
            '*notices bulge*',
            '*blushes*',
            '*giggles*',
            'hehe'
        ]

        function replaceAll (text, map) {
            let source = Object.keys(map).map(i => `\\b${i}`)
            let re = new RegExp(`(?:${source.join(')|(?:')})`, 'gi')
            return text.replace(re, match => {
                let out = map[match.toLowerCase()]
                // Not very tidy way to work out if the word is capitalised
                if ((match.match(/[A-Z]/g) || []).length > match.length / 2) out = out.toUpperCase()
                return out
            })
        }

        function owoify (text) {
            text = replaceAll(text, words)
            // OwO
            text = text.replace(/[rl]/gi, match =>
                match.charCodeAt(0) < 97 ? 'W' : 'w'
            )
            // Nya >;3
            text = text.replace(/n[aeiou]/gi, match =>
                `${match[0]}${match.charCodeAt(1) < 97 ? 'Y' : 'y'}${match[1]}`
            )
            // Words that end in y like cummy wummy
            text = text.replace(/\b[A-V,X-Z,a-v,x-z]\w{3,}y\b/gi, match =>
                `${match} ${match.charCodeAt(0) < 97 ? 'W' : 'w'}${match.slice(1)}`
            )
            // S-stutter
            text = text.split(' ').map(word => {
                if (word.length === 0 || word[0].match(/[a-zA-Z]/) == null) return word
                while (Math.random() < stutterChance) {
                    word = `${word[0]}-${word}`
            }
            return word
            }).join(' ')
            // Prefixes
            if (Math.random() < prefixChance) {
                text = `${text} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`
            }
            // Suffixes
            if (Math.random() < suffixChance) {
                text = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${text}`
            }
            return text
        }

        var _message = `${message.content}`
        var _message_ = _message.split(' ')
        //console.log(_message_.splice(0, 2))
        _message_.splice(0, 1)
        message.channel.send(owoify(_message_.join(" ")))
    }
}
module.exports = OwOCommand;