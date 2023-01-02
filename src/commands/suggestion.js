const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("Suggerer quelque chose.")
        .addStringOption(option =>
            option.setName("suggestion")
                .setDescription("Suggestion que vous souhaitez faire.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Plus d'infos ?")
                .setRequired(false)
        ),

        run: async (client, interaction) => {
        const { guild, options, member } = interaction;

        const name = options.getString("suggestion");
        const description = options.getString("description") || "Aucune info supplémentaire.";

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Suggestion par: ${member}`)
            .addFields(
                { name: "Suggestion", value: `${name}` },
                { name: "Description", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get('995455241862520904').send({
            embeds: ([embed]),
        }).then((s) => {
            s.react('✅');
            s.react('❌');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: ":white_check_mark: | Votre suggestion a bien été envoyée.", ephemeral: true });
    }
}