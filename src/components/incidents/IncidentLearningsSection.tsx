
import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IncidentLearning } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface IncidentLearningsSectionProps {
  learnings?: IncidentLearning[];
  onAddLearning: (learning: Omit<IncidentLearning, 'id' | 'createdAt'>) => void;
}

export function IncidentLearningsSection({ learnings = [], onAddLearning }: IncidentLearningsSectionProps) {
  const [isAddingLearning, setIsAddingLearning] = useState(false);
  const [newLearningContent, setNewLearningContent] = useState('');
  const [newLearningCategory, setNewLearningCategory] = useState<'went_well' | 'to_improve' | 'action_item'>('went_well');

  const handleAddLearning = () => {
    if (!newLearningContent.trim()) {
      toast({
        title: 'Learning content is required',
        variant: 'destructive',
      });
      return;
    }

    onAddLearning({
      category: newLearningCategory,
      content: newLearningContent,
      createdBy: 'Current User', // In a real app, this would be the current user's name
    });

    // Reset form
    setNewLearningContent('');
    setIsAddingLearning(false);
    
    toast({
      title: 'Learning added successfully',
      description: 'Your insight has been added to the incident learnings.',
    });
  };

  const cancelAddLearning = () => {
    setIsAddingLearning(false);
    setNewLearningContent('');
  };

  // Filter learnings by category
  const wentWellLearnings = learnings.filter(l => l.category === 'went_well');
  const toImproveLearnings = learnings.filter(l => l.category === 'to_improve');
  const actionItemLearnings = learnings.filter(l => l.category === 'action_item');

  return (
    <div className="space-y-6">
      {!isAddingLearning ? (
        <Button 
          onClick={() => setIsAddingLearning(true)} 
          className="w-full" 
          variant="outline"
        >
          <Plus size={16} className="mr-2" />
          Add Learning
        </Button>
      ) : (
        <Card className="bg-muted/20">
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Select 
                  value={newLearningCategory} 
                  onValueChange={(value: 'went_well' | 'to_improve' | 'action_item') => setNewLearningCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="went_well">What went well</SelectItem>
                    <SelectItem value="to_improve">What could be improved</SelectItem>
                    <SelectItem value="action_item">Action item</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Learning
                </label>
                <Textarea 
                  placeholder="Share your insight, observation, or action item..."
                  value={newLearningContent}
                  onChange={(e) => setNewLearningContent(e.target.value)}
                  rows={3}
                  className="mb-2"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={cancelAddLearning}>
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleAddLearning}>
                  <Check size={16} className="mr-2" />
                  Add Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Display existing learnings by category */}
      <div className="space-y-6">
        {wentWellLearnings.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">What went well</h3>
            <div className="space-y-2">
              {wentWellLearnings.map(learning => (
                <div key={learning.id} className="bg-muted/20 p-3 rounded-md">
                  <p className="text-sm">{learning.content}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{learning.createdBy}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(learning.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {toImproveLearnings.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">What could be improved</h3>
            <div className="space-y-2">
              {toImproveLearnings.map(learning => (
                <div key={learning.id} className="bg-muted/20 p-3 rounded-md">
                  <p className="text-sm">{learning.content}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{learning.createdBy}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(learning.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {actionItemLearnings.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Action items</h3>
            <div className="space-y-2">
              {actionItemLearnings.map(learning => (
                <div key={learning.id} className="bg-muted/20 p-3 rounded-md">
                  <p className="text-sm">{learning.content}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{learning.createdBy}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(learning.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show message if no learnings exist yet */}
        {learnings.length === 0 && !isAddingLearning && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No incident learnings have been added yet.</p>
            <p className="text-sm">Be the first to share your insights!</p>
          </div>
        )}
      </div>
    </div>
  );
}
