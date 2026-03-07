import { FaHandHoldingHeart, FaUsers, FaUniversity } from "react-icons/fa";

export default function DonateNow() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-[#0B1E4B] mb-4">
            Donate Now
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Your contribution helps talented and gifted sports players across
            India receive training, support, and opportunities to become
            future champions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
          <h2 className="text-xl font-semibold text-[#0B1E4B] mb-4">
            Our Mission
          </h2>

          <p className="text-slate-600 leading-relaxed">
            United For Dynamic India (UDI) International Sports Association
            (UDIISA) is a non-profit, non-governmental and charitable
            organization dedicated to promoting and supporting talented sports
            players across India. Our goal is to identify promising athletes
            and provide them financial support, professional training,
            mentorship and opportunities to participate in national and
            international tournaments.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <FaHandHoldingHeart className="text-3xl text-blue-600 mx-auto mb-3"/>
            <h3 className="font-semibold mb-2">Support Young Athletes</h3>
            <p className="text-sm text-slate-600">
              Help talented players overcome financial barriers and achieve
              their sports dreams.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <FaUsers className="text-3xl text-blue-600 mx-auto mb-3"/>
            <h3 className="font-semibold mb-2">Training & Mentorship</h3>
            <p className="text-sm text-slate-600">
              Donations help provide professional coaching, mentorship and
              participation in tournaments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <FaUniversity className="text-3xl text-blue-600 mx-auto mb-3"/>
            <h3 className="font-semibold mb-2">Transparent System</h3>
            <p className="text-sm text-slate-600">
              All donations are used responsibly with proper accounting and
              transparency.
            </p>
          </div>

        </div>

        {/* Donation Info */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-xl font-semibold text-[#0B1E4B] mb-4">
            Why Your Donation Matters
          </h2>

          <p className="text-slate-600 mb-4">
            Your support enables talented sports players from different
            backgrounds to access professional training, sports equipment,
            tournaments and development opportunities. Every donation helps
            shape the future of Indian sports.
          </p>

          <p className="text-slate-600">
            Contributions made to UDIISA are eligible for tax rebate under
            Section 80G of the Income Tax Act.
          </p>
        </div>

        {/* Who Can Donate */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-xl font-semibold text-[#0B1E4B] mb-4">
            Who Can Donate
          </h2>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Individual Donors</li>
            <li>Corporate Organizations</li>
            <li>CSR Programs</li>
            <li>Industrialists and Entrepreneurs</li>
            <li>Former Sports Players</li>
            <li>Foundations and Trusts</li>
            <li>Government and Non-Government Officers</li>
          </ul>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-xl shadow-sm p-8">

          <h2 className="text-xl font-semibold text-[#0B1E4B] mb-6">
            Donation Bank Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-slate-600">

            <div>
              <p><strong>Account Holder:</strong> UDI International Sports Association</p>
              <p><strong>Account Number:</strong> 44888264603</p>
              <p><strong>Bank Name:</strong> State Bank of India</p>
              <p><strong>IFSC Code:</strong> SBIN0011864</p>
            </div>

            <div>
              <p><strong>Email:</strong> info@udisports.in</p>
              <p><strong>Accounts Email:</strong> accounts@udisports.in</p>
              <p><strong>Phone:</strong> +91-8307598050</p>
              <p>
                <strong>Office Address:</strong> 5091, 9th Floor Tower-5 Parkar
                Residency, GT Road, Tehsil Rai, District Sonipat
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}