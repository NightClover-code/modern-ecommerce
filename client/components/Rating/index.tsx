import Star from './Star';

interface RatingProps {
  value: number;
  text: string;
}

const Rating: React.FC<RatingProps> = ({ value, text }) => {
  return (
    <div className="rating">
      <Star value={value} value1={1} value2={0.5} />
      <Star value={value} value1={2} value2={1.5} />
      <Star value={value} value1={3} value2={2.5} />
      <Star value={value} value1={4} value2={3.5} />
      <Star value={value} value1={5} value2={4.5} />

      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
