import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef, PropsWithRef } from "react"
import { useFormContext } from "react-hook-form"

import { Input } from "@chakra-ui/input"
import { FormControl, FormLabel, FormLabelProps } from "@chakra-ui/form-control"

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: PropsWithRef<FormLabelProps>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
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
          <Input
            disabled={isSubmitting}
            {...register(name, { valueAsNumber: props.type === "number" })}
            {...props}
          />
          {children}
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

export default LabeledTextField
