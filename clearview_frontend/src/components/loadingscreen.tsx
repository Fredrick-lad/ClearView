function LoadingScreen() {
  const colors = {
    deepGreen: "#0A4433",
  };

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "rgba(212, 222, 218, 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)", // Ensure Safari support
          zIndex: 9999, // Kept higher than modal (1050) to overlay correctly if needed
        }}
      >
        <div
          className="spinner-border"
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderWidth: "0.4em",
            color: colors.deepGreen, // Uses your modal's deep green brand color
          }}
          role="status"
        >
          <span className="visually-hidden">Loading.....</span>
        </div>
      </div>
    </>
  );
}

export default LoadingScreen;