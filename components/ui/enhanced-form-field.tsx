import { ReactNode, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BaseFieldProps {
  label: string
  required?: boolean
  error?: string
  description?: string
  className?: string
  children?: ReactNode
}

interface InputFieldProps extends BaseFieldProps {
  type: "input"
  inputType?: "text" | "email" | "tel" | "number" | "date" | "password"
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  name?: string
  id?: string
}

interface TextareaFieldProps extends BaseFieldProps {
  type: "textarea"
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  rows?: number
  name?: string
  id?: string
}

interface SelectFieldProps extends BaseFieldProps {
  type: "select"
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
  name?: string
  id?: string
}

interface CustomFieldProps extends BaseFieldProps {
  type: "custom"
}

type EnhancedFormFieldProps = 
  | InputFieldProps 
  | TextareaFieldProps 
  | SelectFieldProps 
  | CustomFieldProps

export const EnhancedFormField = forwardRef<HTMLElement, EnhancedFormFieldProps>(
  ({ label, required, error, description, className = "", ...props }, ref) => {
    const fieldId = props.type !== 'custom' ? props.id || props.name : undefined

    return (
      <div className={`space-y-2 ${className}`}>
        <Label 
          htmlFor={fieldId}
          className="text-academy-blue font-semibold text-base flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
        
        <div className="relative">
          {props.type === "input" && (
            <Input
              ref={ref as React.Ref<HTMLInputElement>}
              type={props.inputType || "text"}
              placeholder={props.placeholder}
              value={props.value}
              onChange={(e) => props.onChange?.(e.target.value)}
              name={props.name}
              id={props.id}
              required={required}
              className={`h-12 border-2 transition-all duration-200 ${
                error 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-academy-gold hover:border-gray-300'
              } focus:ring-2 focus:ring-academy-gold/20 rounded-lg`}
            />
          )}
          
          {props.type === "textarea" && (
            <Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              placeholder={props.placeholder}
              value={props.value}
              onChange={(e) => props.onChange?.(e.target.value)}
              rows={props.rows || 4}
              name={props.name}
              id={props.id}
              required={required}
              className={`border-2 transition-all duration-200 resize-none ${
                error 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-academy-gold hover:border-gray-300'
              } focus:ring-2 focus:ring-academy-gold/20 rounded-lg`}
            />
          )}
          
          {props.type === "select" && (
            <Select
              value={props.value}
              onValueChange={props.onChange}
              name={props.name}
              required={required}
            >
              <SelectTrigger 
                ref={ref as React.Ref<HTMLButtonElement>}
                id={props.id}
                className={`h-12 border-2 transition-all duration-200 ${
                  error 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-academy-gold hover:border-gray-300'
                } focus:ring-2 focus:ring-academy-gold/20 rounded-lg`}
              >
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {props.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {props.type === "custom" && props.children}
        </div>
        
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
            {error}
          </p>
        )}
      </div>
    )
  }
)

EnhancedFormField.displayName = "EnhancedFormField"