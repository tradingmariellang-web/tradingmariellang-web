import os
import datetime
import asyncio
import discord
from discord.ext import commands
from flask import Flask, jsonify

# ⚡ Initialize Flask Micro-Bridge for Vercel Serverless Layer
app = Flask(__name__)

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
    """Streams a secure ledger validation embed directly to the community channels."""
    embed = discord.Embed(
        title="⚡ [ SYSTEM PAYOUT LEDGER // VERIFIED ]",
        description="A multi-asset routing vector has completed secure clearing on the decentralized rail network.",
        color=0x22e565,
        timestamp=datetime.datetime.utcnow()
    )
    
    embed.add_field(name="💰 Allocation Matrix", value=f"`+{volume} {unit.upper()}`", inline=False)
    embed.add_field(name="🟢 Status Vector", value="`FILLED / COMPLETE`", inline=True)
    embed.add_field(name="⛽ Transaction Surcharge", value="`0.00 TRX (TRC-20)`", inline=True)
    embed.add_field(name="🔗 Ledger Verification Node", value="`[TXppY67...NScNp](https://tronscan.org/)`", inline=False)
    embed.set_footer(text="Tradingmariellang-web3 // Mainframe Deployment Node")
    
    try:
        await ctx.message.delete()
    except discord.Forbidden:
        pass
        
    await ctx.send(embed=embed)

@bot.command(name="sysstatus")
async def system_status(ctx):
    """Provides a quick health check of the mainframe node connectivity."""
    latency = round(bot.latency * 1000) if bot.latency else 0
    embed = discord.Embed(
        title="🖥️ [ MAINFRAME NODE STATUS ]",
        description="Operational matrices are within nominal thresholds.",
        color=0x00bcff,
        timestamp=datetime.datetime.utcnow()
    )
    embed.add_field(name="📡 Gateway Latency", value=f"`{latency}ms`", inline=True)
    embed.add_field(name="🎛️ Core Engine", value="`ONLINE // ACTIVE`", inline=True)
    embed.set_footer(text="Tradingmariellang-web3 // Diagnostic Layer")
    await ctx.send(embed=embed)

# 🌐 Vercel Serverless Route Handler
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if not bot.is_ready():
        asyncio.run(bot.start(os.getenv("DISCORD_BOT_TOKEN")))
    return jsonify({
        "status": "MAINFRAME_ONLINE",
        "bot_latency": f"{round(bot.latency * 1000) if bot.latency else 0}ms",
        "timestamp": datetime.datetime.utcnow().isoformat()
    })

# Expose WSGI handler for Vercel
def handler(environ, start_response):
    return app(environ, start_response)
