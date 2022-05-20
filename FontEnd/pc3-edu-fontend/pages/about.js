import Head from "next/head";
const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div>
        <h1>About me: My name is Trong</h1>
      </div>
    </>
  );
};
About.layout = "adminLayout";
export default About;
