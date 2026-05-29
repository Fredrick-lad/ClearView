function LoadingScreen() {
  return (
    <>
      {/* <div className="d-flex justify-content-center align-items-center vh-100"> */}
      <div className="position-absolute top-0 bg-dark opacity-10 vh-100 vw-100 d-flex justify-content-center  align-items-center vh-100">
        <div
          className="spinner-border text-white"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading</span>
        </div>
      </div>
    </>
  );
}
export default LoadingScreen;
