import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/GreenFooter";
import "../styles/about.css";

/* ── SVG Icons — simple line icons ── */
const LeafIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><path d="M12 22V12"/></svg>;
const SunIcon      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
const ShieldIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const StarIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ZapIcon      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const SearchIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const BoxIcon      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const TruckIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const UsersIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CheckIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const QuoteIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>;

/* ── DATA ── */
const timeline = [
  { year: "2009", title: "Founded in Souss Valley", desc: "A small family nursery built on generations of agricultural heritage in southern Morocco." },
  { year: "2014", title: "Expanded to 12 Acres", desc: "Growing demand led us to expand our land, greenhouses, and product catalog." },
  { year: "2019", title: "10,000 Gardens Supplied", desc: "A proud milestone — ten thousand spaces transformed with our plants and expertise." },
  { year: "2024", title: "Certified Organic Grower", desc: "Officially certified, confirming our commitment to natural, chemical-free cultivation." },
];

const values = [
  { Icon: LeafIcon,   title: "Sustainability", desc: "Every decision we make considers our environmental impact — from soil to packaging." },
  { Icon: StarIcon,   title: "Quality",        desc: "We select only the healthiest plants and finest products, inspected before every delivery." },
  { Icon: ShieldIcon, title: "Trust",          desc: "Built over 15 years of honest service, transparent pricing, and real expertise." },
  { Icon: ZapIcon,    title: "Innovation",     desc: "Constantly exploring new species, techniques, and solutions to better serve our customers." },
];

const steps = [
  { Icon: SearchIcon, num: "01", title: "Find Your Plant",       desc: "Browse our curated collection of plants, seeds, and garden accessories online or in-store." },
  { Icon: BoxIcon,    num: "02", title: "Choose Your Pot",       desc: "Match your plant with the perfect pot — we offer dozens of styles, sizes, and materials." },
  { Icon: TruckIcon,  num: "03", title: "Delivered to Your Home", desc: "Carefully packed and delivered fresh to your door, ready to brighten your space." },
];

const impact = [
  { value: "5,000+",  label: "Happy Customers"    },
  { value: "50,000+", label: "Plants Delivered"   },
  { value: "300+",    label: "Products Available" },
  { value: "2,000+",  label: "Trees Supported"    },
];

const testimonials = [
  { name: "Sarah M.", location: "Casablanca", text: "I ordered 6 plants and they all arrived in perfect condition. The packaging was exceptional and the plants were even more beautiful than in the photos.", avatar: "S" },
  { name: "Karim B.", location: "Marrakech",  text: "Best gardening store I've found online. The team helped me choose the right plants for my terrace and the results are stunning. Highly recommended!", avatar: "K" },
  { name: "Nadia R.", location: "Agadir",     text: "I've been ordering from Azzouhour-Soussia for 3 years now. Consistent quality, fast delivery, and genuinely passionate about what they do.", avatar: "N" },
];

const promises = ["Premium Quality", "Fast Delivery", "Expert Advice", "Customer Satisfaction"];

/* ════════════════════════════════════
   COMPONENT
════════════════════════════════════ */
function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* 1 ── HERO */}
      <section className="ab_hero">
        <div className="ab_container ab_hero_inner">
          <div className="ab_hero_text">
            <span className="ab_eyebrow">Our Story</span>
            <h1 className="ab_hero_title">
              Three generations of growers,<br />one shared passion.
            </h1>
            <p className="ab_hero_body">
              What began as a small family nursery in the fertile Souss Valley has grown
              into one of Morocco's most trusted names in gardening. For over 15 years,
              we have supplied homes, offices, and public spaces with premium plants,
              tools, and accessories — guided by the same values our grandparents
              instilled in us: patience, care, and a deep love for the earth.
            </p>
          </div>
          <div className="ab_hero_quote">
            <span className="ab_quote_icon"><QuoteIcon /></span>
            <p>
              A garden is the slowest art. We just try to plant the first brushstroke well.
            </p>
          </div>
        </div>
      </section>

      {/* 2 ── TIMELINE */}
      <section className="ab_section ab_bg_beige">
        <div className="ab_container">
          <div className="ab_section_header">
            <span className="ab_eyebrow ab_eyebrow_green">Our Journey</span>
            <h2 className="ab_section_title">Milestones That Shaped Us</h2>
          </div>
          <div className="ab_timeline">
            {timeline.map((t, i) => (
              <div className="ab_tl_card" key={t.year}>
                <div className="ab_tl_year">{t.year}</div>
                <h3 className="ab_tl_title">{t.title}</h3>
                <p className="ab_tl_desc">{t.desc}</p>
                {i < timeline.length - 1 && <div className="ab_tl_line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 ── WHY WE STARTED */}
      <section className="ab_section ab_bg_dark">
        <div className="ab_container ab_why_inner">
          <div className="ab_why_text">
            <span className="ab_eyebrow">Our Purpose</span>
            <h2 className="ab_section_title ab_title_light">Why We Started</h2>
            <p className="ab_why_body">
              Our journey began with a simple belief: everyone deserves access to quality
              gardening products and expert guidance. What started as a family passion
              became a mission to help people create beautiful outdoor spaces.
            </p>
          </div>
          <div className="ab_why_stat_col">
            {impact.slice(0, 2).map((s) => (
              <div className="ab_why_stat" key={s.label}>
                <span className="ab_why_stat_val">{s.value}</span>
                <span className="ab_why_stat_lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ── VALUES */}
      <section className="ab_section ab_bg_white">
        <div className="ab_container">
          <div className="ab_section_header">
            <span className="ab_eyebrow ab_eyebrow_green">What Drives Us</span>
            <h2 className="ab_section_title">Our Values</h2>
          </div>
          <div className="ab_grid_4">
            {values.map(({ Icon, title, desc }) => (
              <div className="ab_value_card" key={title}>
                <div className="ab_card_icon"><Icon /></div>
                <h3 className="ab_card_title">{title}</h3>
                <p className="ab_card_desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 ── STEPS */}
      <section className="ab_section ab_bg_beige">
        <div className="ab_container">
          <div className="ab_section_header">
            <span className="ab_eyebrow ab_eyebrow_green">How It Works</span>
            <h2 className="ab_section_title">The Journey of Your New Plant</h2>
          </div>
          <div className="ab_steps">
            {steps.map(({ Icon, num, title, desc }, i) => (
              <div className="ab_step" key={num}>
                <div className="ab_step_head">
                  <div className="ab_step_icon"><Icon /></div>
                  <span className="ab_step_num">{num}</span>
                </div>
                <h3 className="ab_card_title">{title}</h3>
                <p className="ab_card_desc">{desc}</p>
                {i < steps.length - 1 && <div className="ab_step_arrow" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 ── TEAM */}
      <section className="ab_section ab_bg_white">
        <div className="ab_container ab_team_inner">
          <div className="ab_team_text">
            <span className="ab_eyebrow ab_eyebrow_green">The People</span>
            <h2 className="ab_section_title">Meet the People<br />Behind the Plants</h2>
            <p className="ab_card_desc" style={{ maxWidth: "440px" }}>
              Our team of passionate horticulturists, landscape designers, and gardening
              enthusiasts brings deep expertise and genuine love to every interaction —
              from selecting seedlings to advising on care routines.
            </p>
          </div>
          <div className="ab_team_stats">
            {[
              { Icon: UsersIcon, val: "12+",  lbl: "Gardening Experts"         },
              { Icon: SunIcon,   val: "15+",  lbl: "Years of Experience"       },
              { Icon: StarIcon,  val: "100%", lbl: "Dedicated Customer Support" },
            ].map(({ Icon, val, lbl }) => (
              <div className="ab_team_stat" key={lbl}>
                <div className="ab_team_stat_icon"><Icon /></div>
                <span className="ab_team_stat_val">{val}</span>
                <span className="ab_team_stat_lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 ── IMPACT */}
      <section className="ab_impact_section">
        <div className="ab_container">
          <div className="ab_section_header">
            <span className="ab_eyebrow">By the Numbers</span>
            <h2 className="ab_section_title ab_title_light">Our Impact</h2>
          </div>
          <div className="ab_grid_4">
            {impact.map((item) => (
              <div className="ab_impact_card" key={item.label}>
                <span className="ab_impact_val">{item.value}</span>
                <span className="ab_impact_lbl">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 ── TESTIMONIALS
      <section className="ab_section ab_bg_beige">
        <div className="ab_container">
          <div className="ab_section_header">
            <span className="ab_eyebrow ab_eyebrow_green">What People Say</span>
            <h2 className="ab_section_title">Customer Testimonials</h2>
          </div>
          <div className="ab_grid_3">
            {testimonials.map((t) => (
              <div className="ab_testi_card" key={t.name}>
                <div className="ab_testi_stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="ab_star"><StarIcon /></span>
                  ))}
                </div>
                <p className="ab_testi_text">"{t.text}"</p>
                <div className="ab_testi_author">
                  <div className="ab_testi_avatar">{t.avatar}</div>
                  <div>
                    <p className="ab_testi_name">{t.name}</p>
                    <p className="ab_testi_loc">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 9 ── GALLERY
      <section className="ab_section ab_bg_white">
        <div className="ab_container">
          <div className="ab_section_header">
            <span className="ab_eyebrow ab_eyebrow_green">Visual Journey</span>
            <h2 className="ab_section_title">Our Garden Gallery</h2>
          </div>
          <div className="ab_gallery">
            {["Greenhouses", "Garden Products", "Team at Work", "Healthy Plants", "Customer Gardens", "Seasonal Blooms"].map((label, i) => (
              <div className={`ab_gallery_item ab_gallery_${i + 1}`} key={label}>
                <div className="ab_gallery_label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 10 ── PROMISE */}
      <section className="ab_section ab_bg_beige">
        <div className="ab_container ab_promise_inner">
          <div className="ab_promise_text">
            <span className="ab_eyebrow ab_eyebrow_green">Our Commitment</span>
            <h2 className="ab_section_title">Our Promise</h2>
            <p className="ab_card_desc" style={{ marginBottom: "2rem" }}>
              We don't just sell gardening products. We help people create beautiful
              outdoor spaces that bring joy for years to come.
            </p>
            <ul className="ab_promise_list">
              {promises.map((p) => (
                <li key={p} className="ab_promise_item">
                  <span className="ab_promise_check"><CheckIcon /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="ab_promise_visual">
            <div className="ab_promise_ring">
              <div className="ab_promise_ring_inner">
                <span className="ab_promise_ring_val">15+</span>
                <span className="ab_promise_ring_lbl">Years of<br />Trust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 ── CTA */}
      <section className="ab_cta">
        <div className="ab_container ab_cta_inner">
          <h2 className="ab_cta_title">Ready to Grow Your Dream Garden?</h2>
          <p className="ab_cta_sub">
            Explore hundreds of plants, pots, and accessories — curated with care from the Souss Valley.
          </p>
          <button className="ab_cta_btn" onClick={() => navigate("/products")}>
            Explore Our Collection
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
