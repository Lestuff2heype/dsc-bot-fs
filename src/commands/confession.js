const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");
const admin = require("../config");
const cmdname = "Confession";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("confession")
        .setDescription("Envoie une confession anonyme")
        .addStringOption(option =>
            option.setName("confession")
                .setDescription("Confession à envoyer.")
                .setRequired(true)
        ),
        //.addStringOption(option =>
        //    option.setName("anonyme")
         //       .setDescription("Choix si la confession est anonyme.")
         //       .setRequired(true)
         //       .setChoices(
          //        {
          //         name: 'oui',
          //         value: 'yes',
          //        },
          //        {
          //          name: 'non',
           //         value: 'no',
           //       },
          //      )
      //  ),
        run: async (client, interaction) => {
        const { guild, options } = interaction;

        const confess = options.getString("confession");
        //const oui = options.get('oui').value
        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: | Confession envoyée avec succès:**")
            .addFields({ name: "Confession:", value: `${confess}`, inline: true })
            .setColor(0x5fb041)
            .setTimestamp();

            interaction.member.send({ embeds: [succesEmbed], ephemeral: true });
            log(`${interaction.user.tag} à envoyé une confession. Sa confession est: ${confess}`)

        const confessEmbed = new EmbedBuilder()
            .setTitle("Nouvelle confession:")
            .addFields({ name: "Confession:", value: `${confess}`, inline: true})
            .setColor(0x5fb041)
            .setTimestamp();

        await guild.channels.cache.get('1042778162171494420').send({
            embeds: ([confessEmbed]),
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: ":white_check_mark: | Votre confession a bien été envoyée.", ephemeral: true });
    }
}