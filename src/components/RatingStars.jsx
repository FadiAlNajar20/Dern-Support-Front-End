

export default function RatingStars({ rating }) {
    const totalStars =  5;
    const rate = Math.min(Math.round(rating / 2), totalStars);
    const filledStars = Math.floor(rate);
    const emptyStars = totalStars - filledStars;
    
    return (
      <div className="flex gap-x-1">
        {Array(filledStars)
          .fill()
          .map((_, i) => (
            <svg
              key={`filled-${i}`}
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Filled Star Icon"
            >
              <path
                d="M12 2L14.09 8.26L20.18 9.27L15.54 13.97L16.82 20.02L12 16.8L7.18 20.02L8.46 13.97L3.82 9.27L9.91 8.26L12 2Z"
                fill="#eab308"
              />
            </svg>
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <svg
              key={`empty-${i}`}
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Empty Star Icon"
            >
              <path
                d="M12 2L14.09 8.26L20.18 9.27L15.54 13.97L16.82 20.02L12 16.8L7.18 20.02L8.46 13.97L3.82 9.27L9.91 8.26L12 2Z"
                stroke="#eab308"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          ))}
      </div>
    );
  }
