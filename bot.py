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
