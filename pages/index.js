import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ results }) {
  console.log(results);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next + Notion</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Notion + <a href="https://nextjs.org">Next</a>
        </h1>

        <div className={styles.grid}>
          {results.map((res) => (
            <div key={res.id}>
              <p>Created at:{new Date(res.created_time).toLocaleString()}</p>
              <p>
                Updated at:{new Date(res.last_edited_time).toLocaleString()}
              </p>
              <p>TITLE: {res.properties.Title.title[0].plain_text}</p>
              <p>
                AUTHOR NAME: {res.properties.Author.rich_text[0].plain_text}
              </p>
              <p>CONTENT: {res.properties.Content.rich_text[0].plain_text}</p>
              TAGS:{" "}
              <ul>
                {res.properties.Tags.multi_select.map((t) => (
                  <li key={t.id} style={{ color: t.color }}>
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const { Client } = require("@notionhq/client");

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
  });
  return {
    props: {
      results,
    },
  };
}
