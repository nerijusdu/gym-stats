import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createGroup from "app/groups/mutations/createGroup"
import { GroupForm, FORM_ERROR } from "app/groups/components/GroupForm"

const NewGroupPage: BlitzPage = () => {
  const router = useRouter()
  const [createGroupMutation] = useMutation(createGroup)

  return (
    <div>
      <h1>Create New Group</h1>

      <GroupForm
        submitText="Create Group"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateGroup}
        // initialValues={{}}
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

      <p>
        <Link href={Routes.GroupsPage()}>
          <a>Groups</a>
        </Link>
      </p>
    </div>
  )
}

NewGroupPage.authenticate = true
NewGroupPage.getLayout = (page) => <Layout title={"Create New Group"}>{page}</Layout>

export default NewGroupPage
