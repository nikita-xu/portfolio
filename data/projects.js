const projects = [
  {
    slug: "uber-vendor-portal",
    title: "Procurement Recommendation System",
    context: "Industry Practicum — Uber · Procurement Analytics & Product Development",
    shortDescription:
      "A procurement data product that ranks vendors with cost, quality, and risk scoring, backed by a KPI framework and a UI/UX prototype.",
    summary: [
      "During an industry practicum with Uber, I worked with the Procurement Analytics & Product Development team to build a procurement recommendation system.",
      "The product pairs a vendor ranking algorithm with cost, quality, and risk scoring across procurement data, a KPI framework, and a UI/UX prototype for the portal experience.",
    ],
    tools: [
      "Python",
      "Codex",
      "Figma",
      "Claude",
      "Vendor Ranking Algorithm",
      "KPI Framework",
      "Product Analytics",
      "UI/UX Prototype",
    ],
    githubUrl: "",
    heroImages: [],
    galleries: [],
  },
  {
    slug: "products_inventory_cli",
    title: "Products Inventory CLI",
    context: "ISBA 2438 — AI Assisted Software Development · Solo Project",
    shortDescription:
      "A Python 3 command-line tool for managing a small store's product inventory, with atomic JSON storage and a full test suite.",
    summary: [
      "A Python 3 command-line tool for managing a small store's product inventory. Products live in a local JSON file, so every command reads what the last command saved.",
      "Commands cover the full lifecycle: add, list, get, update, and delete products, plus a custom low-stock command that shows everything at or below a threshold for quick restock checks.",
    ],
    contribution: [
      "I built this solo, incrementally with a coding agent under the course's AI-assisted workflow — small steps, with review and testing after every step.",
      "I designed the command interface and data rules (IDs, price formatting, validation), made every save atomic so a failed write can never destroy the data file, and wrote a test suite with one file per requirement area, including corrupt-data and exit-code cases.",
    ],
    tools: ["Python", "Standard Library Only", "JSON", "CLI Design", "Automated Testing"],
    learnings: [
      "I learned how much a small tool's quality comes from its contracts: consistent JSON output, meaningful exit codes, and atomic saves that can never destroy the data file.",
      "Building it incrementally with a coding agent — small steps, with review and testing after every one — also taught me to treat AI-written code as something to read, test, and own.",
    ],
    githubUrl: "https://github.com/nikita-xu/products-inventory-cli",
    heroImages: [],
    galleries: [],
  },
  {
    slug: "greencity-logistics-mip",
    title: "GreenCity Logistics Optimization",
    context: "ISBA 2405 — Prescriptive Analytics · Team of 4 · Santa Clara University",
    shortDescription:
      "A mixed-integer programming model for a sustainable last-mile delivery network — facility location, zone assignment, and fleet routing with Python and Gurobi.",
    summary: [
      "A decision system that designs an urban last-mile network at minimum cost while meeting capacity, emissions, and service constraints.",
      "The model decides which micro-fulfillment centers to open, which facility serves each demand zone, and which vehicle type runs each route, minimizing cost and CO2 emissions while maximizing service quality.",
      "Three objectives are balanced with a normalized weighted-sum method across four weight scenarios, plus sensitivity analysis on demand and emission-cap shocks.",
    ],
    tools: ["Python", "Gurobi", "pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/nikita-xu/greencity-logistics-mip",
    heroImages: [],
    galleries: [],
  },
  {
    slug: "airbnb-market-analysis",
    title: "Airbnb Market Analysis",
    context: "Machine Learning Course Project",
    shortDescription:
      "Machine learning on an 80K+ Airbnb listing dataset — predicting demand and testing whether K-Means market segmentation improves model performance.",
    summary: [
      "This project analyzes Airbnb listing data to understand the drivers of listing demand and to evaluate whether market segmentation improves predictive performance.",
      "Linear Regression, Random Forest, and XGBoost models were compared against each other, then K-Means clustering and PCA segmented the market to test whether segmented models beat a global baseline.",
    ],
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Matplotlib", "Jupyter Notebook"],
    githubUrl: "https://github.com/nikita-xu/Airbnb-Market-Analysis",
    heroImages: [],
    galleries: [],
  },
  {
    slug: "california-traffic-collision",
    title: "California Traffic Collision Analysis",
    context: "Data Analytics Course Project · Team of 5",
    shortDescription:
      "End-to-end analysis of California traffic collision data — ETL, risk-factor analysis, and visualizations of severity, frequency, and geography.",
    summary: [
      "This project analyzes California traffic collision data to identify patterns, high-risk factors, and geographic trends in road accidents.",
      "The workflow covers end-to-end ETL (cleaning, missing values, feature engineering), exploratory analysis of accident frequency by time, location, and conditions, and visualizations including maps of high-risk areas.",
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    githubUrl: "https://github.com/nikita-xu/California-Traffic-Collision",
    heroImages: [],
    galleries: [],
  },
  {
    slug: "event-execution",
    title: "TREK x HOKA Duathlon — Event Execution",
    context: "Partnered Brand Activation — TREK × HOKA",
    shortDescription:
      "Planned and executed a partnered TREK x HOKA duathlon event to strengthen community engagement, increase brand exposure, and create shareable content.",
    summary: [
      "Planned and executed a partnered TREK x HOKA duathlon event designed to strengthen community engagement, increase brand exposure, and create shareable social media content.",
      "The event combined cycling and running segments, using the TREK concept flagship store and nearby Luwan Stadium to create a smooth participant experience and strong visual brand presence.",
    ],
    tools: [
      "Event Planning",
      "Brand Activation",
      "Cross-Functional Communication",
      "Agency Coordination",
      "Community Engagement",
      "On-Site Problem Solving",
      "Social Media Activation",
    ],
    toolsHeading: "Skills Demonstrated",
    githubUrl: "",
    // PHOTOS: the two images at the top of the event page — edit here
    heroImages: [
      {
        src: "/images/event-execution/f855261e607f9cbfe4f929d9bf0bd869.jpg",
        width: 800,
        height: 533,
        caption: "Running relay and bicycle simulator racing",
      },
      {
        src: "/images/event-execution/8739840a1254bf1a30406e72a2354f07.jpg",
        width: 800,
        height: 533,
      },
    ],
    // PHOTOS: the photo galleries below — add, remove, or reorder entries
    galleries: [
      {
        heading: "Event Photos",
        images: [
          {
            src: "/images/event-execution/91e024202350864b6abc7d3aaf424d49.jpg",
            width: 800,
            height: 533,
          },
          {
            src: "/images/event-execution/9176ffba8f56aa5536fe1760f2d199ac.jpg",
            width: 800,
            height: 533,
          },
          {
            src: "/images/event-execution/469a32e2659c98d3b1b1fc0bb91ab69c.jpg",
            width: 800,
            height: 533,
          },
          {
            src: "/images/event-execution/eeb44d36d2e0d52d368431459ad1a940.jpg",
            width: 800,
            height: 533,
          },
          {
            src: "/images/event-execution/3492f2a207d4b246a9909ce597f4da24.jpg",
            width: 800,
            height: 533,
          },
          {
            src: "/images/event-execution/968feae0423a7b8dbcec78472bd2603f.jpg",
            width: 800,
            height: 533,
          },
        ],
      },
      {
        heading: "Sample Social Media Posts",
        stat: "8000+ photo album views",
        images: [
                    {
            src: "/images/event-execution/cae6fc4d05ec70c7179147bf52c6a0c9.png",
            width: 800,
            height: 552,
          },
          {
            src: "/images/event-execution/d685d5fcfe2be374a9577163729fc471.png",
            width: 800,
            height: 476,
          },
          {
            src: "/images/event-execution/921c32d3d74a30bf69ae9938b14d91bf.png",
            width: 800,
            height: 592,
          },
          {
            src: "/images/event-execution/140f3e4dd1c347d716688d3c171ba555.png",
            width: 800,
            height: 363,
          },
          {
            src: "/images/event-execution/483f7835226a2f4c04c4e4f79ea41cbb.png",
            width: 369,
            height: 800,
          },
          {
            src: "/images/event-execution/ec8a0a1007cceb17538d4eba051aa2f1.png",
            width: 369,
            height: 800,
          },
        ],
      },
    ],
  },
];

export default projects;
