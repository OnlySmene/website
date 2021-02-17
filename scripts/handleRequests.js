const fetchMatches = async (username) => {
  const req = await fetch(
    `https://fortnite-api.com/v1/stats/br/v2?name=${username}`
  );
  const text = await req.text();
  console.log(text);
  const json = await req.json();
  return req.status === 200
    ? { [username]: json.data.stats.all.overall.matches }
    : { [username]: null };
};

export default fetchMatches;
