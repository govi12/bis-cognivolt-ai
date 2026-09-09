import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  FolderOpen,
  CheckSquare,
  Calculator,
  Send,
  Loader2,
  LogOut,
  ChevronDown,
  ChevronRight,
  Info,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Shield,
} from "lucide-react";

// ==================== DATA ====================

const SAMPLE_QUESTIONS = [
  "What is an ISI mark?",
  "How do I apply for BIS certification?",
  "What standard applies to two-wheeler helmets?",
  "What does hallmarking mean for gold?",
  "What is the CRS scheme for electronics?",
  "What are the fee concessions for MSMEs?",
  "How do I find a BIS-recognized testing lab?",
  "What is the HUID code in hallmarking?",
];

const CATEGORIES: Record<
  string,
  Record<string, { scheme: string; is: string; entries: number[] }>
> = {
  "Electrical & Electronics": {
    "LED Lamps (self-ballasted)": {
      scheme: "CRS",
      is: "IS 16102",
      entries: [30],
    },
    "LED Luminaires (street, flood, downlight)": {
      scheme: "CRS",
      is: "IS 10322 Parts 5-1 to 5-6",
      entries: [31],
    },
    "Electric Fans (ceiling, table, pedestal)": {
      scheme: "ISI",
      is: "IS 374",
      entries: [19],
    },
    "PVC Insulated Cables (up to 1100V)": {
      scheme: "ISI",
      is: "IS 694",
      entries: [20],
    },
    "Switches for Household Use": {
      scheme: "ISI",
      is: "IS 3854",
      entries: [21],
    },
    "Energy Meters (static)": {
      scheme: "CRS",
      is: "IS 13779, IS 16444",
      entries: [45],
    },
    "Electric Irons": { scheme: "ISI", is: "IS 366", entries: [46] },
    "Mixer Grinders": { scheme: "ISI", is: "IS 4250", entries: [47] },
    "Room Air Conditioners": { scheme: "CRS", is: "IS 1391", entries: [48] },
    Refrigerators: { scheme: "CRS", is: "IS 1391 Part 2", entries: [49] },
    "Washing Machines": {
      scheme: "CRS",
      is: "IS 1391 Part 3",
      entries: [50],
    },
    "Microwave Ovens": { scheme: "CRS", is: "IS 11676", entries: [51] },
    "Audio/Video Equipment (TVs, monitors)": {
      scheme: "CRS",
      is: "IS 616 / IEC 60065",
      entries: [52],
    },
    "Plugs and Socket-Outlets": { scheme: "ISI", is: "IS 1293", entries: [53] },
    "Circuit Breakers (MCB/RCCB)": {
      scheme: "ISI",
      is: "IS 8828, IS 12640",
      entries: [54],
    },
  },
  "Construction Materials": {
    "Cement — Ordinary Portland (OPC 33/43/53)": {
      scheme: "ISI",
      is: "IS 269, IS 455, IS 1489",
      entries: [23],
    },
    "Steel Bars for Concrete Reinforcement": {
      scheme: "ISI",
      is: "IS 1786",
      entries: [24],
    },
    "Steel Pipes for Water/Gas": {
      scheme: "ISI",
      is: "IS 1239, IS 3589",
      entries: [25],
    },
    "UPVC Pipes for Water Supply": {
      scheme: "ISI",
      is: "IS 4985",
      entries: [26],
    },
    "CPVC Pipes for Hot/Cold Water": {
      scheme: "ISI",
      is: "IS 15778",
      entries: [27],
    },
    "Stainless Steel Sheets/Plates": {
      scheme: "ISI",
      is: "IS 6911",
      entries: [41],
    },
    "Stainless Steel Bars/Wire": {
      scheme: "ISI",
      is: "IS 1570, IS 6529, IS 3444",
      entries: [42],
    },
    "Aluminium Conductors (AAC/AAAC/ACSR)": {
      scheme: "ISI",
      is: "IS 398",
      entries: [43],
    },
  },
  Automotive: {
    "Two-Wheeler Helmets": {
      scheme: "ISI",
      is: "IS 4151:2015",
      entries: [29],
    },
    "Cycle Helmets": { scheme: "ISI", is: "IS 10865", entries: [76] },
    "Tyres (Car/Truck/Bus)": {
      scheme: "ISI",
      is: "IS 15633, IS 15636",
      entries: [57],
    },
    "Safety Glass (Windscreen/Window)": {
      scheme: "ISI",
      is: "IS 2553 Part 1",
      entries: [58],
    },
    "Brake Linings": { scheme: "ISI", is: "IS 2573", entries: [59] },
    "Automotive Lighting": {
      scheme: "ISI",
      is: "IS 15588, IS 15589",
      entries: [56],
    },
  },
  "LPG & Gas Appliances": {
    "LPG Cylinders (>5L)": {
      scheme: "ISI",
      is: "IS 3196 Part 1",
      entries: [8],
    },
    "LPG Cylinders (<5L)": { scheme: "ISI", is: "IS 7142", entries: [94] },
    "LPG Domestic Gas Stoves": {
      scheme: "ISI",
      is: "IS 4246",
      entries: [22],
    },
    "LPG Rubber Hoses": { scheme: "ISI", is: "IS 9573", entries: [91] },
    "LPG Regulators (Domestic)": {
      scheme: "ISI",
      is: "IS 9798",
      entries: [92],
    },
    "CNG Cylinders (Vehicular)": {
      scheme: "ISI",
      is: "IS 15490",
      entries: [95],
    },
  },
  "Food, Water & Infant Products": {
    "Packaged Drinking Water": {
      scheme: "ISI",
      is: "IS 14543",
      entries: [38],
    },
    "Packaged Natural Mineral Water": {
      scheme: "ISI",
      is: "IS 13428",
      entries: [39],
    },
    "Milk Powder": { scheme: "ISI", is: "IS 1165", entries: [40] },
    "Infant Milk Substitutes": {
      scheme: "ISI",
      is: "IS 14433",
      entries: [40],
    },
  },
  "Toys & Safety Equipment": {
    "Toys (Mechanical/Physical Safety)": {
      scheme: "ISI/CRS",
      is: "IS 9873 Part 1",
      entries: [28],
    },
    "Toys (Chemical Safety)": {
      scheme: "ISI/CRS",
      is: "IS 9873 Parts 3 & 9",
      entries: [28],
    },
    "Industrial Safety Helmets": {
      scheme: "ISI",
      is: "IS 2925:1984",
      entries: [81],
    },
    "Firefighter Helmets": {
      scheme: "ISI",
      is: "IS 2745:1983",
      entries: [82],
    },
    "School Bags": { scheme: "ISI", is: "IS 15824", entries: [77] },
  },
  "Hallmarking & Jewellery": {
    "Gold Hallmarking (22K/18K/14K/9K)": {
      scheme: "Hallmarking",
      is: "IS 1417",
      entries: [6, 60, 114, 115],
    },
    "Silver Hallmarking": {
      scheme: "Hallmarking",
      is: "IS 2112",
      entries: [6, 60],
    },
    "Jeweller Registration": {
      scheme: "Hallmarking",
      is: "Form-V on manakonline.in",
      entries: [114],
    },
  },
  "Industrial & Specialized": {
    "Pressure Cookers (Aluminium/SS)": {
      scheme: "ISI",
      is: "IS 2347, IS 4251",
      entries: [17],
    },
    "Domestic Water Heaters (Electric)": {
      scheme: "ISI",
      is: "IS 302-2-35",
      entries: [18],
    },
    "Distribution Transformers": {
      scheme: "ISI",
      is: "IS 1180",
      entries: [44],
    },
    "Lithium-Ion Batteries": {
      scheme: "CRS",
      is: "IS 16046",
      entries: [32],
    },
    "Inverters/UPS (up to 10 kVA)": {
      scheme: "CRS",
      is: "IS 16221",
      entries: [33],
    },
    "Solar PV Modules": {
      scheme: "CRS",
      is: "IS 14286, IS 16170",
      entries: [34],
    },
    "Fire Extinguishers": {
      scheme: "ISI",
      is: "IS 15683, IS 16018",
      entries: [88],
    },
  },
};

const CHECKLISTS: Record<string, string[]> = {
  "ISI Mark (Scheme-I)": [
    "Identify applicable IS standard via 'Know Your Standard' tool (bis.gov.in)",
    "Preliminary testing at BIS-recognized lab (test report ≤90 days old)",
    "Prepare factory layout with QC areas marked",
    "Prepare quality control manual (product-specific)",
    "Prepare machinery list with capacity, make, year",
    "Document raw material sources + supplier details",
    "Maintain test records & calibration certificates",
    "Register on manakonline.in → fill Form-I/II",
    "Pay scrutiny fee (₹1,000) + marking fee advance",
    "Factory inspection by BIS officer (QC, testing, records)",
    "Pay license fee + marking fee → license granted (up to 5 years)",
    "Ongoing: annual fee, surveillance visits (min 1/year), market samples",
  ],
  "CRS (Compulsory Registration)": [
    "Confirm product in CRS notified list (bis.gov.in → CRS)",
    "Test at BIS-recognized lab (report ≤90 days, all IS/IEC standards)",
    "Register on manakonline.in → fill Form-III",
    "Upload test report + declaration + fees",
    "No factory inspection required",
    "BIS verifies documents → grants R-number (R-xxxxxxx)",
    "Mark product with Standard Mark + R-number",
    "Validity: 2 years, renewable",
    "Surveillance: market samples picked by BIS, tested at labs",
  ],
  FMCS: [
    "Foreign manufacturer appoints Authorized Indian Representative (AIR)",
    "AIR applies on manakonline.in → Form-IV + QC docs + test reports",
    "BIS scrutiny → factory inspection in foreign country",
    "Manufacturer pays inspection charges (travel, allowance in USD)",
    "License granted (1-2 years initially) → ISI + license number on product",
    "Renewal: re-inspection or documentary review",
    "Surveillance visits periodic",
  ],
  Hallmarking: [
    "Register on manakonline.in → Form-V + GSTIN + PAN + premises proof",
    "Pay registration fee (₹25,000 for 5 years) + security deposit",
    "BIS verifies → grants jeweller registration number (JRN)",
    "Send articles to BIS-recognized AHC",
    "AHC tests purity → applies hallmark (BIS logo + purity + HUID)",
    "HUID = 6-digit alphanumeric, trackable on BIS CARE app",
  ],
};

// ==================== COMPONENTS ====================

function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[85%] lg:max-w-[70%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
          isUser
            ? "glass-bubble-user text-foreground"
            : "glass-bubble-assistant text-foreground"
        }`}
      >
        {content.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function ChatTab() {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sendMessage = useAction(api.chat.sendMessage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (question?: string) => {
    const q = question || input.trim();
    if (!q || isLoading) return;

    const userMsg = { role: "user" as const, content: q };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendMessage({
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: reply },
      ]);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Unable to get an answer. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: `⚠️ ${errorMsg}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto glass-scroll px-1 pb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="glass-card rounded-3xl p-8 max-w-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/10 mx-auto mb-5">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ask Cognivolt AI
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Get expert answers about BIS certification, Indian Standards,
                ISI marks, CRS registration, and more.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_QUESTIONS.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSubmit(q)}
                    className="glass-input rounded-xl px-3 py-2.5 text-xs text-left text-foreground hover:bg-white/70 transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="glass-bubble-assistant rounded-2xl px-5 py-3.5 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">
                Thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="pt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="glass-panel rounded-2xl flex items-center gap-2 p-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about BIS certification, standards, or compliance..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground disabled:opacity-40 hover:from-primary hover:to-primary transition-all cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function CategoriesTab() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const askAbout = (product: string) => {
    if (!isAuthenticated) {
      navigate(
        `/auth?returnTo=${encodeURIComponent(`/dashboard?q=What is the certification process for ${product}?`)}`,
      );
    } else {
      // Store the question in URL and redirect to home tab
      window.location.href = `/dashboard?q=${encodeURIComponent(`What is the certification process for ${product}?`)}`;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-primary" />
          IS Code Explorer
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Browse product categories to find applicable IS standards and
          certification schemes.
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(CATEGORIES).map(([category, products]) => (
          <div key={category} className="glass-card rounded-xl overflow-hidden">
            <button
              onClick={() =>
                setOpenCategory(
                  openCategory === category ? null : category,
                )
              }
              className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-pointer hover:bg-white/30 transition-colors"
            >
              <span className="text-sm font-semibold text-foreground">
                {category}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {Object.keys(products).length} standards
                </span>
                {openCategory === category ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </span>
            </button>

            {openCategory === category && (
              <div className="border-t border-border/40 px-5 py-3 space-y-2">
                {Object.entries(products).map(([product, info]) => (
                  <div
                    key={product}
                    className="flex items-center justify-between py-2 border-b border-border/20 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {product}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <span className="inline-flex items-center rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary mr-2">
                          {info.scheme}
                        </span>
                        {info.is}
                      </p>
                    </div>
                    <button
                      onClick={() => askAbout(product)}
                      className="ml-3 flex-shrink-0 glass-input rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-white/60 transition-colors cursor-pointer"
                    >
                      Ask <ArrowRight className="w-3 h-3 inline ml-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChecklistsTab() {
  const [checkedItems, setCheckedItems] = useState<Record<string, Set<number>>>(
    {},
  );

  const toggleCheck = (scheme: string, index: number) => {
    setCheckedItems((prev) => {
      const current = new Set(prev[scheme] || []);
      if (current.has(index)) {
        current.delete(index);
      } else {
        current.add(index);
      }
      return { ...prev, [scheme]: current };
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-primary" />
          Certification Checklists
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Step-by-step checklists for each BIS certification scheme. Track your
          progress.
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(CHECKLISTS).map(([scheme, steps]) => {
          const checked = checkedItems[scheme] || new Set();
          const progress = Math.round((checked.size / steps.length) * 100);

          return (
            <div key={scheme} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-foreground">
                  {scheme}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {checked.size}/{steps.length} steps
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-primary/10 mb-4">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-1.5">
                {steps.map((step, i) => (
                  <label
                    key={i}
                    className={`flex items-start gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                      checked.has(i)
                        ? "bg-primary/5"
                        : "hover:bg-white/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked.has(i)}
                      onChange={() => toggleCheck(scheme, i)}
                      className="mt-0.5 w-4 h-4 rounded border-border accent-primary cursor-pointer"
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        checked.has(i)
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {i + 1}. {step}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeeCalculatorTab() {
  const [scheme, setScheme] = useState("ISI Mark (Scheme-I)");
  const [category, setCategory] = useState("Micro/Startup");
  const [productionValue, setProductionValue] = useState(10000000);
  const [isWoman, setIsWoman] = useState(false);
  const [isNE, setIsNE] = useState(false);
  const [result, setResult] = useState<{
    baseFee: number;
    concessionPct: number;
    concessionAmount: number;
    netFee: number;
  } | null>(null);

  const calculate = () => {
    const baseRates: Record<string, number> = {
      "ISI Mark (Scheme-I)": 0.005,
      CRS: 0.002,
      FMCS: 0.01,
    };
    const concessions: Record<string, number> = {
      "Micro/Startup": 0.8,
      Small: 0.5,
      Medium: 0.2,
      "Large (no concession)": 0.0,
    };

    const baseRate = baseRates[scheme] || 0.005;
    const concession = concessions[category] || 0;
    const extra = isWoman || isNE ? 0.1 : 0;
    const totalConcession = Math.min(concession + extra, 0.9);

    let baseFee = productionValue * baseRate;
    const minFee =
      scheme.includes("ISI")
        ? 50000
        : scheme === "CRS"
          ? 25000
          : 0;
    baseFee = Math.max(baseFee, minFee);

    const concessionAmount = baseFee * totalConcession;
    const netFee = baseFee - concessionAmount;

    setResult({
      baseFee,
      concessionPct: totalConcession * 100,
      concessionAmount,
      netFee,
    });
  };

  const inputClasses =
    "glass-input rounded-xl px-4 py-2.5 text-sm text-foreground outline-none w-full";
  const labelClasses = "text-sm font-medium text-foreground mb-1.5 block";

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          BIS Fee Calculator
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Estimate marking fees with MSME concessions. Figures are approximate
          — verify on bis.gov.in/fee-structure.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Certification Scheme</label>
            <select
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
              className={inputClasses}
            >
              <option>ISI Mark (Scheme-I)</option>
              <option>CRS</option>
              <option>FMCS</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Enterprise Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClasses}
            >
              <option>Micro/Startup</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large (no concession)</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              Annual Production Value (₹)
            </label>
            <input
              type="number"
              value={productionValue}
              onChange={(e) => setProductionValue(Number(e.target.value))}
              min={0}
              step={100000}
              className={inputClasses}
            />
          </div>

          <div className="flex items-end gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isWoman}
                onChange={(e) => setIsWoman(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
              />
              <span className="text-sm text-foreground">
                Women Entrepreneur
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isNE}
                onChange={(e) => setIsNE(e.target.checked)}
                className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
              />
              <span className="text-sm text-foreground">
                North-East Unit
              </span>
            </label>
          </div>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full sm:w-auto rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:from-primary hover:to-primary transition-all cursor-pointer"
        >
          Calculate Fee
        </button>

        {result && (
          <div className="mt-6 glass-panel rounded-xl p-5">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Fee Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Base Marking Fee
                </span>
                <span className="font-medium text-foreground">
                  ₹{result.baseFee.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Concession ({result.concessionPct}%)
                </span>
                <span className="font-medium text-green-600">
                  -₹{result.concessionAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="border-t border-border/40 pt-2 flex justify-between text-sm">
                <span className="font-semibold text-foreground">
                  Net Marking Fee (Annual)
                </span>
                <span className="font-bold text-primary text-base">
                  ₹{result.netFee.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {scheme === "FMCS" && (
              <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  FMCS fees are payable in USD. Marking fee typically $0.50–$2
                  per unit. Inspection charges are additional.
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Scrutiny fee (₹1,000 for ISI/CRS, ₹5,000 for FMCS) and license
            fee (₹1,000/year) are separate. Verify latest fees on
            bis.gov.in/fee-structure.
          </span>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN DASHBOARD ====================

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="glass-bg min-h-screen relative">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-[oklch(0.85_0.06_260)] opacity-25 blur-[80px] animate-float-slow" />
        <div className="absolute bottom-20 left-[15%] w-56 h-56 rounded-full bg-[oklch(0.87_0.05_220)] opacity-20 blur-[70px] animate-float-medium" />
      </div>

      {/* Top Navigation */}
      <nav className="relative z-10 glass-panel border-b border-border/30 px-6 lg:px-10 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold text-foreground tracking-tight">
                Cognivolt AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.name && (
              <span className="text-xs text-muted-foreground hidden sm:block">
                Hi, {user.name}
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="glass-input rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="glass-tab-list w-full justify-start gap-1 h-auto p-1 mb-6">
            <TabsTrigger
              value="home"
              className="data-[state=active]:glass-tab-trigger gap-1.5 px-4 py-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:glass-tab-trigger gap-1.5 px-4 py-2 cursor-pointer"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger
              value="checklists"
              className="data-[state=active]:glass-tab-trigger gap-1.5 px-4 py-2 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Checklists</span>
            </TabsTrigger>
            <TabsTrigger
              value="fees"
              className="data-[state=active]:glass-tab-trigger gap-1.5 px-4 py-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Fee Calc</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <ChatTab />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>

          <TabsContent value="checklists">
            <ChecklistsTab />
          </TabsContent>

          <TabsContent value="fees">
            <FeeCalculatorTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <div className="relative z-10 text-center pb-6">
        <p className="text-xs text-muted-foreground">
          Built for Smart India Hackathon 2026 — Team Cognivolt
        </p>
      </div>
    </div>
  );
}
