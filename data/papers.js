// data/papers.js
// ─────────────────────────────────────────────────────────────────────────────
// Edit this file to add, remove, or update papers shown on the home page.
// Each paper object has the following fields:
//
//   id          - unique short identifier, no spaces (e.g. "smith2023")
//   title       - full paper title
//   authors     - authors as a string (e.g. "Smith J, Jones A, Lee K")
//   year        - publication year
//   journal     - journal or conference name
//   abstract    - full abstract text
//   keyFindings - array of 3-5 bullet point strings summarising key findings
//   pdfUrl      - URL to the PDF (can be a link to PubMed, journal, or your own hosted PDF)
//
// ─────────────────────────────────────────────────────────────────────────────

const papers = [
  {
    id: "example2024",
    title: "Example Paper Title: A Study of Something Important",
    authors: "Smith J, Jones A, Lee K",
    year: 2024,
    journal: "Journal of Health Research",
    abstract: "Replace this with the actual abstract of the paper. This should be the full abstract as published, describing the background, methods, results, and conclusions of the study.",
    keyFindings: [
      "First key finding from the paper goes here",
      "Second key finding from the paper goes here",
      "Third key finding from the paper goes here",
      "Fourth key finding from the paper goes here",
    ],
    pdfUrl: "https://example.com/paper.pdf",
  },

  // Add more papers below by copying the block above and filling in the details.
  // Example:
  //
  // {
  //   id: "jones2023",
  //   title: "Another Paper Title",
  //   authors: "Jones A, Smith B",
  //   year: 2023,
  //   journal: "The Lancet",
  //   abstract: "Abstract text here...",
  //   keyFindings: [
  //     "Finding one",
  //     "Finding two",
  //   ],
  //   pdfUrl: "https://thelancet.com/...",
  // },
];

export default papers;
