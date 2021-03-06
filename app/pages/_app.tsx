import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import dayjs from "dayjs"
import enLocale from "dayjs/locale/en"

var localeObject = {
  ...enLocale,
  weekStart: 1,
}
dayjs.locale("en", localeObject)

const defaultColorScheme = {
  defaultProps: {
    colorScheme: "purple",
  },
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  components: {
    Button: { ...defaultColorScheme },
    Checkbox: { ...defaultColorScheme },
    Heading: {
      baseStyle: {
        pb: 4,
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
