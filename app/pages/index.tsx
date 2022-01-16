import { BlitzPage, Image, Routes, Link as BlitzLink } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import Container from "app/core/components/Container";
import lifter from "public/lifter.jpg"
import lazy from "public/lazy.png"

const Home: BlitzPage = () => {

  return (
    <Flex w="100%" direction="column">
      <Container>
        <Heading>It&apos;s time to get your ass to the gym!</Heading>
      </Container>

      <Container>
        <Heading size="lg">How it works</Heading>
        <Text>1. Signup</Text>
        <Text>2. Join a group</Text>
        <Text>3. Compete with your friends</Text>
        <Text>4. Win stupid prizes</Text>
      </Container>

      <Container>
        <Heading size="lg">Be like this guy</Heading>
        <Image src={lifter} alt="a guy lifting weights" />
        <Heading mt={4} size="lg">Don&apos;t Be like this guy</Heading>
        <Image src={lazy} alt="a lazy guy" />
      </Container>

      <Container>
        <BlitzLink href="/signup">
          <Link><Heading size="lg">It&lsquo;s free! Sign up and go to the damn gym!</Heading></Link>
        </BlitzLink>
      </Container>
    </Flex>
  );
}

Home.suppressFirstRenderFlicker = true
Home.redirectAuthenticatedTo = Routes.Dashboard()
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
