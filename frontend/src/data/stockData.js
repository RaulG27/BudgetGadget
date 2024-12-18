const stockData = {
    data: [
        { symbol: "AAPL", name: "Apple Inc." },
        { symbol: "MSFT", name: "Microsoft Corporation" },
        { symbol: "AMZN", name: "Amazon.com, Inc." },
        { symbol: "GOOG", name: "Alphabet Inc." },
        { symbol: "FB", name: "Meta Platforms, Inc." },
        { symbol: "BRK-A", name: "Berkshire Hathaway Inc." },
        { symbol: "JPM", name: "JPMorgan Chase & Co." },
        { symbol: "JNJ", name: "Johnson & Johnson" },
        { symbol: "XOM", name: "Exxon Mobil Corporation" },
        { symbol: "BAC", name: "Bank of America Corporation" },
        { symbol: "WFC", name: "Wells Fargo & Company" },
        { symbol: "V", name: "Visa Inc." },
        { symbol: "PG", name: "Procter & Gamble Company" },
        { symbol: "MA", name: "Mastercard Incorporated" },
        { symbol: "INTC", name: "Intel Corporation" },
        { symbol: "CSCO", name: "Cisco Systems, Inc." },
        { symbol: "CMCSA", name: "Comcast Corporation" },
        { symbol: "PEP", name: "PepsiCo, Inc." },
        { symbol: "KO", name: "The Coca-Cola Company" },
        { symbol: "MCD", name: "McDonald's Corporation" },
        { symbol: "MMM", name: "3M Company" },
        { symbol: "AXP", name: "American Express Company" },
        { symbol: "GS", name: "The Goldman Sachs Group, Inc." },
        { symbol: "UNH", name: "UnitedHealth Group Incorporated" },
        { symbol: "PNC", name: "The PNC Financial Services Group, Inc." },
        { symbol: "C", name: "Citigroup Inc." },
        { symbol: "USB", name: "U.S. Bancorp" },
        { symbol: "HON", name: "Honeywell International Inc." },
        { symbol: "LLY", name: "Eli Lilly and Company" },
        { symbol: "MRK", name: "Merck & Co., Inc." },
        { symbol: "NKE", name: "NIKE, Inc." },
        { symbol: "ORCL", name: "Oracle Corporation" },
        { symbol: "UPS", name: "United Parcel Service, Inc." },
        { symbol: "UTX", name: "United Technologies Corporation" },
        { symbol: "WMT", name: "Walmart Inc." },
        { symbol: "ABT", name: "Abbott Laboratories" },
        { symbol: "ACN", name: "Accenture plc" },
        { symbol: "AIG", name: "American International Group, Inc." },
        { symbol: "ALL", name: "The Allstate Corporation" },
        { symbol: "AMAT", name: "Applied Materials, Inc." },
        { symbol: "ANTM", name: "Anthem, Inc." },
        { symbol: "AON", name: "Aon plc" },
        { symbol: "APD", name: "Air Products and Chemicals, Inc." },
        { symbol: "BAX", name: "Baxter International Inc." },
        { symbol: "BDX", name: "Becton, Dickinson and Company" },
        { symbol: "BIIB", name: "Biogen Inc." },
        { symbol: "BK", name: "The Bank of New York Mellon Corporation" },
        { symbol: "BLK", name: "BlackRock, Inc." },
        { symbol: "BMY", name: "Bristol-Myers Squibb Company" },
        { symbol: "CAG", name: "ConAgra Foods, Inc." },
        { symbol: "CAT", name: "Caterpillar Inc." },
        { symbol: "CB", name: "Chubb Limited" },
        { symbol: "CCI", name: "Crown Castle International Corp." },
        { symbol: "CINF", name: "Cincinnati Financial Corporation" },
        { symbol: "CL", name: "Colgate-Palmolive Company" },
        { symbol: "CME", name: "CME Group Inc." },
        { symbol: "COF", name: "Capital One Financial Corporation" },
        { symbol: "COP", name: "ConocoPhillips" },
        { symbol: "COST", name: "Costco Wholesale Corporation" },
        { symbol: "CRM", name: "Salesforce.com, inc." },
        { symbol: "CSX", name: "CSX Corporation" },
        { symbol: "CTAS", name: "Cintas Corporation" },
        { symbol: "CTXS", name: "Citrix Systems, Inc." },
        { symbol: "CVS", name: "CVS Health Corporation" },
        { symbol: "D", name: "Dominion Energy, Inc." },
        { symbol: "DAL", name: "Delta Air Lines, Inc." },
        { symbol: "DE", name: "Deere & Company" },
        { symbol: "DFS", name: "Discover Financial Services" },
        { symbol: "DGX", name: "Quest Diagnostics Incorporated" },
        { symbol: "DHR", name: "Danaher Corporation" },
        { symbol: "DLR", name: "Digital Realty Trust, Inc." },
        { symbol: "DOV", name: "Dover Corporation" },
        { symbol: "DRE", name: "Duke Realty Corporation" },
        { symbol: "DUK", name: "Duke Energy Corporation" },
        { symbol: "DXC", name: "DXC Technology Company" },
        { symbol: "EA", name: "Electronic Arts Inc." },
        { symbol: "EBAY", name: "eBay Inc." },
        { symbol: "ECL", name: "Ecolab Inc." },
        { symbol: "ED", name: "Consolidated Edison, Inc." },
        { symbol: "EFX", name: "Equifax Inc." },
        { symbol: "EIX", name: "Edison International" },
        { symbol: "EL", name: "The Estee Lauder Companies Inc." },
        { symbol: "EMN", name: "Eastman Chemical Company" },
        { symbol: "EMR", name: "Emerson Electric Co." },
        { symbol: "EOG", name: "EOG Resources, Inc." },
        { symbol: "EQIX", name: "Equinix, Inc." },
        { symbol: "EQR", name: "Equity Residential" },
        { symbol: "ES", name: "Eversource Energy" },
        { symbol: "ESS", name: "Essex Property Trust, Inc." },
        { symbol: "ETFC", name: "E*TRADE Financial Corporation" },
        { symbol: "ETN", name: "Eaton Corporation plc" },
        { symbol: "ETR", name: "Entergy Corporation" },
        { symbol: "EW", name: "Edwards Lifesciences Corporation" },
        { symbol: "EXC", name: "Exelon Corporation" },
        { symbol: "EXPD", name: "Expeditors International of Washington, Inc." },
        { symbol: "EXR", name: "Extra Space Storage Inc." },
        { symbol: "F", name: "Ford Motor Company" },
        { symbol: "FANG", name: "Diamondback Energy, Inc." },
        { symbol: "FAST", name: "Fastenal Company" },
        { symbol: "FBHS", name: "Fortune Brands Home & Security, Inc." },
        { symbol: "FCX", name: "Freeport-McMoRan Inc." },
        { symbol: "FDX", name: "FedEx Corporation" },
        { symbol: "FE", name: "FirstEnergy Corp." },
        { symbol: "FFIV", name: "F5 Networks, Inc." },
        { symbol: "FIS", name: "Fidelity National Information Services, Inc." },
        { symbol: "FISV", name: "Fiserv, Inc." },
        { symbol: "FITB", name: "Fifth Third Bancorp" },
        { symbol: "FL", name: "Foot Locker, Inc." },
        { symbol: "FLIR", name: "FLIR Systems, Inc." },
        { symbol: "FLS", name: "Flowserve Corporation" },
        { symbol: "FMC", name: "FMC Corporation" },
        { symbol: "FRT", name: "Federal Realty Investment Trust" },
        { symbol: "FTI", name: "TechnipFMC plc" },
        { symbol: "FTV", name: "Fortive Corporation" },
        { symbol: "GD", name: "General Dynamics Corporation" },
        { symbol: "GE", name: "General Electric Company" },
        { symbol: "GILD", name: "Gilead Sciences, Inc." },
        { symbol: "GIS", name: "General Mills, Inc." },
        { symbol: "GPC", name: "Genuine Parts Company" },
        { symbol: "GPN", name: "Global Payments Inc." },
        { symbol: "GPS", name: "Gap Inc." },
        { symbol: "GRMN", name: "Garmin Ltd." },
        { symbol: "GT", name: "The Goodyear Tire & Rubber Company" },
        { symbol: "GWW", name: "W.W. Grainger, Inc." },
        { symbol: "HAL", name: "Halliburton Company" },
        { symbol: "HAS", name: "Hasbro, Inc." },
        { symbol: "HBAN", name: "Huntington Bancshares Incorporated" },
        { symbol: "HBI", name: "Hanesbrands Inc." },
        { symbol: "HCA", name: "HCA Healthcare, Inc." },
        { symbol: "HD", name: "The Home Depot, Inc." },
        { symbol: "HES", name: "Hess Corporation" },
        { symbol: "HFC", name: "HollyFrontier Corporation" },
        { symbol: "HIG", name: "The Hartford Financial Services Group, Inc." },
        { symbol: "HOG", name: "Harley-Davidson, Inc." },
        { symbol: "HP", name: "Helmerich & Payne, Inc." },
        { symbol: "HPE", name: "Hewlett Packard Enterprise Company" },
        { symbol: "HPQ", name: "HP Inc." },
        { symbol: "HRB", name: "H&R Block, Inc." },
        { symbol: "HRL", name: "Hormel Foods Corporation" },
        { symbol: "HST", name: "Host Hotels & Resorts, Inc." },
        { symbol: "HSY", name: "The Hershey Company" },
        { symbol: "HUM", name: "Humana Inc." },
        { symbol: "IBM", name: "International Business Machines Corporation" },
        { symbol: "ICE", name: "Intercontinental Exchange, Inc." },
        { symbol: "IDXX", name: "IDEXX Laboratories, Inc." },
        { symbol: "IFF", name: "International Flavors & Fragrances Inc." },
        { symbol: "ILMN", name: "Illumina, Inc." },
        { symbol: "INCY", name: "Incyte Corporation" },
        { symbol: "INFO", name: "IHS Markit Ltd." },
        { symbol: "INTU", name: "Intuit Inc." },
        { symbol: "IP", name: "International Paper Company" },
        { symbol: "IPG", name: "Interpublic Group of Companies, Inc." },
        { symbol: "IPHI", name: "Inphi Corporation" },
        { symbol: "IR", name: "Ingersoll-Rand plc" },
        { symbol: "IRM", name: "Iron Mountain Incorporated" },
        { symbol: "ISRG", name: "Intuitive Surgical, Inc." },
        { symbol: "IT", name: "Gartner, Inc." },
        { symbol: "ITW", name: "Illinois Tool Works Inc." },
        { symbol: "IVZ", name: "Invesco Ltd." },
        { symbol: "JCI", name: "Johnson Controls International plc" },
        { symbol: "JEC", name: "Jacobs Engineering Group Inc." },
        { symbol: "JNPR", name: "Juniper Networks, Inc." },
        { symbol: "K", name: "Kellogg Company" },
        { symbol: "KEY", name: "KeyCorp" },
        { symbol: "KEYS", name: "Keysight Technologies, Inc." },
        { symbol: "KHC", name: "The Kraft Heinz Company" },
        { symbol: "KMB", name: "Kimberly-Clark Corporation" },
        { symbol: "KMI", name: "Kinder Morgan, Inc." },
        { symbol: "KO", name: "The Coca-Cola Company" },
        { symbol: "KR", name: "The Kroger Co." },
        { symbol: "KSS", name: "Kohl's Corporation" },
        { symbol: "KSU", name: "Kansas City Southern" },
        { symbol: "L", name: "Loews Corporation" },
        { symbol: "LB", name: "L Brands, Inc." },
        { symbol: "LDOS", name: "Leidos Holdings, Inc." },
        { symbol: "LEG", name: "Leggett & Platt, Incorporated" },
        { symbol: "LEN", name: "Lennar Corporation" },
        { symbol: "LH", name: "Laboratory Corporation of America Holdings" },
        { symbol: "LHX", name: "L3Harris Technologies, Inc." },
        { symbol: "LMT", name: "Lockheed Martin Corporation" },
        { symbol: "LNC", name: "Lincoln National Corporation" },
        { symbol: "LNT", name: "Alliant Energy Corporation" },
        { symbol: "LOW", name: "Lowe's Companies, Inc." },
        { symbol: "LRCX", name: "Lam Research Corporation" },
        { symbol: "LSXMA", name: "Liberty Media Corporation" },
        { symbol: "LVS", name: "Las Vegas Sands Corp." },
        { symbol: "LW", name: "Lamb Weston Holdings, Inc." },
        { symbol: "LYB", name: "LyondellBasell Industries N.V." },
        { symbol: "LYV", name: "Live Nation Entertainment, Inc." },
        { symbol: "M", name: "Macy's, Inc." },
        { symbol: "MAC", name: "Macerich" },
        { symbol: "MAR", name: "Marriott International, Inc." },
        { symbol: "MAS", name: "Masco Corporation" },
        { symbol: "MAT", name: "Mattel, Inc." },
        { symbol: "MCHP", name: "Microchip Technology Incorporated" },
        { symbol: "MCK", name: "McKesson Corporation" },
        { symbol: "MCO", name: "Moody's Corporation" },
        { symbol: "MDLZ", name: "Mondelez International, Inc." },
        { symbol: "MDT", name: "Medtronic plc" },
        { symbol: "MET", name: "MetLife, Inc." },
        { symbol: "MGM", name: "MGM Resorts International" },
        { symbol: "MHK", name: "Mohawk Industries, Inc." },
        { symbol: "MKC", name: "McCormick & Company, Incorporated" },
        { symbol: "MKTX", name: "MarketAxess Holdings Inc." },
        { symbol: "MLM", name: "Martin Marietta Materials, Inc." },
        { symbol: "MMC", name: "Marsh & McLennan Companies, Inc." },
        { symbol: "MMM", name: "3M Company" },
        { symbol: "MNRO", name: "Monro, Inc." },
        { symbol: "MNST", name: "Monster Beverage Corporation" },
        { symbol: "MO", name: "Altria Group, Inc." },
        { symbol: "MON", name: "Monsanto Company" },
        { symbol: "MOS", name: "Mosaic Company" },
        { symbol: "MPC", name: "Marathon Petroleum Corporation" },
        { symbol: "MRO", name: "Marathon Oil Corporation" },
        { symbol: "MS", name: "Morgan Stanley" },
        { symbol: "MSI", name: "Motorola Solutions, Inc." },
        { symbol: "MTB", name: "M&T Bank Corporation" },
        { symbol: "MTD", name: "Mettler-Toledo International Inc." },
        { symbol: "MU", name: "Micron Technology, Inc." },
        { symbol: "MXIM", name: "Maxim Integrated Products, Inc." },
        { symbol: "MYL", name: "Mylan N.V." },
        { symbol: "NBL", name: "Noble Energy, Inc." },
        { symbol: "NCLH", name: "Norwegian Cruise Line Holdings Ltd." },
        { symbol: "NDAQ", name: "Nasdaq, Inc." },
        { symbol: "NFLX", name: "Netflix, Inc." },
        { symbol: "NVDA", name: "NVIDIA Corporation" },
        { symbol: "PAYC", name: "Paycor HCM, Inc." },
        { symbol: "PYPL", name: "PayPal Holdings, Inc." },
        { symbol: "QCOM", name: "Qualcomm Incorporated" },
        { symbol: "SBUX", name: "Starbucks Corporation" },
        { symbol: "SNAP", name: "Snap Inc." },
        { symbol: "SPGI", name: "S&P Global Inc." },
        { symbol: "T", name: "AT&T Inc." },
        { symbol: "TSLA", name: "Tesla, Inc." },
        { symbol: "VZ", name: "Verizon Communications Inc." },
        { symbol: "WBA", name: "Walgreens Boots Alliance, Inc." },
        { symbol: "WDC", name: "Western Digital Corporation" },
        { symbol: "WMT", name: "Walmart Inc." },
        { symbol: "XEL", name: "Xcel Energy Inc." },
        { symbol: "ZTS", name: "Zoetis Inc." },
        { symbol: "ABMD", name: "ABIOMED, Inc." },
        { symbol: "ADBE", name: "Adobe Inc." },
        { symbol: "ADP", name: "Automatic Data Processing, Inc." },
        { symbol: "ADSK", name: "Autodesk, Inc." },
        { symbol: "ALGN", name: "Align Technology, Inc." },
        { symbol: "AMCR", name: "Amcor plc" },
        { symbol: "AMGN", name: "Amgen Inc." },
        { symbol: "ANSS", name: "ANSYS, Inc." },
        { symbol: "ATVI", name: "Activision Blizzard, Inc." },
        { symbol: "AVGO", name: "Broadcom Inc." },
        { symbol: "AXP", name: "American Express Company" },
        { symbol: "BBY", name: "Best Buy Co., Inc." },
        { symbol: "BEN", name: "Franklin Templeton Investments" },
        { symbol: "BF.B", name: "Brown-Forman Corporation" },
        { symbol: "BKNG", name: "Booking Holdings Inc." },
        { symbol: "CDW", name: "CDW Corporation" },
        { symbol: "CERN", name: "Cerner Corporation" },
        { symbol: "CHKP", name: "Check Point Software Technologies Ltd." },
        { symbol: "CLX", name: "The Clorox Company" },
        { symbol: "CMS", name: "CMS Energy Corporation" },
        { symbol: "CNC", name: "Centene Corporation" },
        { symbol: "CNP", name: "CenterPoint Energy, Inc." },
        { symbol: "CPB", name: "Campbell Soup Company" },
        { symbol: "CTSH", name: "Cognizant Technology Solutions Corporation" },
        { symbol: "DHI", name: "D.R. Horton, Inc." },
        { symbol: "DTE", name: "DTE Energy Company" },
        { symbol: "DUK", name: "Duke Energy Corporation" },
        { symbol: "EA", name: "Electronic Arts Inc." },
        { symbol: "ECL", name: "Ecolab Inc." },
        { symbol: "EFX", name: "Equifax Inc." },
        { symbol: "EL", name: "The Estee Lauder Companies Inc." },
        { symbol: "EMN", name: "Eastman Chemical Company" },
        { symbol: "ENPH", name: "Enphase Energy, Inc." },
        { symbol: "EQR", name: "Equity Residential" },
        { symbol: "ES", name: "Eversource Energy" },
        { symbol: "ETR", name: "Entergy Corporation" },
        { symbol: "EXC", name: "Exelon Corporation" },
        { symbol: "FANG", name: "Diamondback Energy, Inc." },
        { symbol: "FISV", name: "Fiserv, Inc." },
        { symbol: "FLIR", name: "FLIR Systems, Inc." },
        { symbol: "FMC", name: "FMC Corporation" },
        { symbol: "FOX", name: "Fox Corporation" },
        { symbol: "GD", name: "General Dynamics Corporation" },
        { symbol: "GWW", name: "W.W. Grainger, Inc." },
        { symbol: "HIG", name: "The Hartford Financial Services Group, Inc." },
        { symbol: "HWM", name: "Howmet Aerospace Inc." },
        { symbol: "IDXX", name: "IDEXX Laboratories, Inc." },
        { symbol: "ILMN", name: "Illumina, Inc." },
        { symbol: "INCY", name: "Incyte Corporation" },
        { symbol: "INTU", name: "Intuit Inc." },
        { symbol: "JCI", name: "Johnson Controls International plc" },
        { symbol: "KMB", name: "Kimberly-Clark Corporation" },
        { symbol: "KMX", name: "CarMax, Inc." },
        { symbol: "LNT", name: "Alliant Energy Corporation" },
        { symbol: "LRCX", name: "Lam Research Corporation" },
        { symbol: "LVS", name: "Las Vegas Sands Corp." },
        { symbol: "MAR", name: "Marriott International, Inc." },
        { symbol: "MDLZ", name: "Mondelez International, Inc." },
        { symbol: "MET", name: "MetLife, Inc." },
        { symbol: "MPC", name: "Marathon Petroleum Corporation" },
        { symbol: "MSI", name: "Motorola Solutions, Inc." },
        { symbol: "NDAQ", name: "Nasdaq, Inc." },
        { symbol: "NKE", name: "NIKE, Inc." },
        { symbol: "NTRS", name: "Northern Trust Corporation" },
        { symbol: "ORCL", name: "Oracle Corporation" },
        { symbol: "PAYC", name: "Paycor HCM, Inc." },
        { symbol: "PGR", name: "The Progressive Corporation" },
        { symbol: "PLD", name: "Prologis, Inc." },
        { symbol: "PM", name: "Philip Morris International Inc." },
        { symbol: "PRGO", name: "Perrigo Company plc" },
        { symbol: "PSA", name: "Public Storage" },
        { symbol: "QCOM", name: "Qualcomm Incorporated" },
        { symbol: "REG", name: "Regency Centers Corporation" },
        { symbol: "RMD", name: "ResMed Inc." },
        { symbol: "ROST", name: "Ross Stores, Inc." },
        { symbol: "SBUX", name: "Starbucks Corporation" },
        { symbol: "SHW", name: "The Sherwin-Williams Company" },
        { symbol: "SIVB", name: "SVB Financial Group" },
        { symbol: "SNPS", name: "Synopsys, Inc." },
        { symbol: "SPG", name: "Simon Property Group, Inc." },
        { symbol: "SWK", name: "Stanley Black & Decker, Inc." },
        { symbol: "SYK", name: "Stryker Corporation" },
        { symbol: "TAP", name: "Molson Coors Beverage Company" },
        { symbol: "TDY", name: "Teledyne Technologies Incorporated" },
        { symbol: "TROW", name: "T. Rowe Price Group, Inc." },
        { symbol: "TRV", name: "The Travelers Companies, Inc." },
        { symbol: "TSN", name: "Tyson Foods, Inc." },
        { symbol: "TWLO", name: "Twilio Inc." },
        { symbol: "VFC", name: "V.F. Corporation" },
        { symbol: "VTR", name: "Ventas, Inc." },
        { symbol: "WAB", name: "Wabtec Corporation" },
        { symbol: "WAT", name: "Waters Corporation" },
        { symbol: "WDC", name: "Western Digital Corporation" },
        { symbol: "WST", name: "West Pharmaceutical Services, Inc." },
        { symbol: "WY", name: "Weyerhaeuser Company" },
        { symbol: "XRX", name: "Xerox Holdings Corporation" },
        { symbol: "ZBRA", name: "Zebra Technologies Corporation" },
        { symbol: "ZION", name: "Zions Bancorporation" },
        { symbol: "SNE", name: "Sony Corporation" },
        { symbol: "DIS", name: "The Walt Disney Company" },
        // ... additional stock entries ...
    ]
};

export default stockData; 