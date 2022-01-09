import { Flex } from "@chakra-ui/react"
import { Head, BlitzLayout } from "blitz"
import NavBar from "../components/NavBar"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "gym-stats"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDir="column" maxW="container.xl" alignItems="center" mx="auto">
        <NavBar />
        {children}
      </Flex>
    </>
  )
}

export default Layout
