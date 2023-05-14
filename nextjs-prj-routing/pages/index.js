import Link from "next/link";

import fs from "fs/promises";
import path from "path";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(params) {
  console.log("Re-(Generating...)");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const response = await fs.readFile(filePath);
  const jsonResp = JSON.parse(response);
  const { products } = jsonResp;

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}

export default HomePage;
