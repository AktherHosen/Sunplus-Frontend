import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Card className="rounded-lg border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>Your privacy is important to us. This Privacy Policy explains how we collect, use and protect your information.</p>
          
          <h3 className="text-xl font-semibold">1. Information We Collect</h3>
          <p>We may collect personal data such as your name, email address, phone number, IP address, browser type, and other usage data when you use our website or services, similar to standard log file and cookie practices.</p>
          
          <h3 className="text-xl font-semibold">2. Use of Information</h3>
          <p>The information collected is used to operate and maintain our services, improve user experience, communicate with you, and monitor usage trends.</p>
          
          <h3 className="text-xl font-semibold">3. Cookies & Tracking Technologies</h3>
          <p>We use cookies, web beacons and other tracking technologies to personalise content, remember your preferences and analyse traffic. You may disable cookies in your browser settings, subject to some service limitations.</p>
          
          <h3 className="text-xl font-semibold">4. Data Sharing & Disclosure</h3>
          <p>We do not sell your personal information. We may share your data with trusted third‑party service providers, affiliates or as required by law (for example, to comply with legal obligations or protect rights) under appropriate safeguards.</p>
          
          <h3 className="text-xl font-semibold">5. Retention & Security</h3>
          <p>We retain personal data only as long as necessary for the purposes described or as required by applicable law. We implement reasonable physical, electronic and management safeguards to protect your data, but no system can be guaranteed 100% secure.</p>
          
          <h3 className="text-xl font-semibold">6. Changes to This Policy</h3>
          <p>We may update this policy from time to time by posting a revised version on our site with the “Last Updated” date. Continued use of our services after changes constitutes acceptance.</p>
          
          <p>If you have any questions about your privacy or how your information is handled, contact our support team.</p>
        </CardContent>
      </Card>
    </div>
  );
}
