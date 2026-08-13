import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size (8.5 x 11 inches)
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const margin = 36;
  const contentWidth = width - 2 * margin;
  let y = height - margin - 15;

  const textColor = rgb(0, 0, 0);
  const linkColor = rgb(0, 0, 0.8);
  const lineColor = rgb(0.2, 0.2, 0.2);

  // Helper to draw horizontal section line
  function drawSectionHeader(title) {
    page.drawText(title, {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: textColor,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: width - margin, y: y },
      thickness: 0.75,
      color: lineColor,
    });
    y -= 12;
  }

  // Name (Centered, Bold 22pt)
  const nameText = "S Niveditha Krishna";
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 22);
  page.drawText(nameText, {
    x: (width - nameWidth) / 2,
    y: y,
    size: 22,
    font: fontBold,
    color: textColor,
  });
  y -= 16;

  // Contact line: portfolio | Email | LinkedIn | GitHub
  const contacts = [
    { text: "portfolio", url: "https://github.com/shroffniveditha2006-pixel" },
    { text: "Email", url: "mailto:shroffniveditha2006@gmail.com" },
    { text: "LinkedIn", url: "https://www.linkedin.com/in/s-niveditha-krishna-29b1ab383" },
    { text: "GitHub", url: "https://github.com/shroffniveditha2006-pixel" }
  ];

  let totalContactWidth = 0;
  const sep = " | ";
  const sepWidth = fontRegular.widthOfTextAtSize(sep, 10);
  contacts.forEach((c, idx) => {
    totalContactWidth += fontRegular.widthOfTextAtSize(c.text, 10);
    if (idx < contacts.length - 1) totalContactWidth += sepWidth;
  });

  let currentX = (width - totalContactWidth) / 2;
  contacts.forEach((c, idx) => {
    page.drawText(c.text, {
      x: currentX,
      y: y,
      size: 10,
      font: fontRegular,
      color: linkColor,
    });
    currentX += fontRegular.widthOfTextAtSize(c.text, 10);
    if (idx < contacts.length - 1) {
      page.drawText(sep, {
        x: currentX,
        y: y,
        size: 10,
        font: fontRegular,
        color: textColor,
      });
      currentX += sepWidth;
    }
  });

  y -= 20;

  // PROFILE SUMMARY
  drawSectionHeader("PROFILE SUMMARY");
  const summaryText = "Computer Science and Engineering undergraduate, with a strong interest in software development and Java-based application development. Hands-on experience gained through academic and personal projects involving application development, databases, and web technologies. Strong foundation in programming and problem-solving, with an ability to learn and adapt to new technologies. Seeking to contribute to a collaborative technology environment and grow as a software professional.";
  
  // Wrap summary text
  const words = summaryText.split(" ");
  let line = "";
  const fontSize = 9.5;
  const lineHeight = 12.5;
  for (const word of words) {
    const testLine = line + (line ? " " : "") + word;
    const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > contentWidth) {
      page.drawText(line, { x: margin, y: y, size: fontSize, font: fontRegular, color: textColor });
      y -= lineHeight;
      line = word;
    } else {
      line = testLine;
    }
  }
  if (line) {
    page.drawText(line, { x: margin, y: y, size: fontSize, font: fontRegular, color: textColor });
    y -= lineHeight;
  }
  y -= 6;

  // EDUCATION
  drawSectionHeader("EDUCATION");
  
  // Edu 1
  page.drawText("2023 – Expected 2027", { x: margin, y: y, size: 9.5, font: fontRegular });
  page.drawText("Kalasalingam Academy of Research and Education, ", { x: margin + 115, y: y, size: 9.5, font: fontBold });
  const maduraiWidth = fontBold.widthOfTextAtSize("Kalasalingam Academy of Research and Education, ", 9.5);
  page.drawText("Madurai", { x: margin + 115 + maduraiWidth, y: y, size: 9.5, font: fontRegular });
  page.drawText("CGPA: 8.98", { x: width - margin - fontBold.widthOfTextAtSize("CGPA: 8.98", 9.5), y: y, size: 9.5, font: fontBold });
  y -= 12;
  page.drawText("B.Tech in Computer Science and Engineering (AI & ML)", { x: margin + 115, y: y, size: 9.5, font: fontRegular });
  y -= 14;

  // Edu 2
  page.drawText("2021 – 2023", { x: margin, y: y, size: 9.5, font: fontRegular });
  page.drawText("SR Educational Academy, Anantapur", { x: margin + 115, y: y, size: 9.5, font: fontRegular });
  page.drawText("98.6%", { x: width - margin - fontRegular.widthOfTextAtSize("98.6%", 9.5), y: y, size: 9.5, font: fontRegular });
  y -= 14;

  // Edu 3
  page.drawText("2020 – 2021", { x: margin, y: y, size: 9.5, font: fontRegular });
  page.drawText("AP Model High School, Rayadurgam", { x: margin + 115, y: y, size: 9.5, font: fontRegular });
  page.drawText("98%", { x: width - margin - fontRegular.widthOfTextAtSize("98%", 9.5), y: y, size: 9.5, font: fontRegular });
  y -= 18;

  // TECHNICAL SKILLS
  drawSectionHeader("TECHNICAL SKILLS");
  const skills = [
    { cat: "Programming languages", val: "Java, python (Basics)" },
    { cat: "Frontend", val: "HTML, CSS" },
    { cat: "Backend", val: "Spring Boot (Basics), JDBC" },
    { cat: "Databases", val: "SQL, Firebase" },
    { cat: "Tools & Platforms", val: "Git, GitHub, VS Code, IntelliJ IDEA" }
  ];

  skills.forEach(s => {
    page.drawText(s.cat, { x: margin, y: y, size: 9.5, font: fontRegular });
    page.drawText(s.val, { x: margin + 150, y: y, size: 9.5, font: fontRegular });
    y -= 13;
  });
  y -= 5;

  // PROJECTS
  drawSectionHeader("PROJECTS");

  // Project 1
  page.drawText("EduPath Navigator – AI Career Guidance Platform", { x: margin, y: y, size: 9.5, font: fontBold });
  let px = margin + fontBold.widthOfTextAtSize("EduPath Navigator – AI Career Guidance Platform", 9.5);
  page.drawText("(Visit)", { x: px, y: y, size: 9.5, font: fontRegular, color: linkColor });
  page.drawText("GitHub", { x: width - margin - fontRegular.widthOfTextAtSize("GitHub", 9.5), y: y, size: 9.5, font: fontRegular, color: linkColor });
  y -= 12;
  page.drawText("Tech Stack: Next.js, TypeScript, Firebase, Google Genkit, Tailwind CSS", { x: margin, y: y, size: 9.5, font: fontItalic });
  y -= 13;

  const proj1Bullets = [
    "Developed a responsive full stack web application for personalized career guidance and recommendation generation",
    "Integrated Firebase authentication, REST APIs, and scalable frontend architecture for efficient user management and data handling",
    "Winner of Smart India Hackathon 2025 (National Level) for developing an AI-powered career guidance platform"
  ];

  proj1Bullets.forEach(b => {
    page.drawText("•", { x: margin + 8, y: y, size: 9.5, font: fontRegular });
    // Wrap bullet text
    const bWords = b.split(" ");
    let bLine = "";
    for (const w of bWords) {
      const tLine = bLine + (bLine ? " " : "") + w;
      if (fontRegular.widthOfTextAtSize(tLine, 9.5) > contentWidth - 20) {
        page.drawText(bLine, { x: margin + 20, y: y, size: 9.5, font: fontRegular });
        y -= 12;
        bLine = w;
      } else {
        bLine = tLine;
      }
    }
    if (bLine) {
      page.drawText(bLine, { x: margin + 20, y: y, size: 9.5, font: fontRegular });
      y -= 12;
    }
  });
  y -= 4;

  // Project 2
  page.drawText("Smart Resume Analyzer", { x: margin, y: y, size: 9.5, font: fontBold });
  px = margin + fontBold.widthOfTextAtSize("Smart Resume Analyzer", 9.5);
  page.drawText("(Visit)", { x: px, y: y, size: 9.5, font: fontRegular, color: linkColor });
  page.drawText("GitHub", { x: width - margin - fontRegular.widthOfTextAtSize("GitHub", 9.5), y: y, size: 9.5, font: fontRegular, color: linkColor });
  y -= 12;
  page.drawText("Tech Stack: Java, Spring Boot, MySQL,HTML5, CSS3, JavaScript", { x: margin, y: y, size: 9.5, font: fontItalic });
  y -= 13;

  const proj2Bullets = [
    "Developed a full-stack web application to analyze resumes and match candidate skills with job descriptions",
    "Built backend modules using Java, Spring Boot and MySQL for operations and data management",
    "Designed responsive user interfaces and implemented REST APIs for frontend-backend communication."
  ];

  proj2Bullets.forEach(b => {
    page.drawText("•", { x: margin + 8, y: y, size: 9.5, font: fontRegular });
    const bWords = b.split(" ");
    let bLine = "";
    for (const w of bWords) {
      const tLine = bLine + (bLine ? " " : "") + w;
      if (fontRegular.widthOfTextAtSize(tLine, 9.5) > contentWidth - 20) {
        page.drawText(bLine, { x: margin + 20, y: y, size: 9.5, font: fontRegular });
        y -= 12;
        bLine = w;
      } else {
        bLine = tLine;
      }
    }
    if (bLine) {
      page.drawText(bLine, { x: margin + 20, y: y, size: 9.5, font: fontRegular });
      y -= 12;
    }
  });
  y -= 8;

  // EXPERIENCE
  drawSectionHeader("EXPERIENCE");
  page.drawText("Infosys Springboard – Pragati Cohort 9", { x: margin, y: y, size: 9.5, font: fontBold });
  page.drawText("2026", { x: width - margin - fontRegular.widthOfTextAtSize("2026", 9.5), y: y, size: 9.5, font: fontRegular });
  y -= 13;

  const expBullets = [
    "Participated in a structured industry-oriented learning program focused on developing technical and professional skills.",
    "Gained practical exposure through hands-on learning activities and technology-focused coursework."
  ];
  expBullets.forEach(b => {
    page.drawText("•", { x: margin + 8, y: y, size: 9.5, font: fontRegular });
    const bWords = b.split(" ");
    let bLine = "";
    for (const w of bWords) {
      const tLine = bLine + (bLine ? " " : "") + w;
      if (fontRegular.widthOfTextAtSize(tLine, 9.5) > contentWidth - 20) {
        page.drawText(bLine, { x: margin + 20, y: y, size: 9.5, font: fontRegular });
        y -= 12;
        bLine = w;
      } else {
        bLine = tLine;
      }
    }
    if (bLine) {
      page.drawText(bLine, { x: margin + 20, y: y, size: 9.5, font: fontRegular });
      y -= 12;
    }
  });
  y -= 8;

  // ACHIEVEMENTS
  drawSectionHeader("ACHIEVEMENTS");
  const achievementsList = [
    { text: "Winner – Smart India Hackathon 2025 (National-Level). ", link: "Link" },
    { text: "Awarded Best Idea Presentation at a National Level Symposium.", link: null },
    { text: "Secured 4th Place – Internal College Hackathon 2025.", link: null },
    { text: "Awarded Gold Medal – Best Performer of the Year 2025(College Level) for Overall Contribution. ", link: "Link" }
  ];

  achievementsList.forEach(a => {
    page.drawText("•", { x: margin, y: y, size: 9.5, font: fontRegular });
    page.drawText(a.text, { x: margin + 12, y: y, size: 9.5, font: fontRegular });
    if (a.link) {
      const lx = margin + 12 + fontRegular.widthOfTextAtSize(a.text, 9.5);
      page.drawText(a.link, { x: lx, y: y, size: 9.5, font: fontRegular, color: linkColor });
    }
    y -= 13;
  });
  y -= 5;

  // POSITIONS OF RESPONSIBILITY
  drawSectionHeader("POSITIONS OF RESPONSIBILITY");
  page.drawText("Core Member – IEEE SMC Club", { x: margin, y: y, size: 9.5, font: fontBold });
  page.drawText("Jan 2026 – Present", { x: width - margin - fontRegular.widthOfTextAtSize("Jan 2026 – Present", 9.5), y: y, size: 9.5, font: fontRegular });
  y -= 13;

  const posBullets = [
    "Organized technical workshops and student events",
    "Assisted in planning and coordination of club activities"
  ];

  posBullets.forEach(b => {
    page.drawText("•", { x: margin + 8, y: y, size: 9.5, font: fontRegular });
    page.drawText(b, { x: margin + 20, y: y, size: 9.5, font: fontRegular });
    y -= 12;
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated resume PDF at: ${outputPath}`);
}

generateResume().catch(console.error);
