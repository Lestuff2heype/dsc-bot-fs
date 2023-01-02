const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { admin, owner } = require("../config");
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");
const cmdname = "Info serveur";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serveur')
		.setDescription('Affiche les informations du serveur.'),
	run: async (client, interaction) => {
		if (interaction.member.id == admin) { 
			//let embed = new EmbedBuilder()
			//.setColor("#00FFFF")
			//.setTitle("Voici les informations du serveur.")
			//.setDescription("idk")
			//.addFields({ name: 'Nom du serveur:', value: interaction.guild.name, inline: true })
			//.addFields({ name: 'Nombre de membres:', value: interaction.guild.memberCount, inline: true })
			//.addFields({ name: 'Owner de France Secours', value: `<@${owner}>`, inline: true })
			//interaction.reply({ embeds: [embed] })
			log(`${interaction.user.tag} a éxecuter la commande: ${cmdname}.`)
			interaction.reply(`**Nom du serveur: ${interaction.guild.name}**\n**Nombre de membres: ${interaction.guild.memberCount}**\n**Owner de France Secours: <@${owner}>**\n*Le reste est en developpement.*`)
        }
        else{
            log(`${interaction.user.tag} a voulu éxecuter la commande: ${cmdname} mais il n'a pas la permission.`)
			interaction.reply({ content: '*Vous n\'avez pas la permission d\'utiliser cette commande.', ephemeral: true });
        }
	},
};