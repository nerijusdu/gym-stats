import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGroup from "app/groups/queries/getGroup"
import deleteGroup from "app/groups/mutations/deleteGroup"
import { Button, Flex } from "@chakra-ui/react"

export const Group: React.FC = () => {
  const router = useRouter()
  const groupId = useParam("groupId", "string")
  const [deleteGroupMutation] = useMutation(deleteGroup)
  const [group] = useQuery(getGroup, { id: groupId })

  return (
    <>
      <Head>
        <title>{group.name}</title>
      </Head>

      <Flex flexDir="column" p={4}>
        <Flex>
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
        <h1>{group.name}</h1>
      </Flex>
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
