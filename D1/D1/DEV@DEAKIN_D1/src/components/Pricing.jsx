
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "./utilities/firebase";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

const API_URL = "http://localhost:3000";

function Pricing() {
  const { user, loading, getIdToken } = useAuth();

  const [plan, setPlan] = useState("Free");
  const [checkingPlan, setCheckingPlan] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      if (!user) {
        setPlan("Free");
        setCheckingPlan(false);
        return;
      }

      setCheckingPlan(true);

      try {
        const usersRef = collection(db, "users");
        const userQuery = query(
          usersRef,
          where("email", "==", user.email)
        );

        const snapshot = await getDocs(userQuery);

        if (snapshot.size > 1) {
          throw new Error("Duplicate user profiles found.");
        }

        if (active) {
          setPlan(
            snapshot.empty ? "Free" :
            snapshot.docs[0].data().plan || "Free"
          );
        }
      } catch (err) {
        console.error("Could not load subscription:", err);
        if (active) {
          setNotice("Could not load your subscription status.");
        }
      } finally {
        if (active) setCheckingPlan(false);
      }
    }

    if (!loading) loadPlan();

    return () => {
      active = false;
    };
  }, [user, loading]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const openUpgrade = () => {
    setNotice("");
    setError("");

    if (!user) {
      setNotice("Please log in before upgrading.");
      return;
    }

    if (plan === "Paid") {
      setNotice("Your account is already on the Paid plan.");
      return;
    }

    setShowModal(true);
  };

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setError("");

    const cardNumber = form.cardNumber.replace(/\s/g, "");

    if (!form.name.trim()) {
      setError("Enter the cardholder name.");
      return;
    }

    // Demonstration validation only, not real payment verification.
    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Enter a 16-digit test card number.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      setError("Enter the expiry as MM/YY.");
      return;
    }

    const [month, year] = form.expiry.split("/").map(Number);
    const now = new Date();

    if (
      2000 + year < now.getFullYear() ||
      (2000 + year === now.getFullYear() &&
        month < now.getMonth() + 1)
    ) {
      setError("The expiry date has passed.");
      return;
    }

    if (!/^\d{3,4}$/.test(form.cvv)) {
      setError("Enter a 3- or 4-digit test CVV.");
      return;
    }

    setSubmitting(true);

    try {
      const token = await getIdToken();

      const response = await fetch(
        `${API_URL}/api/subscription/upgrade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            plan: "Paid"
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upgrade failed.");
      }

      setPlan(data.user.plan);
      setShowModal(false);
      setNotice("Your plan has been upgraded to Paid.");
      setForm({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
      });
    } catch (err) {
      console.error("Upgrade failed:", err);
      setError(err.message || "Unable to upgrade your plan.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || checkingPlan) {
    return <p style={{ textAlign: "center" }}>Loading account...</p>;
  }

  return (
    <main style={{
      maxWidth: "1000px",
      margin: "40px auto",
      padding: "20px"
    }}>
      <h1 style={{ textAlign: "center" }}>Choose Your Plan</h1>

      <p style={{ textAlign: "center" }}>
        Choose the plan that suits your DEV@Deakin experience.
      </p>

      {user && (
        <p style={{ textAlign: "center" }}>
          Logged in as {user.email} · Current plan: <strong>{plan}</strong>
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
        marginTop: "30px"
      }}>
        <section style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "25px"
        }}>
          <h2>Free</h2>
          <h3>$0 / forever</h3>
          <ul>
            <li>Read public posts</li>
            <li>Publish up to 5 posts per month</li>
            <li>Upload images up to 5 MB</li>
            <li>Standard community access</li>
          </ul>
          <button type="button" disabled>
            {plan === "Free" ? "Your current plan" : "Free plan"}
          </button>
        </section>

        <section style={{
          border: "2px solid #5266db",
          borderRadius: "12px",
          padding: "25px"
        }}>
          <h2>Paid</h2>
          <h3>$9.99 / month</h3>
          <ul>
            <li>Read public and premium posts</li>
            <li>Unlimited posts</li>
            <li>Upload images up to 25 MB</li>
            <li>Priority support</li>
            <li>Advanced profile customisation</li>
          </ul>

          <button
            type="button"
            onClick={openUpgrade}
            disabled={!user || submitting || plan === "Paid"}
          >
            {plan === "Paid" ? "Already on Paid" : "Upgrade Plan"}
          </button>
        </section>
      </div>

      {!user && (
        <p style={{ textAlign: "center" }}>
          Please log in to upgrade your subscription.
        </p>
      )}

      {notice && (
        <p role="status" style={{ textAlign: "center" }}>
          {notice}
        </p>
      )}

      {showModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          display: "grid",
          placeItems: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-title"
            style={{
              background: "white",
              color: "#222",
              padding: "28px",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "430px",
              boxSizing: "border-box"
            }}
          >
            <h2 id="payment-title">Upgrade to Paid</h2>
            <p>Enter demonstration payment details.</p>

            <form
              onSubmit={handleUpgrade}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <label htmlFor="payment-name">Cardholder name</label>
              <input
                id="payment-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
                required
              />

              <label htmlFor="payment-card">Test card number</label>
              <input
                id="payment-card"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="16 digits"
                inputMode="numeric"
                autoComplete="off"
                required
              />

              <label htmlFor="payment-expiry">Expiry (MM/YY)</label>
              <input
                id="payment-expiry"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="12/30"
                autoComplete="off"
                required
              />

              <label htmlFor="payment-cvv">Test CVV</label>
              <input
                id="payment-cvv"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="off"
                required
              />

              {error && (
                <p role="alert" style={{ color: "red" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={submitting}>
                {submitting ? "Processing..." : "Confirm upgrade"}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={submitting}
              >
                Cancel
              </button>
            </form>

            <p style={{ fontSize: "12px", color: "#a00" }}>
              Demo only not real payment details.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default Pricing;
