const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const Jimp = require('jimp');
const diff = require('color-diff');
const twemoji = require('twemoji');

class EmojiCommand extends Command {
    constructor() {
        super('emoji', {
            aliases: [ 'emoji', ],
            category: 'fun',
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
                    'Emojis your text',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message, args){
        let emojiRgb = [
            {R: 255, G: 255, B: 255, E: ":white_large_square:"},    // white
            {R: 0, G: 0, B: 0, E: ":black_large_square:"},          // black
            {R: 255, G: 0, B: 0, E: ":red_square:"},                // red
            {R: 0, G: 255, B: 0, E: ":green_square:"},               // green
            {R: 0, G: 0, B: 255, E: ":blue_square:"},                // blue
            {R: 253, G: 203, B: 88, E: ":yellow_square:"},           // yellow
            {R: 154, G: 78, B: 28, E: ":brown_square:"},               // brown
            {R: 102, G: 117, B: 127, E: ":new_moon:"},              // gray
            {R: 146, G: 102, B: 204, E: ":purple_square:"},         // purple
            {R: 89, G: 142, B: 60, E: ":green_apple:"},             // pepe green
            {R: 92, G: 172, B: 235, E: ":blue_circle:"}             // joy emoji tears blue
            //{R: 255, G: 255, B: 255, E: ""},
            //{R: 255, G: 255, B: 255, E: ""},
            //{R: 255, G: 255, B: 255, E: ""},
        ];

    
        if(args.length < 2){
            message.channel.send(":warning: Need one argument. A custom emoji or image url.");
            return;
        }

        // try arg as emoji
        console.log(args._text);
        var emojiName = args._text.split(":")[1];  // only get ID part from emoji
        var emoji = this.client.emojis.cache.find(e => e.name == emojiName);

        var url = "";

        if(!emoji){
            // check if image is url
            if(args._text.endsWith(".png") || args._text.endsWith(".jpg")){
                url = args._text;
            }else{
                // try use twemoji if it's a default emoji
                var text = twemoji.parse(args._text);
                if(!text.startsWith("<img")){
                    message.channel.send("Error. Only works with custom emojis from this guild / default emojis / png or jpg urls.");
                    return;
                }
                var pos = text.indexOf("src");
                text = text.substring(pos + 5);
                text = text.substring(0, text.length - 3);
                url = text;
            }
        }

        // print image if it was an emoji
        if(url == ""){
            url = emoji.url;
            message.channel.send(url);
        }else{
            message.channel.send("==================================================================");
        }

        var palette = [];
        for(var i = 0; i < emojiRgb.length; i++){
            var obj = {
                R: emojiRgb[i].R,
                G: emojiRgb[i].G,
                B: emojiRgb[i].B,
            }
            palette.push(obj);
        }
        var transColors = [];

        var imgName = "images/emoji.png";

        Jimp.read(url, (err, img) => {
            if(err){
                message.channel.send("Error. Could not read image.");
                return;
            }
            img
                .resize(30, 30)
                .write(imgName, () => {
                    // todo maybe dont re-read image
                    Jimp.read(imgName, (err, img) => {
                        if(err) throw err;
                        for(var i = 0; i < 30; i++){
                            for(var j = 0; j < 30; j++){
                                var hex = img.getPixelColor(j, i);
                                var rgb = Jimp.intToRGBA(hex);
                                var color = {
                                    R: rgb.r,
                                    G: rgb.g,
                                    B: rgb.b
                                };
                                transColors.push(diff.closest(color, palette));
                            }
                        }

                        // get emoji name for every RGB value
                        var results = [];
                        for(var i = 0; i < transColors.length; i++){
                            var e2 = Object.values(transColors[i]);

                            for(var j = 0; j < emojiRgb.length; j++){
                                var e1 = Object.values(emojiRgb[j]).slice(0, -1);
                                var e3 = false;
                                if(e1[0] == e2[0] && e1[1] == e2[1] && e1[2] == e2[2]) e3 = true;

                                if(e3){
                                    results.push(emojiRgb[j].E);
                                    break;
                                }
                            }
                        }

                        // print emojis some lines at a time
                        for(var mul = 0; mul < 10; mul++){
                            var string1 = "";
                            var string2 = "";
                            var string3 = "";
                            var base = 90 * mul;

                            for(var i = 0; i < 30; i++){
                                string1 += results[i + base];
                                string2 += results[i + 30 + base];
                                string3 += results[i + 60 + base];
                            }

                            message.channel.send(string1 + "\n" + string2 + "\n" + string3);
                        }

                    });
                });
        });
    };
}
module.exports = EmojiCommand;