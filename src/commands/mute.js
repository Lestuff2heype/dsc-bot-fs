const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const ms = require("ms");
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute un membre du serveur")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("utilisateur")
                .setDescription("Selectionnez un utilisateur.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("durée")
                .setDescription("Durée du mute.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
                .setDescription("Raison du mute.")
        ),

        run: async (client, interaction) => {
        const { guild, options } = interaction;

        const user = options.getUser("utilisateur");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("durée");
        const convertedTime = ms(time);
        const reason = options.getString("raison") || "Aucune raison fournis.";

        const errEmbed = new EmbedBuilder()
            .setDescription('Quelque chose ne va pas. Reésssayer plus tard.')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Mute**")
            .setDescription(`J'ai mute ${user}.`)
            .addFields(
                { name: "Raison", value: `${reason}`, inline: true },
                { name: "Durée", value: `${time}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            log(`${interaction.user.tag} à voulu mute ${user.tag}; sans succes`)

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
            log(`${interaction.user.tag} à mute ${user.tag} pour raison: ${reason}.`)

        if (!convertedTime)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ embeds: [succesEmbed], ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}