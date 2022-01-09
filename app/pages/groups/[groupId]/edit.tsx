import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getGroup from "app/groups/queries/getGroup"
import updateGroup from "app/groups/mutations/updateGroup"
import { GroupForm, FORM_ERROR } from "app/groups/components/GroupForm"
import { UpdateGroup } from "app/groups/validations"
import { Heading } from "@chakra-ui/react"
import Container from "app/core/components/Container"

export const EditGroup = () => {
  const router = useRouter()
  const groupId = useParam("groupId", "string")
  const [group, { setQueryData }] = useQuery(
    getGroup,
    { id: groupId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateGroupMutation] = useMutation(updateGroup)

  return (
    <>
      <Head>
        <title>Edit {group.name}</title>
      </Head>

      <Container>
        <Heading size="md">Edit {group.name}</Heading>

        <GroupForm
          submitText="Update Group"
          schema={UpdateGroup}
          initialValues={group}
          onSubmit={async (values) => {
            try {
              const updated = await updateGroupMutation({
                ...values,
                id: group.id,
              })
              await setQueryData(updated)
              router.push(Routes.ShowGroupPage({ groupId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Container>
    </>
  )
}

const EditGroupPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditGroup />
    </Suspense>
  )
}

EditGroupPage.authenticate = true
EditGroupPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditGroupPage
