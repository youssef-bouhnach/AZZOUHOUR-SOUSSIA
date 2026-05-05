import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-green-900">
                  Get In Touch
                </h1>
                <p className="text-xl text-green-700 leading-relaxed">
                  Have questions about our products or services? We'd love to hear from you. 
                  Send us a message and we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-3xl font-bold mb-6 text-gray-900">
                      Contact Information
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                      Reach out to us through any of these channels. We're here to help you bring nature into your space.
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-green-100 hover:border-green-300 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-gray-600">hello@azzouhour.ma</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-green-100 hover:border-green-300 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                        <p className="text-gray-600">+212 668-057583</p>
                        <p className="text-sm text-gray-500 mt-1">Mon-Fri from 9am to 6pm</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-green-100 hover:border-green-300 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Location</h3>
                        <p className="text-gray-600">Agadir, Morocco</p>
                        <p className="text-sm text-gray-500 mt-1">Visit us by appointment</p>
                      </div>
                    </div>
                  </div>

                  {/* Map or Image */}
                  <div className="rounded-2xl overflow-hidden border-2 border-green-100 h-64 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-green-600" />
                      <p className="font-semibold">Agadir, Morocco</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl border-2 border-green-100 p-8 shadow-lg">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-3 text-gray-900">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-3xl font-bold mb-6 text-gray-900">
                        Send Us a Message
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Phone
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+212 XXX-XXXXXX"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Subject
                          </label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is this about?"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Message *
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us more about your inquiry..."
                            rows={5}
                            required
                            className="w-full"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 rounded-xl shadow-lg"
                        >
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ or Additional Info */}
          <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-4xl font-bold mb-6 text-gray-900">
                  Frequently Asked Questions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <div className="bg-white p-6 rounded-xl border-2 border-green-100 text-left">
                    <h3 className="font-semibold text-lg mb-2">Do you offer delivery?</h3>
                    <p className="text-gray-600">Yes, we deliver across Morocco. Delivery times vary by location.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-2 border-green-100 text-left">
                    <h3 className="font-semibold text-lg mb-2">Can I visit your nursery?</h3>
                    <p className="text-gray-600">Absolutely! Please contact us to schedule a visit.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-2 border-green-100 text-left">
                    <h3 className="font-semibold text-lg mb-2">Do you provide plant care advice?</h3>
                    <p className="text-gray-600">Yes, we're happy to help with plant care tips and recommendations.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border-2 border-green-100 text-left">
                    <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                    <p className="text-gray-600">We accept cash, bank transfer, and major credit cards.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default ContactPage;
