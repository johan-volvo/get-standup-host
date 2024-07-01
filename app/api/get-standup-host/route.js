import { promises as fs } from "fs";

export async function GET() {
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8");
  let data = JSON.parse(file);

  const currentPerson = data.host_for_this_week[0];

  data.host_for_this_week.push(data.host_for_this_week.shift());

  await fs.writeFile(
    process.cwd() + "/app/data.json",
    JSON.stringify(data, null, 4)
  );

  return Response.json({ host_for_this_week: currentPerson }, { status: 200 });
}
