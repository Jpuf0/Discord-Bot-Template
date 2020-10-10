const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];


module.exports.aliasReplacer = function (message, client, guild, user) { //message to parse, discord Client, guild (optional), user (optional)
	let msg = message;
	//global replacers
	msg = msg.replace(/\{globalusers\}/gi, this.addCommas(this.globalUsers(client)));
	msg = msg.replace(/\{globalguilds\}/gi, this.addCommas(client.guilds.cache.size));
	msg = msg.replace(/\{prefix\}/gi, client.config.prefix);
	msg = msg.replace(/\{date\}/gi, this.datestamp());
	msg = msg.replace(/\{time\}/gi, this.simpleTimestamp());
	//guild replacers
	if (guild !== null) {
		msg = msg.replace(/\{guildname\}/gi, guild.name);
		msg = msg.replace(/\{guildusers\}/gi, this.addCommas(guild.memberCount));
		msg = msg.replace(/\{guildchannels\}/gi, this.addCommas(guild.channels.size));
		msg = msg.replace(/\{guildroles\}/gi, this.addCommas(guild.roles.size));
	}
	//user replacers
	if (user !== null) {
		msg = msg.replace(/\{userid\}/gi, user.id);
		msg = msg.replace(/\{usertag\}/gi, user.tag);
		msg = msg.replace(/\{username\}/gi, user.username);
		msg = msg.replace(/\{usermention\}/gi, `<@${user.id}>`);
		msg = msg.replace(/\{usercreated\}/gi, this.datestamp(new Date(user.createdTimestamp)));
		msg = msg.replace(/\{useravatar\}/gi, user.avatarURL({ format: 'png', size: 2048 }));
	}
	return msg;
}


module.exports.globalUsers = function (client) { // A fix because client.users.size only counts cached users
	let count = 0;
	client.guilds.cache.forEach((guild) => {
        count += guild.memberCount;
	});
	return count;
}

module.exports.guildCount = function (client) {
	let count = 0;
	client.guild.cache.forEach((guild) => {
		count += 1;
	});
	return count;
}


module.exports.datetimestamp = function (date = new Date()) {
	return `${this.datestamp(date)} | ${this.timestamp(date)}`;
}


module.exports.datestamp = function (date = new Date()) {
	return `${months[date.getMonth()]} ${this.th(date.getDate())} ${date.getFullYear()}`;
}


module.exports.timestamp = function (date = new Date()) {
	const m = date.getHours() >= 12 ? "pm" : "am";
	let hours = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
	const minutes = `0${date.getMinutes()}`;
	const seconds = `0${date.getSeconds()}`;
	if (hours === 0) {
		hours = 12;
	}
	return `${hours}:${minutes.slice(-2)}:${seconds.slice(-2)}${m}`;
}


module.exports.simpleTimestamp = function (date = new Date()) {
	const m = date.getHours() >= 12 ? "pm" : "am";
	let hours = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
	const minutes = `0${date.getMinutes()}`;
	if (hours === 0) {
		hours = 12;
	}
	return `${hours}:${minutes.slice(-2)}${m}`;
}


module.exports.th = function (num) {
    const n = String(num);
    switch (n.slice(-1)) {
        case '1':
            return `${n}st`;
        case '2':
            return `${n}nd`;
        case '3':
            return `${n}rd`;
        default:
            return `${n}th`;
    }
}


module.exports.capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}


module.exports.addCommas = (value) => {
	const parts = value.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
module.exports.formatSeconds = (seconds) => {
	return new Date(seconds * 1000).toISOString().substr(11, 8)
}
module.exports.replaceStrChar = (str, index, replacement) => {
	return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}
module.exports._findNested = (dir, pattern) => {
	let results = [];
	fs.readdirSync(dir).forEach(inner_dir => {
		inner_dir = path.resolve(dir, inner_dir);
		const stat = fs.statSync(inner_dir);
		if (stat.isDirectory()) {
			results = results.concat(this._findNested(inner_dir, pattern));
		}
		if (stat.isFile() && inner_dir.endsWith(pattern)) {
			results.push(inner_dir);
		}
	});	
	
	return results;
}

module.exports.getGuildIds = function (client) {
	const guild_size = client.guilds.cache.size;
	const guilds = client.guilds.cache;
	const guild_entries = guilds.array()
	const Arr = {}

	for(let i = 0; guild_size < i; i++){
		var _id = guild_entries[i]['id'];
		var _name = guild_entries[i]['name']
		Arr._name = _name;
		Arr._id = _id
	}
	return Arr
}