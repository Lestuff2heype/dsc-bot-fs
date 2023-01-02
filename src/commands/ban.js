const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("utilisateur")
                .setDescription("Utilisateur à bannir.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("Raison du ban.")
        ),

        run: async (client, interaction) => {
        const { channel, options } = interaction;

        const user = options.getUser("utilisateur");
        const reason = options.getString("raison") + `demande de ban par ${interaction.user.tag}` || "Aucune raison fournis.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Vous ne pouvez pas bannir ${user} il a un role plus haut que vous.`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            log(`${interaction.user.tag} à voulu bannir ${user.tag} mais ${user.tag} à un role plus haut que lui.`)

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setDescription(`J'ai banni ${user} avec pour raison: ${reason}`)
            .setColor(0x5fb041)
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        });
        log(`${interaction.user.tag} à banni ${user.tag} avec pour raison: ${reason}`)
    }
}