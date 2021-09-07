//dotenv
require('dotenv').config();
token = process.env.TOKEN;

//discord libs
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const db = require('./db.json')

//função de pegar número de array aleatória
const randomize = (arr) => {
    var x = arr[Math.floor(Math.random()*arr.length)];
    return x;
}

//prefix & configs
const config = require('./config.json')
const prefix = config.prefix;

client.on('ready',()=>{
    client.user.setActivity(`a/help`);
    console.log("Bot On")
});

client.on('messageCreate', async (message)=>{
    //filtros
    if (message.author.bot)return;
    if (message.channel.type === "dm")return;
    if (!message.content.startsWith(prefix))return;
    if (message. content.startsWith(`<@!${client.user.id}>`) ||message.content.startsWith(`<@${client.user.id}>`))return;

    //divisão de comandos e argumentos
    let args = message.content.split(" ").slice(1);
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    
    try{
        //lista de comandos válidos
        switch(command) {
            case 'kiss':
                var don = message.author.username;
                if(arg = null || args == ""){
                    var kissbeij = randomize(db.kiss)
                    const exampleEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Hora do beijo')
                        .setDescription("ops te beijei " + don +" hihi❤")
                        .setImage(kissbeij)

                    await message.channel.send({ embeds: [exampleEmbed] });
                }else{
                    var kissbeij = randomize(db.kiss)
                    const exampleEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Hora do beijo')
                        .setDescription("ops " + args + ", " + don +" acaba de te beijar com tudo, hihihi❤")
                        .setImage(kissbeij)

                    await message.channel.send({ embeds: [exampleEmbed] });
                }
                console.log("kiss - " + don)
            break;
            case 'help':
                await message.channel.send("nn tem comandos");
            break;
            //comando default
            default:
                await message.channel.send("comando inválido");
            break;
        }
        //console.log(message.content);
    }catch(err){
        console.error("Erro: "+ err);
    }
});

client.login(token)