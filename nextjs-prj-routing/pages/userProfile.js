function UserProfilePage(props) {
  return <h1> {props.username}</h1>;
}

export async function getServerSideProps(context) {
  const { req, res, params } = context;

  console.log(req, res);
  return {
    props: {
      username: "Koko",
    },
  };
}

export default UserProfilePage;
