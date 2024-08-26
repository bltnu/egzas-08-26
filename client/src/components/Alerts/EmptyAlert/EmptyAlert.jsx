const EmptyAlert = (props) => {
  return (
    <div
      className="alert alert-light bg-white w-100 border border-dark border-opacity-50"
      role="alert"
    >
      <p className="text-center text-dark">{props.text}</p>
    </div>
  );
};

export default EmptyAlert;
