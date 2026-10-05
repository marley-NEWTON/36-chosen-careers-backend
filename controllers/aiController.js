const { getClient } = require("../config/gemini");

async function generateSummary(req, res) {
  try {
    const { targetJob, skills, experience } = req.body;

    if (!targetJob) {
      return res.status(400).json({ message: "Target job title is required" });
    }

    const skillsText =
      Array.isArray(skills) && skills.length > 0
        ? skills.join(", ")
        : "various skills";
    const experienceText =
      Array.isArray(experience) && experience.length > 0 && experience[0].role
        ? experience.map((e) => `${e.role} at ${e.company}`).join("; ")
        : "entry-level experience";

    const prompt = `Write a professional 3-4 sentence CV summary/career objective for someone targeting the role of "${targetJob}". Their key skills include: ${skillsText}. Their work background: ${experienceText}. Write in first person, confident and professional tone, no headings, no markdown formatting, just plain text.`;

    const ai = getClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const summary = result.text.trim();

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Gemini error:", error);
    res
      .status(500)
      .json({ message: "AI generation failed", error: error.message });
  }
}

async function suggestSkills(req, res) {
  try {
    const { targetJob, existingSkills } = req.body;

    if (!targetJob) {
      return res.status(400).json({ message: "Target job title is required" });
    }

    const existingText =
      Array.isArray(existingSkills) && existingSkills.length > 0
        ? ` They already have these skills, do not repeat them: ${existingSkills.join(", ")}.`
        : "";

    const prompt = `List exactly 8 relevant professional skills for someone targeting the role of "${targetJob}".${existingText} Return ONLY a JSON array of strings, no markdown, no explanation, no code fences. Example format: ["Skill One", "Skill Two"]`;

    const ai = getClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const rawText = result.text.trim();
    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();
    const skills = JSON.parse(cleanedText);

    if (!Array.isArray(skills)) {
      throw new Error("AI did not return a valid list");
    }

    res.status(200).json({ skills });
  } catch (error) {
    console.error("Gemini error:", error);
    res
      .status(500)
      .json({ message: "AI generation failed", error: error.message });
  }
}

async function improveExperience(req, res) {
  try {
    const { role, company, description } = req.body;

    if (!role || !description) {
      return res
        .status(400)
        .json({ message: "Role and description are required" });
    }

    const prompt = `Rewrite the following job experience description into polished, professional CV language. Role: "${role}"${company ? ` at "${company}"` : ""}. Original description: "${description}". Return only the improved description as plain text (2-3 sentences), no headings, no markdown, no quotation marks around it.`;

    const ai = getClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const improved = result.text.trim();

    res.status(200).json({ improved });
  } catch (error) {
    console.error("Gemini error:", error);
    res
      .status(500)
      .json({ message: "AI generation failed", error: error.message });
  }
}

async function generateCoverLetter(req, res) {
  try {
    const { fullName, targetJob, summary, skills, experience } = req.body;

    if (!fullName || !targetJob) {
      return res
        .status(400)
        .json({ message: "Full name and target job are required" });
    }

    const skillsText =
      Array.isArray(skills) && skills.length > 0
        ? skills.join(", ")
        : "relevant skills";
    const experienceText =
      Array.isArray(experience) && experience.length > 0 && experience[0].role
        ? experience.map((e) => `${e.role} at ${e.company}`).join("; ")
        : "their professional background";
    const summaryText = summary
      ? ` Their professional summary: "${summary}".`
      : "";

    const prompt = `Write a professional cover letter for ${fullName}, who is applying for a "${targetJob}" position. Their key skills: ${skillsText}. Their experience: ${experienceText}.${summaryText} Write 4 paragraphs: an opening expressing interest, a paragraph on relevant skills/experience, a paragraph on why they'd be a good fit, and a closing. Do not include a date, address block, or "[Company Name]" placeholders — write it in a general way that works for any employer. Return only the letter body as plain text, no markdown.`;

    const ai = getClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const coverLetter = result.text.trim();

    res.status(200).json({ coverLetter });
  } catch (error) {
    console.error("Gemini error:", error);
    res
      .status(500)
      .json({ message: "AI generation failed", error: error.message });
  }
}

module.exports = {
  generateSummary,
  suggestSkills,
  improveExperience,
  generateCoverLetter,
};
