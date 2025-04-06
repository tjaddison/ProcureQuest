import { Scenario } from "../types/game";

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Semiconductor Shortage Disrupting Production",
    issue: "A global semiconductor shortage is causing skyrocketing prices and doubled lead times.",
    challenge: "Risk of halting production and customer dissatisfaction due to delays.",
    opportunity: "Can you secure continuity and contain costs?",
    suppliers: [
      { name: "NanoCore Components", contractNumber: "SC-101", annualSpend: "$2.1M" },
      { name: "GlobalSilica Ltd.", contractNumber: "SC-202", annualSpend: "$3.4M" },
      { name: "VoltEdge Micro", contractNumber: "SC-303", annualSpend: "$1.8M" }
    ],
    decision: {
      prompt: "What action would you take to mitigate supply risk and maintain production timelines?",
      options: [
        { 
          id: "1a", 
          text: "Wait and hope existing suppliers deliver.", 
          isOptimal: false,
          impact: { budget: -200000, risk: 40, stability: -30, reputation: -20 }
        },
        { 
          id: "1b", 
          text: "Pay premium expediting fees to existing suppliers.", 
          isOptimal: false,
          impact: { budget: -900000, risk: 10, stability: 10, reputation: 0 }
        },
        { 
          id: "1c", 
          text: "Diversify: Engage regional suppliers, build buffer stock, implement tracking.", 
          isOptimal: true,
          impact: { budget: -1650000, risk: -30, stability: 25, reputation: 15 },
          explanation: "This approach tackles the immediate shortage (alternatives, buffers) and addresses future vulnerability (visibility), securing long-term stability despite upfront costs."
        },
        { 
          id: "1d", 
          text: "Halt non-essential production lines.", 
          isOptimal: false,
          impact: { budget: -1000000, risk: 0, stability: -40, reputation: -25 }
        }
      ],
      optimalDecision: "Source from alternative regional suppliers, build strategic inventory buffers, and invest in real-time supply chain visibility tools.",
      quote: "$450K",
      transitionCost: "$1.2M"
    },
    marketData: {
      trends: ["Lead times doubled globally", "Prices up 50%", "Regional suppliers expanding capacity"],
      risks: ["Production halts possible", "Component quality variations with new suppliers"],
      opportunities: ["Early adopters of new supply chain technology gaining advantage"]
    },
    supplierPerformance: {
      "NanoCore Components": { deliveryRisk: "High", qualityScore: 85 },
      "GlobalSilica Ltd.": { deliveryRisk: "Medium", qualityScore: 78 },
      "VoltEdge Micro": { deliveryRisk: "High", qualityScore: 92 }
    }
  },
  {
    id: 2,
    title: "Carbon Border Tax Increasing Supplier Costs",
    issue: "EU's Carbon Border Adjustment Mechanism (CBAM) raises import costs by 5% for carbon-intensive products.",
    challenge: "Compliance costs are passed down from suppliers.",
    opportunity: "Do you mitigate cost increases through greener sourcing?",
    suppliers: [
      { name: "EuroMold Packaging", contractNumber: "CBT-112", annualSpend: "$3.6M" }
    ],
    decision: {
      prompt: "Would you absorb the increase, negotiate, or pursue lower-emission suppliers?",
      options: [
        { 
          id: "2a", 
          text: "Absorb the 5% cost increase.", 
          isOptimal: false,
          impact: { budget: -180000, risk: 0, stability: 0, reputation: -5 }
        },
        { 
          id: "2b", 
          text: "Negotiate harder with EuroMold to share the cost burden.", 
          isOptimal: false,
          impact: { budget: -90000, risk: 10, stability: -5, reputation: 0 }
        },
        { 
          id: "2c", 
          text: "Identify lower-carbon suppliers and incentivize sustainability.", 
          isOptimal: true,
          impact: { budget: -670000, risk: -15, stability: 5, reputation: 25 },
          explanation: "By identifying lower-carbon suppliers and creating incentive-based contracts, you reduce long-term regulatory risk while improving environmental standing."
        },
        { 
          id: "2d", 
          text: "Switch to non-EU suppliers to avoid the tax.", 
          isOptimal: false,
          impact: { budget: -400000, risk: 30, stability: -10, reputation: -20 }
        }
      ],
      optimalDecision: "Identify lower-carbon suppliers, negotiate incentive-based sustainability contracts, and assess the total cost of compliance over time.",
      quote: "$130K",
      transitionCost: "$540K"
    },
    marketData: {
      trends: ["CBAM implementation expanding to more industries", "Green suppliers gaining market share"],
      risks: ["Carbon taxes likely to increase annually", "Non-compliance penalties growing"],
      opportunities: ["Tax credits for green supply chain transformations"]
    },
    supplierPerformance: {
      "EuroMold Packaging": { deliveryRisk: "Low", qualityScore: 92, innovationRating: 60 }
    }
  },
  {
    id: 3,
    title: "AI-Powered Demand Forecasting by Suppliers",
    issue: "A logistics supplier introduces AI-powered demand forecasting to optimize order quantities, reduce waste, and improve overall supply chain efficiency. Procurement must evaluate the tool's effectiveness before committing.",
    challenge: "The supplier's new AI system is unproven, and there is a low spend on most suppliers.",
    opportunity: "If proven effective, AI could reduce inventory carrying costs and improve demand accuracy, enhancing supplier collaboration.",
    suppliers: [
      { name: "TransGlobal Logistics", contractNumber: "AI-1001", annualSpend: "$85K" },
      { name: "CargoPlus Express", contractNumber: "AI-1002", annualSpend: "$90K" },
      { name: "Streamline Shipping", contractNumber: "AI-1003", annualSpend: "$78K" },
      { name: "SmartRoute Solutions", contractNumber: "AI-1004", annualSpend: "$60K" },
      { name: "ShipTech Innovations", contractNumber: "AI-1005", annualSpend: "$95K" },
      { name: "QuickFlow Freight", contractNumber: "AI-1006", annualSpend: "$70K" },
      { name: "RouteMax Logistics", contractNumber: "AI-1007", annualSpend: "$55K" }
    ],
    decision: {
      prompt: "Would you assign resources to evaluate this innovation, or would you wait for further validation?",
      options: [
        { 
          id: "3a", 
          text: "Wait until more companies validate the technology.", 
          isOptimal: false,
          impact: { budget: 0, risk: 10, stability: -5, reputation: -10 }
        },
        { 
          id: "3b", 
          text: "Pilot the AI tool with one or two low-risk suppliers.", 
          isOptimal: true,
          impact: { budget: -295000, risk: -10, stability: 15, reputation: 20 },
          explanation: "Running a controlled pilot with 1-2 suppliers allows you to validate the technology's ROI with minimal risk while positioning for early adoption advantage."
        },
        { 
          id: "3c", 
          text: "Implement across all logistics providers immediately.", 
          isOptimal: false,
          impact: { budget: -600000, risk: 30, stability: -10, reputation: 5 }
        },
        { 
          id: "3d", 
          text: "Decline the innovation and stick with current forecasting methods.", 
          isOptimal: false,
          impact: { budget: 0, risk: 0, stability: 0, reputation: -15 }
        }
      ],
      optimalDecision: "Start by piloting the AI tool with one or two low-risk suppliers and assess ROI, scalability, and integration potential.",
      quote: "$75K",
      transitionCost: "$220K"
    },
    marketData: {
      trends: ["AI adoption accelerating in logistics", "Early adopters seeing 15-20% inventory reduction"],
      risks: ["System integration challenges", "Data quality concerns with new technologies"],
      opportunities: ["Potential 30% reduction in forecast error", "Cross-functional benefits in planning"]
    },
    supplierPerformance: {
      "TransGlobal Logistics": { deliveryRisk: "Low", innovationRating: 85 },
      "CargoPlus Express": { deliveryRisk: "Medium", innovationRating: 65 },
      "Streamline Shipping": { deliveryRisk: "Medium", innovationRating: 70 },
      "SmartRoute Solutions": { deliveryRisk: "Low", innovationRating: 90 },
      "ShipTech Innovations": { deliveryRisk: "Low", innovationRating: 95 },
      "QuickFlow Freight": { deliveryRisk: "High", innovationRating: 60 },
      "RouteMax Logistics": { deliveryRisk: "Medium", innovationRating: 75 }
    }
  },
  {
    id: 4,
    title: "Supplier Bankruptcy in Critical Raw Materials",
    issue: "Your only lithium supplier files for bankruptcy, affecting battery production.",
    challenge: "No secondary source secured.",
    opportunity: "Fast action could prevent long-term disruption.",
    suppliers: [
      { name: "TerraLithium Mining", contractNumber: "RM-8001", annualSpend: "$12.4M" }
    ],
    decision: {
      prompt: "How would you secure supply continuity in this high-stakes situation?",
      options: [
        { 
          id: "4a", 
          text: "Buy remaining inventory at premium prices while searching for alternatives.", 
          isOptimal: false,
          impact: { budget: -2500000, risk: 20, stability: -10, reputation: -5 }
        },
        { 
          id: "4b", 
          text: "Secure multi-year contracts with qualified backup suppliers and establish safety stock.", 
          isOptimal: true,
          impact: { budget: -4900000, risk: -35, stability: 30, reputation: 15 },
          explanation: "By securing long-term contracts with qualified alternatives and establishing rolling safety stock, you transform an acute crisis into a stable, diversified supply strategy."
        },
        { 
          id: "4c", 
          text: "Attempt to acquire TerraLithium's assets through the bankruptcy proceedings.", 
          isOptimal: false,
          impact: { budget: -15000000, risk: 10, stability: -20, reputation: 0 }
        },
        { 
          id: "4d", 
          text: "Temporarily halt battery production while seeking alternatives.", 
          isOptimal: false,
          impact: { budget: -7000000, risk: 0, stability: -40, reputation: -30 }
        }
      ],
      optimalDecision: "Secure multi-year contracts with qualified backup suppliers and establish a rolling safety stock.",
      quote: "$1.8M",
      transitionCost: "$3.1M"
    },
    marketData: {
      trends: ["Lithium prices rising 15% annually", "Battery material suppliers consolidating"],
      risks: ["Further supplier bankruptcies likely", "Quality differences between mining operations"],
      opportunities: ["New lithium extraction technologies emerging", "Recycled lithium becoming viable"]
    },
    supplierPerformance: {
      "TerraLithium Mining": { deliveryRisk: "High", qualityScore: 88 }
    }
  },
  {
    id: 5,
    title: "Geopolitical Tensions Impacting Shipping Routes",
    issue: "Suez Canal and Red Sea routes are disrupted. Freight prices rise 20%.",
    challenge: "Delivery delays threaten revenue.",
    opportunity: "Do you adjust freight partners or sourcing strategy?",
    suppliers: [
      { name: "Global Freight Partners", contractNumber: "GF-001", annualSpend: "$15M" }
    ],
    decision: {
      prompt: "Would you reroute, nearshore, or adjust Incoterms?",
      options: [
        { 
          id: "5a", 
          text: "Pay premium for alternative routes temporarily.", 
          isOptimal: false,
          impact: { budget: -3000000, risk: 10, stability: 0, reputation: 0 }
        },
        { 
          id: "5b", 
          text: "Diversify logistics routes, explore nearshoring, and renegotiate Incoterms.", 
          isOptimal: true,
          impact: { budget: -2000000, risk: -25, stability: 20, reputation: 10 },
          explanation: "This comprehensive approach combines immediate tactical adjustments with strategic shifts in sourcing and contract terms, building long-term resilience."
        },
        { 
          id: "5c", 
          text: "Complete transition to air freight for high-value items.", 
          isOptimal: false,
          impact: { budget: -4500000, risk: -5, stability: 15, reputation: 5 }
        },
        { 
          id: "5d", 
          text: "Accept delays and communicate extended lead times to customers.", 
          isOptimal: false,
          impact: { budget: -1000000, risk: 0, stability: -30, reputation: -25 }
        }
      ],
      optimalDecision: "Diversify logistics routes, explore nearshoring, and renegotiate Incoterms to shift accountability.",
      quote: "$600K",
      transitionCost: "$1.4M"
    },
    marketData: {
      trends: ["Geopolitical tensions expected to persist", "Nearshoring growing 25% annually"],
      risks: ["Additional shipping routes facing threats", "Logistics costs projected to rise further"],
      opportunities: ["Regional manufacturing hubs expanding capacity", "New shipping alliances forming"]
    },
    supplierPerformance: {
      "Global Freight Partners": { deliveryRisk: "High", qualityScore: 75 }
    }
  },
  {
    id: 6,
    title: "Supplier Innovates with Recyclable Packaging",
    issue: "The supplier has developed a biodegradable, recyclable packaging solution that aligns with growing ESG mandates.",
    challenge: "High upfront costs cause hesitation from product and finance teams.",
    opportunity: "Long-term benefits in compliance, brand image, and potentially avoiding future environmental levies.",
    suppliers: [
      { name: "GreenWrap Solutions", contractNumber: "PKG-312", annualSpend: "$1.9M" }
    ],
    decision: {
      prompt: "How should this supplier be classified?",
      options: [
        { 
          id: "6a", 
          text: "Critical", 
          isOptimal: false,
          impact: { budget: -500000, risk: 0, stability: 0, reputation: 10 }
        },
        { 
          id: "6b", 
          text: "Strategic", 
          isOptimal: true,
          impact: { budget: -1030000, risk: -10, stability: 5, reputation: 30 },
          explanation: "Classifying this supplier as Strategic recognizes that their innovation aligns with long-term corporate values and can create future differentiation, even with moderate spend."
        },
        { 
          id: "6c", 
          text: "Transactional", 
          isOptimal: false,
          impact: { budget: -200000, risk: 15, stability: 0, reputation: -20 }
        },
        { 
          id: "6d", 
          text: "Acquisitional", 
          isOptimal: false,
          impact: { budget: -3000000, risk: 5, stability: -10, reputation: 15 }
        }
      ],
      optimalDecision: "Strategic",
      quote: "$250K",
      transitionCost: "$780K"
    },
    marketData: {
      trends: ["ESG regulations tightening globally", "Packaging waste taxes proposed in 12 countries"],
      risks: ["Competitors adopting similar solutions faster", "Consumer demand for sustainable packaging rising"],
      opportunities: ["Brand differentiation through sustainability leadership", "Premium pricing potential"]
    },
    supplierPerformance: {
      "GreenWrap Solutions": { deliveryRisk: "Medium", qualityScore: 85, innovationRating: 95 }
    }
  },
  {
    id: 7,
    title: "Price Volatility in Rare Earth Metals",
    issue: "Export restrictions increase rare earth metal prices by 30%.",
    challenge: "Supply security for magnets, batteries, and sensors.",
    opportunity: "Redesign or hedge risk?",
    suppliers: [
      { name: "MetaMaterials Co.", contractNumber: "REM-998", annualSpend: "$9.2M" }
    ],
    decision: {
      prompt: "How would you reduce reliance on volatile materials?",
      options: [
        { 
          id: "7a", 
          text: "Accept price increases and pass costs to customers.", 
          isOptimal: false,
          impact: { budget: -2760000, risk: 10, stability: 0, reputation: -15 }
        },
        { 
          id: "7b", 
          text: "Partner with R&D to redesign for alternate materials, hedge against price spikes, and secure secondary sources.", 
          isOptimal: true,
          impact: { budget: -1520000, risk: -30, stability: 20, reputation: 20 },
          explanation: "This comprehensive approach addresses immediate cost challenges while driving long-term innovation to reduce fundamental dependency on volatile materials."
        },
        { 
          id: "7c", 
          text: "Build vast inventory before prices rise further.", 
          isOptimal: false,
          impact: { budget: -4000000, risk: 0, stability: 10, reputation: 0 }
        },
        { 
          id: "7d", 
          text: "Switch entirely to alternative materials immediately.", 
          isOptimal: false,
          impact: { budget: -3500000, risk: 25, stability: -20, reputation: 5 }
        }
      ],
      optimalDecision: "Partner with R&D to redesign for alternate materials, hedge against price spikes, and secure secondary sources.",
      quote: "$420K",
      transitionCost: "$1.1M"
    },
    marketData: {
      trends: ["Rare earth prices up 80% in 3 years", "Export controls tightening"],
      risks: ["Supply concentration in politically sensitive regions", "Substitutes often have performance tradeoffs"],
      opportunities: ["New extraction methods promising", "Material science advancements creating alternatives"]
    },
    supplierPerformance: {
      "MetaMaterials Co.": { deliveryRisk: "Medium", qualityScore: 90 }
    }
  },
  {
    id: 8,
    title: "Supplier AI Negotiation Tool Reducing Contracting Time",
    issue: "The supplier's AI-based tool reduces contracting time by 40%, but legal and risk review is still required.",
    challenge: "Procurement needs to streamline workflow without compromising controls.",
    opportunity: "If validated, this could transform internal workflows and enhance supplier interactions.",
    suppliers: [
      { name: "StratConsult Group", contractNumber: "CONS-005", annualSpend: "$2.7M" }
    ],
    decision: {
      prompt: "Would you adopt the AI tool, and if so, how do you mitigate risk?",
      options: [
        { 
          id: "8a", 
          text: "Wait for other companies to validate the tool first.", 
          isOptimal: false,
          impact: { budget: 0, risk: 0, stability: 0, reputation: -10 }
        },
        { 
          id: "8b", 
          text: "Run a pilot for low-value contracts, collaborating with Legal to monitor compliance.", 
          isOptimal: true,
          impact: { budget: -335000, risk: -5, stability: 10, reputation: 15 },
          explanation: "Piloting with low-value contracts balances innovation adoption with appropriate risk management, allowing validation while limiting exposure."
        },
        { 
          id: "8c", 
          text: "Implement fully across all contract types.", 
          isOptimal: false,
          impact: { budget: -700000, risk: 30, stability: -15, reputation: 5 }
        },
        { 
          id: "8d", 
          text: "Reject the tool as too risky for contract workflows.", 
          isOptimal: false,
          impact: { budget: 0, risk: -5, stability: -5, reputation: -15 }
        }
      ],
      optimalDecision: "Run a pilot for low-value contracts, collaborating with Legal to monitor compliance.",
      quote: "$65K",
      transitionCost: "$270K"
    },
    marketData: {
      trends: ["AI in procurement growing 30% annually", "Contract automation becoming standard"],
      risks: ["Legal compliance challenges with automated systems", "Data security concerns with third-party tools"],
      opportunities: ["40% reduction in contract processing time", "Improved standardization across agreements"]
    },
    supplierPerformance: {
      "StratConsult Group": { deliveryRisk: "Low", qualityScore: 92, innovationRating: 88 }
    }
  },
  {
    id: 9,
    title: "Factory Fire at a Tier 2 Supplier",
    issue: "A sub-tier supplier fire delays a launch; tier was unknown to procurement.",
    challenge: "Lack of visibility into supplier networks.",
    opportunity: "Improve sub-tier transparency.",
    suppliers: [
      { name: "TechFrame Systems", contractNumber: "TF-901", annualSpend: "$4.8M" }
    ],
    decision: {
      prompt: "How do you prevent this type of disruption in the future?",
      options: [
        { 
          id: "9a", 
          text: "Require tier 1 suppliers to report disruptions only when they occur.", 
          isOptimal: false,
          impact: { budget: -100000, risk: 15, stability: -5, reputation: -10 }
        },
        { 
          id: "9b", 
          text: "Add contractual penalties for tier 1 suppliers who don't prevent sub-tier disruptions.", 
          isOptimal: false,
          impact: { budget: -200000, risk: 5, stability: 0, reputation: -5 }
        },
        { 
          id: "9c", 
          text: "Adopt supplier mapping tools, enforce sub-tier disclosures, and revise continuity planning.", 
          isOptimal: true,
          impact: { budget: -1320000, risk: -35, stability: 25, reputation: 20 },
          explanation: "This comprehensive visibility approach transforms reactive management into proactive risk identification, creating a competitive advantage in supply chain resilience."
        },
        { 
          id: "9d", 
          text: "Create backup suppliers for all critical components.", 
          isOptimal: false,
          impact: { budget: -2500000, risk: -20, stability: 15, reputation: 5 }
        }
      ],
      optimalDecision: "Adopt supplier mapping tools, enforce sub-tier disclosures, and revise continuity planning.",
      quote: "$350K",
      transitionCost: "$970K"
    },
    marketData: {
      trends: ["Supply chain mapping software adoption growing", "Multi-tier visibility becoming competitive advantage"],
      risks: ["Sub-tier disruptions increasing 25% annually", "Concentration risks often hidden in lower tiers"],
      opportunities: ["Early movers in n-tier visibility seeing 40% fewer disruptions", "Insurance premium reductions possible"]
    },
    supplierPerformance: {
      "TechFrame Systems": { deliveryRisk: "High", qualityScore: 80 }
    }
  },
  {
    id: 10,
    title: "Ethical Sourcing Violation Disrupting Supplier Relations",
    issue: "Media reveals labor violations, triggering reputational crisis.",
    challenge: "Pulling out may halt production; staying may spark backlash.",
    opportunity: "Ethical sourcing leadership.",
    suppliers: [
      { name: "KnitWorks Textiles", contractNumber: "ETH-103", annualSpend: "$5.5M" }
    ],
    decision: {
      prompt: "Would you cut ties or support a path to supplier remediation?",
      options: [
        { 
          id: "10a", 
          text: "Immediately terminate the relationship regardless of impact.", 
          isOptimal: false,
          impact: { budget: -2000000, risk: 5, stability: -35, reputation: 10 }
        },
        { 
          id: "10b", 
          text: "Ignore the issue and continue business as usual.", 
          isOptimal: false,
          impact: { budget: 0, risk: 30, stability: 0, reputation: -40 }
        },
        { 
          id: "10c", 
          text: "Suspend activity, communicate ethical standards, and engage third-party audits before reinstating.", 
          isOptimal: true,
          impact: { budget: -830000, risk: -20, stability: -5, reputation: 35 },
          explanation: "This balanced approach upholds ethical standards while creating a path to improvement, positioning you as a responsible leader rather than simply cutting ties."
        },
        { 
          id: "10d", 
          text: "Continue relationship but demand internal investigation and corrective action plan.", 
          isOptimal: false,
          impact: { budget: -300000, risk: 15, stability: 5, reputation: -15 }
        }
      ],
      optimalDecision: "Suspend activity, communicate ethical standards, and engage third-party audits before reinstating.",
      quote: "$150K",
      transitionCost: "$680K"
    },
    marketData: {
      trends: ["Ethical sourcing violations getting 300% more media coverage", "Consumer boycotts increasing"],
      risks: ["Supply chain labor practices under increased scrutiny", "Social media amplifying corporate responsibility failures"],
      opportunities: ["Leadership in responsible sourcing driving brand preference", "Ethical certifications creating premium positioning"]
    },
    supplierPerformance: {
      "KnitWorks Textiles": { deliveryRisk: "Low", qualityScore: 95 }
    }
  },
  {
    id: 11,
    title: "Generative AI in Supplier Risk Analytics",
    issue: "A supplier offers a generative AI tool that can proactively identify risks across your supply base.",
    challenge: "Low spend, but the supplier's tech could transform how procurement identifies and reacts to disruption.",
    opportunity: "Early adoption could give a competitive edge in supplier risk management.",
    suppliers: [
      { name: "InsightAI Risk Analytics", contractNumber: "G-AI-007", annualSpend: "$80K" }
    ],
    decision: {
      prompt: "How should this supplier be classified?",
      options: [
        { 
          id: "11a", 
          text: "Critical", 
          isOptimal: false,
          impact: { budget: -200000, risk: -5, stability: 5, reputation: 10 }
        },
        { 
          id: "11b", 
          text: "Strategic", 
          isOptimal: false,
          impact: { budget: -300000, risk: -10, stability: 10, reputation: 15 }
        },
        { 
          id: "11c", 
          text: "Transactional", 
          isOptimal: false,
          impact: { budget: -85000, risk: 0, stability: 0, reputation: -10 }
        },
        { 
          id: "11d", 
          text: "Acquisitional", 
          isOptimal: true,
          impact: { budget: -275000, risk: -15, stability: 15, reputation: 25 },
          explanation: "Despite low spend, this supplier's emerging innovation could be strategically acquired or closely monitored for future integration, potentially transforming your risk management capabilities."
        }
      ],
      optimalDecision: "Acquisitional",
      quote: "$85K",
      transitionCost: "$190K"
    },
    marketData: {
      trends: ["AI in risk management growing 50% annually", "Predictive analytics becoming key differentiator"],
      risks: ["Early-stage AI tools may have accuracy issues", "Integration challenges with legacy systems"],
      opportunities: ["First-mover advantage in risk prediction", "Potential for significant competitive edge"]
    },
    supplierPerformance: {
      "InsightAI Risk Analytics": { deliveryRisk: "Medium", innovationRating: 98 }
    }
  },
  {
    id: 12,
    title: "Emerging 3D Printing Technology from Suppliers",
    issue: "Supplier offers 3D printing that halves lead times for spare parts.",
    challenge: "Requires new vendor qualification and procurement processes.",
    opportunity: "Increase agility and reduce carrying costs.",
    suppliers: [
      { name: "ProtoFab Industries", contractNumber: "3DP-121", annualSpend: "$2.2M" }
    ],
    decision: {
      prompt: "How should this supplier be classified?",
      options: [
        { 
          id: "12a", 
          text: "Critical", 
          isOptimal: false,
          impact: { budget: -2000000, risk: 10, stability: 5, reputation: 10 }
        },
        { 
          id: "12b", 
          text: "Strategic", 
          isOptimal: true,
          impact: { budget: -1700000, risk: -15, stability: 25, reputation: 20 },
          explanation: "This supplier provides technology that increases operational agility and cost efficiency. Though spend is moderate, the long-term impact on operations is considerable."
        },
        { 
          id: "12c", 
          text: "Transactional", 
          isOptimal: false,
          impact: { budget: -400000, risk: 15, stability: -10, reputation: -15 }
        },
        { 
          id: "12d", 
          text: "Acquisitional", 
          isOptimal: false,
          impact: { budget: -5000000, risk: 0, stability: 10, reputation: 15 }
        }
      ],
      optimalDecision: "Strategic",
      quote: "$400K",
      transitionCost: "$1.3M"
    },
    marketData: {
      trends: ["3D printing for spare parts growing 60% annually", "On-demand manufacturing disrupting inventory models"],
      risks: ["Quality consistency with 3D printed parts", "IP protection concerns in distributed manufacturing"],
      opportunities: ["50% lead time reduction", "80% inventory carrying cost reduction for certain parts"]
    },
    supplierPerformance: {
      "ProtoFab Industries": { deliveryRisk: "Low", qualityScore: 85, innovationRating: 90 }
    }
  }
];

export const initialGameMetrics: GameMetrics = {
  budget: 10000000, // $10M starting budget
  risk: 50, // 0-100 scale, 50 is moderate risk
  stability: 80, // 0-100 scale, 80 is good stability
  reputation: 70 // 0-100 scale, 70 is good reputation
};