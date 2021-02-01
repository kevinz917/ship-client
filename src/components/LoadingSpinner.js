import SpinnerImg from "../assets/loading.svg";
// import "../global_styles/animation.css";

const Spinner = () => {
  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      <img
        src={SpinnerImg}
        className="rotate-fast spinner mt-4"
        alt="loading spinner"
        style={{ opacity: 0.15 }}
      />
    </div>
  );
};

export { Spinner };
