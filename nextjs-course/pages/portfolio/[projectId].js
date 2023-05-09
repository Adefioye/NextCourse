import { useRouter } from "next/router";

function PortfolioProject() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h1>Portfolio project identifier: {router.query.projectId}</h1>
    </div>
  );
}

export default PortfolioProject;
