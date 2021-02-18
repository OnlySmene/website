const fetchMatches = async (username) => {
  const req = await fetch(
    `https://fortnite-api.com/v1/stats/br/v2?name=${username}`
  );
  const json = await req.json();
  try {
    return req.status === 200
      ? { [username]: json.data.stats.all.overall.matches }
      : req.status === 403
      ? { [username]: "private" }
      : { [username]: null };
  } catch (err) {
    return { [username]: null };
  }
};

export default fetchMatches;
