import { Leaf, Heart, Users, Award, Sprout, Globe } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";

const StoryPage = () => {
  const values = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainability",
      description: "We're committed to eco-friendly practices and sustainable sourcing.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Quality",
      description: "Every plant and product is carefully selected for excellence.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Building a community of plant lovers and nature enthusiasts.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Expertise",
      description: "Years of experience in horticulture and plant care.",
      color: "from-purple-500 to-indigo-600",
    },
  ];

  const milestones = [
    { year: "2015", title: "Founded", description: "Started our journey in Souss Valley" },
    { year: "2018", title: "Expansion", description: "Opened our first retail location" },
    { year: "2021", title: "Online Store", description: "Launched e-commerce platform" },
    { year: "2024", title: "Growing", description: "Serving thousands of happy customers" },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold mb-6">
                  <Sprout className="h-5 w-5" />
                  <span>Our Story</span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-green-900">
                  Growing Dreams, One Plant at a Time
                </h1>
                <p className="text-xl text-green-700 leading-relaxed">
                  From a small family garden in Souss Valley to Morocco's trusted source for quality plants and garden supplies, 
                  our journey has been rooted in passion and dedication to nature.
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
          </section>

          {/* Main Story */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                  <div className="rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center border-2 border-green-200">
                    <div className="text-center text-green-600">
                      <Leaf className="h-24 w-24 mx-auto mb-4" />
                      <p className="font-semibold text-lg">Our Garden</p>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-4xl font-bold mb-6 text-gray-900">
                      Where It All Began
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      AZZOUHOUR-SOUSSIA started as a small family garden in the heart of Souss Valley. 
                      What began with a love for plants and a dream to share nature's beauty has grown into 
                      a thriving business serving plant enthusiasts across Morocco.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Today, we're proud to offer a carefully curated selection of plants, soils, vases, 
                      and garden services, all while maintaining the personal touch and expertise that 
                      defined our humble beginnings.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h2 className="font-display text-4xl font-bold mb-6 text-gray-900">
                      Our Mission
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      We believe that everyone deserves to experience the joy and tranquility that plants bring. 
                      Our mission is to make quality plants and garden supplies accessible to all, while promoting 
                      sustainable practices and environmental stewardship.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Whether you're a seasoned gardener or just starting your plant journey, we're here to 
                      support you with expert advice, quality products, and a genuine passion for green living.
                    </p>
                  </div>
                  <div className="order-1 md:order-2 rounded-2xl overflow-hidden h-96 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center border-2 border-emerald-200">
                    <div className="text-center text-emerald-600">
                      <Globe className="h-24 w-24 mx-auto mb-4" />
                      <p className="font-semibold text-lg">Our Mission</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="font-display text-4xl font-bold mb-4 text-gray-900">
                    Our Core Values
                  </h2>
                  <p className="text-xl text-gray-600">
                    The principles that guide everything we do
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-8 border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-xl hover:-translate-y-2"
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                        {value.icon}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3 text-gray-900">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="font-display text-4xl font-bold mb-4 text-gray-900">
                    Our Journey
                  </h2>
                  <p className="text-xl text-gray-600">
                    Key milestones in our growth
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-300 to-emerald-500"></div>

                  {/* Timeline items */}
                  <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-8 ${
                          index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="bg-white rounded-2xl p-6 border-2 border-green-100 hover:border-green-300 transition-colors inline-block">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                              {milestone.year}
                            </div>
                            <h3 className="font-display text-xl font-bold mb-2 text-gray-900">
                              {milestone.title}
                            </h3>
                            <p className="text-gray-600">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-white shadow-lg z-10"></div>
                        <div className="flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-4xl font-bold mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
                Become part of our story. Explore our collection and start your own green journey today.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/shop"
                  className="px-8 py-4 bg-white text-green-700 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-lg"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-green-800 text-white rounded-full font-semibold hover:bg-green-900 transition-colors border-2 border-white/20"
                >
                  Get In Touch
                </a>
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

export default StoryPage;
