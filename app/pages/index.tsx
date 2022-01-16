import { BlitzPage, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Flex, Heading, Text } from "@chakra-ui/react";
import Container from "app/core/components/Container";
import Podium from "app/core/components/Podium";
import dayjs from "dayjs";
import LogProgressModal from "app/groups/components/LogProgressModal";
import getGroupsWithProgress from "app/groups/queries/getGroupsWithProgress";


const Home: BlitzPage = () => {
  const [groups] = useQuery(getGroupsWithProgress, {});

  return (
    <Flex w="100%" direction="column">
      {groups.map((group) => (
        <Container align="center" key={group.id}>
          <Heading size="md">{group.name}</Heading>
          <Podium names={group.users.map(x => x.email)} />
          <Text mt={4} fontWeight="bold">
            Time left: {Math.ceil(dayjs(group.iterationEndDate).diff(dayjs(), 'days', true))} day(s)
          </Text>
          <LogProgressModal groupId={group.id}/>
        </Container>
      ))}
    </Flex>
  );
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
