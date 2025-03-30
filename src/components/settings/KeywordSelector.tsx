
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { NotificationSettings } from '@/types/settings';

interface KeywordSelectorProps {
  form: UseFormReturn<NotificationSettings>;
  keyword: string;
  setKeyword: (value: string) => void;
  addKeyword: () => void;
}

export function KeywordSelector({ form, keyword, setKeyword, addKeyword }: KeywordSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="keywords"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Keywords</FormLabel>
          <FormDescription>
            Be notified when these keywords appear in incident descriptions or labels
          </FormDescription>
          <div className="mt-2 flex gap-2">
            <Input 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={addKeyword} 
              variant="secondary"
            >
              <Search className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {field.value.map(kw => (
              <Badge key={kw} variant="secondary" className="flex items-center gap-1">
                {kw}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-4 w-4 p-0 ml-1" 
                  onClick={() => {
                    field.onChange(field.value.filter(k => k !== kw));
                  }}
                >
                  <span>×</span>
                </Button>
              </Badge>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
}
