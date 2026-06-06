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
}else {

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
