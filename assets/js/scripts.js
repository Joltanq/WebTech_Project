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

// submit button logic. calls the API when clicked and returns results. also handles errors
document.getElementById("api_form").addEventListener("submit",async function(e) {
    e.preventDefault();
    const input = document.getElementById("api_parameter").value;
    const dropdownValue = document.getElementById("baby_names_dropdown").value;
    const resultsArea = document.getElementById("api_results");
    const selectedApi = document.querySelector('input[name="api_picker"]:checked');

    if (selectedApi.value === "baby_names"){
        try{
            const response_data = await callAPI(`https://api.api-ninjas.com/v1/babynames?gender=${dropdownValue}`);
            resultsArea.textContent = response_data[0];
        }catch(e){
            resultsArea.textContent = e;
        }
    }else if (selectedApi.value === "emoji" && (input === "smileys_emotion" || input === "people_body" ||input === "animals_nature" )){
        try{
            const response_data = await callAPI(`https://api.api-ninjas.com/v1/emoji?group=${input}`);
            const emoji_obj = response_data[0];

            resultsArea.textContent = emoji_obj.character;
        }catch(e){
            resultsArea.textContent = e;
        }
    }else{
        resultsArea.style.color = '#bd1414';
        resultsArea.textContent = "That's not right. Check that it is either smileys_emotion, people_body or animals_nature ";
    }
})