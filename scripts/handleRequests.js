const fetchMatches = async (data) => {
  const username = data.split(":")[2];
  console.log(username);
  const req = await fetch(
    `https://fortnite-api.com/v1/stats/br/v2?name=${username}`
  );
  const json = await req.json();
  try {
    return req.status === 200
      ? { [data]: json.data.stats.all.overall.matches }
      : req.status === 403
      ? { [data]: "private" }
      : { [data]: null };
  } catch (err) {
    return { [data]: null };
  }
};

export default fetchMatches;
