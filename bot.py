import os
import datetime
import discord
from discord.ext import commands

# ⚡ Initialize Bot Matrix Node
bot = commands.Bot(command_prefix="!", intents=discord.Intents.all())

@bot.event
async def on_ready():
    print("---")
    print(f"📡 MAINFRAME ONLINE // Connected as: {bot.user.name} ({bot.user.id})")
    print("🟢 Status Vector: SECURE")
    print("---")

@bot.command(name="logwin")
@commands.has_permissions(administrator=True)
async def log_client_payout(ctx, volume: str = "3200", unit: str = "USDT"):
    """
    Streams a secure ledger validation embed directly to the community channels.
    Matches the premium institutional branding arrays of Tradingmariellang-web3.
    """
    embed = discord.Embed(
        title="⚡ [ SYSTEM PAYOUT LEDGER // VERIFIED ]",
        description="A multi-asset routing vector has completed secure clearing on the decentralized rail network.",
        color=0x22e565,  # Premium green accent hex code
        timestamp=datetime.datetime.utcnow()
    )
    
    # Structural Data Anchors
    embed.add_field(name="💰 Allocation Matrix", value=f"`+{volume} {unit.upper()}`", inline=False)
    embed.add_field(name="🟢 Status Vector", value="`FILLED / COMPLETE`", inline=True)
    embed.add_field(name="⛽ Transaction Surcharge", value="`0.00 TRX (TRC-20)`", inline=True)
    embed.add_field(name="🔗 Ledger Verification Node", value="`[TXppY67...NScNp](https://tronscan.org/)`", inline=False)
    
    embed.set_footer(text="Tradingmariellang-web3 // Mainframe Deployment Node")
    
    # Wipe the trigger text command to keep the terminal channel spotless
    try:
        await ctx.message.delete()
    except discord.Forbidden:
        print("⚠️ Warning: Bot lacks 'Manage Messages' permission to delete the trigger command.")
        
    await ctx.send(embed=embed)

@bot.command(name="sysstatus")
async def system_status(ctx):
    """Provides a quick health check of the mainframe node connectivity."""
    latency = round(bot.latency * 1000)
    embed = discord.Embed(
        title="🖥️ [ MAINFRAME NODE STATUS ]",
        description="Operational matrices are within nominal thresholds.",
        color=0x00bcff, # Premium Cyan Accent
        timestamp=datetime.datetime.utcnow()
    )
    embed.add_field(name="📡 Gateway Latency", value=f"`{latency}ms`", inline=True)
    embed.add_field(name="🎛️ Core Engine", value="`ONLINE // ACTIVE`", inline=True)
    embed.set_footer(text="Tradingmariellang-web3 // Diagnostic Layer")
    await ctx.send(embed=embed)

# 🔒 Secure token extraction via system environment variables
BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")

if __name__ == "__main__":
    if not BOT_TOKEN:
        print("❌ CRITICAL ERROR: 'DISCORD_BOT_TOKEN' variable not found in system environment.")
        print("Please set your token variable before launching the mainframe node.")
    else:
        bot.run(BOT_TOKEN)
