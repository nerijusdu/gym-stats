import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGroups from "app/groups/queries/getGroups"

const ITEMS_PER_PAGE = 100

export const GroupsList = () => {
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
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <Link href={Routes.ShowGroupPage({ groupId: group.id })}>
              <a>{group.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const GroupsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Groups</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewGroupPage()}>
            <a>Create Group</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <GroupsList />
        </Suspense>
      </div>
    </>
  )
}

GroupsPage.authenticate = true
GroupsPage.getLayout = (page) => <Layout>{page}</Layout>

export default GroupsPage
