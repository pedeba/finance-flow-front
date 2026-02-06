import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { ChevronUpIcon } from "lucide-react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import styles from "./select.module.css";
import {useFormContext, Controller} from "react-hook-form";


type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
	children: React.ReactNode;
  name: string;
  id: string;
  placeholder?: string;
}
export const Select = React.forwardRef(
	({ children, name, defaultValue, placeholder, ...props }: SelectProps, forwardedRef: React.Ref<HTMLButtonElement>) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <SelectPrimitive.Root
            {...props}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectPrimitive.Trigger ref={forwardedRef} className={styles.Trigger}>
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon className={styles.Icon}>
                <ChevronDownIcon />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content className={styles.Content} position="popper" sideOffset={4}>
                <SelectPrimitive.ScrollUpButton className={styles.ScrollButton}>
                  <ChevronUpIcon />
                </SelectPrimitive.ScrollUpButton>
                <SelectPrimitive.Viewport className={styles.Viewport}>{children}</SelectPrimitive.Viewport>
                <SelectPrimitive.ScrollDownButton className={styles.ScrollButton}>
                  <ChevronDownIcon />
                </SelectPrimitive.ScrollDownButton>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
        )}
      />
    )
  }
);


type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
	children: React.ReactNode;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
	({ children, ...props }: SelectItemProps, forwardedRef: React.Ref<HTMLDivElement>) => {
		return (
			<SelectPrimitive.Item {...props} ref={forwardedRef} className={styles.Item}>
				<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
				<SelectPrimitive.ItemIndicator className={styles.ItemIndicator}>
					<CheckIcon />
				</SelectPrimitive.ItemIndicator>
			</SelectPrimitive.Item>
		);
	},
);
