import { Leaf } from "lucide-react";
import "../styles/ourStory.css";

const milestones = [
  { year: "2009", desc: "Founded in Souss Valley" },
  { year: "2014", desc: "Expanded to 12 acres"   },
  { year: "2019", desc: "10,000 gardens planted"  },
  { year: "2024", desc: "Certified organic growers"},
];

function OurStory() {
  return (
    <section className="story_section">
      <div className="story_container">

        {/* ── Left column ── */}
        <div className="story_left">
          <p className="story_eyebrow">OUR STORY</p>

          <h2 className="story_heading">
            Three generations of growers,<br />
            one quiet philosophy.
          </h2>

          <p className="story_body">
            AZZOUHOUR-SOUSSIA began as a single greenhouse in the Souss Valley.
            Today we tend twelve acres of heirloom trees, cottage flowers, and
            living soils — grown without shortcuts, sold without pretense.
          </p>
          <p className="story_body">
            Every plant we ship has been raised by name. Every garden we plant
            is one we'd happily sit in.
          </p>

          {/* Milestone grid */}
          <div className="story_milestones">
            {milestones.map(({ year, desc }) => (
              <div key={year} className="story_milestone">
                <span className="story_milestone_year">{year}</span>
                <span className="story_milestone_desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="story_right">

          {/* Quote card */}
          <div className="story_quote_card">
            {/* Decorative leaf button top-right */}
            <div className="story_quote_icon">
              <Leaf size={18} />
            </div>

            {/* Big quotation mark */}
            <span className="story_quote_mark">"</span>

            <blockquote className="story_quote_text">
              A garden is the slowest art. We just try to plant the
              first brushstroke well.
            </blockquote>

            <cite className="story_quote_author">Mira Holloway, Head Grower</cite>
          </div>

          {/* Certified badge */}
          <div className="story_badge">
            <div className="story_badge_icon">
              <Leaf size={16} />
            </div>
            <div>
              <p className="story_badge_title">Certified Organic</p>
              <p className="story_badge_sub">No pesticides, ever.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default OurStory;
