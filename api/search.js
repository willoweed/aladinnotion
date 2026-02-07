export default async function handler(req, res) {
  const query = req.query.q;
  const key = process.env.ALADIN_KEY;

  const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${key}&Query=${encodeURIComponent(
    query
  )}&QueryType=Title&MaxResults=5&output=js&Version=20131101`;

  const response = await fetch(url);

  // ✅ 그냥 text로 받기
  const text = await response.text();

  // 알라딘은 js output에서도 JSON처럼 줌
  return res.status(200).send(text);
}
