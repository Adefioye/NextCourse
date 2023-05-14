import fs from "fs/promises";
import path from "path";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
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
