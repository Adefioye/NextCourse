import { useRouter } from "next/router";

function ClientProjectPage(params) {
  const router = useRouter();

  return (
    <div>
      <h1>Client Project Page identifier: {router.query.clientProjectId}</h1>
      <h1>Client identifier: {router.query.id}</h1>
    </div>
  );
}

export default ClientProjectPage;
