import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaCrown, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { IoStatsChart } from "react-icons/io5";

/* ─── Demo Data — members have only name ────────────────────────────────────── */
const EVENTS_DATA = {
  "udiisa-cricket-championship-2025": {
    id: "1",
    title: "UDIISA Cricket Championship",
    date: "15 Mar 2025",
    sport: "Cricket",
    venue: "Feroz Shah Kotla Ground, Delhi",
    status: "Upcoming",
    description:
      "The UDIISA Cricket Championship 2025 brings together the best cricket talent from across India. This prestigious tournament features top-tier teams competing for the coveted UDIISA Trophy. Expect fierce competition, brilliant stroke play, and memorable moments on the field.",
    teamA: {
      name: "Delhi Dynamos",
      captain: "Rohit Sharma",
      members: [
        { name: "Rohit Sharma" },
        { name: "Shikhar Dhawan" },
        { name: "Virat Singh" },
        { name: "Priya Rajan" },
        { name: "Deepak Yadav" },
        { name: "Arjun Kapoor" },
        { name: "Manish Tiwari" },
        { name: "Ravi Gupta" },
        { name: "Sanjay Kumar" },
        { name: "Aman Verma" },
        { name: "Nikhil Singh" },
        { name: "Pankaj Joshi" },
        { name: "Tarun Mehta" },
        { name: "Aakash Roy" },
        { name: "Dev Mishra" },
        { name: "Karan Nair" },
        { name: "Rahul Das" },
        { name: "Sumit Patel" },
      ],
    },
    teamB: {
      name: "Mumbai Strikers",
      captain: "Sachin Tendulkar Jr.",
      members: [
        { name: "Sachin Tendulkar Jr." },
        { name: "Jasprit Singh" },
        { name: "Hardik Mehta" },
        { name: "Ishan Kishore" },
        { name: "Suryakumar V." },
        { name: "Kieron Patel" },
        { name: "Bhuvneshwar M." },
        { name: "Ravindra K." },
        { name: "Yuzvendra J." },
        { name: "Ajinkya S." },
        { name: "Shreyas A." },
        { name: "Axar M." },
        { name: "Washington J." },
        { name: "Kuldeep P." },
        { name: "Shardul R." },
        { name: "Venkatesh I." },
        { name: "Deepak K." },
        { name: "Jaydev U." },
        { name: "Mukesh K." },
        { name: "Prasidh K." },
        { name: "Rinku S." },
        { name: "Tilak V." },
      ],
    },
  },
  "national-football-league-2025": {
    id: "2",
    title: "National Football League",
    date: "22 Apr 2025",
    sport: "Football",
    venue: "DY Patil Stadium, Mumbai",
    status: "Upcoming",
    description:
      "The National Football League 2025 is India's premier football tournament featuring clubs from across the nation. This season promises high-octane action with world-class coaching staff and talented players ready to showcase their skills.",
    teamA: {
      name: "Punjab Lions",
      captain: "Gurpreet Singh",
      members: [
        { name: "Gurpreet Singh" },
        { name: "Sandesh Jhingan" },
        { name: "Suresh Singh" },
        { name: "Manvir Singh" },
        { name: "Udanta Kumar" },
        { name: "Sahal Abdul" },
        { name: "Brandon F." },
        { name: "Akash Mishra" },
        { name: "Rahul Bheke" },
        { name: "Lalengmawia" },
        { name: "Anirudh Thapa" },
        { name: "Ayush Adhikari" },
        { name: "Chinglensana" },
        { name: "Amey Ranawade" },
      ],
    },
    teamB: {
      name: "Chennai Tigers",
      captain: "Lallianzuala Chhangte",
      members: [
        { name: "Lallianzuala Chhangte" },
        { name: "Vishal Kaith" },
        { name: "Bikash Yumnam" },
        { name: "Joni Kauko" },
        { name: "Petar Sliskovic" },
        { name: "Vladimir Koman" },
        { name: "Anirudh Thapa" },
        { name: "Subhasish B." },
        { name: "Aakash Sangwan" },
        { name: "Salam Ranjan" },
        { name: "Mohammad Sajid" },
        { name: "Rahim Ali" },
        { name: "Bidyashagar S." },
        { name: "Jordan Murray" },
        { name: "Britto PM" },
        { name: "Komal Thatal" },
      ],
    },
  },
  "state-basketball-tournament-2025": {
    id: "3",
    title: "State Basketball Tournament",
    date: "05 May 2025",
    sport: "Basketball",
    venue: "Sree Kanteerava Indoor Stadium, Bangalore",
    status: "Upcoming",
    description:
      "The State Basketball Tournament 2025 gathers elite basketball teams from across the state. Fast-paced action, slam dunks, and three-pointers await fans in this electrifying tournament.",
    teamA: {
      name: "Rajasthan Royals",
      captain: "Vishesh Bhriguvanshi",
      members: [
        { name: "Vishesh Bhriguvanshi" },
        { name: "Amjyot Singh" },
        { name: "Arshpreet Bhullar" },
        { name: "Akilan Pari" },
        { name: "Palpreet Singh" },
        { name: "Jagdeep Singh" },
        { name: "Yadwinder Singh" },
        { name: "Rikin Patel" },
        { name: "Prashant Rao" },
        { name: "Sahil Uppal" },
        { name: "Mohit Garg" },
        { name: "Deepak Raj" },
      ],
    },
    teamB: {
      name: "UP Warriors",
      captain: "Satnam Singh",
      members: [
        { name: "Satnam Singh" },
        { name: "Princepal Singh" },
        { name: "Karan Ranjit" },
        { name: "Robin Singh" },
        { name: "Aravind Annadurai" },
        { name: "Vinay Kesari" },
        { name: "Narender Grewal" },
        { name: "Yogesh Bhardwaj" },
        { name: "Sanjoy Sahu" },
        { name: "Kiranjit Singh" },
        { name: "Pawan Dokhania" },
      ],
    },
  },
  "udiisa-kabaddi-cup-2025": {
    id: "4",
    title: "UDIISA Kabaddi Cup",
    date: "18 Jun 2025",
    sport: "Kabaddi",
    venue: "SMS Indoor Hall, Jaipur",
    status: "Upcoming",
    description:
      "The UDIISA Kabaddi Cup 2025 celebrates India's indigenous sport at its finest. Top kabaddi athletes will compete in thrilling raids and tackles in this action-packed tournament.",
    teamA: {
      name: "Haryana Hawks",
      captain: "Pardeep Narwal",
      members: [
        { name: "Pardeep Narwal" },
        { name: "Pawan Sehrawat" },
        { name: "Surender Nada" },
        { name: "Manjeet Chhillar" },
        { name: "Ravi Kumar" },
        { name: "Sandeep Dhull" },
        { name: "Nitin Tomar" },
        { name: "Deepak Hooda" },
        { name: "Rinku Narwal" },
        { name: "Naveen Kumar" },
      ],
    },
    teamB: {
      name: "Bihar Bravos",
      captain: "Ajay Thakur",
      members: [
        { name: "Ajay Thakur" },
        { name: "Rohit Kumar" },
        { name: "Sachin Tanwar" },
        { name: "Dharmaraj Cheralathan" },
        { name: "Rahul Chaudhari" },
        { name: "Vishal Mane" },
        { name: "Amit Hooda" },
        { name: "Nitesh Kumar" },
        { name: "Monu Goyat" },
        { name: "Anup Kumar" },
      ],
    },
  },
  "all-india-athletics-meet-2025": {
    id: "5",
    title: "All India Athletics Meet",
    date: "30 Jul 2025",
    sport: "Athletics",
    venue: "Ekana Sports City, Lucknow",
    status: "Upcoming",
    description:
      "The All India Athletics Meet 2025 is the country's most prestigious track and field event. Athletes from the North and South zones will compete across multiple disciplines in a bid to set new national records.",
    teamA: {
      name: "North Zone",
      captain: "Neeraj Chopra",
      members: [
        { name: "Neeraj Chopra" },
        { name: "Hima Das" },
        { name: "Muhammed Anas" },
        { name: "Dutee Chand" },
        { name: "Tejinderpal Toor" },
        { name: "Avinash Sable" },
        { name: "Jinson Johnson" },
        { name: "Seema Punia" },
        { name: "Sandeep Kumar" },
        { name: "Sudha Singh" },
        { name: "Arpinder Singh" },
        { name: "Sherin Netto" },
        { name: "Navjeet Dhaliwal" },
        { name: "Sona Baishya" },
        { name: "Annu Rani" },
        { name: "Harmilan Bains" },
        { name: "Prachi Singh" },
        { name: "Murali Sreeshankar" },
        { name: "Praveen Chithravel" },
        { name: "MP Jabir" },
        { name: "Siddhanth Thingalaya" },
        { name: "Abdulla Abu" },
        { name: "Narain Kumar" },
        { name: "Dhanalakshmi Sekar" },
        { name: "Anjali Devi" },
        { name: "KT Irfan" },
        { name: "Chandra Mohan" },
        { name: "Renjith Maheshwary" },
        { name: "Lakshmi Kumar" },
        { name: "Beenamol Rajitha" },
        { name: "Purnima Hembram" },
        { name: "Swapna Barman" },
      ],
    },
    teamB: {
      name: "South Zone",
      captain: "Sriram Singh",
      members: [
        { name: "Sriram Singh" },
        { name: "Tintu Luka" },
        { name: "M.A. Prajusha" },
        { name: "Vikas Gowda" },
        { name: "P.T. Usha Jr." },
        { name: "T Gopi" },
        { name: "Sahana Kumari" },
        { name: "Dharun Ayyasamy" },
        { name: "VK Eldhose" },
        { name: "Tony Antoniraj" },
        { name: "KM Beenamol" },
        { name: "O.P. Jaisha" },
        { name: "Ashwini Akkunji" },
        { name: "Sini Jose" },
        { name: "Deepa Malik Jr." },
        { name: "Karunakara B." },
        { name: "Archana Suseendran" },
        { name: "Priya Mohan" },
        { name: "Ajith Kumar KS" },
        { name: "Gomathi Marimuthu" },
        { name: "Preethi G." },
        { name: "Jayakrishnan K." },
        { name: "Suresh KV" },
        { name: "Nandha Kumar" },
        { name: "Remya Krishnan" },
        { name: "Kavitha Rajan" },
        { name: "Bincy Sajan" },
        { name: "Unnikrishnan P." },
      ],
    },
  },
};

/* ─── Member counts — JS hardcoded, no .length ──────────────────────────────── */
const MEMBER_COUNTS = {
  "udiisa-cricket-championship-2025": { a: 18, b: 22, total: 40 },
  "national-football-league-2025":    { a: 14, b: 16, total: 30 },
  "state-basketball-tournament-2025": { a: 12, b: 11, total: 23 },
  "udiisa-kabaddi-cup-2025":          { a: 10, b: 10, total: 20 },
  "all-india-athletics-meet-2025":    { a: 32, b: 28, total: 60 },
};

/* ─── Team Table ─────────────────────────────────────────────────────────────── */
function TeamTable({ team, side, memberCount }) {
  const isLeft = side === "left";

  /* JS counter — increments before each row render, not from map index */
  let serial = 0;

  return (
    <div className={`flex-1 min-w-0 rounded-2xl overflow-hidden border-2 ${isLeft ? "border-blue-200" : "border-orange-200"}`}>

      {/* Header */}
      <div className={`!px-4 !py-3 flex items-center !gap-3 ${isLeft ? "bg-gradient-to-r from-[#0B1E4B] to-[#1e3a8a]" : "bg-gradient-to-l from-[#F05A1A] to-[#FF7D42]"}`}>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <FaCrown className="text-yellow-300 text-[12px]" />
        </div>
        <div className="min-w-0">
          <p className="!m-0 text-white text-[11px] font-bold opacity-80 uppercase tracking-widest leading-none !mb-0.5">
            {isLeft ? "🔵 Team A" : "🔴 Team B"}
          </p>
          <p className="!m-0 text-white text-[14px] font-black leading-tight truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {team.name}
          </p>
        </div>
        <div className="ml-auto flex-shrink-0 flex flex-col items-end">
          <span className="text-white/70 text-[9px] font-bold uppercase tracking-wide">Captain</span>
          <span className="text-yellow-300 text-[10px] font-extrabold truncate max-w-[90px]">{team.captain}</span>
        </div>
      </div>

      {/* Column subheaders */}
      <div className={`grid grid-cols-2 !px-3 !py-1.5 border-b ${isLeft ? "bg-blue-50 border-blue-100" : "bg-orange-50 border-orange-100"}`}>
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">#</span>
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Player</span>
      </div>

      {/* Rows */}
      <div >
        {team.members.map((member) => {
          serial = serial + 1;
          const num = serial;
          const isCaptain = member.name === team.captain;
          return (
            <div
              key={num}
              className={`grid grid-cols-2 items-center !px-3 !py-2 border-b last:border-b-0 transition-colors duration-150
                ${isCaptain
                  ? isLeft ? "bg-blue-50 border-blue-100" : "bg-orange-50 border-orange-100"
                  : "bg-white border-slate-50 hover:bg-slate-50"
                }`}
            >
              {/* Serial number */}
              <div>
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[9px] font-black text-white leading-none
                    ${isLeft ? "bg-[#0B1E4B]" : "bg-[#F05A1A]"}
                    ${isCaptain ? "ring-2 ring-yellow-400 ring-offset-1" : ""}`}
                >
                  {num}
                </span>
              </div>

              {/* Name */}
              <div className="min-w-0 !pr-1">
                <p className="!m-0 text-[10px] font-extrabold text-[#0B1E4B] truncate leading-tight">
                  {member.name}
                  {isCaptain && <span className="!ml-1 text-yellow-500 text-[8px]">(C)</span>}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={`!px-4 !py-2 flex items-center justify-between ${isLeft ? "bg-blue-50" : "bg-orange-50"}`}>
        <span className={`text-[9px] font-bold ${isLeft ? "text-blue-500" : "text-orange-500"}`}>
          <FaUsers className="inline !mr-1 text-[8px]" />
          {memberCount} Members
        </span>
        <span className={`text-[8px] font-extrabold uppercase tracking-wider ${isLeft ? "text-[#0B1E4B]" : "text-[#F05A1A]"}`}>
          Full Squad
        </span>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────────── */
export default function MatchDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = EVENTS_DATA[slug];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8faff] to-[#fff8f4]">
        <div className="text-center !px-6">
          <div className="text-6xl !mb-4">😕</div>
          <h2 className="!m-0 !mb-2 text-[#0B1E4B] text-2xl font-black">Match Not Found</h2>
          <p className="!m-0 !mb-6 text-slate-500 text-sm">This match event does not exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center !gap-2 !px-5 !py-2.5 rounded-full bg-[#0B1E4B] text-white text-sm font-bold border-none cursor-pointer hover:bg-[#F05A1A] transition-colors duration-200"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const counts = MEMBER_COUNTS[slug] || { a: 0, b: 0, total: 0 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

        @keyframes mdFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .md-a1 { animation: mdFadeUp .55s cubic-bezier(.16,1,.3,1) .05s both; }
        .md-a2 { animation: mdFadeUp .55s cubic-bezier(.16,1,.3,1) .12s both; }
        .md-a3 { animation: mdFadeUp .55s cubic-bezier(.16,1,.3,1) .19s both; }

        .scrollbar-thin::-webkit-scrollbar { width: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 40%, #fff8f4 100%)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Decorative BG */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(240,90,26,0.3) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(11,30,75,0.25) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, #0B1E4B 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-6 sm:!py-10" style={{ maxWidth: "1280px", zIndex: 1 }}>

          {/* Back button */}
          <div className="md-a1 !mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center !gap-2 !px-4 !py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-[12px] font-bold shadow-sm hover:bg-[#0B1E4B] hover:text-white hover:border-[#0B1E4B] transition-all duration-200 cursor-pointer"
            >
              <FaArrowLeft className="text-[10px]" />
              Back to Events
            </button>
          </div>

          {/* Match Info */}
          <div className="md-a2 !mb-6 sm:!mb-8">
            <div className="flex flex-wrap items-center !gap-3 !mb-3">
              <div className="inline-flex items-center !gap-2 !px-3 !py-1 rounded-full bg-[rgba(240,90,26,0.1)] border border-[rgba(240,90,26,0.22)] text-[#F05A1A] text-[9px] font-extrabold tracking-[2px] uppercase">
                <HiSparkles />
                {event.status}
              </div>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400 text-[11px] font-semibold">{event.sport}</span>
            </div>

            <h1 className="!m-0 !mb-3 text-[#0B1E4B] leading-none"
              style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(24px, 5vw, 44px)", letterSpacing: "1px" }}>
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center !gap-2 !mb-4">
              <span className="inline-flex items-center !gap-1.5 !px-3 !py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-[10px] font-bold text-slate-600">
                <FaCalendarAlt className="text-[#F05A1A] text-[9px]" /> {event.date}
              </span>
              <span className="inline-flex items-center !gap-1.5 !px-3 !py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-[10px] font-bold text-slate-600">
                <FaMapMarkerAlt className="text-[#F05A1A] text-[9px]" /> {event.venue}
              </span>
            </div>

            <p className="!m-0 text-slate-500 text-[12px] sm:text-[13px] leading-relaxed font-medium" style={{ maxWidth: "720px" }}>
              {event.description}
            </p>
          </div>

          {/* Squad Tables */}
          <div className="md-a3">
            <div className="flex items-center !gap-3 !mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B1E4B] to-[#1e3a8a] flex items-center justify-center shadow-md">
                <IoStatsChart className="text-white text-[15px]" />
              </div>
              <div>
                <h2 className="!m-0 text-[#0B1E4B] font-black text-[16px] sm:text-[18px] leading-tight">
                  Full Squad Lineup
                </h2>
                <p className="!m-0 text-slate-400 text-[10px] font-semibold">
                  {counts.total} total players · Captain highlighted with 👑
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch !gap-4 lg:!gap-6">
              <TeamTable team={event.teamA} side="left" memberCount={counts.a} />

              {/* VS divider — desktop */}
              <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0 !gap-2">
                <div className="w-1 flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent rounded-full" />
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 shadow-md flex items-center justify-center">
                  <span className="text-[9px] font-black text-[#F05A1A]" style={{ fontFamily: "'Bebas Neue', cursive" }}>VS</span>
                </div>
                <div className="w-1 flex-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent rounded-full" />
              </div>

              {/* VS divider — mobile */}
              <div className="flex md:hidden items-center justify-center !gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 shadow-md flex items-center justify-center">
                  <span className="text-[9px] font-black text-[#F05A1A]" style={{ fontFamily: "'Bebas Neue', cursive" }}>VS</span>
                </div>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <TeamTable team={event.teamB} side="right" memberCount={counts.b} />
            </div>
          </div>

          <div className="!mt-12" />
        </div>
      </div>
    </>
  );
}