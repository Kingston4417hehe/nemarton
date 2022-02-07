const ms = require('ms');
const config = require("../config/config.json")

module.exports = {
        name: "gwstart",
    run: async (client, message, args) => {
        if (config["Giveaway_Options"].giveawayManagerID) {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.id === config["Giveaway_Options"].giveawayManagerID)) {
                return message.channel.send(':boom: Nincsen jogod ehhez a parancshoz');
            }
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
                return message.channel.send(':boom: Nincsen jogod ehhez a parancshoz');
            }
        }

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send(':boom: Nem találtam meg azt a channelt! Próbáld újra');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':boom: Hm. Nem állítottál be időtartamot! Próbáld újra');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send(':boom: Uh... Nem szabtad meg a győztesek számát');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(':boom: Nem adtál meg nyereményt');
        }
        if (!config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            giveawayChannel.send(`<@&${config["Giveaway_Options"].giveawayRoleID}>`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "Hátra lévő idő: **{duration}**!",
                    inviteToParticipate: "Reagálj ezzel, 🎉 hogy részt vegyél a nyereményjátékon",
                    winMessage: "Gratulálok, {winners}! Nyertél: **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Nem lett elég react ahhoz hogy sorsoljak",
                    hostedBy: "Elindítva: {általa}",
                    winners: "győztes(ek)",
                    endedAt: "Vége",
                    units: {
                        seconds: "másodperc",
                        minutes: "perc",
                        hours: "óra",
                        days: "nap",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **GIVEAWAY ENDED** :tada:",
                  
                    timeRemaining: "Hátra lévő idő: **{duration}**!",
                    inviteToParticipate: "Reagálj ezzel, 🎉 hogy részt vegyél a nyereményjátékon",
                    winMessage: "Gratulálok, {winners}! Nyertél: **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Nem lett elég react ahhoz hogy sorsoljak",
                    hostedBy: "Elindítva: {általa}",
                    winners: "győztes(ek)",
                    endedAt: "Vége",
                    units: {
                        seconds: "másodperc",
                        minutes: "perc",
                        hours: "óra",
                        days: "nap",
                        pluralS: false
                    }
                }
            });

        } else if (!config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            giveawayChannel.send(`@everyone`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "Hátra lévő idő: **{duration}**!",
                    inviteToParticipate: "Reagálj ezzel, 🎉 hogy részt vegyél a nyereményjátékon",
                    winMessage: "Gratulálok, {winners}! Nyertél: **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Nem lett elég react ahhoz hogy sorsoljak",
                    hostedBy: "Elindítva: {általa}",
                    winners: "győztes(ek)",
                    endedAt: "Vége",
                    units: {
                        seconds: "másodperc",
                        minutes: "perc",
                        hours: "óra",
                        days: "nap",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "Hátra lévő idő: **{duration}**!",
                    inviteToParticipate: "Reagálj ezzel, 🎉 hogy részt vegyél a nyereményjátékon",
                    winMessage: "Gratulálok, {winners}! Nyertél: **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Nem lett elég react ahhoz hogy sorsoljak",
                    hostedBy: "Elindítva: {általa}",
                    winners: "győztes(ek)",
                    endedAt: "Vége",
                    units: {
                        seconds: "másodperc",
                        minutes: "perc",
                        hours: "óra",
                        days: "nap",
                        pluralS: false
                    }
                }
            });
        } else if (!config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "Hátra lévő idő: **{duration}**!",
                    inviteToParticipate: "Reagálj ezzel, 🎉 hogy részt vegyél a nyereményjátékon",
                    winMessage: "Gratulálok, {winners}! Nyertél: **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Nem lett elég react ahhoz hogy sorsoljak",
                    hostedBy: "Elindítva: {általa}",
                    winners: "győztes(ek)",
                    endedAt: "Vége",
                    units: {
                        seconds: "másodperc",
                        minutes: "perc",
                        hours: "óra",
                        days: "nap",
                        pluralS: false
                    }
                }
            });
        }


        message.channel.send(`:tada: Kész! A nyereményjáték tárgya: \`${giveawayPrize}\` beindul ${giveawayChannel}!`);
    }
}