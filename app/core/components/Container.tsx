import { Flex, FlexProps } from "@chakra-ui/react"

export type ContainerProps = FlexProps

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <Flex flexDir="column" p={4} boxShadow="dark-lg" m={4} rounded={7} bg="gray.700" width="stretch" {...props}>
      {children}
    </Flex>
  )
}

export default Container
