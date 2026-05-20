import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, User, Package, Search } from "lucide-react";

const AREAS = ["All", "Gulshan-e-Iqbal", "Gulistan-e-Johar", "North Nazimabad", "Nazimabad", "North Karachi", "Buffer Zone"];

const outlets = [
  // ── Gulshan-e-Iqbal ──────────────────────────────────────────────────────
  { name: "SYED TEA", address: "Shop #14-B Hamid Square Block 3 Gulshan-e-Iqbal", contact: "0333-2231024", person: "Mr Arif", block: "Block 3", landmark: "Near Disco Bakery", skus: "All SKUs", area: "Gulshan-e-Iqbal" },
  { name: "BIN QASIM BOOK CENTRE", address: "Shop #1 Shaz Co Centre Block 4 Gulshan-e-Iqbal", contact: "0333-3578797 / 0333-3001023", person: "Mr Zulfiqar", block: "Block 4", landmark: "Near Disco Bakery", skus: "19L / 12L", area: "Gulshan-e-Iqbal" },
  { name: "JAMAL COLD DRINKS", address: "Shop #8 Yasir Appt Block 16 Gulshan-e-Iqbal", contact: "0315-2622341", person: "Mr Jamal", block: "Block 16", landmark: "Near Bait-ul-Mukarram Masjid", skus: "19L / 6L", area: "Gulshan-e-Iqbal" },
  { name: "SHALIMAR BAKERY", address: "Shop #1 Plot S/4-A Yasir Apartments Block 16", contact: "0300-2131055", person: "Mr Shahid", block: "Block 16", landmark: "Near Bait-ul-Mukarram Masjid", skus: "19L / 6L", area: "Gulshan-e-Iqbal" },
  { name: "AL AMIN GENERAL STORE", address: "Bagh-e-Rizwan Shop E2 Block 16 Gulshan-e-Iqbal", contact: "0313-2369333 / 0300-2130644", person: "Mr Noor ul Amin", block: "Block 16", landmark: "Near Bait-ul-Mukarram Masjid", skus: "19L", area: "Gulshan-e-Iqbal" },
  { name: "AL KAMAL SWEETS & BAKERS", address: "A-12 Row D Block 3 Kaneez Fatima Scheme 33", contact: "0300-2086867", person: "Mr Nisar Ahmed", block: "Scheme 33", landmark: "Kaneez Fatima Scheme 33", skus: "19L / 6L", area: "Gulshan-e-Iqbal" },
  { name: "MAX MART", address: "Shop #4 Rehman City Apartment Block 13/D Gulshan-e-Iqbal", contact: "0312-8593133", person: "Mr Saleem", block: "Block 13/D", landmark: "—", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "RITE MEDICAL STORE", address: "Shop #8 Haris Apartment Block 13/C Gulshan-e-Iqbal", contact: "0321-4975230", person: "Mr Bilal", block: "Block 13/C", landmark: "Near Mustafa Hospital", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "SAJJAD BAKERS", address: "Shop #10 Khursheed City Block 13/C Gulshan-e-Iqbal", contact: "0344-0376886", person: "Mr Ashraf", block: "Block 13/C", landmark: "Near Mustafa Hospital", skus: "0.5L / 1.5L / 6L", area: "Gulshan-e-Iqbal" },
  { name: "MUSTAFA MEDICAL STORE", address: "Shop #2 Block 13/C Gulshan-e-Iqbal", contact: "0333-2472799", person: "Mr Faisal", block: "Block 13/C", landmark: "Near Mustafa Hospital", skus: "0.5L / 1.5L / 6L", area: "Gulshan-e-Iqbal" },
  { name: "BAKERS HUT", address: "Shop #1 Plot R-567 Block 5 Gulshan-e-Iqbal", contact: "0302-2107581", person: "Mr Akram", block: "Block 5", landmark: "Near Adamjee Institute", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "SUPER STAR STORE", address: "Shop #5 Plot 236 Block 5 Gulshan-e-Iqbal", contact: "0322-2474175", person: "Mr Kashif", block: "Block 5", landmark: "Near Adamjee Institute", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "A.R MART", address: "Shop #16 Karson Complex Block 2 Gulshan-e-Iqbal", contact: "0336-2010146", person: "Mr Yousuf", block: "Block 2", landmark: "Moti Mahal", skus: "1.5L / 6L", area: "Gulshan-e-Iqbal" },
  { name: "AL SHAIKH MEDICAL STORE", address: "Shop #17 Plot A-174 Block 2 Gulshan-e-Iqbal", contact: "0335-2161952", person: "Mr Nadeem", block: "Block 2", landmark: "Moti Mahal", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "HOME PLUS STORE", address: "Shop #7 Block 4 Gulshan-e-Iqbal", contact: "0315-0254527", person: "Mr Shahid", block: "Block 4", landmark: "Opp Disco Bakery", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "DISCOVERY MEDICAL STORE", address: "Shop 6 Block 4 Gulshan-e-Iqbal", contact: "0312-2056691", person: "Mr Safeer", block: "Block 4", landmark: "Opp KFC", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "HOME NEEDS STORE", address: "Shop 9 Erum Arcade Block 4 Gulshan-e-Iqbal", contact: "0322-7160141", person: "Mr Umer", block: "Block 4", landmark: "Near Maskan Chowrangi", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "AL TEHMORIA STORE", address: "Shop #22 Rehan Palace Block 7 Gulshan-e-Iqbal", contact: "0322-7160141", person: "Mr Furqan", block: "Block 7", landmark: "Near Maskan Chowrangi", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "SHAH E MADINA", address: "Shop #4 Block 7 Gulshan-e-Iqbal", contact: "0305-1142196", person: "Mr Islam", block: "Block 7", landmark: "Opp City School", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "BIG BUY MART", address: "Shop #1-6 Gulzar-e-Hijri Ispahani Road", contact: "0313-2136221", person: "Mr Shayan", block: "Gulzar-e-Hijri", landmark: "Ispahani Road", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "SULTAN MART", address: "Shop #6 Scheme 33 Gulzar-e-Hijri", contact: "0312-2708769", person: "Mr Faraz", block: "Gulzar-e-Hijri", landmark: "—", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "MEHRAN MEDICAL STORE", address: "Shop #8 Ali Pride Block 16 Gulshan-e-Iqbal", contact: "0303-8341388", person: "Mr Anwar", block: "Block 16", landmark: "Near Needs Mart", skus: "0.5L / 1.5L / 6L", area: "Gulshan-e-Iqbal" },
  { name: "SUNNY MEDICAL STORE", address: "Shop #10-11 Rafi Centre Block 16 Gulshan-e-Iqbal", contact: "0310-6994524", person: "Mr Hassan", block: "Block 16", landmark: "Near Needs Mart", skus: "6L", area: "Gulshan-e-Iqbal" },
  { name: "IMTIAZ DEPARTMENTAL STORE", address: "Saima Royal View Apartment Block 2 Gulshan-e-Iqbal", contact: "0322-3251509", person: "Mr Obaid", block: "Block 2", landmark: "Near Lucky One", skus: "6L", area: "Gulshan-e-Iqbal" },

  // ── Gulistan-e-Johar ─────────────────────────────────────────────────────
  { name: "SEVEN 86 MEDICOS", address: "Shop #3 Rafi Heights Phase 1 Gulistan-e-Johar Block 18", contact: "021-34010647 / 0333-2299733", person: "Mr Shoaib", block: "Block 18", landmark: "Rafi Heights Ph 1 Johar", skus: "19L / 6L", area: "Gulistan-e-Johar" },
  { name: "QUALITY WATER SHOP 2", address: "Shop #11 Ph 3 Haroon Royal City Johar", contact: "0331-3900839", person: "Mr Anwar", block: "Block 17", landmark: "Haroon Royal City Johar", skus: "19L", area: "Gulistan-e-Johar" },
  { name: "MASHALLAH GENERAL STORE", address: "Shop #6 Rufi Heights Phase 2 Block 17 Gulistan-e-Johar", contact: "0331-3803563", person: "Mr Munawar", block: "Block 17", landmark: "Near Johar Chorangi", skus: "19L", area: "Gulistan-e-Johar" },
  { name: "I AM MART", address: "Shop #22 King Residency Block 17 Gulistan-e-Johar", contact: "0336-3137635", person: "Mr Jameel", block: "Block 17", landmark: "Near Johar Chorangi", skus: "6L", area: "Gulistan-e-Johar" },

  // ── North Nazimabad ───────────────────────────────────────────────────────
  { name: "ICE AGE", address: "Shop #4 Ovasis View Block K North Nazimabad", contact: "0313-3777530 / 0335-2915511", person: "Mr Mubarak", block: "Block K", landmark: "Near North Marriage Garden", skus: "19L", area: "North Nazimabad" },
  { name: "SHAMSI MEDICO", address: "Shop #5 Bhayani View Appt Block M North Nazimabad", contact: "0345-3990985", person: "Mr Umair Ahmed", block: "Block M", landmark: "Behind Mateen Food", skus: "19L / 6L", area: "North Nazimabad" },
  { name: "2 W'S MEDICAL & GENERAL STORE", address: "SD-06 Shop #21-22 Farzana Square Block M North Nazimabad", contact: "0300-2211691", person: "Mr Khawaja Nadeem", block: "Block M", landmark: "Behind Mateen Food", skus: "19L / 6L", area: "North Nazimabad" },
  { name: "V.I.P BAKERY", address: "Shop 2 Plot A-422 Block A North Nazimabad", contact: "0315-6191202", person: "Mr Noman", block: "Block A", landmark: "Near Madni Masjid", skus: "6L", area: "North Nazimabad" },
  { name: "NIDA MEDICAL STORE", address: "Shop #1 Haris Arcade Block A North Nazimabad", contact: "021-36674244", person: "Mr Raza", block: "Block A", landmark: "Near Madni Masjid", skus: "6L", area: "North Nazimabad" },
  { name: "KHAWAJA STORE", address: "Shop 1 Plot A-317 Block A North Nazimabad", contact: "021-36624129", person: "Mr Khawaja", block: "Block A", landmark: "Near Madni Masjid", skus: "6L", area: "North Nazimabad" },
  { name: "JZ SUPER MART", address: "Shop #5 Main Five Star Chowrangi Block D North Nazimabad", contact: "0370-2317411", person: "Mr Muqeem", block: "Block D", landmark: "Near Five Star Chowrangi", skus: "0.5L / 1.5L / 6L", area: "North Nazimabad" },
  { name: "AL MASHARIB BAKERY", address: "Shop 12 Bhayani View Apartment Block J North Nazimabad", contact: "0308-8485812", person: "Mr Bilal", block: "Block J", landmark: "Near Farooq-e-Azam Masjid", skus: "6L", area: "North Nazimabad" },
  { name: "ALISHA MEDICAL", address: "Shop #7 Bhayani View Appt Block M North Nazimabad", contact: "0345-2655560", person: "Mr Irfan", block: "Block M", landmark: "Behind Mateen Food", skus: "6L", area: "North Nazimabad" },
  { name: "MUNNA MART", address: "Shop #3 Bhayani View Appt Block M North Nazimabad", contact: "0318-4833021", person: "Mr Noman", block: "Block M", landmark: "Behind Mateen Food", skus: "6L", area: "North Nazimabad" },
  { name: "WIN WIN MART", address: "Shop #7 Ali Arcade Block M North Nazimabad", contact: "0323-2920211", person: "Mr Shakeel", block: "Block M", landmark: "Near Rajput Pakwan", skus: "0.5L / 1.5L / 6L", area: "North Nazimabad" },

  // ── Nazimabad ─────────────────────────────────────────────────────────────
  { name: "DIAMOND COLD", address: "Shop #9 5-D-7-8 Bhayani Avenue Nazimabad", contact: "0300-2020577", person: "Mr Shabbir", block: "Block 3", landmark: "Near Mahki Masjid", skus: "19L", area: "Nazimabad" },
  { name: "M GEES STORE NAZ", address: "4-C Shop #58 Hadi Market Nazimabad #4", contact: "0324-8230681", person: "Mr Usman", block: "Block 4", landmark: "Hadi Market Nazimabad #4", skus: "19L / 6L", area: "Nazimabad" },
  { name: "UMAR GENERAL STORE", address: "Shop #65 Hydery Pride Nazimabad #4", contact: "0334-3174634", person: "Mr Khalid", block: "Block 4", landmark: "Hydery Pride", skus: "19L / 12L / 6L", area: "Nazimabad" },
  { name: "SALEEM MEDICAL STORE", address: "Shop 2 Plot 144/2 Nazimabad", contact: "0331-2258665", person: "Mr Kamran", block: "Block 2", landmark: "Near Eidgah Ground", skus: "0.5L / 1.5L / 6L", area: "Nazimabad" },
  { name: "PRINCE BAKERS", address: "Shop 3 Plot 273/3 Nazimabad", contact: "021-36603755", person: "Mr Faizan", block: "Block 3", landmark: "Near Allah Wala Biryani", skus: "0.5L / 1.5L / 6L", area: "Nazimabad" },
  { name: "IMTIAZ DEPARTMENTAL STORE", address: "Plot 77/4 Nazimabad", contact: "0300-8214480", person: "Mr Ameen", block: "Block 4", landmark: "Near A.O Clinic", skus: "6L", area: "Nazimabad" },
  { name: "MASHALLAH MEDICAL STORE", address: "Shop 3 Plot 344/1 Nazimabad", contact: "0335-2291323", person: "Mr Hassan", block: "Block 1", landmark: "Near Agha Juice", skus: "6L", area: "Nazimabad" },
  { name: "TAWAKKAL MEDICAL STORE", address: "Shop 7 Plot 321/1 Nazimabad", contact: "0333-1025326", person: "Mr Imran", block: "Block 1", landmark: "Near Agha Juice", skus: "6L", area: "Nazimabad" },

  // ── North Karachi ─────────────────────────────────────────────────────────
  { name: "FINE BAKERS & NIMCO", address: "Shop A-43 Sector 11-B Baradari North Karachi", contact: "0300-2161775", person: "Mr Jawaid", block: "Sector 11-B", landmark: "11-B Baradari", skus: "19L / 6L", area: "North Karachi" },
  { name: "SUPER FINE STORE", address: "L-S 2 S.T 3 Sector 10 North Karachi", contact: "0331-2472010 / 0343-2316600", person: "Mr Salman", block: "Sector 10", landmark: "Near Disco More", skus: "19L / 6L", area: "North Karachi" },
  { name: "AL-KHALIQUE MEDICOSE", address: "L-S #20 5C/2 North Karachi", contact: "0331-2605911", person: "Mr Khalique", block: "Sector 5C/2", landmark: "Bara Market", skus: "19L", area: "North Karachi" },
  { name: "GARDEN SUPER MARKET BR 05", address: "Plot C-144 Sector 11-B U.P Mor North Karachi", contact: "0332-0002600", person: "Mr Farooq / Mr Sanaullah", block: "Sector 11-B", landmark: "Near U.P More", skus: "19L", area: "North Karachi" },
  { name: "MUSTAFA MEDICAL STORE", address: "L-S 4 S.T 1 Sector 10 North Karachi", contact: "0312-6281364", person: "Mr Faizan", block: "Sector 10", landmark: "Near Disco More", skus: "6L", area: "North Karachi" },

  // ── Buffer Zone ───────────────────────────────────────────────────────────
  { name: "USMAN MEDICAL STORE", address: "House #600 15-A/5 Buffer Zone", contact: "0336-2029041", person: "Mr Kashif", block: "Sector 15-A/5", landmark: "Opp Nice Bakery", skus: "19L", area: "Buffer Zone" },
  { name: "FRIENDS AND FAMILY MART", address: "Shop 4-5 House #560 15-A/4 Buffer Zone", contact: "0336-2078981", person: "Mr Owais", block: "Sector 15-A/4", landmark: "Main Market Buffer Zone", skus: "0.5L / 1.5L / 6L", area: "Buffer Zone" },
];

const AREA_COLORS: Record<string, string> = {
  "Gulshan-e-Iqbal":  "bg-blue-50  text-blue-700  border-blue-200",
  "Gulistan-e-Johar": "bg-violet-50 text-violet-700 border-violet-200",
  "North Nazimabad":  "bg-sky-50   text-sky-700   border-sky-200",
  "Nazimabad":        "bg-teal-50  text-teal-700  border-teal-200",
  "North Karachi":    "bg-green-50 text-green-700 border-green-200",
  "Buffer Zone":      "bg-orange-50 text-orange-700 border-orange-200",
};

const ALL_AREAS_COVERED = [
  "Gulshan Area", "Gulistan-e-Johar", "DHA Area", "Clifton",
  "P.E.C.H.S Area", "North Nazimabad", "North Karachi", "F.B Area",
  "Nazimabad", "Liaqatabad", "Malir Area", "Baldia Town",
  "Orangi Town", "Shahra-e-Faisal", "Garden",
];

export function RetailOutlets() {
  const [activeArea, setActiveArea] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = outlets.filter((o) => {
    const matchArea = activeArea === "All" || o.area === activeArea;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.name.toLowerCase().includes(q) ||
      o.landmark.toLowerCase().includes(q) ||
      o.block.toLowerCase().includes(q) ||
      o.address.toLowerCase().includes(q);
    return matchArea && matchSearch;
  });

  return (
    <section id="outlets" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            Find Us Near You
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 text-4xl font-bold text-slate-900"
          >
            Retail Outlets in Karachi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-4 text-muted-foreground max-w-xl mx-auto"
          >
            {outlets.length}+ authorised outlets across Karachi. Find one near you and pick up your Culligan water today.
          </motion.p>
        </div>

        {/* Areas Covered strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-5"
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Areas Covered</p>
          <div className="flex flex-wrap gap-2">
            {ALL_AREAS_COVERED.map((a) => (
              <span key={a} className="text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1">
                {a}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Search + Area Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, area, or landmark…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <button
                key={a}
                onClick={() => setActiveArea(a)}
                className={`text-sm font-medium px-4 py-2 rounded-xl border transition-all ${
                  activeArea === a
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {a}
                {a !== "All" && (
                  <span className={`ml-1.5 text-xs ${activeArea === a ? "opacity-75" : "text-slate-400"}`}>
                    ({outlets.filter((o) => o.area === a).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-slate-400 mb-6">
          Showing <span className="font-semibold text-slate-600">{filtered.length}</span> outlet{filtered.length !== 1 ? "s" : ""}
          {activeArea !== "All" ? ` in ${activeArea}` : ""}
          {search ? ` matching "${search}"` : ""}
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-slate-400"
            >
              No outlets found. Try a different search or area.
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((outlet, i) => (
                <motion.div
                  key={outlet.name + outlet.address}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 hover:shadow-md hover:border-blue-100 transition-all duration-200"
                >
                  {/* Top row: name + area badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{outlet.name}</h3>
                    <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${AREA_COLORS[outlet.area] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      {outlet.block}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400" />
                      <span>{outlet.address}</span>
                    </div>
                    {outlet.landmark !== "—" && (
                      <div className="flex items-center gap-2 text-slate-400 italic">
                        <span className="w-3.5 shrink-0" />
                        <span>{outlet.landmark}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <a href={`tel:${outlet.contact.split(" /")[0].trim()}`} className="text-blue-600 hover:underline font-medium">
                        {outlet.contact}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{outlet.person}</span>
                    </div>
                  </div>

                  {/* SKU footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span className="text-[11px] font-semibold text-blue-600">{outlet.skus}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
