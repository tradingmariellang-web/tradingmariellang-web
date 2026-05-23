import os

# ... [Keep all your existing bot commands and setup above exactly the same] ...

# 🔒 Secure token extraction via system environment variables
BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")

if __name__ == "__main__":
    if not BOT_TOKEN:
        print("❌ CRITICAL ERROR: 'DISCORD_BOT_TOKEN' variable not found in system environment.")
        print("Please set your token variable before launching the mainframe node.")
    else:
        bot.run(BOT_TOKEN)
@bot.command(name="logwin")
@commands.has_permissions(administrator=True)
async def log_win(ctx, amount: str = "3200", asset: str = "USDT"):
    """Logs a verified system payout milestone to the community channel."""
    embed = discord.Embed(
        title="⚡ [ MAINFRAME TRANSACTION // VERIFIED ]",
        description="A secure web3 multi-asset payout execution layer has been successfully processed.",
        color=0x22e565, # Premium Green Accent Color from your layout
        timestamp=datetime.datetime.utcnow()
    )
    embed.add_field(name="💰 Allocation Stream", value=f"`+{amount} {asset.upper()}`", inline=False)
    embed.add_field(name="🟢 Status", value="`EXECUTION SUCCESSFUL // FILLED`", inline=True)
    embed.add_field(name="⛽ Network Fee", value="`0.00 TRX (TRC-20 Rail)`", inline=True)
    embed.set_footer(text="Tradingmariellang-web3 // Ledger Validation Engine")
    
    # Optional: If you want a quick link to a mock block explorer
    embed.add_field(name="🔗 Registry Node", value="`[View on Block Explorer](https://tronscan.org/)`", inline=False)
    
    await ctx.message.delete() # Cleans up the raw trigger command
    await ctx.send(embed=embed)
    import discord
from discord.ext import commands
import datetime

# Setup command matrix mapping
bot = commands.Bot(command_prefix="!", intents=discord.Intents.all())

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
        color=0x22e565, # Exact premium green hex code matching your UI
        timestamp=datetime.datetime.utcnow()
    )
    
    # Structural Data Anchors
    embed.add_field(name="💰 Allocation Matrix", value=f"`+{volume} {unit.upper()}`", inline=False)
    embed.add_field(name="🟢 Status Vector", value="`FILLED / COMPLETE`", inline=True)
    embed.add_field(name="⛽ Transaction Surcharge", value="`0.00 TRX (TRC-20)`", inline=True)
    embed.add_field(name="🔗 Ledger Verification Node", value="`TXppY67...NScNp`", inline=False)
    
    embed.set_footer(text="Tradingmariellang-web3 // Mainframe Deployment Node")
    
    # Wipe the trigger text command to keep the terminal channel spotless
    try:
        await ctx.message.delete()
    except discord.Forbidden:
        pass
        
    await ctx.send(embed=embed)
    
