import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGroup from "app/groups/queries/getGroup"
import deleteGroup from "app/groups/mutations/deleteGroup"
import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import Container from "app/core/components/Container"
import dayjs from "dayjs"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const periodNames = {
  WEEK: "Week(s)",
  MONTH: "Month(s)",
  YEAR: "Year(s)",
}

export const Group: React.FC = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const groupId = useParam("groupId", "string")
  const [deleteGroupMutation] = useMutation(deleteGroup)
  const [group] = useQuery(getGroup, { id: groupId })

  return (
    <>
      <Head>
        <title>{group.name}</title>
      </Head>

      <Container>
        <Heading size="md">{group.name}</Heading>

        <Divider my={2} />

        <Flex direction="column">
          <Text>Users in this group:</Text>
          <Text>{group.owner.name}</Text>
          {group.users.map((user) => (
            <Text key={user.id}>{user.name}</Text>
          ))}

          <Divider my={2} />
          <Text>Iterations:</Text>
          <Text>
            Resets every {group.period} {periodNames[group.periodType]}
          </Text>
          <Text>
            Current iteration started at{" "}
            <b>{dayjs(group.iterationStartDate).format("YYYY-MM-DD")}</b>&nbsp; and ends at{" "}
            <b>{dayjs(group.iterationEndDate).format("YYYY-MM-DD")}</b>.
          </Text>
        </Flex>

        {currentUser?.id === group.ownerId && (
          <Flex alignSelf="flex-end">
            <Link href={Routes.EditGroupPage({ groupId: group.id })}>
              <Button variant="ghost">Edit</Button>
            </Link>

            <Button
              type="button"
              colorScheme="red"
              variant="ghost"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteGroupMutation({ id: group.id })
                  router.push(Routes.GroupsPage())
                }
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Delete
            </Button>
          </Flex>
        )}
      </Container>
    </>
  )
}

const ShowGroupPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Group />
    </Suspense>
  )
}

ShowGroupPage.authenticate = true
ShowGroupPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowGroupPage
