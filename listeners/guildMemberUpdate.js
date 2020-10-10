const { Listener } = require('discord-akairo');

class GuildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    async exec(oldMember, newMember) {
        let a;
        if (newMember.user.bot) {
            return null;
        }


        if (oldMember.nickname !== newMember.nickname) {
            const oldNick = oldMember.nickname || oldMember.user.tag;
            const newNick = newMember.nickname || newMember.user.tag;
            console.log(`User nickname changed in ${newMember.guild} => ${oldNick} is now ${newNick}`);
        }


        if (oldMember.roles.cache.map(a => a).join() !== newMember.roles.cache.map(a => a).join()) {
            let role, action, r;
            if (oldMember.roles.cache.size > newMember.roles.cache.size) {
                role = oldMember.roles.cache.filter((r) => !newMember.roles.cache.get(r.id));
                action = 'Role Removed';
            } else {
                role = newMember.roles.cache.filter((r) => !oldMember.roles.cache.get(r.id));
                action = 'Role Added';
            }
            console.log(`${action} in ${newMember.guild} for ${newMember.user.tag} => ${role.first().name} (${role.first().id})`);
        }

        return null;
    }
}

module.exports = GuildMemberUpdateListener;