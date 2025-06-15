interface Props {
  onNext: () => void;
  onBack: () => void;
}

export const PaymentStep = ({ onNext, onBack }: Props) => {
  return (
    <div>
      Payment Step!
      <button onClick={() => onNext()}>Next</button>
      <button onClick={() => onBack()}>Back</button>
    </div>
  );
};
