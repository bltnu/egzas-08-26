const SectionDescription = (props) => {
  return (
    <div
      className="alert alert-light bg-white w-100 border border-dark border-opacity-50 m-3"
      role="alert"
    >
      <h2 className="text-center text-dark">{props.headline}</h2>
      <p className="text-center text-dark">{props.text}</p>
      {props.children}
    </div>
  );
};

export default SectionDescription;
