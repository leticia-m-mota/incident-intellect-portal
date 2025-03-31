
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';

interface FilterSectionProps {
  form: UseFormReturn<NotificationSettings>;
  title: string;
  description: string;
  name: keyof NotificationSettings;
  options: Array<{ id: string; name: string }>;
}

export function FilterSection({ form, title, description, name, options }: FilterSectionProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{title}</FormLabel>
            <FormDescription>
              {description}
            </FormDescription>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {options.map((option) => (
              <FormField
                key={option.id}
                control={form.control}
                name={name}
                render={({ field }) => {
                  // Ensure field.value is an array
                  const value = Array.isArray(field.value) ? field.value : [];
                  return (
                    <FormItem
                      key={option.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={value.includes(option.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...value, option.id])
                              : field.onChange(
                                  value.filter(
                                    (val) => val !== option.id
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.name}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}
