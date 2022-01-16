import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useFieldArray, useFormContext } from "react-hook-form"

const UserSelect: React.FC = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: "users" })
  const currentUser = useCurrentUser()

  return (
    <FormControl>
      <FormLabel>
        Users
        <Flex flexDir="column" maxW="300px" gap={2}>
          <Flex>
            <Input value={currentUser?.email} isDisabled />
            <Button variant="ghost" size="sm" isDisabled>
              Remove
            </Button>
          </Flex>
          {fields.map((field, index) => (
            <Flex key={field.id}>
              <Input {...register(`users[${index}].email`)} placeholder="Email" />
              <Button variant="ghost" size="sm" onClick={() => remove(index)}>
                Remove
              </Button>
              {errors[`users[${index}].email`] && (
                <div role="alert" style={{ color: "red" }}>
                  {errors[`users[${index}].email`]}
                </div>
              )}
            </Flex>
          ))}

          <Button my={4} variant="outline" size="sm" onClick={() => append({})}>
            Add
          </Button>
        </Flex>
      </FormLabel>
    </FormControl>
  )
}

export default UserSelect
