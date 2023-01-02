const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { admin } = require("../config");
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const moment = require("moment");
const cmdname = "Test";
  
  module.exports = {
      data: new SlashCommandBuilder()
          .setName('testcommande')
          .setDescription('indéfini'),
      run: async (client, interaction) => {
        if (interaction.member.id == admin) { 
          interaction.reply('<a:emo131:1042132285295693824> mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
          log(`${interaction.user.tag} a éxecuter la commande: ${cmdname}.`)
      }
      else{
        log(`${interaction.user.tag} a voulu éxecuter la commande: ${cmdname} mais il n'a pas la permission.`)
        interaction.reply({ content: '*Vous n\'avez pas la permission d\'utiliser cette commande.', ephemeral: true });
      }
      },
};
