import Layout from "../../components/Layout";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Article = ({ data }) => {
  return (
    <Layout>
      <>
        <h2>{data.title}</h2>
        <ReactMarkdown source={data.content} escapeHtml={false} />
      </>
    </Layout>
  );
};

export default Article;

export const getStaticProps = async ({ params }) => {
  const r = await fetch(
    `${process.env.STRAPI_URL}/articles/?slug=${params.slug}`
  );
  const data = await r.json();

  return {
    props: {
      data: data.pop(), // The pop() method in JavaScript removes the last element of an array and returns that element. It will remove an item from the end of an array and return that item.
    },
  };
};

export const getStaticPaths = async () => {
  const r = await fetch(`${process.env.STRAPI_URL}/articles`);
  const data = await r.json();

  return {
    paths: data.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
};