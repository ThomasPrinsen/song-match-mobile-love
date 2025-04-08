
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface FeedbackTag {
  id: string;
  label: string;
}

interface FeedbackFormProps {
  onClose: () => void;
  songId: string;
  songTitle: string;
  artistName: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onClose,
  songId,
  songTitle,
  artistName
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customFeedback, setCustomFeedback] = useState("");

  const feedbackTags: FeedbackTag[] = [
    { id: "great-voice", label: "Great voice" },
    { id: "nice-synths", label: "Nice synths" },
    { id: "very-original", label: "Very original!" },
    { id: "catchy-melody", label: "Catchy melody" },
    { id: "great-lyrics", label: "Great lyrics" },
    { id: "amazing-production", label: "Amazing production" },
    { id: "unique-sound", label: "Unique sound" },
    { id: "emotional", label: "Emotional" },
  ];

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = () => {
    // Here we would typically send this data to a backend
    const feedback = {
      songId,
      tags: selectedTags,
      customFeedback,
      timestamp: new Date().toISOString()
    };
    
    console.log("Submitting feedback:", feedback);
    
    toast({
      title: "Feedback submitted!",
      description: `Your feedback for "${songTitle}" has been sent to ${artistName}.`,
    });
    
    onClose();
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Send feedback to the artist</h3>
      <p className="text-sm text-gray-500">
        Select feedback tags that describe what you liked about "{songTitle}"
      </p>
      
      <div className="flex flex-wrap gap-2 my-3">
        {feedbackTags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedTags.includes(tag.id)
                ? "bg-music-primary hover:bg-music-primary/80"
                : "hover:bg-music-accent/10"
            }`}
            onClick={() => toggleTag(tag.id)}
          >
            {tag.label}
          </Badge>
        ))}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="custom-feedback" className="text-sm font-medium">
          Add a personal note
        </label>
        <Textarea
          id="custom-feedback"
          placeholder="What did you like about this song? (Optional)"
          value={customFeedback}
          onChange={(e) => setCustomFeedback(e.target.value)}
          className="resize-none"
          rows={4}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={selectedTags.length === 0 && !customFeedback.trim()}
          className="bg-music-primary"
        >
          <Send className="mr-2 h-4 w-4" />
          Send Feedback
        </Button>
      </div>
    </div>
  );
};

export default FeedbackForm;
