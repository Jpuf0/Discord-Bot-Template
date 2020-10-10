const { Command } = require('discord-akairo');
const { Canvas } = require("canvas-constructor")
const { resolve, join } = require("path");
const Discord = require('discord.js');
const fetch = require("isomorphic-fetch");
const moment = require("moment");
require("moment-duration-format")
Canvas.registerFont(resolve(join(__dirname, "../../fonts/SamsungSans-Light.ttf")), "Discord");


class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: [ 'profile', 'rank' ],
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
                    'Shows A Profile card',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message, args){

        async function profile(member, self){
            //const { level, points } = this.client.points.get(key);
            // We're grabbing the body out of snekfetch's get method, but at the same time we're assigning a variable
            // to it, avatar.
            // Remember when I mentioned the regex before? Now we get to use it, we want to set the size to 128 pixels,
            // instead of 2048 pixels.
            try {
                const result = await fetch(`${message.author.displayAvatarURL({ format: 'png' })}?size=1024`);
                if (!result.ok) throw new Error("Failed to get the avatar.");
                const avatar = await result.buffer();
                const _JoinDate = message.guild.members.cache.get(message.author.id).joinedTimestamp;
                //const _level = this.client.points.get(`${message.guild.id}-${message.author.id}`, "level")
                //const _points = this.client.points.get(`${message.guild.id}-${message.author.id}`, "points")
                //const _level = globalThis.client.points.get(`${message.guild.id}-${message.author.id}`, "level")
                //const _points = globalThis.client.points.get(`${message.guild.id}-${message.author.id}`, "points")
                const _level = self.client.points.get(`${message.guild.id}-${message.author.id}`, "level")
                const _points = self.client.points.get(`${message.guild.id}-${message.author.id}`, "points")
                // The reason for the displayName length check, is we don't want the name of the user going outside
                // the box we're going to be making later, so we grab all the characters from the 0 index through
                // to the 17th index and cut the rest off, then append `...`.
                const name = member.length > 20 ? member.substring(0, 9) + "..." : member;
                /*return new Canvas(400, 180)
                    //.addText("string", horisontal, vertial)
                    .setColor("#7289DA")//set rect color to #7289DA blurple
                    .addRect(84, 0, 316, 180) //right
                    .setColor("#2C2F33")//set rect color to #2C2F33 black that isnt black
                    .addRect(0, 0, 84, 180) //left
                    .addRect(169, 26, 231, 46) //top right
                    .addRect(224, 108, 176, 46) //bottom right
                    .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
                    .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
                    .setShadowBlur(10) // Blur the shadow by 10.
                    //.addCircle(84, 90, 62)
                    //.addCircularImage(avatar, 20, 26, 64)
                    .addCircularImage(avatar, 85, 74, 64)//add circular image of avatar
                    .save()
                    //.createBeveledClip(20, 138, 138, 32, 5)
                    .createBeveledClip(20, 142, 138, 32, 5)//create name space
                    .setColor("#23272A")//set color to #23272A gray that isnt quite gray
                    .fill()
                    .restore()
                    .setTextAlign("center")//center text
                    .setTextFont("15pt Discord")//set font size
                    .setColor("#FFFFFF")//set font color to white
                    .addText(name, 80, 163)//add the users name
                    .setTextFont()
                    //.addText("Server Join Date", 240, 55)
                    .setTextFont("17pt Discord")//set font size
                    .addText(`Level: ${_level}`, 355, 127)
                    .addText(`Points: ${_points}`, 337, 150)
                    //text bottom, make neater and bring back the join date 
                    //.addText(`${moment.utc(_JoinDate).format('hh:mm')}`, 360, 46)
                    //.addText(`${moment.utc(_JoinDate).format('DD/MM/YYYY')}`, 340, 64)
                    .setAntialiasing('MSAA')
                    .toBuffer()//send the data to a buffer*/
                
                
                /*return new Canvas(800, 360)
                    //.addText("string", horisontal, vertial)
                    .setColor("#7289DA")//set rect color to #7289DA blurple
                    .addRect(168, 0, 632, 360) //right
                    .setColor("#2C2F33")//set rect color to #2C2F33 black that isnt black
                    .addRect(0, 0, 168, 360) //left
                    .addRect(338, 52, 462, 92) //top right
                    //.addRect(224, 108, 176, 46) //bottom right
                    .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
                    .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
                    .setShadowBlur(20) // Blur the shadow by 10.
                    //.addCircle(84, 90, 62)
                    //.addCircularImage(avatar, 20, 26, 64)
                    .addCircularImage(avatar, 170, 148, 128)//add circular image of avatar
                    .save()
                    //.createBeveledClip(20, 138, 138, 32, 5)
                    .createBeveledClip(40, 284, 276, 64, 10)//create name space
                    .setColor("#23272A")//set color to #23272A gray that isnt quite gray
                    .fill()
                    .restore()
                    .setTextAlign("center")//center text
                    .setTextFont("30pt Discord")//set font size
                    .setColor("#FFFFFF")//set font color to white
                    .addText(name, 160, 326)//add the users name
                    .setTextFont("39px Discord")
                    .addText("Server Join\n     Date", 460, 90)
                    .setTextFont("26pt Discord")//set font size
                    .addText(`${moment.utc(_JoinDate).format('hh:mm')}`, 725, 96)
                    .addText(`${moment.utc(_JoinDate).format('DD/MM/YYYY')}`, 681, 128)
                    .setAntialiasing('MSAA')
                    .toBuffer()//send the data to a buffer
                    */
                return new Canvas(800, 360)
                    .setColor("#7289DA")//set rect color to #7289DA blurple
                    .addRect(168, 0, 632, 360) //right
                    .setColor("#2C2F33")//set rect color to #2C2F33 black that isnt black
                    .addRect(0, 0, 168, 360) //left
                    .addRect(338, 52, 462, 92) //top right
                    .addRect(448, 216, 352, 92) //bottom right
                    .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
                    .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
                    .setShadowBlur(20) // Blur the shadow by 10.
                    //.addCircle(84, 90, 62)
                    //.addCircularImage(avatar, 20, 26, 64)
                    .addCircularImage(avatar, 170, 148, 128)//add circular image of avatar
                    .save()
                    //.createBeveledClip(20, 138, 138, 32, 5)
                    .createBeveledClip(40, 284, 276, 64, 10)//create name space
                    .setColor("#23272A")//set color to #23272A gray that isnt quite gray
                    .fill()
                    .restore()
                    .setTextAlign("center")//center text
                    .setTextFont("30pt Discord")//set font size
                    .setColor("#FFFFFF")//set font color to white
                    .addText(name, 160, 326)//add the users name
                    .addText(`Level: ${_level}`, 715, 255)
                    .addText(`Points: ${_points}`, 684, 300)
                    //.setTextFont("39px Discord")
                    .addText("Server Join\n    Date", 460, 87)
                    //.setTextFont("26pt Discord")//set font size
                    .addText(`${moment.utc(_JoinDate).format('hh:mm')}`, 725, 90)
                    .addText(`${moment.utc(_JoinDate).format('DD/MM/YYYY')}`, 681, 132)
                    .setAntialiasing('MSAA')
                    .toBuffer()//send the data to a buffer
                    // ...
            } catch (error) {
                await message.channel.send(`Something happened: ${error.message}`);
            }
        }

        if(message.guild) {
            const buffer = await profile(message.author.username, this);
            const filename = `profile-${message.author.username}.jpg`;
            const attachment = new Discord.MessageAttachment(buffer, filename);
            await message.channel.send(attachment);
        }

    }
}
module.exports = ProfileCommand;

