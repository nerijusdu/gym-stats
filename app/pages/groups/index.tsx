import { Suspense } from "react"
import { Head, Link as BlitzLink, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGroups from "app/groups/queries/getGroups"
import { Box, Button, Flex } from "@chakra-ui/react"

const ITEMS_PER_PAGE = 100

export const GroupsList: React.FC = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ groups, hasMore }] = usePaginatedQuery(getGroups, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Flex my={4} gap={4} flexWrap="wrap">
        {groups.map((group) => (
          <BlitzLink key={group.id} href={Routes.ShowGroupPage({ groupId: group.id })}>
            <Flex
              boxShadow="dark-lg"
              cursor="pointer"
              _hover={{ bg: "purple.200" }}
              rounded={7}
              p={4}
            >
              {group.name}
            </Flex>
          </BlitzLink>
        ))}
      </Flex>

      {(page !== 0 || hasMore) && (
        <>
          <Button variant="ghost" size="sm" disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </Button>
          <Button variant="ghost" size="sm" disabled={!hasMore} onClick={goToNextPage}>
            Next
          </Button>
        </>
      )}
    </div>
  )
}

const GroupsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Groups</title>
      </Head>

      <Flex flexDir="column" p={4}>
        <Box>
          <BlitzLink href={Routes.NewGroupPage()}>
            <Button>Create Group</Button>
          </BlitzLink>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <GroupsList />
        </Suspense>
      </Flex>
    </>
  )
}

GroupsPage.authenticate = true
GroupsPage.getLayout = (page) => <Layout>{page}</Layout>

export default GroupsPage
