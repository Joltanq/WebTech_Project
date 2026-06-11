const hamburger = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-nav-list");
const closeButton = document.getElementById("close-mobile-nav-button");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
})

closeButton.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
})


async function callAPI(baseURL){
    const response = await fetch(baseURL,{
        method:"GET",
        // wrong key
        // headers:{"X-Api-Key":"n3hahapLORI0gd3ewIPhc6PONh5psxPz5Zsz688B"}
        // correct key
        headers:{"X-Api-Key":"n3hahapLORI0gd3ewIPhc6PONh5psxPz5Zsz688A"}
    });

    if (!response.ok) {
        const errorBody = await response.json();
        throw Error(`${response.status}: ${errorBody.error}`);
    }

    return  response.json();
}

function getGenderValue(){
    // try to get from the card value first. if fail, check the dropdown value
    const checkedRadio = document.querySelector('input[name="gender"]:checked');
    if (checkedRadio) {
        return checkedRadio.value;
    } else {
        return document.querySelector('select[name="gender"]').value;
    }
}

function getEmojiValue(){
    // try to get from the card value first. if fail, check the dropdown value
    const checkedRadio = document.querySelector('input[name="emoji_selected"]:checked');
    if (checkedRadio) {
        return checkedRadio.value;
    } else {
        return document.querySelector('select[name="emoji_selected"]').value;
    }
}

// submit button logic. calls the API when clicked and returns results. also handles errors
if (document.getElementById("baby_names_form")) {
    document.getElementById("baby_names_form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const selectedGender = getGenderValue();
        const resultsArea = document.getElementById("api_results");

        try {
            const response_data = await callAPI(`https://api.api-ninjas.com/v1/babynames?gender=${selectedGender}`);
            resultsArea.textContent = response_data[0];
        } catch (e) {
            resultsArea.textContent = e;
        }
    })
}

if (document.getElementById("emoji_form")) {
    document.getElementById("emoji_form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const emojiSelected = getEmojiValue();
        const resultsArea = document.getElementById("api_results");

        try {
            const response_data = await callAPI(`https://api.api-ninjas.com/v1/emoji?group=${emojiSelected}`);
            const emoji_obj = response_data[0];

            resultsArea.textContent = emoji_obj.character;
        } catch (e) {
            resultsArea.textContent = e;
        }
    })
}


if (document.getElementById("contact_form")) {
    document.getElementById("contact_form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const first_name = document.getElementById("first-name");
        const first_name_error = document.getElementById("first-name-error");
        const last_name = document.getElementById("last-name");
        const last_name_error = document.getElementById("last-name-error");
        const email = document.getElementById("email");
        const email_error = document.getElementById("email-error");
        const message = document.getElementById("message");
        const message_error = document.getElementById("message-error");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const namePattern = /^[A-Za-z]{2,}$/;
        const messagePattern = /^.{2,}$/;

        let isValid = true;
        function validate(input,error) {
            if (input.value.trim() === ""){
                input.style.border = "solid 2px red";
                error.classList.remove("hidden");
                isValid = false;
                return;
            }

            // check email
            if (input.id === "email") {
                if (!emailPattern.test(input.value)) {
                    input.style.border = "solid 2px red";
                    error.textContent = "Valid email address format must follow the format asd@example.com";
                    error.classList.remove("hidden");
                    isValid = false;
                    return;
                }
            }

            // check first name
            if (input.id === "first-name") {
                if (!namePattern.test(input.value)) {
                    input.style.border = "solid 2px red";
                    error.textContent = "Your name must be at least 2 letters";
                    error.classList.remove("hidden");
                    isValid = false;
                    return;
                }
            }

            // check last name
            if (input.id === "last-name") {
                if (!namePattern.test(input.value)) {
                    input.style.border = "solid 2px red";
                    error.textContent = "Your name must be at least 2 letters";
                    error.classList.remove("hidden");
                    isValid = false;
                    return;
                }
            }

            // check message
            if (input.id === "message") {
                if (!messagePattern.test(input.value)) {
                    input.style.border = "solid 2px red";
                    error.textContent = "Your message must be at least 2 characters long";
                    error.classList.remove("hidden");
                    isValid = false;
                    return;
                }
            }

            // valid state
            input.style.border = "solid 1px black";
            error.classList.add("hidden");
        }

        validate(first_name, first_name_error);
        validate(last_name, last_name_error);
        validate(email,email_error);
        validate(message,message_error);

        if (isValid) {
            document.getElementById("contact_dialog").showModal();
            document.getElementById("contact_form").reset();
        }
    })
}