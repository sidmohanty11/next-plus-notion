const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  const response = await notion.databases.retrieve({
    database_id: process.env.NOTION_DB_ID,
  });
  res.status(200).json({ response });
}
