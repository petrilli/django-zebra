$(document).ready(function () {
    $("form").submit(function (event) {
        // Disable the button so someone doesn't hit it twice
        $("#submit-id-submit").prop("value", "Submitting...").attr("disabled", "disabled").addClass("disabled");

        Stripe.createToken(
            {
                number:$("#id_card_number").val(),
                expMonth:$("#id_card_expiry_month").val(),
                expYear:$("#id_card_expiry_year").val(),
                cvc:$("#id_card_cvv").val()
            },
            stripeResponseHandler);
        return false;
    })
});

function stripeResponseHandler(status, response) {
    if (response.error) {
        $("#payment-errors").text(response.error.message);
        $("#submit-id-submit").removeAttr("disabled").removeClass("disabled");
    } else {
        $("#payment-errors").hide();
        $("#id_last_4_digits").val(response.card.last4);
        $("#id_stripe_token").val(response.id);
        $("form").get(0).submit();
    }
};