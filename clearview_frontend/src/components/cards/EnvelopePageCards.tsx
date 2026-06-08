// THree divs a header a small body of deails and a small footer

function EnvelopePageCards() {
  return (
    <div className="w-75 p-3 d-flex bg-brand-light rounded flex-column ">
      <div className="d-flex justify-content-between">
        <span>Icon</span>
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      <div>
        <span>Envelope name</span>
        <span>Spent amount</span>
        <div>Progress bar</div>
      </div>
      <div className="d-flex justify-content-between">
        <span>Message</span>
        <span>Percentage</span>
      </div>
    </div>
  );
}

export default EnvelopePageCards;
