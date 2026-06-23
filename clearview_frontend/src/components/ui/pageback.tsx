interface PageBackButtonProps {
  onBack?: () => void;
  label?: string;
}

export default function PageBackButton({
  onBack,
  label = "Back",
}: PageBackButtonProps) {
  return (
    <div className="w-100 py-4 px-2 px-md-4 d-flex align-items-center bg-transparent">
      <button
        type="button"
        onClick={onBack}
        className="btn p-0 border-0 bg-transparent d-inline-flex align-items-center shadow-none text-decoration-none"
        style={{
          color: "#3A4B5C", // Elegant dark slate tone matching the snippet
          fontFamily: "Georgia, serif", // Core ClearView serif font asset
          fontSize: "15px",
          gap: "8px",
          cursor: "pointer",
          transition: "opacity 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {/* Minimal text caret styling matching image_935ae4.png */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            transform: "scaleY(1.2)",
            display: "inline-block",
          }}
        >
          &lt;
        </span>

        <span>{label}</span>
      </button>
    </div>
  );
}
