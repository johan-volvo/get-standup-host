export async function POST() {
  const response = await fetch("https://general-db.vercel.app/api/get", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      db: "1",
    }),
  });

  let result = await response.json();

  const host = result.people[0];

  result.people.push(result.people.shift());

  await fetch("https://general-db.vercel.app/api/update", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      db: "1",
      data: { people: result.people },
    }),
  });

  return Response.json(
    {
      response_type: "in_channel",
      text: `And the host for next week is... ${host}!`,
    },
    { status: 200 }
  );
}
