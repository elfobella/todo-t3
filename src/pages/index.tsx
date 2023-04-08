import { type NextPage } from "next";
import Head from "next/head";
import Todo from "y/pages/components/Todo";
import Layout from "./Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo - T3</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Layout>
          <Todo />
        </Layout>
      </main>
    </>
  );
};

export default Home;
