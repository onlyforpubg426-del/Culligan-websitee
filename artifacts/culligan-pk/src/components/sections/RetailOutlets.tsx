import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, User, Package, Search, Navigation, LocateFixed, Loader2, X } from "lucide-react";

function mapsUrl(address: string, area: string) {
  const query = encodeURIComponent(`${address}, ${area}, Karachi, Pakistan`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

const AREA_CENTROIDS: Record<string, { lat: number; lng: number }> = {
  "Gulshan-e-Iqbal":  { lat: 24.9196, lng: 67.0999 },
  "Gulistan-e-Johar": { lat: 24.9040, lng: 67.1339 },
  "DHA":              { lat: 24.8109, lng: 67.0607 },
  "Clifton":          { lat: 24.8166, lng: 67.0300 },
  "F.B Area":         { lat: 24.9401, lng: 67.0683 },
  "P.E.C.H.S Area":  { lat: 24.8620, lng: 67.0500 },
  "North Nazimabad":  { lat: 24.9453, lng: 67.0378 },
  "Nazimabad":        { lat: 24.9201, lng: 67.0278 },
  "North Karachi":    { lat: 24.9724, lng: 67.0616 },
  "Buffer Zone":      { lat: 24.9609, lng: 67.0582 },
  "Baldia Town":      { lat: 24.8821, lng: 66.9791 },
  "Malir Area":       { lat: 24.8818, lng: 67.2182 },
  "Orangi Town":      { lat: 24.9244, lng: 66.9959 },
  "Shahra-e-Faisal":  { lat: 24.8558, lng: 67.0527 },
  "Garden":           { lat: 24.8688, lng: 67.0204 },
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type GeoState = "idle" | "loading" | "success" | "denied";

const AREAS = ["All", "Gulshan-e-Iqbal", "Gulistan-e-Johar", "DHA", "Clifton", "F.B Area", "P.E.C.H.S Area", "North Nazimabad", "Nazimabad", "North Karachi", "Buffer Zone", "Baldia Town", "Malir Area", "Orangi Town", "Shahra-e-Faisal", "Garden"];

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

  // ── DHA ──────────────────────────────────────────────────────────────────
  { name: "TOTAL BONJOUR AL AYAAN PETRO MART", address: "Zulfiqar Commercial Phase 8 DHA", contact: "0333-6267910", person: "Mr Kashif", block: "Phase 8", landmark: "Phase 8", skus: "0.5L / 1.5L / 6L", area: "DHA" },
  { name: "TOTAL BONJOUR SHUJAAT PETRO MART", address: "Plot 135-A Street 21 Khy-e-Shujaat Phase 6 DHA", contact: "0333-6267910", person: "Mr Kashif", block: "Phase 6", landmark: "Phase 6", skus: "0.5L / 1.5L / 6L", area: "DHA" },

  { name: "AL ITTEHAD CROCERZ", address: "126-N Main Kh-e-Ittihad Muslim Comm Near Village Restaurant DHA", contact: "0335-2273977 / 0321-2273977", person: "Mr Mamoon", block: "—", landmark: "Near Village Restaurant", skus: "19L", area: "DHA" },
  { name: "WALEED CLASSIC", address: "Plot #122 10th Commercial Street Phase 4 DHA", contact: "0345-3999771 / 35800740", person: "Mr Idrees", block: "Phase 4", landmark: "Near Summit Bank", skus: "19L / 12L / 6L", area: "DHA" },
  { name: "AL KARAM SUPER STORE", address: "67-B 9th Commercial Street Phase 4 DHA", contact: "0301-3030555", person: "Mr Hanif", block: "Phase 4", landmark: "KNS Chicken", skus: "19L / 6L", area: "DHA" },
  { name: "HAJI SUPER STORE", address: "17-C St-26 Badar Commercial Phase 5 DHA", contact: "0300-3373070 / 35843143", person: "Mr Amir", block: "Phase 5", landmark: "Near MCB Bank", skus: "19L / 6L", area: "DHA" },
  { name: "SADABAHAR MILK SHOP", address: "26-C 28-C Main Saba Avenue Phase 5 DHA", contact: "0300-2351471 / 0333-2056278", person: "Mr Saleem / Ashfaq", block: "Phase 5", landmark: "Pizza Hut", skus: "19L / 12L / 6L", area: "DHA" },
  { name: "MUZAIFA WATER STORE", address: "Plot 35-C 24th St Touheed Comm Phase 5 DHA", contact: "0322-2408382", person: "Mr Sharjeel", block: "Phase 5", landmark: "Behind Biryani Center", skus: "19L", area: "DHA" },
  { name: "CHINAR DEPARTMENTAL", address: "18-C 32nd St Saba Commercial Phase 5 DHA", contact: "021-35855052", person: "Mr Manzoor", block: "Phase 5", landmark: "Masala Restaurant", skus: "19L", area: "DHA" },
  { name: "KHATTAK SUPER STORE", address: "Shop #10 Shahbaz Comm Phase 6 DHA", contact: "0303-2158425", person: "Mr Wahab", block: "Phase 6", landmark: "Near Burj Bank", skus: "19L / 6L", area: "DHA" },
  { name: "DEFENCE STORE", address: "Plot 35-E Shahbaz Comm Khy-e-Seher Phase 6 DHA", contact: "0336-3905595", person: "Mr Aftab", block: "Phase 6", landmark: "Near Burj Bank", skus: "19L / 6L", area: "DHA" },
  { name: "M.GEES SUPER STORE", address: "Plot 13-C Shahbaz Comm Khy-e-Sehar Phase 6 DHA", contact: "0334-3443988 / 021-35849441", person: "Mr Qawi", block: "Phase 6", landmark: "Near Meezan Bank", skus: "19L / 6L", area: "DHA" },
  { name: "TESCO SUPER MARKET", address: "Plot 9-C Khy-e-Seher Shehbaz Market Phase 6 DHA", contact: "35849441 / 0336-3428327", person: "Mr Raja", block: "Phase 6", landmark: "Near Meezan Bank", skus: "19L / 6L", area: "DHA" },
  { name: "SHELL SELECT (CREEK VISTA)", address: "208/1 16th Street Phase 8 Khy-e-Shaheen Opp Creek Vista DHA", contact: "0333-3126814", person: "Mr Sadqain", block: "Phase 8", landmark: "Opp Creek Vista", skus: "19L / 0.5L / 1.5L / 6L", area: "DHA" },
  { name: "MOTAS #02", address: "Shehbaz Market Khy-e-Seher Phase 6 DHA", contact: "0301-2216692", person: "Mr Lajpat", block: "Phase 6", landmark: "Near Meezan Bank", skus: "19L", area: "DHA" },
  { name: "GALAXY SUPER STORE (ROYAL MART)", address: "Shop #2 Plot 13-C 26th Street Badar Comm Phase 5 DHA", contact: "0333-0276976 / 0331-2032560", person: "Mr Suraj", block: "Phase 5", landmark: "Near Haji's Super", skus: "19L", area: "DHA" },
  { name: "AJWA SUPER MART", address: "Plot 22 Lane 27 Khy-e-Bheria Phase 4 Near Rehman Masjid DHA", contact: "0320-0272701", person: "Mr Saif", block: "Phase 4", landmark: "Near Rehman Masjid", skus: "19L", area: "DHA" },
  { name: "NEW WAY SUPER MART", address: "Shop #20-C Sehar Comm Line 4 Phase 6 DHA", contact: "021-35171188 / 0335-2495520", person: "Mr Raju", block: "Phase 6", landmark: "Near Nice Mart", skus: "19L / 6L", area: "DHA" },
  { name: "OCEAN SUPER MART", address: "Plot 22-C Main Saba Avenue Phase 5 DHA", contact: "0307-7698693 / 0334-3047834", person: "Mr Raja", block: "Phase 5", landmark: "Pizza Hut", skus: "19L", area: "DHA" },
  { name: "MOVE & PICK SUPERMART", address: "Shop #5 Pearl Tower One Emaar Phase 8 DHA", contact: "0334-3247920 / 0336-3902411", person: "Mr Ramesh Kumar", block: "Phase 8", landmark: "Pearl Tower One Emaar", skus: "19L / 0.5L / 1.5L / 6L", area: "DHA" },
  { name: "TAYYABA SUPER STORE", address: "17-C Sunset Comm Street 4 Phase 4 Near Bait-ul-Islam Masjid DHA", contact: "0333-2138066 / 0306-2581691", person: "Mr Adeel", block: "Phase 4", landmark: "Near Bait-ul-Islam Masjid", skus: "19L / 6L", area: "DHA" },
  { name: "NICE MART", address: "Shop #16-C Sehar Comm Line 4 Phase 6 DHA", contact: "0330-3586057", person: "Mr Kamran", block: "Phase 6", landmark: "—", skus: "19L / 6L", area: "DHA" },
  { name: "MP SUPER MART", address: "Plot #33-C Khy-e-Sahar Ph 6 Chota Shahbaz DHA", contact: "0322-8288738 / 0322-2690732", person: "Mr Suresh", block: "Phase 6", landmark: "—", skus: "19L", area: "DHA" },
  { name: "NEW FRENCH BAKERY", address: "Shop #3 9th Commercial Phase 4 DHA", contact: "0311-1885588", person: "Mr Ehsan", block: "Phase 4", landmark: "Main 9th Commercial", skus: "6L", area: "DHA" },
  { name: "WALEED STORE", address: "Shop #3 Plot 99/1 9th Commercial Phase 4 DHA", contact: "0340-2881309", person: "Mr Rasheed", block: "Phase 4", landmark: "Main 9th Commercial", skus: "6L", area: "DHA" },

  // ── Clifton ───────────────────────────────────────────────────────────────
  { name: "MOVE & PICK MART", address: "Shop #2 N.H.S Zamzama Clifton", contact: "0336-3912411", person: "Mr Teerat", block: "—", landmark: "Naval Society Zamzama", skus: "19L", area: "Clifton" },
  { name: "SUNNY SAMAR MART", address: "Shop #1 Bath Island Block 7 Clifton", contact: "0300-9230240", person: "Mr Umar", block: "Block 7", landmark: "Bath Island", skus: "6L", area: "Clifton" },
  { name: "FAMMY STORE", address: "Shop #13 Block 5 Boat Basin Clifton", contact: "0333-2289225", person: "Mr Raheem", block: "Block 5", landmark: "Boat Basin", skus: "6L", area: "Clifton" },
  { name: "SHOP N GO MART", address: "Shop #2 Al Khawaja Centre Block 5 Boat Basin Clifton", contact: "0300-3449930", person: "Mr Santosh", block: "Block 5", landmark: "Boat Basin", skus: "6L", area: "Clifton" },
  { name: "EXCELLENT COLD DRINK", address: "Shop #6 Mehran Centre Block 8 Clifton", contact: "0300-2301007", person: "Mr Tariq", block: "Block 8", landmark: "Near 3 Talwar", skus: "0.5L / 1.5L", area: "Clifton" },
  { name: "COOL WAY MART", address: "Shop #1 Mehran Centre Block 8 Clifton", contact: "0336-3578448", person: "Mr Saqib", block: "Block 8", landmark: "Near 3 Talwar", skus: "6L", area: "Clifton"  },
// ── F.B Area ──────────────────────────────────────────────────────────────
  { name: "AL-NOOR BAKERS & GENERAL STORE", address: "Shop #1-2 Adeel Square Phase 2 F.B Area Block 7", contact: "0307-2629603", person: "Mr Ejaz", block: "Block 7", landmark: "Taleemi Bagh", skus: "19L / 6L", area: "F.B Area" },
  { name: "MARHABA ICE", address: "Shop #2 B3-6 Block 13 F.B Area", contact: "0345-6266602", person: "Mr Munib / Sadiq", block: "Block 13", landmark: "Near Gulbarg Thana", skus: "19L / 12L", area: "F.B Area" },
  { name: "SIDDIQUI JUICE & BBQ", address: "Shop #2 Plot 782 Block 17 F.B Area Ancholi Society", contact: "0303-2283377", person: "Mr Salauddin", block: "Block 17", landmark: "Near Ancholi Imam Bargah", skus: "19L", area: "F.B Area" },
  { name: "DIAMOND MART (F.B Area)", address: "Shop #3 Aisha Manzil F.B Area", contact: "0317-0546986", person: "Mr Touseef", block: "Mukka Chowk", landmark: "Near Mukka Chowk", skus: "1.5L / 6L", area: "F.B Area" },
  { name: "TAYYAB MEDICAL STORE", address: "Shop #5 Block 3 F.B Area", contact: "0326-8020501", person: "Mr Arif", block: "Block 3", landmark: "Hussainabad", skus: "6L", area: "F.B Area" },
  { name: "IMRAN SWEETS AND BAKERS", address: "Shop #7 Marium Centre Block 7 F.B Area", contact: "0303-2060972", person: "Mr Adil", block: "Block 7", landmark: "Near Damthal Sweets", skus: "6L", area: "F.B Area" },
  { name: "NEW K.K MART", address: "Shop #3 Plot B-27 Block 10 F.B Area", contact: "0332-3763683", person: "Mr Abdullah", block: "Block 10", landmark: "Gulberg", skus: "1.5L / 6L", area: "F.B Area" },

  // ── P.E.C.H.S Area (incl. K.A.E.C.H.S, Sharfabad, Bahadurabad, Dhoraji) ──
  { name: "V.S.P SUPER STORE", address: "Plot SA/7 Block 2 K.A.E.C.H.S.", contact: "0332-3497232", person: "Mr Waqar", block: "Block 2", landmark: "Opp Masjid-e-Quba", skus: "19L", area: "P.E.C.H.S Area" },
  { name: "JUMBO MEDICAL & GENERAL STORE", address: "Shop #8 46/A/2 Commercial Area M.A Society", contact: "0345-0210772", person: "Mr Wali Muhammad", block: "—", landmark: "Kaybees", skus: "19L / 6L", area: "P.E.C.H.S Area" },
  { name: "NASEER ICE DEPOT", address: "Shop #1-2 Main Dhoraji Colony Near Dubai Islamic Bank", contact: "0333-2829174 / 0301-8229558", person: "Mr Habib", block: "—", landmark: "Near Dubai Islamic Bank", skus: "19L / 12L", area: "P.E.C.H.S Area" },
  { name: "KHAN GENERAL STORE", address: "Adamjee Nagar Block B Ameer Khusru Road", contact: "0313-8218726", person: "Mr Abdul Hanan", block: "Block B", landmark: "Near Tahir Clinic", skus: "19L / 12L / 6L", area: "P.E.C.H.S Area" },
  { name: "USMANIA MEDICAL STORE", address: "Shop #3 Plot 131/3 Sharfabad", contact: "0301-2530001 / 0334-2271490", person: "Mr Farooq", block: "—", landmark: "Near Bahadurabad Chowrangi", skus: "19L / 12L / 6L", area: "P.E.C.H.S Area" },
  { name: "NEW CHAMAN STORE", address: "Shop #7 Crystal Homes Sharfabad", contact: "0337-7004010", person: "Mr Zaman", block: "—", landmark: "Near Masjid-e-Ali Bahadurabad", skus: "19L / 12L", area: "P.E.C.H.S Area" },
  { name: "SHAHJEE NARIYAL WALA", address: "Shop #1 Plot 145 Ameer Khusro Road Bahadurabad", contact: "021-34397824 / 0311-3259667", person: "Mr Asad", block: "—", landmark: "Near Tahir Clinic", skus: "19L / 12L / 6L", area: "P.E.C.H.S Area" },
  { name: "GREEN RICE SHOP", address: "Shop #2 Mustafa Heights C.P Barar Society Dhoraji", contact: "0343-3482469", person: "Mr Jawaid", block: "—", landmark: "Near Meezan Bank", skus: "19L / 12L / 6L", area: "P.E.C.H.S Area" },
  { name: "SOCIETY ICE DEPOT", address: "Shop #2 Block 7/8 Lal M. Choudhry Road P.E.C.H.S.", contact: "0313-2500388", person: "Mr Habib", block: "Block 7/8", landmark: "Opp Hill Park Ground", skus: "19L", area: "P.E.C.H.S Area" },
  { name: "UNIQUE SUPER STORE", address: "Shop #1234 K.A.E.C.H.S Baloach Colony", contact: "0333-2430665", person: "Mr Hasan", block: "Block 4", landmark: "Near Masjid-e-Quba", skus: "19L / 12L / 6L", area: "P.E.C.H.S Area" },
  { name: "NATIONAL SUPER STORE", address: "62-N Al-Falah Market Block 2", contact: "0323-2092455", person: "Mr Irfan", block: "Block 2", landmark: "Near Khalid bin Waleed Road", skus: "19L", area: "P.E.C.H.S Area" },
  { name: "ASAD COLD", address: "Farooq Center Shop #5 Ameer Khusro Road P.E.C.H.S", contact: "0343-3079328 / 0318-0014461", person: "Mr Jabbar", block: "—", landmark: "Near Tahir Clinic", skus: "19L", area: "P.E.C.H.S Area" },
  { name: "PAK SUPER STORE & PHARMACY", address: "Shop Z/14 Memon Society Block 7/8 Hill Park", contact: "0311-2792824", person: "Mr Mudasir", block: "Block 7/8", landmark: "Near Hill Park Ground", skus: "19L", area: "P.E.C.H.S Area" },
  { name: "REHMAN MEDICAL & GEN STORE", address: "Shop #17 DAA Garden Sharfabad Alamgir Road", contact: "021-34933904", person: "Mr Abdul Rehman", block: "—", landmark: "DAA Garden Sharfabad", skus: "12L", area: "P.E.C.H.S Area" },
  { name: "BISMILLAH STORE", address: "Shop #1 Plot 131/3 Sharfabad", contact: "0300-2258663", person: "Mr Aziz", block: "Sharfabad", landmark: "Near Tooso Restaurant", skus: "6L", area: "P.E.C.H.S Area" },
  { name: "ROYAL MEDICAL STORE", address: "Shop #15 Royal Apartment Tipu Sultan Road", contact: "0332-3734804", person: "Mr Rizwan", block: "Tipu Sultan Road", landmark: "Karsaz", skus: "6L", area: "P.E.C.H.S Area" },
  { name: "REHMAT MEDICAL STORE", address: "Shop #3 Street 17 Sharfabad", contact: "0323-2729091", person: "Mr Ehsan", block: "Sharfabad", landmark: "Near Imtiaz Store", skus: "6L", area: "P.E.C.H.S Area" },
  { name: "TIME MEDICAL STORE", address: "Shop #1A Afzal Apartment National Stadium Road", contact: "0349-2576345", person: "Mr Zohaib", block: "—", landmark: "National Stadium", skus: "6L", area: "P.E.C.H.S Area" },
  { name: "IMTIAZ DEPARTMENTAL STORE (Bahadurabad)", address: "Bahadurabad", contact: "0322-3251509", person: "Mr Obaid", block: "Bahadurabad", landmark: "—", skus: "6L", area: "P.E.C.H.S Area" },
  { name: "IMTIAZ DEPARTMENTAL STORE (Qayyumabad)", address: "Main Qayyumabad", contact: "0322-3251509", person: "Mr Obaid", block: "Qayyumabad", landmark: "Main Qayyumabad", skus: "6L", area: "P.E.C.H.S Area" },

  // ── Baldia Town ───────────────────────────────────────────────────────────
  { name: "PATEL BIZ", address: "1732/425 Hub River Road Baldia #3 Baldia Town", contact: "0321-2826319", person: "Mr Anwar Patel", block: "—", landmark: "Near Dehli Masjid", skus: "19L", area: "Baldia Town" },
  { name: "AL SHIFA MEDICAL", address: "Near Patni Hospital Baldia Town", contact: "0312-1060121", person: "Mr Rafiq / Waseem", block: "—", landmark: "Patni Hospital", skus: "19L", area: "Baldia Town" },

  // ── Malir Area ────────────────────────────────────────────────────────────
  { name: "AL REHMAN ENTERPRISES", address: "28-E Rafah-e-Aam Society Opp Johar Park Malir", contact: "0334-9939511 / 0331-1373242 / 0300-3450550", person: "Mr Hafeez / Mr Habib", block: "—", landmark: "Opp Johar Park Malir", skus: "All SKUs", area: "Malir Area" },
  { name: "SHAIKH MEDICAL STORE", address: "Main Bazaar Tariq bin Ziyad Society Malir Halt", contact: "0315-2772717", person: "Mr Shaikh Hamid", block: "—", landmark: "Tariq bin Ziyad Society", skus: "19L", area: "Malir Area" },
  { name: "ZAHEER COLD SPOT", address: "Saudabad Near R.C.D Ground Malir", contact: "0315-8924140", person: "Mr Saleem Ahmed", block: "—", landmark: "Near R.C.D Ground", skus: "All SKUs", area: "Malir Area" },
  { name: "JUNAID MED & GEN STORE", address: "Asifabad Shah Faisal Colony Malir", contact: "0305-2566075 / 0333-9288508", person: "Mr Mazhar", block: "—", landmark: "Asifabad", skus: "All SKUs", area: "Malir Area" },
  { name: "MINTAKA SUPER STORE", address: "Gulzar-e-Ibrahim Society Main Jamia Millia Road", contact: "0349-8700795 / 0307-9988980", person: "Mr Moiz / Mr Huzaifa", block: "—", landmark: "Near Hafiz Sweet", skus: "19L / 6L", area: "Malir Area" },
  { name: "AALA BAKERS & GEN STORE", address: "Main Bazaar Malir Halt", contact: "0304-0024184", person: "Mr Khalid", block: "—", landmark: "Malir Halt", skus: "All SKUs", area: "Malir Area" },
  { name: "MADRAS STORE", address: "Al Falah Society Malir", contact: "0330-3769688", person: "Mr Daniyal", block: "—", landmark: "Al Falah Society", skus: "All SKUs", area: "Malir Area" },
  { name: "KHAN TRADERS", address: "Rafa-e-Aam Society Malir", contact: "0333-4149246", person: "Mr Sarosh", block: "—", landmark: "Rafa-e-Aam Society", skus: "All SKUs", area: "Malir Area" },

  // ── Orangi Town ───────────────────────────────────────────────────────────
  { name: "ZAHID MEDICARE ORG", address: "Shop #1 Sector 6-L Banaras Town Orangi Town", contact: "0315-0061005", person: "Mr Zahid", block: "Sector 8", landmark: "Near Jama Masjid Banaras", skus: "19L", area: "Orangi Town" },

  // ── Shahra-e-Faisal ───────────────────────────────────────────────────────
  { name: "SHELL SELECT HOORAIN", address: "Shell Malik Petroleum Service Station Main Shahra-e-Faisal", contact: "0336-8635290", person: "Mr S. Farrukh", block: "—", landmark: "Main Shahra-e-Faisal", skus: "19L", area: "Shahra-e-Faisal" },

  // ── Garden ────────────────────────────────────────────────────────────────
  { name: "DIAMOND MART (Garden)", address: "Shop 3 Bhayani Terrace Garden East", contact: "0344-1295753", person: "Mr Basit", block: "Garden", landmark: "Near Jamaat Khana", skus: "6L", area: "Garden" },
];

const AREA_COLORS: Record<string, string> = {
  "Gulshan-e-Iqbal":  "bg-blue-50   text-blue-700   border-blue-200",
  "Gulistan-e-Johar": "bg-violet-50 text-violet-700 border-violet-200",
  "DHA":              "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Clifton":          "bg-cyan-50   text-cyan-700   border-cyan-200",
  "F.B Area":         "bg-rose-50   text-rose-700   border-rose-200",
  "P.E.C.H.S Area":  "bg-amber-50  text-amber-700  border-amber-200",
  "North Nazimabad":  "bg-sky-50    text-sky-700    border-sky-200",
  "Nazimabad":        "bg-teal-50   text-teal-700   border-teal-200",
  "North Karachi":    "bg-green-50  text-green-700  border-green-200",
  "Buffer Zone":      "bg-orange-50 text-orange-700 border-orange-200",
  "Baldia Town":      "bg-red-50    text-red-700    border-red-200",
  "Malir Area":       "bg-lime-50   text-lime-700   border-lime-200",
  "Orangi Town":      "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Shahra-e-Faisal":  "bg-purple-50 text-purple-700 border-purple-200",
  "Garden":           "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const ALL_AREAS_COVERED = [
  "Gulshan Area", "Gulistan-e-Johar", "DHA Area", "Clifton",
  "P.E.C.H.S Area", "North Nazimabad", "North Karachi", "F.B Area",
  "Nazimabad", "Liaqatabad", "Malir Area", "Baldia Town",
  "Orangi Town", "Shahra-e-Faisal", "Garden",
];

export function RetailOutlets() {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  const nearestMode = geoState === "success" && userCoords !== null;

  function getDistanceKm(area: string) {
    const centroid = AREA_CENTROIDS[area];
    if (!centroid || !userCoords) return Infinity;
    return haversineKm(userCoords.lat, userCoords.lng, centroid.lat, centroid.lng);
  }

  function handleLocate() {
    if (nearestMode) {
      setGeoState("idle");
      setUserCoords(null);
      return;
    }
    if (!navigator.geolocation) return;
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoState("success");
        setActiveArea(null);
        setSearch("");
      },
      () => setGeoState("denied"),
      { timeout: 10000 },
    );
  }

  const hasSelection = nearestMode || activeArea !== null || search.trim() !== "";

  const filtered = hasSelection
    ? outlets
        .filter((o) => {
          const matchArea = !nearestMode && (activeArea === "All" || activeArea === null || o.area === activeArea);
          const q = search.toLowerCase();
          const matchSearch =
            !q ||
            o.name.toLowerCase().includes(q) ||
            o.landmark.toLowerCase().includes(q) ||
            o.block.toLowerCase().includes(q) ||
            o.address.toLowerCase().includes(q);
          return (nearestMode || matchArea) && matchSearch;
        })
        .sort((a, b) => nearestMode ? getDistanceKm(a.area) - getDistanceKm(b.area) : 0)
    : [];

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
        {/* Search + Find Nearest + Area Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
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
            <button
              onClick={handleLocate}
              disabled={geoState === "loading"}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all shrink-0 ${
                nearestMode
                  ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-sm"
                  : geoState === "denied"
                  ? "bg-red-50 text-red-600 border-red-200 cursor-not-allowed"
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
              }`}
            >
              {geoState === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : nearestMode ? (
                <X className="h-4 w-4" />
              ) : (
                <LocateFixed className="h-4 w-4" />
              )}
              {geoState === "loading"
                ? "Locating…"
                : nearestMode
                ? "Clear location"
                : geoState === "denied"
                ? "Location denied"
                : "Nearest to me"}
            </button>
          </div>

          {geoState === "denied" && (
            <p className="text-xs text-red-500 -mt-1">
              Location access was denied. Please allow location in your browser settings and try again.
            </p>
          )}

          {!nearestMode && (
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <button
                  key={a}
                  onClick={() => setActiveArea(activeArea === a ? null : a)}
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
          )}
        </div>

        {/* Count */}
        {hasSelection && (
          <p className="text-sm text-slate-400 mb-6">
            {nearestMode ? (
              <>Showing all <span className="font-semibold text-slate-600">{filtered.length}</span> outlets sorted by distance from your location</>
            ) : (
              <>Showing <span className="font-semibold text-slate-600">{filtered.length}</span> outlet{filtered.length !== 1 ? "s" : ""}
              {activeArea && activeArea !== "All" ? ` in ${activeArea}` : ""}
              {search ? ` matching "${search}"` : ""}</>
            )}
          </p>
        )}

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {!hasSelection ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <MapPin className="h-7 w-7 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-700 font-semibold text-base">Pick an area to find outlets near you</p>
                <p className="text-slate-400 text-sm mt-1">Select a neighbourhood above or search by name / landmark</p>
              </div>
            </motion.div>
          ) : filtered.length === 0 ? (
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
                  {/* Top row: name + badges */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{outlet.name}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                      {nearestMode && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                          <LocateFixed className="h-2.5 w-2.5" />
                          {getDistanceKm(outlet.area).toFixed(1)} km
                        </span>
                      )}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${AREA_COLORS[outlet.area] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {outlet.block}
                      </span>
                    </div>
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
                    <div className="flex items-start gap-2">
                      <Phone className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400" />
                      <span className="flex flex-wrap gap-x-1.5 gap-y-0.5">
                        {outlet.contact.split(/\s*\/\s*/).map((num, idx, arr) => (
                          <span key={num}>
                            <a href={`tel:${num.replace(/\s/g, "")}`} className="text-blue-600 hover:underline font-medium">
                              {num.trim()}
                            </a>
                            {idx < arr.length - 1 && <span className="text-slate-300 select-none"> /</span>}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{outlet.person}</span>
                    </div>
                  </div>

                  {/* SKU footer + Maps link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Package className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                      <span className="text-[11px] font-semibold text-blue-600">{outlet.skus}</span>
                    </div>
                    <a
                      href={mapsUrl(outlet.address, outlet.area)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                    >
                      <Navigation className="h-3 w-3" />
                      Get Directions
                    </a>
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