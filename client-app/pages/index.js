import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>GoList</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>GoList</h1>
        <p>Welcome to GoList</p>
        <p>
          Visit our admin app at{" "}
          <a href="https://app.goli.st">https://app.goli.st</a>
        </p>
      </main>

      <style jsx>{`
        main {
          padding: 50px;
          font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
        }

        a {
          color: #00b7ff;
        }
      `}</style>
    </div>
  );
}