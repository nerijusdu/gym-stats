import { BlitzPage, usePaginatedQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Flex, Heading, Text } from "@chakra-ui/react";
import getGroups from "app/groups/queries/getGroups";
import Container from "app/core/components/Container";
import Podium from "app/core/components/Podium";
import dayjs from "dayjs";


const Home: BlitzPage = () => {
  const [{groups}] = usePaginatedQuery(getGroups, { orderBy: { id: "asc" }, take: 3 });

  return (
    <Flex w="100%">
      {groups.map((group) => (
        <Container align="center" key={group.id}>
          <Heading size="md">{group.name}</Heading>
          <Podium names={['yeet', 'yeet2', 'yeet3']} />
          <Text mt={4} fontWeight="bold">
            Time left: {Math.ceil(dayjs(group.iterationEndDate).diff(dayjs(), 'days', true))} day(s)
          </Text>
        </Container>
      ))}
    </Flex>
  );
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
