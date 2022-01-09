import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createGroup from "app/groups/mutations/createGroup"
import { GroupForm, FORM_ERROR } from "app/groups/components/GroupForm"
import { Flex, Heading } from "@chakra-ui/react"
import { CreateGroup } from "app/groups/validations"

const NewGroupPage: BlitzPage = () => {
  const router = useRouter()
  const [createGroupMutation] = useMutation(createGroup)

  return (
    <Flex flexDir="column" p={4} boxShadow="dark-lg" m={4} rounded={7}>
      <Heading size="md">Create New Group</Heading>

      <GroupForm
        submitText="Create Group"
        schema={CreateGroup}
        onSubmit={async (values) => {
          try {
            const group = await createGroupMutation(values)
            router.push(Routes.ShowGroupPage({ groupId: group.id }))
          } catch (error: any) {
            console.error(error)

            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Flex>
  )
}

NewGroupPage.authenticate = true
NewGroupPage.getLayout = (page) => <Layout title={"Create New Group"}>{page}</Layout>

export default NewGroupPage
