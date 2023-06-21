import {SlashCommandBuilder} from "@discordjs/builders"
import { CommandInteraction, Client, TextChannel } from "discord.js"

export const data = new SlashCommandBuilder().setName("help").setDescription("Create a new help Ticket").addStringOption((option)=>option.setName("description").setDescription("tell me your problem").setRequired(true))


export async function execute(interaction:CommandInteraction, client:Client){
  if(!interaction?.channelId){return}
  const channel = await client.channels.fetch(interaction.channelId)
  if(!channel|| channel.type!=="GUILD_TEXT"){return}
  const thread = await (channel as TextChannel).threads.create({
    name:`support-${Date.now()}`,
    reason:`Support ticket ${Date.now()}`
  })

  const problemDescription = interaction.options.getString("description")!
  const {user} =  interaction;
  thread.send(`**User:** <@${user}>
  **Problem:** ${problemDescription}`);

  //Todo: create ticket and store it in firebase

  return interaction.reply({
    content:"help is on the way",
    ephemeral:true,
  })
}