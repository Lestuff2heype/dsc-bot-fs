const { SlashCommandBuilder } = require("@discordjs/builders");
const { admin } = require("../config");
const cmdname = "Dernier update";
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update")
    .setDescription("Vous donne la date du dernier update de la map."),
    run: async (client, interaction) => {
        if (interaction.member.id == admin) { 
            interaction.reply('Dernier update de la map Roblox: **07/11/2022**')
            log(`${interaction.user.tag} a éxecuter la commande: ${cmdname}.`)
        }
        else{
            log(`${interaction.user.tag} a voulu éxecuter la commande: ${cmdname} mais il n'a pas la permission.`)
            interaction.reply({ content: '*Vous n\'avez pas la permission d\'utiliser cette commande.', ephemeral: true });
        }
    }
};