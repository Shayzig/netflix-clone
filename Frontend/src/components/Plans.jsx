// Plans.jsx

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { setIsUserSub } from "../store/actions/user.actions";

export default function Plans() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const user = useSelector((state) => state.userModule.loggedinUser);

  function loadPlans() {
    const q = query(collection(db, "products"), where("active", "==", true));

    getDocs(q).then((querySnapshot) => {
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        const productData = productDoc.data();
        products[productDoc.id] = productData;

        const priceCollectionRef = collection(productDoc.ref, "prices");
        const priceSnap = await getDocs(priceCollectionRef);

        priceSnap.forEach((doc) => {
          products[productDoc.id].price = {
            priceId: doc.id,
            priceData: doc.data(),
          };
        });
      });

      setProducts(products);
    });
  }

  function loadSubscription() {
    const subscriptionCollection = collection(
      db,
      "customers",
      user.uid,
      "subscriptions"
    );

    getDocs(subscriptionCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((subscriptionDoc) => {
          setSubscription({
            role: subscriptionDoc.data().role,
            current_period_end:
              subscriptionDoc.data().current_period_end.seconds,
            current_period_start:
              subscriptionDoc.data().current_period_start.seconds,
          });
        });
      })
      .catch((error) => {
        console.error("Error loading subscription:", error);
      });
  }

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    loadSubscription();
  }, [user.uid]);

  const loadCheckout = async (priceId) => {
    const userDocRef = collection(
      db,
      "customers",
      user.uid,
      "checkout_sessions"
    );

    const docRef = await addDoc(userDocRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occurred: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51OE8ywJA9hGDNokCeDRnp1FSZotBeZAs8pAkOsp7mvOCyUwRjOma35Fu4g3DBVcK4BpwSiHK4rKN7pCPVIUO7Twa00KYsv9jBs"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });

    loadUserSubs(user.id);
  };

  function formatRenewalTime() {
    return new Date(
      subscription?.current_period_end * 1000
    ).toLocaleDateString();
  }

  async function loadUserSubs(userUid) {
    try {
      const subscriptionCollection = collection(
        db,
        "customers",
        userUid,
        "subscriptions"
      );

      const querySnapshot = await getDocs(subscriptionCollection);

      const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((subscriptionDoc) => {
          const subscriptionData = subscriptionDoc.data();
          if (
            subscriptionData.current_period_start.seconds <=
              currentDateInSeconds &&
            subscriptionData.current_period_end.seconds >= currentDateInSeconds
          ) {
            setIsUserSub(true);
          } else {
            setIsUserSub(false);
          }
        });
      } else {
        setIsUserSub(false);
      }
    } catch (error) {
      console.error("Error checking subscriptions:", error);
    }
  }

  return (
    <div className="plans">
      <button onClick={() => isUserSubs()}>click</button>
      {subscription && <p>Renewal date: {formatRenewalTime()}</p>}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`plans-plan ${isCurrentPackage && "disabled"} `}
          >
            <div className="plan-info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.price.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
