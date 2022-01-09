import { Button, Flex, Link } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { useMutation, Link as BlitzLink, Routes } from "blitz"
import { Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"

const NavBar: React.FC = () => {
  return (
    <Flex as="nav" gap={4} my={2} px={2} w="100%" alignItems="center" justifyContent="flex-end">
      <BlitzLink href={Routes.Home()}>
        <Link>Home</Link>
      </BlitzLink>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </Flex>
  )
}

const UserInfo: React.FC = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <BlitzLink href={Routes.GroupsPage()}>
          <Link>Groups</Link>
        </BlitzLink>
        <Link
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Link>
        <div>{currentUser.email}</div>
      </>
    )
  } else {
    return (
      <>
        <BlitzLink href={Routes.SignupPage()}>
          <Link>Sign Up</Link>
        </BlitzLink>
        <BlitzLink href={Routes.LoginPage()}>
          <Link>Login</Link>
        </BlitzLink>
      </>
    )
  }
}

export default NavBar
