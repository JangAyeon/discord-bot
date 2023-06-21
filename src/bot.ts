import { Client } from "discord.js";
import config from "./config"

export const client = new Client({
  intents:["GUILDS", "GUILD_MESSAGES","DIRECT_MESSAGES"]
})

client.once("reday",()=>{
  console.log("Discord bot is not ready")
})

client.on("interactionCreate", async interaction =>{
  if(!interaction.isCommand()){
    return
  }
  const {commandName}=interaction;
  if(commandName==="ping"){
    return interaction.reply("pong")
  }
})

client.login(config.DISCORD_TOKEN)