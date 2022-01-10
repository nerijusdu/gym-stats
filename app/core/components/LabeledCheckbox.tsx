import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef, PropsWithRef } from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormLabel, FormLabelProps } from "@chakra-ui/form-control"
import { Checkbox } from "@chakra-ui/react"

export interface LabeledCheckboxProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  name: string
  label?: string
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: PropsWithRef<FormLabelProps>
}

export const LabeledCheckbox = forwardRef<HTMLInputElement, LabeledCheckboxProps>(
  ({ label, outerProps, labelProps, name, children, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    return (
      <FormControl {...outerProps}>
        <FormLabel display="flex" {...labelProps}>
          <Checkbox mr={2} size="lg" disabled={isSubmitting} {...register(name)} {...props} />
          {label}
        </FormLabel>
        {error && (
          <div role="alert" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </FormControl>
    )
  }
)

export default LabeledCheckbox
