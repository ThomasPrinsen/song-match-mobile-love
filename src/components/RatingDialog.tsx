
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import FeedbackForm from "./FeedbackForm";
import { Song } from "@/data/songs";

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRate: (rating: number) => void;
  currentSong: Song | null;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
  isOpen,
  onClose,
  onRate,
  currentSong
}) => {
  const [rating, setRating] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  
  const handleSubmitRating = () => {
    onRate(rating);
    setShowFeedback(true);
  };
  
  const handleClose = () => {
    setRating(0);
    setShowFeedback(false);
    onClose();
  };
  
  if (!currentSong) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!showFeedback ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">
                Rate "{currentSong.title}"
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center space-y-6 p-4">
              <p className="text-sm text-gray-500 text-center">
                How would you rate this song by {currentSong.artist}?
              </p>
              
              <StarRating 
                rating={rating} 
                onRatingChange={handleRatingChange}
                size="lg"
                className="justify-center"
              />
              
              <div className="text-center">
                {rating > 0 && (
                  <p className="text-lg font-semibold text-music-primary mb-4">
                    {rating === 0.5 && "Not my style"}
                    {rating === 1 && "Poor"}
                    {rating === 1.5 && "Below average"}
                    {rating === 2 && "Average"}
                    {rating === 2.5 && "Above average"}
                    {rating === 3 && "Good"}
                    {rating === 3.5 && "Very good"}
                    {rating === 4 && "Great"}
                    {rating === 4.5 && "Excellent"}
                    {rating === 5 && "Masterpiece!"}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-3 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-music-primary" 
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        ) : (
          <FeedbackForm 
            onClose={handleClose}
            songId={currentSong.id}
            songTitle={currentSong.title}
            artistName={currentSong.artist}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
