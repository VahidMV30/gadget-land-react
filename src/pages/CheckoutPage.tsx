import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Stepper } from "../components/checkout/Stepper";
import { AddressStep } from "../components/checkout/AddressStep";
import { PaymentStep } from "../components/checkout/PaymentStep";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Stepper currentStep={step - 1} />

      <div className="relative top-6 min-h-[606px] overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="address"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <AddressStep onNext={nextStep} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <PaymentStep onBack={prevStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CheckoutPage;
