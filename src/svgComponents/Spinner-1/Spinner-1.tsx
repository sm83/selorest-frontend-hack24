import './Spinner-1.css';

const Spinner1 = ({
  color = '#000',
  size = 24,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <svg
      width={String(size)}
      height={String(size)}
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="spinner_V8m1">
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="3"
          style={{ stroke: color }}
        ></circle>
      </g>
    </svg>
  );
};

export default Spinner1;
