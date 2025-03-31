
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';

interface TeamOrServiceSelectorProps {
  form: UseFormReturn<NotificationSettings>;
  name: keyof NotificationSettings;
  label: string;
  description: string;
  options: Array<{ id: string; name: string }>;
  placeholder: string;
}

export function TeamOrServiceSelector({ 
  form, 
  name, 
  label, 
  description, 
  options, 
  placeholder 
}: TeamOrServiceSelectorProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // Ensure field.value is an array
        const value = Array.isArray(field.value) ? field.value : [];
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormDescription>
              {description}
            </FormDescription>
            <div className="mt-2">
              <Select
                onValueChange={(newValue) => {
                  if (newValue && !value.includes(newValue)) {
                    field.onChange([...value, newValue]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options
                    .filter(option => !value.includes(option.id))
                    .map(option => (
                      <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-3">
                {value.map(optionId => {
                  const option = options.find(o => o.id === optionId);
                  return (
                    <Badge key={optionId} variant="secondary" className="flex items-center gap-1">
                      {option?.name}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 p-0 ml-1" 
                        onClick={() => {
                          field.onChange(value.filter(id => id !== optionId));
                        }}
                      >
                        <span>×</span>
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
}
