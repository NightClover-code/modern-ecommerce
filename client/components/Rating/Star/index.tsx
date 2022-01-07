interface StarProps {
  value: number;
  value1: number;
  value2: number;
}

const Star: React.FC<StarProps> = ({ value, value1, value2 }) => {
  return (
    <span>
      <i
        className={
          value >= value1
            ? 'fas fa-star'
            : value >= value2
            ? 'fas fa-star-half-alt'
            : 'far fa-star'
        }
      ></i>
    </span>
  );
};

export default Star;
