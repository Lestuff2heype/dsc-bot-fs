const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprime un nombre de message.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('nombre')
        .setDescription('Nombre de messages à supprimer.')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('utilisateur')
        .setDescription('Sélectionnez un utilisateur.')
        .setRequired(false)
        ),

        run: async (client, interaction) => {
        const {channel, options} = interaction;

        const amount = options.getInteger('nombre');
        const target = options.getUser("utilisateur");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041) //vert

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`J'ai supprimé ${messages.size} de ${target}.`);
                interaction.reply({embeds: [res]});
                log(`${interaction.user.tag} à supprime ${messages.size} venant de ${target}.`)
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`J'ai supprimé ${messages.size} message sur ce salon.`);
                interaction.reply({embeds: [res]});
                log(`${interaction.user.tag} à supprime ${messages.size} message(s).`)
            });
        }
    }
}