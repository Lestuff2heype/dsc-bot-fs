const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban un utilisateur du serveur.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("idutilisateur")
                .setDescription("ID Discord de l'utilisateur à unban")
                .setRequired(true)
        ),

        run: async (client, interaction) => {
        const { channel, options } = interaction;

        const userId = options.getString("idutilisateur");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`J'ai bien unban cet id ${userId} du serveur.`)
                .setColor(0x5fb041)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            });
            log(`${interaction.user.tag} à unban cet id: ${userId}.`)
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Veuillez indiquer un ID valide.`)
                .setColor(0xc72c3b);

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
            log(`${interaction.user.tag} à voulu unban cet id: ${userId} sans succes.`)
        }
    }
}