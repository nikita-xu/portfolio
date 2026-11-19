const skills = [
  {
    slug: "photo-video",
    title: "Captured Moments — Photo & Video",
    shortDescription:
      "A personal photo and video gallery organized by subject: motorsports, landscapes, nature, and architecture.",
    summary: [
      "A personal photo and video collection organized by subject — motorsports, landscapes, nature, and architecture — including a short motorsports clip.",
    ],
    uniform: true,
    sections: [
      {
        heading: "Motorsports",
        images: [
          { src: "/images/captured-moments/motorsports-01.jpg", width: 533, height: 800 },
          { src: "/images/captured-moments/motorsports-02.jpg", width: 800, height: 533 },
          { src: "/images/captured-moments/motorsports-03.jpg", width: 533, height: 800 },
          { src: "/images/captured-moments/motorsports-04.jpg", width: 533, height: 800 },
          { src: "/images/captured-moments/motorsports-05.jpg", width: 533, height: 800 },
          { src: "/images/captured-moments/motorsports-06.jpg", width: 800, height: 533 },
          { src: "/images/captured-moments/motorsports-07.jpg", width: 800, height: 533 },
        ],
        video: {
          src: "/video/1f695efab4a49f15ca275992b077c6e9.mp4",
          poster: "/video/9fa75c3689b0c7bb921bbf24a72d6cab.jpg",
        },
      },
      {
        heading: "Landscapes",
        images: [
          { src: "/images/captured-moments/landscapes-01.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/landscapes-02.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/landscapes-03.jpg", width: 450, height: 800 },
          { src: "/images/captured-moments/landscapes-04.jpg", width: 800, height: 600 },
        ],
      },
      {
        heading: "Nature",
        images: [
          { src: "/images/captured-moments/nature-01.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/nature-02.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/nature-03.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/nature-04.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/nature-05.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/nature-06.jpg", width: 600, height: 800 },
        ],
      },
      {
        heading: "Architectures",
        images: [
          { src: "/images/captured-moments/architecture-01.jpg", width: 599, height: 799 },
          { src: "/images/captured-moments/architecture-02.jpg", width: 600, height: 800 },
          { src: "/images/captured-moments/architecture-03.jpg", width: 600, height: 800 },
        ],
      },
    ],
  },
  {
    slug: "coding-analytics",
    title: "Coding & Data Analytics",
    shortDescription:
      "Programming and analytics toolkit: Python, SQL, R, Tableau, Excel, machine learning, and data visualization.",
    summary: [
      "The coding and analytics stack I use across my coursework and projects — Python for analysis, modeling, and tooling, SQL and R for data work, Tableau and Excel for dashboards and reporting, plus machine learning and data visualization.",
    ],
    tools: [
      "Python",
      "SQL",
      "R",
      "Tableau",
      "Excel",
      "Machine Learning",
      "Data Visualization",
    ],
    toolProjects: {
      Python: [
        "uber-vendor-portal",
        "products_inventory_cli",
        "greencity-logistics-mip",
        "airbnb-market-analysis",
        "california-traffic-collision",
      ],
      "Machine Learning": ["airbnb-market-analysis"],
      "Data Visualization": [
        "greencity-logistics-mip",
        "airbnb-market-analysis",
        "california-traffic-collision",
      ],
    },
    sections: [],
  },
  {
    slug: "adobe-creative-cloud",
    title: "Adobe Creative Cloud",
    shortDescription:
      "Design work in Adobe Photoshop and Adobe Illustrator — featuring a surreal portrait composite.",
    summary: [
      "I work in Adobe Creative Cloud — primarily Adobe Photoshop for photo compositing and manipulation, and Adobe Illustrator for vector illustration and layout design.",
      "Below is one of my favorite pieces: a surreal portrait created in Adobe Photoshop.",
    ],
    sections: [
      {
        heading: "Adobe Photoshop",
        paragraphs: [
          "Theme: Surreal Portrait / Nature-Inspired Fantasy",
          "Goal: Combine an original portrait with organic textures and natural elements, creating a dreamy, water-inspired composition to interpret the keyword — Nature.",
          "Thought Process: When I chose the keyword Nature, water was the first element that came to mind. I incorporated seashells, pearls, koi fish, and glowing iridescent textures to reflect the beauty and fluidity of the natural world. Inspired by the Yin Yang symbolism of koi fish, I blended the portrait with aquatic elements to create a surreal balance between the human figure and nature.",
        ],
        images: [
          {
            src: "/images/adobe-creative-cloud/surreal-portrait.png",
            width: 500,
            height: 700,
          },
        ],
      },
    ],
  },
];

export default skills;
