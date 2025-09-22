const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="shimmer-card">cards</div>
      ))}
    </div>
  );
};

export default Shimmer;
