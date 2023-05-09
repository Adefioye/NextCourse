import { useRouter } from "next/router";

function SelectedClientPage(params) {
  const router = useRouter();

  const loadClientProject = () => {
    router.push({
      pathname: "/clients/[id]/[clientProjectId]",
      query: {
        id: "max",
        clientProjectId: "projecta",
      },
    });
  };

  return (
    <div>
      <h1>Selected Clients Page identifier: {router.query.id}</h1>
      <button onClick={loadClientProject}>Load Project A</button>
    </div>
  );
}

export default SelectedClientPage;
