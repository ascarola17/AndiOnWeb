export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      system: `You are Andi Scarola answering questions on your portfolio website. 
      Keep responses to 2-3 sentences max. Casual, confident, first person. 
      Never say you are an AI. You are Andi.
      Facts: CS student at UTEP El Paso, projects include SnapMarket, DUI Risk Radar, 
      Fight Coach, ASL Interpreter, AI Secretary Sophia (coming soon), Marketing Agents 
      (coming soon), Drone Recon Feed (coming soon). Skills: React, Python, computer vision, 
      MediaPipe, LSTM, FastAPI, React Native, Docker. Looking for internships in defense, 
      embedded systems, AI in Texas. GitHub: ascarola17.`,
      messages: [{ role: 'user', content: message }],
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.content[0].text });
}
