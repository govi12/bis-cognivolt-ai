export type CatalogItem = {
  slug: string;
  name: string;
  category: string;
  scheme: "ISI" | "CRS" | "FMCS" | "Hallmarking" | "ISI/CRS" | "Voluntary/ISI" | "CDSCO + CRS";
  standard: string;
  mandatory: boolean;
  summary: string;
  tests: string[];
  entry: string;
};

export const CATALOG: CatalogItem[] = [
  // ---- Electrical & Electronics ----
  {
    slug: "led-lamps-self-ballasted",
    name: "LED Lamps (Self-Ballasted)",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 16102",
    mandatory: true,
    summary:
      "Household LED bulbs that combine the light source and driver in one unit. Registration under the Compulsory Registration Scheme is required before they can be sold in India.",
    tests: ["Electrical safety", "Photometric performance", "EMC emissions"],
    entry: "Test at a BIS-recognized lab, then self-declare on manakonline.in with a report no older than 90 days.",
  },
  {
    slug: "led-luminaires",
    name: "LED Luminaires (Street, Flood, Downlight)",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 10322 (Parts 5-1 to 5-6)",
    mandatory: true,
    summary:
      "Fixed LED lighting fixtures for streets, floodlighting and indoor downlighting. Covered under CRS across the IS 10322 Part 5 series.",
    tests: ["Photometry", "Thermal endurance", "IP ingress rating", "Electrical safety"],
    entry: "Lab test report plus self-declaration on manakonline.in; no factory inspection.",
  },
  {
    slug: "electric-fans",
    name: "Electric Fans (Ceiling, Table, Pedestal)",
    category: "Electrical & Electronics",
    scheme: "ISI",
    standard: "IS 374",
    mandatory: true,
    summary:
      "Domestic fans of every common form factor. The ISI Mark under Scheme-I is mandatory, and BIS inspects the factory before granting a licence.",
    tests: ["Speed and air delivery", "Power factor", "Temperature rise", "Insulation resistance", "Mechanical strength"],
    entry: "Apply on manakonline.in with test reports and QC documentation, then pass a factory inspection.",
  },
  {
    slug: "pvc-insulated-cables",
    name: "PVC Insulated Cables (up to 1100 V)",
    category: "Electrical & Electronics",
    scheme: "ISI",
    standard: "IS 694",
    mandatory: true,
    summary:
      "Copper and aluminium wiring cables with PVC insulation for fixed electrical installations in homes and buildings.",
    tests: ["Conductor resistance", "Insulation thickness", "High-voltage withstand"],
    entry: "ISI licence via manakonline.in; BIS verifies routine testing capability at the factory.",
  },
  {
    slug: "household-switches",
    name: "Switches for Household Use",
    category: "Electrical & Electronics",
    scheme: "ISI",
    standard: "IS 3854",
    mandatory: true,
    summary:
      "Wiring switches rated up to 20 A used in domestic installations. Certification confirms safe endurance under repeated operation.",
    tests: ["Endurance cycling", "Temperature rise", "Contact resistance"],
    entry: "ISI licence with factory inspection through the Manak Online portal.",
  },
  {
    slug: "energy-meters",
    name: "Energy Meters (Static)",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 13779, IS 16444",
    mandatory: true,
    summary:
      "Electronic electricity meters for billing. Standards cover accuracy class, tamper detection and communication protocols such as DLMS/COSEM.",
    tests: ["Accuracy class verification", "Tamper detection", "Communication protocol conformance"],
    entry: "CRS registration with a recognized-lab test report and self-declaration.",
  },
  {
    slug: "electric-irons",
    name: "Electric Irons",
    category: "Electrical & Electronics",
    scheme: "ISI",
    standard: "IS 366",
    mandatory: true,
    summary:
      "Dry and steam irons for household use. The standard covers thermostatic control, soleplate quality and overall electrical safety.",
    tests: ["Temperature control", "Soleplate finish", "Steam function (where fitted)", "Electrical safety"],
    entry: "ISI licence via manakonline.in with a factory inspection.",
  },
  {
    slug: "mixer-grinders",
    name: "Mixer Grinders",
    category: "Electrical & Electronics",
    scheme: "ISI",
    standard: "IS 4250",
    mandatory: true,
    summary:
      "Kitchen mixer grinders and liquidizer appliances. Certification covers motor life, jar locking and protection against overheating.",
    tests: ["Motor endurance", "Jar locking", "Overheating protection", "Noise level"],
    entry: "ISI licence with factory inspection and recognized-lab testing.",
  },
  {
    slug: "room-air-conditioners",
    name: "Room Air Conditioners",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 1391",
    mandatory: true,
    summary:
      "Split and window air conditioners. BIS registration is required alongside the BEE star-rating label for energy efficiency.",
    tests: ["Cooling capacity", "Energy efficiency ratio", "Refrigerant charge integrity"],
    entry: "CRS registration with lab test report; BEE labelling is handled separately.",
  },
  {
    slug: "refrigerators",
    name: "Refrigerators",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 1391 (Part 2)",
    mandatory: true,
    summary:
      "Household refrigerators and refrigerator-freezers. Certification covers energy consumption, storage temperature performance and electrical safety.",
    tests: ["Energy consumption", "Storage temperature", "Electrical safety", "Refrigerant circuit checks"],
    entry: "CRS registration on manakonline.in with a valid test report.",
  },
  {
    slug: "washing-machines",
    name: "Washing Machines",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 1391 (Part 3)",
    mandatory: true,
    summary:
      "Household washing machines of all load types. Standards cover wash performance, water consumption and spin safety.",
    tests: ["Wash performance", "Water consumption", "Spin speed and balance", "Electrical safety"],
    entry: "CRS registration with recognized-lab testing.",
  },
  {
    slug: "microwave-ovens",
    name: "Microwave Ovens",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 11676",
    mandatory: true,
    summary:
      "Domestic microwave ovens. The standard's headline concerns are microwave leakage limits, heating uniformity and door interlocking.",
    tests: ["Microwave leakage", "Heating uniformity", "Door interlock", "EMC"],
    entry: "CRS registration with a lab test report and self-declaration.",
  },
  {
    slug: "av-equipment",
    name: "Audio/Video Equipment (TVs, Monitors)",
    category: "Electrical & Electronics",
    scheme: "CRS",
    standard: "IS 616 / IEC 60065",
    mandatory: true,
    summary:
      "Televisions, monitors and allied audio/video apparatus, harmonized with IEC 60065 for safety.",
    tests: ["Electrical safety", "Radiation limits", "Mechanical stability"],
    entry: "CRS registration via manakonline.in.",
  },
  {
    slug: "plugs-sockets",
    name: "Plugs and Socket-Outlets",
    category: "Electrical & Electronics",
    scheme: "ISI",
    standard: "IS 1293",
    mandatory: true,
    summary:
      "Plugs and socket-outlets rated up to 16 A. Dimensions are standardized so devices and sockets interoperate safely across India.",
    tests: ["Dimensional gauging", "Temperature rise", "Mechanical endurance"],
    entry: "ISI licence with factory inspection.",
  },
  {
    slug: "circuit-breakers",
    name: "Circuit Breakers (MCB/RCCB)",
    category: "Electrical & Electronics",
    scheme: "ISI",
    standard: "IS 8828, IS 12640",
    mandatory: true,
    summary:
      "Miniature circuit breakers and residual current devices that protect wiring and people. Tripping behaviour is precisely specified.",
    tests: ["Tripping characteristics", "Breaking capacity", "Endurance"],
    entry: "ISI licence via manakonline.in with factory inspection.",
  },

  // ---- Construction Materials ----
  {
    slug: "opc-cement",
    name: "Cement — Ordinary Portland (OPC 33/43/53)",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 269, IS 455, IS 1489",
    mandatory: true,
    summary:
      "The three OPC strength grades used across general construction. Each grade has defined chemical and strength requirements.",
    tests: ["Chemical composition", "Compressive strength", "Setting time"],
    entry: "ISI licence with factory inspection; marking fee is a small percentage of production value.",
  },
  {
    slug: "ppc-cement",
    name: "Cement — Portland Pozzolana (PPC)",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 1489 (Parts 1 & 2)",
    mandatory: true,
    summary:
      "Blended cement using fly ash (Part 1) or calcined clay (Part 2). Pozzolanic activity and durability are the defining tests.",
    tests: ["Pozzolanic activity", "Compressive strength", "Drying shrinkage"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "rapid-hardening-cement",
    name: "Cement — Rapid Hardening",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 8041",
    mandatory: true,
    summary:
      "High-early-strength cement for precast and repair work, achieving at least 16 MPa at one day.",
    tests: ["Early strength (1 day ≥ 16 MPa)", "Fineness", "Soundness"],
    entry: "ISI licence with factory inspection.",
  },
  {
    slug: "rebar-steel",
    name: "Steel Bars for Concrete Reinforcement",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 1786",
    mandatory: true,
    summary:
      "TMT and other reinforcement bars in Fe 415/500/550/600 grades. Yield strength and bend performance determine grade.",
    tests: ["Yield strength", "Elongation", "Bend and rebend test", "Rib geometry"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "steel-pipes",
    name: "Steel Pipes for Water/Gas",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 1239 (ERW), IS 3589 (SAW)",
    mandatory: true,
    summary:
      "Welded steel tubes for water, gas and structural lines — ERW for smaller bores, submerged-arc welded for large-diameter pipe.",
    tests: ["Hydrostatic pressure", "Flattening", "Bend test"],
    entry: "ISI licence with factory inspection.",
  },
  {
    slug: "upvc-pipes",
    name: "UPVC Pipes for Water Supply",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 4985",
    mandatory: true,
    summary:
      "Unplasticised PVC pressure pipes for potable water distribution. Dimensional accuracy and long-term pressure behaviour are critical.",
    tests: ["Dimensions and tolerances", "Vicat softening point", "Impact resistance", "Hydrostatic pressure"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "cpvc-pipes",
    name: "CPVC Pipes for Hot/Cold Water",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 15778",
    mandatory: true,
    summary:
      "Chlorinated PVC plumbing pipes rated for higher temperatures than UPVC, common in hot-water lines.",
    tests: ["Chlorine content", "Impact resistance", "Hydrostatic pressure at elevated temperature"],
    entry: "ISI licence with factory inspection.",
  },
  {
    slug: "stainless-steel-sheets",
    name: "Stainless Steel Sheets/Plates",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 6911",
    mandatory: true,
    summary:
      "Flat stainless products in grades such as 304, 316L and 430. Certification applies to the notified grades.",
    tests: ["Chemical composition", "Mechanical properties"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "aluminium-conductors",
    name: "Aluminium Conductors (AAC/AAAC/ACSR)",
    category: "Construction Materials",
    scheme: "ISI",
    standard: "IS 398",
    mandatory: true,
    summary:
      "Bare overhead conductors for transmission and distribution — all-aluminium, alloy-reinforced, and steel-reinforced variants.",
    tests: ["Stranding geometry", "Tensile strength", "Electrical resistance", "Wrapping test"],
    entry: "ISI licence via manakonline.in.",
  },

  // ---- Automotive ----
  {
    slug: "two-wheeler-helmets",
    name: "Two-Wheeler Helmets",
    category: "Automotive",
    scheme: "ISI",
    standard: "IS 4151:2015",
    mandatory: true,
    summary:
      "Motorcycle and scooter helmets. IS 4151 governs impact absorption, penetration resistance and the retention system. Consumers can verify genuine marks in the BIS CARE app.",
    tests: ["Impact absorption", "Penetration resistance", "Chin-strap retention", "Field of vision"],
    entry: "ISI licence with factory inspection; look for CM/L number plus IS 4151 below the mark.",
  },
  {
    slug: "cycle-helmets",
    name: "Cycle Helmets",
    category: "Automotive",
    scheme: "ISI",
    standard: "IS 10865",
    mandatory: true,
    summary:
      "Bicycle helmets under a recent QCO. A separate standard from motorcycle helmets, with its own impact and retention regime.",
    tests: ["Impact absorption", "Retention system", "Field of vision"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "vehicle-tyres",
    name: "Tyres (Car/Truck/Bus)",
    category: "Automotive",
    scheme: "ISI",
    standard: "IS 15633 (passenger), IS 15636 (truck/bus)",
    mandatory: true,
    summary:
      "New pneumatic tyres for passenger cars and commercial vehicles, covering dimensions, load/speed ratings and endurance.",
    tests: ["Dimensions", "Load/speed rating", "Endurance", "High-speed test"],
    entry: "ISI licence with factory inspection.",
  },
  {
    slug: "safety-glass",
    name: "Safety Glass (Windscreen/Window)",
    category: "Automotive",
    scheme: "ISI",
    standard: "IS 2553 (Part 1)",
    mandatory: true,
    summary:
      "Laminated and toughened glazing for vehicle windscreens and windows. Fragmentation behaviour is tightly controlled.",
    tests: ["Impact", "Fragmentation", "Optical distortion"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "brake-linings",
    name: "Brake Linings",
    category: "Automotive",
    scheme: "ISI",
    standard: "IS 2573",
    mandatory: true,
    summary:
      "Friction linings for drum brakes. Certification checks stopping power and how performance holds up under heat.",
    tests: ["Friction coefficient", "Wear rate", "Shear strength", "Fade resistance"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "automotive-lighting",
    name: "Automotive Lighting",
    category: "Automotive",
    scheme: "ISI",
    standard: "IS 15588 (headlamps), IS 15589 (signalling)",
    mandatory: true,
    summary:
      "Headlamps and signalling lamps. Photometric distribution and colour are tested so on-road visibility is predictable.",
    tests: ["Photometry", "Colour", "Environmental endurance"],
    entry: "ISI licence via manakonline.in.",
  },

  // ---- LPG & Gas Appliances ----
  {
    slug: "lpg-cylinders-above-5l",
    name: "LPG Cylinders (above 5 L)",
    category: "LPG & Gas Appliances",
    scheme: "ISI",
    standard: "IS 3196 (Part 1):2006",
    mandatory: true,
    summary:
      "Welded steel domestic LPG cylinders above 5-litre capacity — the familiar 14.2 kg household cylinder falls here.",
    tests: ["Hydrostatic burst", "Pneumatic leak", "Impact", "Torque on valve fittings"],
    entry: "ISI licence with factory inspection at BIS-recognized labs.",
  },
  {
    slug: "lpg-cylinders-below-5l",
    name: "LPG Cylinders (below 5 L)",
    category: "LPG & Gas Appliances",
    scheme: "ISI",
    standard: "IS 7142",
    mandatory: true,
    summary:
      "Small portable LPG cylinders under 5 litres, governed by a two-part standard covering design and manufacturing.",
    tests: ["Design verification", "Manufacturing checks", "Leak testing"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "lpg-gas-stoves",
    name: "LPG Domestic Gas Stoves",
    category: "LPG & Gas Appliances",
    scheme: "ISI",
    standard: "IS 4246",
    mandatory: true,
    summary:
      "Domestic stoves with one to four burners. Thermal efficiency and flame stability protect both users and fuel economy.",
    tests: ["Thermal efficiency", "Flame stability", "Safety device function"],
    entry: "ISI licence with factory inspection.",
  },
  {
    slug: "lpg-rubber-hoses",
    name: "LPG Rubber Hoses",
    category: "LPG & Gas Appliances",
    scheme: "ISI",
    standard: "IS 9573",
    mandatory: true,
    summary:
      "Flexible rubber hoses connecting cylinders to stoves. Permeation and end-fitting retention are the safety-critical properties.",
    tests: ["Permeation", "Burst pressure", "Flame resistance", "End-fitting pull-out"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "lpg-regulators",
    name: "LPG Regulators (Domestic)",
    category: "LPG & Gas Appliances",
    scheme: "ISI",
    standard: "IS 9798",
    mandatory: true,
    summary:
      "Pressure regulators that deliver a steady, safe gas supply to household appliances.",
    tests: ["Lock-up pressure", "Relief valve", "Flow capacity", "Endurance"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "cng-cylinders",
    name: "CNG Cylinders (Vehicular)",
    category: "LPG & Gas Appliances",
    scheme: "ISI",
    standard: "IS 15490 (Type 1 steel), ISO 11439 (Type 2–4)",
    mandatory: true,
    summary:
      "High-pressure cylinders for natural-gas vehicles, in steel and composite constructions.",
    tests: ["Hydrostatic test", "Burst test", "Fatigue cycling", "Bonfire test"],
    entry: "ISI licence with recognized-lab testing.",
  },

  // ---- Food, Water & Infant Products ----
  {
    slug: "packaged-drinking-water",
    name: "Packaged Drinking Water",
    category: "Food, Water & Infant Products",
    scheme: "ISI",
    standard: "IS 14543",
    mandatory: true,
    summary:
      "Bottled drinking water other than natural mineral water. Microbiological and chemical limits are strict, and plant hygiene is audited.",
    tests: ["Microbiological limits", "Chemical parameters", "Radiological limits"],
    entry: "ISI licence with source approval and factory inspection.",
  },
  {
    slug: "mineral-water",
    name: "Packaged Natural Mineral Water",
    category: "Food, Water & Infant Products",
    scheme: "ISI",
    standard: "IS 13428",
    mandatory: true,
    summary:
      "Water drawn from a protected natural source with a stable mineral composition and tightly restricted treatment.",
    tests: ["Source protection audit", "Composition stability", "Treatment restrictions"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "milk-powder",
    name: "Milk Powder",
    category: "Food, Water & Infant Products",
    scheme: "ISI",
    standard: "IS 1165",
    mandatory: true,
    summary:
      "Dried milk powder for household and institutional use, with defined protein, fat and moisture content.",
    tests: ["Protein and fat content", "Moisture", "Microbiological limits"],
    entry: "ISI licence with factory inspection.",
  },
  {
    slug: "infant-milk-substitutes",
    name: "Infant Milk Substitutes",
    category: "Food, Water & Infant Products",
    scheme: "ISI",
    standard: "IS 14433",
    mandatory: true,
    summary:
      "Formula products for infants. Nutrition composition and microbiological safety are held to the strictest limits.",
    tests: ["Protein/fat profile", "Moisture", "Microbiological limits"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "hdpe-pipes-potable",
    name: "HDPE Pipes for Potable Water",
    category: "Food, Water & Infant Products",
    scheme: "ISI",
    standard: "IS 4984",
    mandatory: true,
    summary:
      "Polyethylene pressure pipes for drinking-water supply networks.",
    tests: ["Hydrostatic pressure", "Dimensions", "Material grade verification"],
    entry: "ISI licence via manakonline.in.",
  },

  // ---- Toys & Safety Equipment ----
  {
    slug: "toys-safety",
    name: "Toys (Safety)",
    category: "Toys & Safety Equipment",
    scheme: "ISI/CRS",
    standard: "IS 9873 (Parts 1–9)",
    mandatory: true,
    summary:
      "Toys under the Toys (Quality Control) Order: mechanical and physical safety (Part 1), flammability (Part 2), and heavy-metal migration such as lead, mercury and cadmium (Parts 3 & 9). Electronic toys fall under CRS.",
    tests: ["Mechanical/physical safety", "Flammability", "Heavy-metal migration"],
    entry: "ISI licence for conventional toys; CRS registration for electronic toys.",
  },
  {
    slug: "industrial-safety-helmets",
    name: "Industrial Safety Helmets",
    category: "Toys & Safety Equipment",
    scheme: "ISI",
    standard: "IS 2925:1984",
    mandatory: true,
    summary:
      "Protective headgear for construction, mining and factory environments.",
    tests: ["Shock absorption", "Penetration resistance", "Chin strap", "Flammability"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "firefighter-helmets",
    name: "Firefighter Helmets",
    category: "Toys & Safety Equipment",
    scheme: "ISI",
    standard: "IS 2745:1983",
    mandatory: true,
    summary:
      "Helmets for firefighting crews, with elevated heat resistance and visor optical quality.",
    tests: ["Heat resistance", "Impact", "Visor optical quality", "Neck protection"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "school-bags",
    name: "School Bags",
    category: "Toys & Safety Equipment",
    scheme: "ISI",
    standard: "IS 15824",
    mandatory: true,
    summary:
      "School bags under a 2023 QCO. The standard limits loaded weight to a fraction of body weight and mandates reflective strips and rounded edges.",
    tests: ["Weight limit (10% of body weight)", "Strap width", "Reflective strips", "Sharp-edge check"],
    entry: "ISI licence via manakonline.in.",
  },

  // ---- Hallmarking & Jewellery ----
  {
    slug: "gold-hallmarking",
    name: "Gold Hallmarking (22K/18K/14K/9K)",
    category: "Hallmarking & Jewellery",
    scheme: "Hallmarking",
    standard: "IS 1417 (purity grades)",
    mandatory: true,
    summary:
      "Mandatory hallmarking of gold jewellery in 288+ districts. A valid hallmark carries exactly three marks — BIS logo, purity grade (916/750/585/375) and a 6-digit alphanumeric HUID — verifiable in the BIS CARE app.",
    tests: ["Purity assay (XRF or fire assay)", "HUID traceability"],
    entry: "Jewellers register on manakonline.in (Form-V) and hallmark articles at a BIS-recognized AHC.",
  },
  {
    slug: "silver-hallmarking",
    name: "Silver Hallmarking",
    category: "Hallmarking & Jewellery",
    scheme: "Hallmarking",
    standard: "IS 2112 (purity grades)",
    mandatory: false,
    summary:
      "Hallmarking of silver articles with their own purity grades, processed through the same AHC network as gold.",
    tests: ["Purity assay", "HUID traceability"],
    entry: "Jeweller registration on manakonline.in.",
  },
  {
    slug: "jeweller-registration",
    name: "Jeweller Registration",
    category: "Hallmarking & Jewellery",
    scheme: "Hallmarking",
    standard: "Form-V on manakonline.in",
    mandatory: true,
    summary:
      "Registration every jeweller needs before selling hallmarked articles. Registration costs ₹25,000 for five years plus a security deposit.",
    tests: ["Document verification", "Premises check"],
    entry: "File Form-V with GSTIN, PAN and premises proof on manakonline.in.",
  },

  // ---- Industrial & Specialized ----
  {
    slug: "pressure-cookers",
    name: "Pressure Cookers",
    category: "Industrial & Specialized",
    scheme: "ISI",
    standard: "IS 2347 (aluminium), IS 4251 (stainless steel)",
    mandatory: true,
    summary:
      "Domestic pressure cookers in aluminium and stainless steel. Certification requires factory inspection and pressure/hydrostatic testing.",
    tests: ["Pressure and hydrostatic testing", "Safety valve function", "Gasket integrity"],
    entry: "ISI licence with factory inspection at a BIS-recognized lab.",
  },
  {
    slug: "water-heaters-electric",
    name: "Domestic Water Heaters (Electric)",
    category: "Industrial & Specialized",
    scheme: "ISI",
    standard: "IS 302-2-35",
    mandatory: true,
    summary:
      "Storage and instant electric water heaters. Earthing, temperature control and pressure relief are the safety-critical tests.",
    tests: ["Earthing continuity", "Temperature control", "Pressure relief"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "distribution-transformers",
    name: "Distribution Transformers",
    category: "Industrial & Specialized",
    scheme: "ISI",
    standard: "IS 1180",
    mandatory: true,
    summary:
      "Oil-cooled distribution transformers for utility networks. Loss levels and short-circuit withstand are the headline parameters.",
    tests: ["No-load and load losses", "Impedance", "Temperature rise", "Short-circuit withstand"],
    entry: "ISI licence via manakonline.in.",
  },
  {
    slug: "lithium-ion-batteries",
    name: "Secondary Lithium-Ion Batteries (Portable)",
    category: "Industrial & Specialized",
    scheme: "CRS",
    standard: "IS 16046 (IEC 62133)",
    mandatory: true,
    summary:
      "Portable lithium-ion cells and battery packs for consumer devices. Abuse testing is the defining feature of the standard.",
    tests: ["Crush", "Short circuit", "Overcharge", "Thermal abuse"],
    entry: "CRS registration with cell/battery-level test reports.",
  },
  {
    slug: "inverters-ups",
    name: "Inverters/UPS (up to 10 kVA)",
    category: "Industrial & Specialized",
    scheme: "CRS",
    standard: "IS 16221",
    mandatory: true,
    summary:
      "Standby inverters and uninterruptible power supplies for homes and small offices.",
    tests: ["Electrical safety", "EMC", "Performance"],
    entry: "CRS registration — self-declaration, no factory inspection.",
  },
  {
    slug: "solar-pv-modules",
    name: "Solar PV Modules",
    category: "Industrial & Specialized",
    scheme: "CRS",
    standard: "IS 14286 (crystalline), IS 16170 (thin film)",
    mandatory: true,
    summary:
      "Crystalline and thin-film photovoltaic modules, tested for performance at standard test conditions and environmental durability.",
    tests: ["Performance at STC", "Insulation", "Wet leakage", "Mechanical load"],
    entry: "CRS registration on manakonline.in.",
  },
  {
    slug: "fire-extinguishers",
    name: "Fire Extinguishers (Portable and Wheeled)",
    category: "Industrial & Specialized",
    scheme: "ISI",
    standard: "IS 15683 (portable), IS 16018 (wheeled)",
    mandatory: true,
    summary:
      "Portable and wheeled extinguishers. Rating classes (A/B/C/D/K) and rechargeability are defined by the standards.",
    tests: ["Discharge duration and range", "Fire rating", "Rechargeability"],
    entry: "ISI licence via manakonline.in.",
  },
];

export const CATALOG_CATEGORIES = Array.from(
  new Set(CATALOG.map((item) => item.category)),
);

export const SCHEME_LABELS: Record<CatalogItem["scheme"], string> = {
  ISI: "ISI Mark (Scheme-I)",
  CRS: "CRS Registration",
  FMCS: "FMCS",
  Hallmarking: "Hallmarking",
  "ISI/CRS": "ISI or CRS",
  "Voluntary/ISI": "Voluntary ISI",
  "CDSCO + CRS": "CDSCO + CRS",
};
