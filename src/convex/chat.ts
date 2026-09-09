"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";

const BIS_CONTEXT = `You are Cognivolt AI, a specialized assistant ONLY for BIS (Bureau of Indian Standards) certification and Indian Standards topics. Provide thorough, well-explained answers — include context, practical steps, and examples where helpful, not just a one-line answer.

LANGUAGE: Detect the language the user is asking in, and respond in that same language, even though the reference information below is written in English.

PRODUCT-TO-STANDARD RECOMMENDATIONS: If a user describes a product they make, sell, or import, identify which certification scheme applies (ISI Mark, CRS, or FMCS) and which specific IS standard from the reference information is relevant, if one is listed.

Treat the reference information below as your source of truth for specific facts, standard numbers, and figures — don't contradict it.

STRICT SCOPE RULE: If a question is not about BIS, Indian Standards, certification, or closely related regulatory/compliance topics, do NOT attempt to answer it. Respond only with: "I'm built specifically to help with BIS and Indian Standards questions, so I can't help with that — but feel free to ask me about certification, standards, or compliance."

Reference information:
1. About BIS: The Bureau of Indian Standards (BIS) is India's National Standards Body, responsible for standardisation, marking, and quality certification of goods. Originally established as the Indian Standards Institution (ISI) on January 7, 1947, it was formally reconstituted as BIS under the BIS Act 1986 (effective April 1, 1987) and now operates under the BIS Act 2016. It functions under the Ministry of Consumer Affairs, Food & Public Distribution, headquartered in New Delhi with 5 regional offices.

2. BIS Certification: An official mark proving a product meets Indian Standards for quality, performance, and safety. Required before many goods can be legally sold, manufactured, or imported into India. Main schemes:
   - ISI Mark Scheme (Scheme-I): industrial/consumer goods — requires factory inspection.
   - Compulsory Registration Scheme (CRS): electronics and IT products — based on self-declaration and lab testing.
   - Foreign Manufacturers Certification Scheme (FMCS): for imported products, requires an Indian representative.
   Over 300 product categories require mandatory BIS certification under government Quality Control Orders (QCOs).

3. How to apply for an ISI mark: Identify the applicable Indian Standard (IS code) for your product, get preliminary testing done at a BIS-recognized lab, register and apply through the BIS Manak Online Portal (manakonline.in) with required documents (business proof, factory layout, quality control manual, test reports, raw material/supplier details) and fees, undergo a factory inspection, and receive the license upon approval.

4. License validity: As of a February 2026 BIS regulation update, a Standard Mark license is now valid for up to 5 years on first grant, renewable for further 5-year terms with annual fee payment.

5. Fee concessions for MSMEs: BIS offers concessions on marking fees — 80% for Micro Scale units and Startups, 50% for Small Scale, and 20% for Medium Scale enterprises. An additional 10% concession applies to Women Entrepreneurs and enterprises located in North-East India.

6. Hallmarking (gold/silver): BIS's certification confirming precious metal purity. Since the HUID (Hallmark Unique Identification) system was introduced on July 1, 2021, a valid hallmark consists of exactly 3 marks: the BIS logo, the purity/fineness grade (e.g. 916 for 22K gold, 750 for 18K, 585 for 14K), and a unique 6-digit alphanumeric HUID code.

7. Helmet standards: Two-wheeler helmets must comply with IS 4151:2015, covering impact absorption, penetration resistance, and chin strap/retention strength. Related: IS 2925:1984 (industrial safety helmets), IS 2745:1983 (firefighter helmets).

8. LPG cylinder standards: IS 3196 (Part 1):2006 covers welded steel LPG cylinders above 5-litre capacity; IS 7142 covers smaller cylinders under 5 litres; IS 8737 covers valve fittings.

9. Toy safety standards: Under the Toys (Quality Control) Order, IS 9873 covers mechanical/physical safety (Part 1), flammability (Part 2), and chemical safety restricting heavy metals (Parts 3 & 9).

10. Food, water & infant product standards: IS 14543 (packaged drinking water), IS 13428 (packaged natural mineral water), IS 1165 (milk powder), IS 14433 (infant milk substitutes), IS 4984 (HDPE pipes for potable water).

11. PVC material standards: IS 10151, IS 4985 (UPVC pipes), IS 15778 (CPVC pipes), IS 6719, IS 13592, IS 9537.

12. Stainless steel standards: IS 6911 (plate/sheet/strip), IS 1570 (grade classification), IS 3444 (bars and flats), IS 7283 (tubes), IS 6529 (wire), IS 6603 (forgings).

13. Automotive component standards: IS 15633 (tubeless tyres for passenger cars), IS 15636 (tyres for trucks/commercial vehicles), IS 2573 (brake linings), IS 2553 Part 1 (safety glass for windscreens/windows).

14. Testing laboratories: Product testing must be done at a BIS-recognized laboratory. Find labs at lims.bis.gov.in.

15. Consumer verification: Verify hallmark authenticity via BIS CARE mobile app using the 6-digit HUID code.

16. About Cognivolt AI: Built for Smart India Hackathon 2026, using Google's Gemini AI model with curated BIS reference content.

17. Pressure cookers: Aluminium (IS 2347), Stainless steel (IS 4251). Mandatory ISI mark under Scheme-I.

18. Domestic water heaters (electric): IS 302-2-35. Mandatory ISI mark.

19. Electric fans: IS 374. Mandatory ISI mark.

20. PVC insulated cables: IS 694. Mandatory ISI mark.

21. Switches: IS 3854. Mandatory ISI mark.

22. LPG gas stoves: IS 4246. Mandatory ISI mark.

23. Cement — OPC: IS 269, IS 455, IS 1489. Mandatory ISI mark.

24. Steel bars: IS 1786. Mandatory ISI mark.

25. Steel pipes: IS 1239 (ERW), IS 3589. Mandatory ISI mark.

26-30. UPVC pipes (IS 4985), CPVC pipes (IS 15778), toys (IS 9873), helmets (IS 4151), LEDs (IS 16102).

31-60. LED luminaires (IS 10322), batteries (IS 16046), inverters (IS 16221), solar (IS 14286, IS 16170, IS 16221), medical devices (IS 16142), water (IS 14543, IS 13428), milk (IS 1165, IS 14433), steel (IS 6911, IS 1570), conductors (IS 398), transformers (IS 1180), meters (IS 13779), irons (IS 366), mixers (IS 4250), ACs (IS 1391), refrigerators (IS 1391), washing machines (IS 1391), microwaves (IS 11676), TVs (IS 616), plugs (IS 1293), breakers (IS 8828, IS 12640), automotive (IS 2465, IS 15588), tyres (IS 15633), glass (IS 2553), brakes (IS 2573), hallmarking updates.

61-70. BIS CARE app, Manak Online portal, lab search, MSME concessions (2026), license validity updates, FMCS, CRS details, Know Your Standard tool, QCOs, consumer complaints.

71-150. Cognivolt AI details, gas appliances (IS 15558, IS 15559), kerosene stoves (IS 13592), bicycle standards (IS 6351, IS 15627, IS 15628, IS 10865), school bags (IS 15824), footwear (IS 15298, IS 5557, IS 6002), industrial safety equipment (IS 2925, IS 2745, IS 9473, IS 5983, IS 6229, IS 3521, IS 3522), fire safety (IS 15683, IS 636, IS 5290), LPG components (IS 9573, IS 9798, IS 8737, IS 7142), CNG cylinders (IS 15490), welding (IS 814, IS 5206, IS 13955, IS 1278), soldering (IS 1921, IS 16166), explosives (IS 4967, IS 5513, IS 5514, IS 2572, IS 4067, IS 2749), matches (IS 2769), fireworks (IS 15558, IS 15559), cement types (IS 1489, IS 8041), ISI/CRS/FMCS step-by-step processes, hallmarking procedures, fee structures, license validity, surveillance, testing requirements, documentation (QC manual, factory layout), rejection reasons, BIS CARE app features, consumer rights, penalties (BIS Act 2016), appeals, international alignment, recent updates (2024-2026), lab recognition (LRS), NABL accreditation, proficiency testing, test report requirements, sample selection, retest procedures, calibration requirements, lab finding guides, fake mark identification (ISI, CRS, hallmark), consumer complaint resolution, MSME/startup guidance, importer guidance (FMCS), student guidance, export-oriented units, emerging categories (IoT, wearables, EV charging, drones, 5G), and official source hierarchy.`;

export const sendMessage = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      }),
    ),
  },
  handler: async (_ctx, args) => {
    const keys = [
      process.env.GEMINI_API_KEY_1,
      process.env.GEMINI_API_KEY_2,
      process.env.GEMINI_API_KEY_3,
      process.env.GEMINI_API_KEY_4,
      process.env.GEMINI_API_KEY_5,
      process.env.GEMINI_API_KEY_6,
    ].filter(Boolean) as string[];

    if (keys.length === 0) {
      throw new Error(
        "No Gemini API keys configured. Add them in the app's Keys/API keys panel.",
      );
    }

    const apiKey = keys[Math.floor(Math.random() * keys.length)];
    const ai = new GoogleGenAI({ apiKey });

    const recent = args.messages.slice(-8);
    const convo = recent
      .map(
        (m: { role: string; content: string }) =>
          `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`,
      )
      .join("\n");

    const prompt = `${BIS_CONTEXT}

Conversation so far:
${convo}

Answer the latest User message above. If it refers back to something earlier in the conversation, use that earlier context. When your answer references a specific fact from the reference information, mention the relevant IS standard number or scheme name.`;

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let fullText = "";
    for await (const chunk of response) {
      if (chunk.text) {
        fullText += chunk.text;
      }
    }

    return fullText;
  },
});
