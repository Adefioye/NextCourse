function UserIdPage(props) {
  return <h1>User Id: {props.userId}</h1>;
}

export async function getServerSideProps({ params }) {
  const { userId } = params;

  return {
    props: {
      userId,
    },
  };
}

export default UserIdPage;
