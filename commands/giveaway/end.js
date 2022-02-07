module.exports = {
        name: "end",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Nincsen jogod ehhez a parancshoz.');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Uh! Nem találtam azt az üzenetet! Próbáld újra!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Hm. Nem látom a giveawayt `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.channel.send('A nyereményjáték végéig lett volna ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' ennyi perc...');
            })
            .catch((e) => {
                if (e.startsWith(`A nyereményjáték messageID-val ${giveaway.messageID} már befejeződött`)) {

                    message.channel.send('A nyereményjáték már befejeződött!');

                } else {
                    console.error(e);
                    message.channel.send('Hiba történt...');
                }
            });
    },
}