import { Command } from "discord-akairo"
import { MessageEmbed, Message, GuildMember } from "discord.js"

export default class BanCommand extends Command {
    public constructor() {
        super('ban', {
            aliases: ['ban', 'bean'],
            description: {
                content: 'ban a user'
            },
            category: 'Moderation',
            ratelimit: 3,
            args:[
                {
                    id: 'member',
                    type: 'member'
                },

                {
                    id: 'reason',
                    match: 'rest',
                    default: 'No reason provided    '
                }
            ],
            userPermissions: ["BAN_MEMBERS"]
        })
    }

    public async exec(message: Message, { member, reason }: {member: GuildMember, reason: string}) {
        const cM = await message.guild.members.fetch(this.client.user!.id)

        if(!member) return message.util.send("You need to provide someone to ban")

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.util.send("You dont have sufficient permissions")

        if(!member.kickable) return message.util.send(":x: This member cant be banned")

        if(!cM.permissions.has('BAN_MEMBERS')) return message.util.send("I cant ban members")

        try {
            member.kick()
            message.util.send(`**${member.user.username}** was banned by **${message.author.username}** for **${reason}**`)
        } catch (e){
            return message.util.send(`There was an error while executing that command | Error ${e}`)
        }
    }
}