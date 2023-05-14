import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailsPage(props) {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{product.id}</h1>
      <p>{product.title}</p>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getProducts(props) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const response = await fs.readFile(filePath);
  const jsonResp = JSON.parse(response);
  const { products } = jsonResp;
  return products;
}

export async function getStaticProps(context) {
  const { params } = context;
  const { pid } = params;
  const products = await getProducts();
  const product = products.find((product) => product.id == pid);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const products = await getProducts();
  const productIds = products.map((product) => product.id);
  const pathWithProductIds = productIds.map((id) => ({
    params: {
      pid: id,
    },
  }));
  return {
    paths: pathWithProductIds,
    fallback: true,
  };
}

export default ProductDetailsPage;
