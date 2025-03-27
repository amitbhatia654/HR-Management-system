export default function Modal({
  setShowModal,
  title,
  children,
  otherFunc,
  size = "modal-lg",
}) {
  return (
    <>
      <div className="modal show d-block " tabIndex="-1" role="dialog">
        <div
          className={`modal-dialog ${size} modal-dialog-centered`}
          role="document"
        >
          {/* modal-dialog-centered" */}
          <div className="modal-content mymodal">
            <div className="modal-header">
              <h5 className="modal-tit text-center">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  setShowModal(false);
                }}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
