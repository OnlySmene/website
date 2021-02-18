const fetchMatches = async (username) => {
  const req = await fetch(
    `https://fortnite-api.com/v1/stats/br/v2?name=${username}`
  );
  const json = await req.json();
  try {
    return req.status === 200
      ? { [username]: json.data.stats.all.overall.matches }
      : { [username]: null };
  } catch (err) {
    return err.message == "Cannot read property 'matches' of null"
      ? { [username]: "private" }
      : { [username]: null };
  }
};

export default fetchMatches;
