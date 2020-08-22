<!-- Custom Checkbox using the same markup as Engaging Networks -->

<div class="en__field en__field--checkbox en__field--000000 en__field--processing_fees pseudo-en-field">
    <div class="en__field__element en__field__element--checkbox">
        <div class="en__field__item">
            <input class="en__field__input en__field__input--checkbox" data-processing-fee-fixed-amount-added="0" data-processing-fee-percent-added="3.0" id="en__field_supporter_processing_fees" name="supporter.processing_fees" type="checkbox" value="N" />
            <label class="en__field__label en__field__label--item" for="en__field_supporter_processing_fees">I&#39;d like to cover all transaction fees so that 100% of my donation goes to the The National Wildlife Federation!</label>
        </div>
    </div>
</div>

<!-- Process Fee Checkbox JS Logic Code -->

  (function() {
    window.addEventListener("load", function() {
      var donation_amount_name = "transaction.donationAmt";
      var donation_amount_other_name = "transaction.donationAmt.other";
      var payment_card_type_name = "transaction.paymenttype";
      var processing_fee_name = "supporter.questions.180213";
      var payment_method_wrapper_class_name = "en__field--180165";
      var event;
  
      window.calculateProcessingFee = function() {
        var processing_fee_checkbox = document.querySelector(
          'input[name="' + processing_fee_name + '"]'
        );
        if (
          processing_fee_checkbox &&
          processing_fee_checkbox.checked &&
          processing_fee_checkbox.isVisible()
        ) {
          var payment_type = window.getPaymentType();
          var donation_amount = window.getDonationAmount();
          if (donation_amount == 0) return 0;
          var processing_fee = 0;
  
          switch (payment_type.toUpperCase()) {
            case "VI":
              processing_fee = donation_amount * 0.025 + 0.1;
              break;
            case "MC":
              processing_fee = donation_amount * 0.025 + 0.1;
              break;
            case "DI":
              processing_fee = donation_amount * 0.025 + 0.1;
              break;
            case "AX":
              processing_fee = donation_amount * 0.025 + 0.1;
              break;
            case "PAYPAL":
              processing_fee = donation_amount * 0.05 + 0.3;
              break;
            case "CHECK":
              processing_fee = donation_amount * 0.025 + 0.1;
              break;
            default:
              processing_fee = 0;
              break;
          }
  
          return roundDollarAmount(processing_fee);
        } else {
          return 0;
        }
      };
  
      function roundDollarAmount(amount) {
        return +(Math.round(amount + "e+2") + "e-2");
      }
  
      function setProcessingFee(processing_fee) {
        console.log("setProcessingFee");
        var donation_input = window.getDonationInput();
        if (!donation_input) return;
  
        if (donation_input.name == "donation_amount_other_name") {
          var original_value = donation_input.getAttribute("data-original");
          if (!original_value) {
            donation_input.setAttribute("data-original", donation_input.value);
            original_value = donation_input.value;
          }
          donation_input.value =
            parseFloat(original_value) + parseFloat(processing_fee);
        } else {
          donation_input.setAttribute("data-fee", processing_fee);
        }
      }
  
      function updateDonationAmount() {
        setProcessingFee(window.calculateProcessingFee());
        if (typeof Event === "function") {
          event = new Event("proccessingFeeCalculated");
        } else {
          event = document.createEvent("Event");
          event.initEvent("proccessingFeeCalculated", true, true);
        }
        window.dispatchEvent(event);
      }
  
      var form = document.querySelector("form.en__component");
      form.addEventListener("submit", function(e) {
        updateDonationAmount();
      });
  
      function initializeBaseDonationAmounts() {
        var donation_amount_buttons = document.querySelectorAll(
          'input[name="' + donation_amount_name + '"]'
        );
        for (i = 0; i < donation_amount_buttons.length; i++) {
          if (!isNaN(donation_amount_buttons[i].value)) {
            donation_amount_buttons[i].setAttribute(
              "data-original",
              donation_amount_buttons[i].value
            );
          }
          donation_amount_buttons[i].addEventListener("click", function(e) {
            updateDonationAmount();
          });
        }
      }
      initializeBaseDonationAmounts();
  
      // payment type (VI, MC, AM, DI, etc) change handler
      var payment_type_select = document.querySelector(
        'select[name="' + payment_card_type_name + '"]'
      );
      if (payment_type_select) {
        payment_type_select.addEventListener("change", function() {
          updateDonationAmount();
        });
      }
  
      // payment method (card, paypal, check, etc) click handler
      var payment_button_wrapper = document.getElementsByClassName(
        payment_method_wrapper_class_name
      );
      if (payment_button_wrapper.length) {
        var payment_method_buttons = payment_button_wrapper[0].getElementsByTagName(
          "input"
        );
        for (i = 0; i < payment_method_buttons.length; i++) {
          payment_method_buttons[i].addEventListener("click", function() {
            updateDonationAmount();
          });
          payment_method_buttons[i].addEventListener("change", function() {
            updateDonationAmount();
          });
        }
      }
  
      // processing fee checkbox change handler
      var processing_fee_checkbox = document.querySelector(
        'input[name="' + processing_fee_name + '"]'
      );
      if (processing_fee_checkbox) {
        processing_fee_checkbox.addEventListener("click", function() {
          updateDonationAmount();
        });
      }
  
      var field_donation_amount_other = document.querySelector(
        'input[name="' + donation_amount_other_name + '"]'
      );
      if (field_donation_amount_other) {
        field_donation_amount_other.addEventListener(
          "input",
          updateDonationAmount
        );
        field_donation_amount_other.addEventListener("cut", updateDonationAmount);
        field_donation_amount_other.addEventListener(
          "paste",
          updateDonationAmount
        );
        field_donation_amount_other.addEventListener(
          "keydown",
          updateDonationAmount
        );
      }
    });
  })();