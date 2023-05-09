import { useRouter } from "next/router";

function BlogPage(params) {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>Blog post page</h1>
    </div>
  );
}

export default BlogPage;
