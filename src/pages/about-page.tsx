
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 text-lg">
            Learn more about our company, our mission, and our values.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white shadow rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            Walton is a leading multinational company specializing in electronics,
            home appliances, and technology solutions. Since our inception, we have
            been committed to delivering high-quality products and services that
            meet the evolving needs of our customers worldwide. Our dedication to
            innovation and sustainability drives everything we do.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-600">
              To create innovative, high-quality products that improve the lives
              of our customers while maintaining a commitment to sustainability
              and social responsibility.
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-600">
              To become a globally recognized brand known for excellence,
              innovation, and positive impact on society and the environment.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white shadow rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Integrity: Acting with honesty and transparency in all our dealings.</li>
            <li>Innovation: Constantly seeking new solutions and improvements.</li>
            <li>Customer Focus: Prioritizing the needs and satisfaction of our customers.</li>
            <li>Sustainability: Promoting environmentally and socially responsible practices.</li>
            <li>Teamwork: Collaborating effectively across all levels of the organization.</li>
          </ul>
        </div>

        {/* Highlights or Achievements */}
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Highlights</h2>
          <ul className="list-inside text-gray-600 space-y-2">
            <li>Over 30 years of experience in electronics and technology.</li>
            <li>Presence in more than 50 countries worldwide.</li>
            <li>Award-winning products recognized for quality and innovation.</li>
            <li>Strong commitment to sustainability and corporate responsibility.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
