import { Form, FormProps } from "app/core/components/Form"
import LabeledCheckbox from "app/core/components/LabeledCheckbox"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import UserSelect from "./UserSelect"
export { FORM_ERROR } from "app/core/components/Form"

export function GroupForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <UserSelect />
      <LabeledTextField type="number" name="period" label="Iteration Period" placeholder="Period" />
      <LabeledSelectField name="periodType">
        <option value="WEEK">Week(s)</option>
        <option value="MONTH">Month(s)</option>
        <option value="YEAR">Year(s)</option>
      </LabeledSelectField>
      <LabeledCheckbox name="endOfPeriod" label="Iteration ends at the end of the period?" />
    </Form>
  )
}
