import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import SectionTitle from "../ui/section-title";

const faqs = [
  {
    question: "What products does SunPlus sell?",
    answer:
      "SunPlus offers a wide range of high-quality electrical products including LED lighting, mosquito bats, switches, circuit breakers, ceiling and exhaust fans, DB boxes, sockets, and other home and commercial electrical solutions.",
  },
  {
    question: "Do you ship nationwide?",
    answer: "Yes, we ship across the country using trusted courier partners. Standard delivery usually takes 3-5 business days, and express delivery is available for faster shipping.",
  },
  {
    question: "What is the return policy?",
    answer: "We offer a 30-day hassle-free return policy. Products must be returned in their original packaging for a full refund.",
  },
  {
    question: "Do SunPlus products come with a warranty?",
    answer: "Yes. Depending on the product category, warranties range from 1 to 5 years. Our support team is available for any warranty claims or product assistance.",
  },
  {
    question: "How can I track my order?",
    answer:
      "SunPlus support will contact you directly with shipment updates and estimated delivery time. We ensure every order reaches you safely and on time.",
  },
];

export default function FAQSection() {
  return (
    <section className="my-8" id="faq">
      <SectionTitle title="Frequently Asked Questions" align="center" />

      <div className="mt-12 w-full max-w-4xl mx-auto">
        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0" 
          className="w-full"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="p-4 text-lg font-semibold flex items-center gap-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 px-4 pb-4 text-balance">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
