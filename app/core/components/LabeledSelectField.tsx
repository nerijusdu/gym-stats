import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef, PropsWithRef } from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormLabel, FormLabelProps } from "@chakra-ui/form-control"
import { Select } from "@chakra-ui/react"

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  name: string
  label?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: PropsWithRef<FormLabelProps>
}

export const LabeledSelectField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
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
        <FormLabel {...labelProps}>
          {label}
          <Select disabled={isSubmitting} {...register(name)} {...props}>
            {children}
          </Select>
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

export default LabeledSelectField
