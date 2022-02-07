const ms = require('ms');
const config = require("../config/config.json")
module.exports = {
        name: "reroll",
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Nincs jogod ehhez a parancshoz');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Uh! Nem találtam azt az üzenetet! Próbáld újra');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Hm. Nem látom a giveawayt `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send('Giveaway rerolled!');
            })
            .catch((e) => {
                if (e.startsWith(`A nyereményjáték messageID-val ${giveaway.messageID} még nem ért véget.`)) {
                    message.channel.send('Ez a nyereményjáték még nem ért véget');
                } else {
                    console.error(e);
                    message.channel.send('Hiba lépett fel...');
                }
            });
    },
}