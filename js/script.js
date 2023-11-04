const dataLoad = async (dataLimit) => {
	const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
	const data = await res.json();
	displayDataLoad(data.data.tools, dataLimit);
};
const loadModal = async (id) => {
	const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	displayModal(data.data);
};

const displayDataLoad = (data, dataLimit) => {
	const card = document.getElementById("card");
	const showMoreBtn = document.getElementById("show-more-button");
	card.innerHTML = "";
	//handle showMore Button Visible
	if (dataLimit && data.length > 6) {
		data = data.slice(0, 6);
		showMoreBtn.classList.remove("hidden");
	} else {
		showMoreBtn.classList.add("hidden");
	}
	data.map((element) => {
		const cardDiv = document.createElement("div");
		cardDiv.classList.add(
			"max-w-sm",
			"bg-white",
			"border",
			"border-gray-200",
			"rounded-xl",
			"shadow",
			"dark:bg-gray-800",
			"dark:border-gray-700",
			"mb-10"
		);
		cardDiv.innerHTML = `<div class="p-3">
							<a href="#">
								<img
                                    class="rounded-xl hover:opacity-95"
                                    src="${element.image}"
                                    alt="Image not available"
                                    onerror="this.src = 'Image_not_available.png'"
                                />

							</a>
						</div>
						<div class="p-5">
							<a href="#">
								<h5
									class="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
								>
									Features
								</h5>
							</a>
                            
							<p class="mb-3 font-normal text-gray-700 dark:text-gray-400" onerror='no data'>
								1. ${element.features[0]}
							</p>
							<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
								2. ${element.features[1] ? element.features[1] : ""}
							</p>
							<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
								3. ${element.features[2] ? element.features[2] : "Data not found"}
							</p>
							<div class="border-t-4 mt-10 pt-5 flex justify-between">
								<div>
									<h3 class="font-semibold text-2xl mb-2">${element.name}</h3>
									<p>${element.published_in}</p>
								</div>
								<div class="mt-3">
									<button
                                        onclick="loadModal('${element.id}')"
										data-modal-target="static-modal"
										data-modal-toggle="static-modal"
										class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										type="button"                                 
									>
										See More
									</button>
								</div>
							</div>
						</div>`;
		card.appendChild(cardDiv);
		toggleSpinner(false);
	});
};
// toggle spinner
const toggleSpinner = (isLoading) => {
	const loaderSection = document.getElementById("spinner");
	if (isLoading) {
		loaderSection.classList.remove("hidden");
	} else {
		loaderSection.classList.add("hidden");
	}
};
const processSearch = (dataLimit) => {
	toggleSpinner(true);
	dataLoad(dataLimit);
};
//click show more button
document.getElementById("show-more-button").addEventListener("click", () => {
	processSearch();
});
// showModal
    const displayModal = (data) => {
        const staticModal = document.getElementById("modal");
        const modalDiv = document.createElement("div");
        modalDiv.classList.add(
            "relative",
            "rounded-lg",
            "shadow",
            "dark:bg-gray-700"
        );
        modalDiv.innerHTML = `<button
            type="button"
            class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none bg-red-600"
            data-modal-hide="static-modal"
            aria-label="Close"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
        <!-- Modal body -->
        <div class="p-6 space-y-6 bg-white shadow-lg rounded-md">
            <div class="grid grid-cols-1 md:grid-cols-2 bg-ros">
                <!-- card 1 -->
                <div
                    class="bg-rose-50 mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
                >
                    <div class="text-center font-bold bg-rose-50 p-14">
                        <h1>
                            ${data.description ? data.description : 'Description not available'}
                        </h1>
                    </div>
                    <!-- pricing -->
                    <div class="p-6 grid grid-cols-1 bg-rose-50">
                        ${
                            data.pricing && Array.isArray(data.pricing)
                                ? data.pricing.map((element) => {
                                    return `
                                            <h1 class="bg-white shadow-lg text-green-500 rounded-lg text-center font-semibold p-10 mx-4">
                                                ${element.price ? element.price : "Free of cost"}<p>${element.plan ? element.plan : "Plan not specified"}</p>
                                            </h1>
                                            `;
                                }).join('')
                                : ''
                        }                                                                                                                        
                    </div>
                    <div class="grid grid-cols-2 bg-rose-50">
                        <!-- feature -->
                        <div class="mx-10">
                            <h1 class="text-4xl font-semibold mb-5">Features</h1>
                            <ul>
                                ${
                                    data.features[1]
                                        ? `<li>${data.features[1].feature_name}</li>`
                                        : ''
                                }
                                ${
                                    data.features[2]
                                        ? `<li>${data.features[2].feature_name}</li>`
                                        : ''
                                }
                                ${
                                    data.features[3]
                                        ? `<li>${data.features[3].feature_name}</li>`
                                        : ''
                                }
                            </ul>
                        </div>
                        <!-- integration -->
                        <div class="mx-10 mb-12">
                            <h1 class="text-4xl font-semibold mb-5">
                                Integration
                            </h1>
                            <ul>
                                ${
                                    data.integrations &&
                                    Array.isArray(data.integrations) &&
                                    data.integrations.length > 0
                                        ? data.integrations.map((element) => {
                                            return `
                                                <li>
                                                    ${element ? element : "Integration not specified"}
                                                </li>
                                                `;
                                        }).join('')
                                        : ''
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- card 2 -->
                <div
                    class="mx-3 mt-6 flex flex-col self-start rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark-bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
                >
                    <a href="#!">
                        <img
                            class="rounded-t-lg relative"
                            src="${data.image_link && data.image_link.length > 0 ? data.image_link[0] : 'default_image.jpg'}"
                            alt="Image not available"
                        />
                        <div
                            id='hideAccuracyDiv'
                            class="bg-red-600 text-white absolute top-20 right-16 px-4 text-lg rounded-lg"
                        >
                            <h1>${data.accuracy && data.accuracy.score ? (data.accuracy.score * 100).toFixed(2) + '%' : 'Accuracy not available'}</h1>
                        </div>
                    </a>
                    <div class="p-6">
                        <h5
                            class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
                        >
                            ${data.input_output_examples[0] ? data.input_output_examples[0].input : 'Input not available'}
                        </h5>
                        <p
                            class="mb-4 text-base text-neutral-600 dark:text-neutral-200"
                        >
                            ${data.input_output_examples[0] ? data.input_output_examples[0].output : 'Output not available'}
                        </p>
                    </div>
                </div>
            </div>
        </div>`;

        // Hide the accuracy div if accuracy is not available
        if (!data.accuracy || !data.accuracy.score) {
            const hideAccuracyDiv = modalDiv.querySelector("#hideAccuracyDiv");
            hideAccuracyDiv.style.display = "none";
        }

        staticModal.appendChild(modalDiv);
    };






dataLoad(5);
