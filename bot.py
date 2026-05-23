import discord
from discord.ext import commands
import datetime
import aiohttp

# Initialize bot with standard command prefix and intents
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

# Cyberpunk Terminal UI Styling Constants
HEX_CYAN = 0x00e5ff
HEX_GREEN = 0x00ff66
HEX_DARK = 0x12131a

@bot.event
async def on_ready():
    """Triggered when the mainframe successfully connects to Discord."""
    print("==============================================")
    print(f"📡 SYSTEM STATUS: ONLINE")
    print(f"🤖 CONNECTED AS : {bot.user.name} ({bot.user.id})")
    print(f"⏰ TIMESTAMP    : {datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC")
    print("==============================================")
    
    # Set custom status activity
    await bot.change_presence(activity=discord.Activity(
        type=discord.ActivityType.watching, 
        name="Trading Flood Mainframe // !help"
    ))

@bot.command(name="status")
async def status(ctx):
    """Checks the system operational status."""
    embed = discord.Embed(
        title="[ SYSTEM STATUS // METRICS ]",
        description="All algorithmic operational nodes are currently performing within normal parameters.",
        color=HEX_GREEN,
        timestamp=datetime.datetime.utcnow()
    )
    embed.add_field(name="🛰️ Mainframe", value="`ONLINE / OPERATIONAL`", inline=True)
    embed.add_field(name="⚡ Network Latency", value=f"`{round(bot.latency * 1000)}ms`", inline=True)
    embed.set_footer(text=f"Requested by {ctx.author.name}", icon_url=ctx.author.avatar.url if ctx.author.avatar else None)
    
    await ctx.send(embed=embed)

@bot.command(name="market")
async def market(ctx, ticker: str = None):
    """Fetches real-time price tracking metadata for a specified asset."""
    if not ticker:
        embed = discord.Embed(
            title="[ SYSTEM ERROR // MISSING PARAMETER ]",
            description="❌ Please specify an asset ticker.\nExample: `!market BTC` or `!market ETH`",
            color=0xff0033
        )
        await ctx.send(embed=embed)
        return

    ticker_upper = ticker.upper()
    
    # Send an initial scanning pulse message to look professional
    scanning_msg = await ctx.send(f"```⚙️ [SCANNING] Fetching terminal data arrays for {ticker_upper}...
```")

    # Fetch live price data from public market api (CryptoCompare)
    api_url = f"https://min-api.cryptocompare.com/data/pricemultifull?fsyms={ticker_upper}&tsyms=USD"
    
    async with aiohttp.ClientSession() as session:
        async with session.get(api_url) as response:
            if response.status == 200:
                data = await response.json()
                
                # Verify if the ticker exists in the response payload
                if "RAW" in data and ticker_upper in data["RAW"]:
                    asset_data = data["RAW"][ticker_upper]["USD"]
                    
                    price = asset_data["PRICE"]
                    high_24h = asset_data["HIGH24HOUR"]
                    low_24h = asset_data["LOW24HOUR"]
                    change_24h = asset_data["CHANGEPCT24HOUR"]
                    
                    # Style based on market direction
                    embed_color = HEX_GREEN if change_24h >= 0 else 0xff0033
                    trend_icon = "📈" if change_24h >= 0 else "📉"

                    embed = discord.Embed(
                        title=f"[ MARKET DATA // {ticker_upper}-USD ]",
                        description=f"Live feed visualization metrics parsed from the Web3 data layer.",
                        color=embed_color,
                        timestamp=datetime.datetime.utcnow()
                    )
                    embed.add_field(name="💰 Current Price", value=f"`${price:,.2f}`", inline=False)
                    embed.add_field(name=f"{trend_icon} 24H Change", value=f"`{change_24h:.2f}%`", inline=True)
                    embed.add_field(name="🔺 24H High", value=f"`${high_24h:,.2f}`", inline=True)
                    embed.add_field(name="🔻 24H Low", value=f"`${low_24h:,.2f}`", inline=True)
                    embed.set_footer(text="Tradingmariellang-web3 Mainframe Engine")
                    
                    await scanning_msg.delete()
                    await ctx.send(embed=embed)
                else:
                    await scanning_msg.edit(content=f"❌ `[ERROR]` Asset code `{ticker_upper}` could not be resolved in database registries.")
            else:
                await scanning_msg.edit(content="❌ `[ERROR]` Failed to connect to secure API data stream gateways.")

# ⚠️ PLACE YOUR SECRET BOT TOKEN BELOW
# Keep this token private! Do not upload the token text directly to GitHub.
BOT_TOKEN = "YOUR_DISCORD_BOT_TOKEN_HERE"

if __name__ == "__main__":
    bot.run(BOT_TOKEN)
      MTUwNzc5OTQ3NTUzNDQzMDM0OQ.GOPyWp.Yc3UZf5gVk3iHLEL5nR-CFqUsSKQrt-1HwdUVU
