import {
  AuthenticationError,
  Link as BlitzLink,
  useMutation,
  Routes,
  PromiseReturnType,
} from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import Container from "app/core/components/Container"
import { Heading, Link } from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Container maxW="container.sm">
      <Heading size="md">Login</Heading>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <BlitzLink href={Routes.ForgotPasswordPage()}>
            <Link>Forgot your password?</Link>
          </BlitzLink>
        </div>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or{" "}
        <BlitzLink href={Routes.SignupPage()}>
          <Link>Sign Up</Link>
        </BlitzLink>
      </div>
    </Container>
  )
}

export default LoginForm
