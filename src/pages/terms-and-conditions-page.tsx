import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Card className="shadow-none rounded-lg border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>Welcome to our platform. By using our services, you agree to the following terms and conditions.</p>
          
          <h3 className="text-xl font-semibold">1. Use of Website & Services</h3>
          <p>You agree to use the website and services provided by us in a responsible and lawful manner, and not for any illegal or harmful activities.</p>
          
          <h3 className="text-xl font-semibold">2. Limitation of Liability</h3>
          <p>We provide our services “as is” and make no warranties as to the accuracy or reliability of the website. In no event shall we nor our officers, directors or employees be liable for any indirect, consequential or special liability arising from your use of the service.</p>
          
          <h3 className="text-xl font-semibold">3. Indemnification</h3>
          <p>You agree to indemnify us fully from and against any liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of these Terms.</p>
          
          <h3 className="text-xl font-semibold">4. Modifications & Assignment</h3>
          <p>We reserve the right to revise these Terms at any time. Use of the site following changes constitutes acceptance of those changes. We may assign or transfer our rights and obligations under these Terms without notice; you may not do so.</p>
          
          <h3 className="text-xl font-semibold">5. Governing Law</h3>
          <p>These Terms shall be governed and construed in accordance with the laws of Republic of Bangladesh, and you submit to the non‑exclusive jurisdiction of the courts located there.</p>
          
          <p>Please review these Terms regularly. If you have any questions, contact our support team.</p>
        </CardContent>
      </Card>
    </div>
  );
}
