const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const express = require('express');
const app = express();

// Keep alive
app.get('/', (req, res) => res.send("Bot está rodando!"));
app.listen(3000, () => console.log("Keep-alive ativo!"));

// Bot Config
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});

// Slash commands
const commands = [
  {
    name: "ping",
    description: "Retorna o ping do bot!"
  }
];

client.once('ready', () => {
  console.log(`Bot logado como ${client.user.tag}`);
});

// Interações com comandos
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong!");
  }
});

// Registrar comandos no Discord
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("Comandos registrados!");
  } catch (err) {
    console.log("Erro ao registrar comandos:", err);
  }
})();

client.login(process.env.TOKEN);
