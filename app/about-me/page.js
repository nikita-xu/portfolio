import Image from "next/image";

export const metadata = {
  title: "About Me",
};

const bio = [
  "I'm a Business Analytics graduate student at Santa Clara University with a background in Marketing and International Business. My experience spans motorsports, consumer brands, and technology. From which I've worked across analytics, strategy, events, customer insights, and cross-functional projects.",
  "I'm naturally curious and drawn to hands-on, high-energy environments where I can learn quickly, experiment with new ideas, and take action from my evaluations. I enjoy work with a mix of creativity, strategy, analytics, and execution, whether that means solving a problem, building something new, or finding a better way to connect with people.",
  "I'd describe myself as curious, adaptable, and driven, and I'm always excited to learn something new and take on challenges outside of what I already know.",
];

const skillLines = [
  "Analytics: Python · SQL · R · Tableau · Excel · Machine Learning · Data Visualization",
  "Marketing & Strategy: Market Research · Customer Insights · GTM Strategy · Event Marketing · Brand Strategy · Community Marketing",
  "Creative: Canva · Adobe Creative Cloud · Photoshop · Illustrator · ThinkCell · Video Editing",
  "Collaboration: Cross-Functional Communication · Project Coordination · Presentation · Storytelling",
  "Languages: Chinese, English, French",
];

// PHOTOS: this is the only image on the page — point src at any file in public/images/about/
const portrait = {
  src: "/images/about/069fb3198855e3300ecca7f5af970a64.jpg",
  width: 533,
  height: 800,
};

export default function AboutMePage() {
  return (
    <section className="content">
      <div className="about-grid">
        {/* PHOTOS: your portrait (top left) — see the `portrait` constant above */}
        <Image
          src={portrait.src}
          alt="Portrait of Nikita Xu"
          width={portrait.width}
          height={portrait.height}
          className="about-portrait"
          priority
        />
        <div>
          <h1 className="page-title">Hi! I&apos;m Nikita Xu</h1>
          {bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section className="detail-section">
        <h2>Technical Skills</h2>
        <ul className="skills-list">
          {skillLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h2>Contact Details</h2>
        <div className="about-links">
          <p>
            <strong>Email:</strong>{" "}
            <a className="text-link" href="mailto:nikitax128@gmail.com">
              nikitax128@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong> (408) 674 5061
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              className="text-link"
              href="https://www.linkedin.com/in/wennixu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/wennixu
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              className="text-link"
              href="https://github.com/nikita-xu"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/nikita-xu
            </a>
          </p>
          <p>
            <strong>Resume:</strong>{" "}
            <a
              className="text-link"
              href="https://canva.link/l341fabyggsh1ht"
              target="_blank"
              rel="noopener noreferrer"
            >
              View my resume
            </a>
          </p>
        </div>
      </section>
    </section>
  );
}
