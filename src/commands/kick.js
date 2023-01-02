const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick un utilisateur du serveur.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("utilisateur")
                .setDescription("Utilisateur à kick.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("Raison du kick.")
        ),

        run: async (client, interaction) => {
        const { channel, options } = interaction;

        const utilisateur = options.getUser("utilisateur");
        const raison = options.getString("raison") || "Aucune raison fournis.";

        const member = await interaction.guild.members.fetch(utilisateur.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Vous ne pouvez pas kick ${utilisateur.username} puisqu'il a un rôle supérieur.`)
            .setColor("#FF0000")
            log(`${interaction.user.tag} à voulu kick ${utilisateur.tag} mais il est supérieur a lui.`)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(raison);

        const embed = new EmbedBuilder()
            .setColor(0x5fb041)
            .setDescription(`J'ai kick ${utilisateur} pour cette raison: ${raison}`);
            log(`${interaction.user.tag} à kick: ${utilisateur}, avec comme raison: ${raison}`)

        await interaction.reply({
            embeds: [embed],
        });
    }
}