import {
    FormField,
    FormItem, 
    FormControl, 
    FormMessage,
    FormLabel
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { Textarea } from "../ui/textarea";

export enum FormFieldType {
    INPUT = "input",
    SELECT = "select",
    TEXTAREA = "textarea"
 }
 
interface CustomFormFieldProps {
    fieldType: FormFieldType;
    name: string;
    label: string;
    control: Control<any>;
    placeholder?: string;
    options?: { value: string; label: string }[];
    disabled?: boolean;
}

const RenderField = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <FormControl>
                    <Input {...field} placeholder={props.placeholder} className="input"/>
                </FormControl>
            );
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={props.disabled}>
                        <SelectTrigger className="input capitalize">
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {props.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea {...field} placeholder={props.placeholder} className="input"/>
                </FormControl>
            );
        default:
            return null;
    }
}
const CustomFormField = (props: CustomFormFieldProps) => {
    const {control, name, label} = props;
    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel className="capitalize">{label}</FormLabel> }
            <RenderField field={field} props={props} />
            <FormMessage className="text-red-500" />
          </FormItem>
          )}
        />
    )
};

export default CustomFormField;

