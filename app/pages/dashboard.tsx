import { BlitzPage, Routes, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Flex, Heading, Text } from "@chakra-ui/react";
import Container from "app/core/components/Container";
import Podium from "app/core/components/Podium";
import dayjs from "dayjs";
import LogProgressModal from "app/groups/components/LogProgressModal";
import getGroupsWithProgress, { GroupWithUsers } from "app/groups/queries/getGroupsWithProgress";


const Dashboard: BlitzPage = () => {
  const [groups, { refetch }] = useQuery(getGroupsWithProgress, {});

  return (
    <Flex w="100%" direction="column">
      {groups.map((group) => (
        <GroupCard group={group} refetch={refetch} key={group.id} />
      ))}
    </Flex>
  );
}

export type GroupCardProps = {
  group: GroupWithUsers;
  refetch?: () => void;
}

const GroupCard : React.FC<GroupCardProps> = ({group, refetch}) => {
  const daysLeft = Math.ceil(dayjs(group.iterationEndDate).diff(dayjs(), 'days', true));
  const isDone = daysLeft < 0;

  return (
    <Container align="center">
      <Heading size="md">{group.name}</Heading>
      <Podium names={group.users.map(x => x.name)} />
      <Text mt={4} fontWeight="bold">
        Time left:&nbsp;
        {!isDone && (<>{daysLeft} day(s)</>)}
        {isDone && (<>Iteration completed</>)}
      </Text>
      {!isDone && <LogProgressModal groupId={group.id} onLogged={refetch}/>}
    </Container>
  );
};


Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = {redirectTo: '/'}
Dashboard.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Dashboard
