document.addEventListener("DOMContentLoaded",
// --- EXTRA CREDIT: GLOBAL SESSION MEMORY PERSISTENCE ---
function saveTerminalSession(activeTab, allocatedAmount) {
    localStorage.setItem("tm_active_tab", activeTab);
    if (allocatedAmount) {
        localStorage.setItem("tm_allocated_amount", allocatedAmount);
    }
}

function restoreTerminalSession() {
    const savedTab = localStorage.getItem("tm_active_tab");
    const savedAmount = localStorage.getItem("tm_allocated_amount");
    
    // Auto-route to the user's last visited dashboard panel
    if (savedTab && sections[savedTab]) {
        const targetLink = document.querySelector(`.menu-item[data-target="${savedTab}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
    
    // Auto-fill their calculated premium input workspace
    if (savedAmount && stakingInput) {
        stakingInput.value = savedAmount;
        calculateYield();
    }
}

// Wire persistence handlers into your existing routing links
menuLinks.forEach(link => {
    link.addEventListener("click", function() {
        saveTerminalSession(link.getAttribute("data-target"), stakingInput ? stakingInput.value : null);
    });
});

if (stakingInput) {
    stakingInput.addEventListener("input", function() {
        saveTerminalSession(document.querySelector(".menu-item.active")?.getAttribute("data-target") || "Investments", this.value);
    });
}

// Call restoration engine at the absolute bottom of your DOMContentLoaded block
restoreTerminalSession();

function () {
    
    // --- 1. Robust Tab Navigation Routing Matrix ---
    const menuLinks = document.querySelectorAll(".menu-item");
    const sections = {
        "Profile": document.getElementById("profile-section"),
        "Deposit": document.getElementById("funds-section"),
        "Verification": document.getElementById("verification-section"),
        "Notifications": document.getElementById("notifications-section"),
        "Referrals": document.getElementById("referrals-section")
    };<!-- Make sure your closing panel divs are finished above this point -->
</div> 

<!-- ======================================================================
     1. THE FIX: ADD THE OPENING SCRIPT TAG DIRECTLY BEFORE THE LOGIC
     ====================================================================== -->
<script>
document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Robust Tab Navigation Routing Matrix ---
    const menuLinks = document.querySelectorAll(".menu-item");
    const sections = {
        "Profile": document.getElementById("profile-section"),
        "Deposit": document.getElementById("funds-section"),
        "Verification": document.getElementById("verification-section"),
        "Notifications": document.getElementById("notifications-section"),
        "Referrals": document.getElementById("referrals-section")
    };

    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetText = link.textContent.trim();
            if (sections[targetText]) {
                e.preventDefault();
                menuLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");
                
                Object.values(sections).forEach(sec => { 
                    if (sec) sec.classList.add("d-none"); 
                });
                sections[targetText].classList.remove("d-none");
            }
        });
    });

    // --- 2. High-Speed Market Stream Matrix ---
    const tickerStream = document.getElementById("live-ticker-stream");

    function renderTickerData(assetsArray) {
        if (!tickerStream) return;
        tickerStream.innerHTML = "";
    let activeApy = 0;
let activeMin = 0;
let activeAssetType = "USDT"; // Default baseline tracker

tierButtons.forEach(btn => {
    btn.addEventListener("click", function() {
        // Clear active indicators on sibling components safely
        tierButtons.forEach(b => { 
            b.textContent = b.textContent.replace("▶ ", ""); 
        });
        this.textContent = "▶ " + this.textContent;
        
        activePlan = this.getAttribute("data-plan");
        activeApy = parseFloat(this.getAttribute("data-apy"));
        activeMin = parseFloat(this.getAttribute("data-min"));
        activeAssetType = this.getAttribute("data-asset") || "USDT"; // Detects BTC vs USDT
        
        planTitle.textContent = `${activePlan.toUpperCase()} (Asset: ${activeAssetType})`;
        stakingInput.value = activeMin;
        allocationDesk.classList.remove("d-none");
        
        calculateYield();
    });
});

function calculateYield() {
    const amount = parseFloat(stakingInput.value) || 0;
    const yieldGenerated = amount * (activeApy / 100);
    
    // Set dynamic fractional formatting logic depending on asset type
    const fractionDigits = activeAssetType === "BTC" ? 4 : 2;
    
    calcPremiumPayout.textContent = `${yieldGenerated.toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits, 
        maximumFractionDigits: fractionDigits
    })} ${activeAssetType}`;
    
    // Enforce high-tier macro minimum validations
    if (amount < activeMin) {
        stakingInput.style.borderColor = "#ef5350";
        confirmStakingBtn.disabled = true;
        confirmStakingBtn.style.opacity = "0.4";
        confirmStakingBtn.textContent = `UNDER MIN_ALLOCATION (${activeMin} ${activeAssetType})`;
    } else {
        stakingInput.style.borderColor = activeAssetType === "BTC" ? "#ff9500" : "#00ffcc";
        confirmStakingBtn.disabled = false;
        confirmStakingBtn.style.opacity = "1";
        confirmStakingBtn.textContent = "Deploy Capital Array";
    }
}
    
        assetsArray.forEach(asset => {
            const isTrx = asset.symbol.includes('TRX');
            const clearPrice = asset.price.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: isTrx ? 4 : 2 
            });
            const clearPercent = asset.change.toFixed(2);
            const directionalClass = asset.change >= 0 ? 'change-up' : 'change-down';
            const trendIndicator = asset.change >= 0 ? '+' : '';

            const itemHTML = `
                <div class="ticker-pair">
                    <span style="color: #8b949e; font-weight: bold;">${asset.symbol}</span>
                    <span class="ticker-price" style="color: #ffffff; font-family: monospace;">$${clearPrice}</span>
                    <span class="ticker-change ${directionalClass}">${trendIndicator}${clearPercent}%</span>
                </div>
            `;
            tickerStream.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    async function initializeProxyStream() {
        const fallbackAssets = [
            { symbol: 'BTC/USDT', price: 68422.50, change: 1.45 },
            { symbol: 'ETH/USDT', price: 3745.25, change: -0.82 },
            { symbol: 'TRX/USDT', price: 0.1224, change: 2.11 }
        ];

        try {
            const response = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,TRX&tsyms=USDT');
            if (!response.ok) throw new Error('Handshake dropped');
            
            const payload = await response.json();
            if (!payload || !payload.RAW || !payload.RAW.BTC) throw new Error('Empty footprint');

            const rawData = payload.RAW;
            const liveAssets = [
                { symbol: 'BTC/USDT', price: rawData.BTC.USDT.PRICE, change: rawData.BTC.USDT.CHANGEPCT24HOUR },
                { symbol: 'ETH/USDT', price: rawData.ETH.USDT.PRICE, change: rawData.ETH.USDT.CHANGEPCT24HOUR },
                { symbol: 'TRX/USDT', price: rawData.TRX.USDT.PRICE, change: rawData.TRX.USDT.CHANGEPCT24HOUR }
            ];

            renderTickerData(liveAssets);
            
        } catch (error) {
            const simulatedFluctuations = fallbackAssets.map(asset => {
                const variance = (Math.random() - 0.5) * 0.01;
                return {
                    symbol: asset.symbol,
                    price: asset.price * (1 + variance),
                    change: asset.change + (variance * 5)
                };
            });
            renderTickerData(simulatedFluctuations);
        }
    }

    initializeProxyStream();
    setInterval(initializeProxyStream, 10000);
});
// ======================================================================
// 2. THE FIX: CLOSE THE SCRIPT ENVELOPE PROPERLY AT THE VERY END
// ======================================================================
</script>


    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetText = link.textContent.trim();
            // Secure Check: Only route if the target exists in the current HTML view
            if (sections[targetText]) {
                e.preventDefault();
                menuLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");
                
                // Secure Check: Loop through sections safely without tossing null pointer errors
                Object.values(sections).forEach(sec => { 
                    if (sec) sec.classList.add("d-none"); 
                });
                sections[targetText].classList.remove("d-none");
            }
        });
    });

    // --- 2. High-Speed Market Stream Matrix with Absolute Fallback ---
    const tickerStream = document.getElementById("live-ticker-stream");

    // Clear and build the ticker array instantly
    function renderTickerData(assetsArray) {
        if (!tickerStream) return;
        tickerStream.innerHTML = "";
        
        assetsArray.forEach(asset => {
            const isTrx = asset.symbol.includes('TRX');
            const clearPrice = asset.price.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: isTrx ? 4 : 2 
            });
            const clearPercent = asset.change.toFixed(2);
            const directionalClass = asset.change >= 0 ? 'change-up' : 'change-down';
            const trendIndicator = asset.change >= 0 ? '+' : '';

            const itemHTML = `
                <div class="ticker-pair">
                    <span style="color: #8b949e; font-weight: bold;">${asset.symbol}</span>
                    <span class="ticker-price" style="color: #ffffff; font-family: monospace;">$${clearPrice}</span>
                    <span class="ticker-change ${directionalClass}">${trendIndicator}${clearPercent}%</span>
                </div>
            `;
            tickerStream.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    async function initializeProxyStream() {
        const fallbackAssets = [
            { symbol: 'BTC/USDT', price: 68422.50, change: 1.45 },
            { symbol: 'ETH/USDT', price: 3745.25, change: -0.82 },
            { symbol: 'TRX/USDT', price: 0.1224, change: 2.11 }
        ];

        try {
            const response = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,TRX&tsyms=USDT');
            if (!response.ok) throw new Error('Handshake dropped');
            
            const payload = await response.json();
            if (!payload || !payload.RAW || !payload.RAW.BTC) throw new Error('Empty API footprint');

            const rawData = payload.RAW;
            const liveAssets = [
                { symbol: 'BTC/USDT', price: rawData.BTC.USDT.PRICE, change: rawData.BTC.USDT.CHANGEPCT24HOUR },
                { symbol: 'ETH/USDT', price: rawData.ETH.USDT.PRICE, change: rawData.ETH.USDT.CHANGEPCT24HOUR },
                { symbol: 'TRX/USDT', price: rawData.TRX.USDT.PRICE, change: rawData.TRX.USDT.CHANGEPCT24HOUR }
            ];

            renderTickerData(liveAssets);
            
        } catch (error) {
            console.warn("[TERMINAL_CORE] Routing telemetry fallback arrays.");
            // Generate authentic baseline drift oscillations
            const simulatedFluctuations = fallbackAssets.map(asset => {
                const variance = (Math.random() - 0.5) * 0.01;
                return {
                    symbol: asset.symbol,
                    price: asset.price * (1 + variance),
                    change: asset.change + (variance * 5)
                };
            });
            renderTickerData(simulatedFluctuations);
        }
    }

    // Execute stream loops cleanly
    initializeProxyStream();
    setInterval(initializeProxyStream, 10000);

    // --- 3. Dynamic QR Wallet & Clipboard Modules ---
    const wallets = {
        usdt: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
        btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        eth: "0x71C7656EC7ab88b098defB751B7401B5f6d1476B"
    };
    
    const qrBox = document.getElementById("qrcode");
    const addrInput = document.getElementById("wallet-address-display");
    const assetSelector = document.getElementById("asset-selector");
    const copyBtn = document.getElementById("copy-address-btn");
    
    // Wrapped initialization blocks to prevent partial-page loading crashes
    if (qrBox && addrInput && typeof QRCode !== 'undefined') {
        let qr = new QRCode(qrBox, { text: wallets.usdt, width: 120, height: 120 });

        if (assetSelector) {
            assetSelector.addEventListener("change", function() {
                qr.clear(); 
                qr.makeCode(wallets[this.value]);
                addrInput.value = wallets[this.value];
            });
        }
    }

    if (copyBtn && addrInput) {
        copyBtn.addEventListener("click", function() {
            addrInput.select(); 
            navigator.clipboard.writeText(addrInput.value);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "COPIED";
            setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
        });
    }
        // --- 4. Verification Flow Simulation Engine ---
    const submitBtn = document.getElementById("submit-credentials-btn");
    const statusBadge = document.getElementById("verification-status-badge");
    const infoConsole = document.getElementById("verification-console");
    const consoleLines = document.getElementById("console-lines");
    const consoleTimer = document.getElementById("console-timer");

    if (submitBtn && statusBadge && infoConsole && consoleLines) {
        submitBtn.addEventListener("click", function() {
            // Prevent duplicate clicks while processing
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
            submitBtn.textContent = "Processing payload...";
            
            // Reveal the matrix console logs
            infoConsole.classList.remove("d-none");
            consoleLines.innerHTML = "";
            
            let logs = [
                { text: "> INIT: Handshake established with identity matrix...", delay: 0 },
                { text: "> UPLOADING: Packaging encrypted document arrays...", delay: 1000 },
                { text: "> STATUS: 45% loaded... compiling data packets", delay: 1800 },
                { text: "> STATUS: 85% loaded... parsing biometric signatures", delay: 2600 },
                { text: "> SUCCESS: 100% loaded. Gateway stream closed safely.", delay: 3500 },
                { text: "> SYS_ACTION: Routing credentials to Level 2 Verification queue.", delay: 4200 }
            ];

            // 1. Tick up a realistic microsecond clock container
            let startTime = Date.now();
            let timerInterval = setInterval(() => {
                let elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
                if (consoleTimer) consoleTimer.textContent = `${elapsed}s`;
            }, 50);

            // 2. Cascade log text entries sequentially onto screen layout
            logs.forEach(log => {
                setTimeout(() => {
                    const span = document.createElement("span");
                    if (log.text.includes("SUCCESS")) {
                        span.innerHTML = `<span class="text-green">${log.text}</span>`;
                    } else if (log.text.includes("INIT")) {
                        span.innerHTML = `<span class="text-teal">${log.text}</span>`;
                    } else {
                        span.textContent = log.text;
                    }
                    consoleLines.appendChild(span);
                }, log.delay);
            });

            // 3. Finalize: Re-route status badge states permanently after logs finish
            setTimeout(() => {
                clearInterval(timerInterval);
                if (consoleTimer) consoleTimer.textContent = "4.20s";
                
                // Update badge to Blue "UNDER_REVIEW" institutional style array
                statusBadge.textContent = "STATUS: UNDER_REVIEW";
                statusBadge.style.background = "rgba(0, 119, 255, 0.1)";
                statusBadge.style.color = "#0077ff";
                statusBadge.style.borderColor = "rgba(0, 119, 255, 0.2)";
                
                // Reset submit button context
                submitBtn.textContent = "Payload Submitted";
            }, 4300);
        });
    }
const menuLinks = document.querySelectorAll(".menu-item");

})

const targetText = link.textContent.trim();
// --- 1. Bulletproof Attribute-Based Navigation Router Matrix ---
const menuLinks = document.querySelectorAll(".menu-item");
const sections = {
    "Profile": document.getElementById("profile-section"),
    "Deposit": document.getElementById("funds-section"),
    "Withdraw": document.getElementById("funds-section"),        // Redirects to funding matrix
    "Bonuses": document.getElementById("referrals-section"),     // Routes directly to referral/bonus network
    "Verification": document.getElementById("verification-section"),
    "Settings": document.getElementById("settings-section"),
    "Transactions": document.getElementById("transactions-section")
};

menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        
        // Read the target attribute key directly, bypassing icons/text completely
        const targetRoute = link.getAttribute("data-target");
        
        if (sections[targetRoute]) {
            // Toggle active visual states on buttons
            menuLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
            
            // Hide all views cleanly
            Object.values(sections).forEach(sec => { 
                if (sec) sec.classList.add("d-none"); 
            });
            
            // Reveal the designated dashboard panel view layout
            sections[targetRoute].classList.remove("d-none");
        }
    });
});
// Inside your tier selection loop, the engine reads data-min="100000" smoothly:
activeMin = parseFloat(this.getAttribute("data-min")); // Successfully parses 100000
async function updateMarketTicker() {
    const tickerElement = document.getElementById("btc-live-price");
    try {
        // Fetch current BTC price in USD
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.bitcoin.usd.toLocaleString();
        
        // Update the UI
        tickerElement.textContent = `$${price} USD`;
        tickerElement.style.color = "var(--accent-cyan)";
    } catch (error) {
        tickerElement.textContent = "OFFLINE // RELAY ERROR";
        tickerElement.style.color = "var(--accent-magenta)";
    }
}

// Initialize: Update every 60 seconds
setInterval(updateMarketTicker, 60000);
updateMarketTicker();
async function updateMarketTicker() {
    const ticker = document.getElementById("btc-live-price");
    try {
        const res = await fetch('https://api.coing
