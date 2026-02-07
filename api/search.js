export default async function handler(req, res) {
  const query = req.query.q;
  const key = process.env.ALADIN_KEY;

  // ✅ query 체크
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  // ✅ key 체크 (이게 지금 터지는 원인)
  if (!key) {
    return res.status(500).json({
      error: "ALADIN_KEY is missing in Vercel Environment Variables",
    });
  }

  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${key}&Query=${encodeURIComponent(
    query
  )}&QueryType=Title&MaxResults=5&output=json&Version=20131101`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
