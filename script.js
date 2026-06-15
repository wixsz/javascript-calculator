const showTipToolButton = document.querySelector("#showTipTool");
const showTempToolButton = document.querySelector("#showTempTool");
const tipTool = document.querySelector("#tipTool");
const tempTool = document.querySelector("#tempTool");

const billAmountInput = document.querySelector("#billAmount");
const tipPercentageInput = document.querySelector("#tipPercentage");
const calculateTipButton = document.querySelector("#calculateTip");
const tipResult = document.querySelector("#tipResult");

const temperatureValueInput = document.querySelector("#temperatureValue");
const conversionTypeSelect = document.querySelector("#conversionType");
const convertTempButton = document.querySelector("#convertTemp");
const tempResult = document.querySelector("#tempResult");

// This function switches between the two tools.

const showTool = (toolName) => {
  const isTipTool = toolName === "tip";

  tipTool.classList.toggle("hidden", !isTipTool);
  tempTool.classList.toggle("hidden", isTipTool);

  showTipToolButton.classList.toggle("active", isTipTool);
  showTempToolButton.classList.toggle("active", !isTipTool);
};

// This helper displays either a success message or an error message.

const showResult = (resultElement, message, type) => {
  resultElement.className = `result-box ${type}`;
  resultElement.innerHTML = message;
};

const calculateTip = () => {
  const billAmount = Number(billAmountInput.value);
  const tipPercentage = Number(tipPercentageInput.value);

  if (!billAmountInput.value || !tipPercentageInput.value) {
    showResult(
      tipResult,
      "Please enter both the bill amount and tip percentage.",
      "error",
    );
    return;
  }

  if (
    billAmount <= 0 ||
    tipPercentage <= 0 ||
    Number.isNaN(billAmount) ||
    Number.isNaN(tipPercentage)
  ) {
    showResult(tipResult, "Please enter numbers greater than zero.", "error");
    return;
  }

  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = billAmount + tipAmount;

  showResult(
    tipResult,
    `Tip Amount: $${tipAmount.toFixed(2)}<br>Total Amount: $${totalAmount.toFixed(2)}`,
    "success",
  );
};

const convertTemperature = () => {
  const temperatureValue = Number(temperatureValueInput.value);
  const conversionType = conversionTypeSelect.value;

  if (!temperatureValueInput.value || Number.isNaN(temperatureValue)) {
    showResult(tempResult, "Please enter a valid temperature value.", "error");
    return;
  }

  let convertedTemperature = 0;
  let resultText = "";

  if (conversionType === "cToF") {
    convertedTemperature = (temperatureValue * 9) / 5 + 32;
    resultText = `${temperatureValue.toFixed(1)}°C is ${convertedTemperature.toFixed(1)}°F`;
  } else {
    convertedTemperature = ((temperatureValue - 32) * 5) / 9;
    resultText = `${temperatureValue.toFixed(1)}°F is ${convertedTemperature.toFixed(1)}°C`;
  }

  showResult(tempResult, resultText, "success");
};

showTipToolButton.addEventListener("click", () => showTool("tip"));
showTempToolButton.addEventListener("click", () => showTool("temp"));
calculateTipButton.addEventListener("click", calculateTip);
convertTempButton.addEventListener("click", convertTemperature);
