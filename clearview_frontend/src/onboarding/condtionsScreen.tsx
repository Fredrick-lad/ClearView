import { ArrowLeft, ArrowRight, Handshake } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onContinue: () => void;
  onBack: () => void;
}
function CondtionsScreen({ onContinue, onBack }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <style>
        {`
        @keyframes slideInFromRight {
       from {
       transform: translateX(20px);
       opacity: 0;
       }
      to {
      transform: translateX(0);
      opacity: 1;
      }
      }`}
      </style>
      <div
        className="card d-flex flex-column justify-content-between p-4 p-md-5 border-ui-border"
        style={{
          maxWidth: "450px",
          height: "600px",
          backgroundColor: "var(--bs-ui-bg)",
          borderRadius: "1.25rem",
          animationName: "slideInFromRight",
          animationDuration: "0.6s",
          animationTimingFunction: "ease-in",
          animationFillMode: "forwards",
        }}
      >
        <div className="d-flex gap-2 align-items-center">
          <div className="bg-brand p-3 border border-brand rounded">
            <Handshake className="text-white" />
          </div>
          <div>
            <h2 style={{ margin: 0 }} className="text-brand ">
              Terms and Conditons
            </h2>
            <p className="text-ui-text-dim" style={{ margin: 0 }}>
              Please read and accept the terms below before creting an account
            </p>
          </div>
        </div>

        <div className="d-flex flex-column">
          <div>
            <div className="">
              <p className="">1. About this system</p>
              <p>
                PocketEnvelope is a personal budgeting tool developed as a
                university project at Kabarak University. It is designed to help
                students manage their spending using the envelope budgeting
                method.
              </p>
              <p>
                By creating an account and using this system, you agree to these
                terms. If you do not agree, please do not proceed.
              </p>
            </div>

            <div className="">
              <p className="">2. No financial advice</p>
              <p>
                PocketEnvelope is a budgeting tool only. Nothing in this system
                should be taken as professional financial, investment, or
                accounting advice.
              </p>
              <p>
                The figures and reports generated are based solely on the data
                you enter. You are responsible for verifying your own financial
                information with your bank, M-Pesa records, or any other source.
              </p>
              <p>
                If you need professional financial guidance, please consult a
                qualified financial advisor.
              </p>
            </div>

            <div className="">
              <p className="">3. Your data and privacy</p>
              <p>
                All financial data you enter — including income, expenses, and
                envelope balances — is stored in your personal account and is
                not shared with any third parties.
              </p>
              <p>
                Your password is encrypted and never stored in plain text. You
                are responsible for keeping your login credentials confidential.
                Do not share your password with anyone.
              </p>
              <p>
                As this is an academic prototype, please avoid storing sensitive
                personal or financial data you would not want recorded in a
                university research system. All data collected may be used
                anonymously to evaluate the system.
              </p>
            </div>

            <div className="">
              <p className="">
                <i></i>4. Account responsibility
              </p>
              <p>
                You are responsible for all activity that takes place under your
                account. If you suspect unauthorised access, please change your
                password immediately.
              </p>
              <p>
                You must provide accurate information when registering. Accounts
                found to be misused or used to test system limits maliciously
                may be removed without notice.
              </p>
              <p>
                This system is intended for use by Kabarak University students.
                By registering, you confirm that you are a current or recently
                enrolled student.
              </p>
            </div>

            <div className="">
              <p className="">5. Acceptable use</p>
              <p>
                You agree to use PocketEnvelope only for legitimate personal
                budgeting purposes. You must not attempt to access other users'
                accounts, reverse-engineer the system, or use it in any way that
                could harm other users or the system itself.
              </p>
              <p>
                You must not enter offensive, false, or harmful content into any
                field in the system.
              </p>
            </div>

            <div className="">
              <p className="">6. Service availability</p>
              <p>
                As an academic prototype, PocketEnvelope may be updated, taken
                offline for maintenance, or discontinued at the end of the
                project period. We will make reasonable efforts to notify users
                of any significant changes.
              </p>
              <p>
                We do not guarantee uninterrupted access, particularly given the
                network conditions on campus. We are not liable for any loss
                resulting from downtime or data unavailability.
              </p>
            </div>

            <div className="">
              <p className="">7. Changes to these terms</p>
              <p>
                These terms may be updated from time to time as the system
                develops. Continued use of PocketEnvelope after an update means
                you accept the revised terms. The current version will always be
                accessible from the sign-up page.
              </p>
            </div>
          </div>
          <div
            className="form-check d-flex justify-content-start mt-2 gap-1"
            style={{ paddingLeft: 0 }}
          >
            <input
              type="checkbox"
              name="conditions"
              id="conditons"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="conditions" className="form-check-label">
              <Link
                to="termsandconditions "
                className="text-decoration-none text-brand-muted"
              >
                Terms and conditions
              </Link>
            </label>
          </div>
        </div>
        <div className="d-flex gap-2 w-100">
          <button
            type="button"
            className="border-brand-active border rounded p-2  text-primary d-flex gap-2 align-items-center"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            type="button"
            disabled={!isChecked}
            className={`border  border-brand-active text-white rounded bg-brand flex-grow-1  p-2 flex-grow-1 d-flex gap-2 align-items-center justify-content-center ${!isChecked ? "opacity-50 cursor-not-allowed" : "bg-brand text-white"}`}
            onClick={onContinue}
          >
            Accept
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="d-flex gap-1 align-items-center">
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "24px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-brand-active"
            style={{ width: "6px", height: "5px" }}
          ></span>
          <span
            className="rounded-pill bg-ui-border"
            style={{ width: "6px", height: "5px" }}
          ></span>
        </div>
      </div>
    </>
  );
}

export default CondtionsScreen;
