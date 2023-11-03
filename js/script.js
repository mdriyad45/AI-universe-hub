const dataLoad = async(dataLimit)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    console.log(data.data.tools);
    displayDataLoad(data.data.tools, dataLimit)
}
const displayDataLoad = (data,dataLimit) =>{
    const card = document.getElementById('card');
    const showMoreBtn = document.getElementById('show-more-btn');
    card.innerHTML = "";
    //handle showMore Button Visible
    if(dataLimit && data.length > 6){
        data = data.slice(0,6)
        showMoreBtn.classList.remove('hidden');
    }
    else{
        showMoreBtn.classList.add('hidden');
    }
    data.map(element => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-xl','shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'mb-10');
        cardDiv.innerHTML = `<div class="p-3">
							<a href="#">
								<img
									class="rounded-xl hover:opacity-95"
									src="${element.image? element.image : './Image_not_available.png'}"
									alt="Image not available"
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
                            
							<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
								1. ${element.features[0]? element.features[0] : ''}
							</p>
							<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
								2. ${element.features[1]? element.features[1] : ''}
							</p>
							<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
								3. ${element.features[2]? element.features[2] : 'Data not found'}
							</p>
							<div class="border-t-4 mt-10 pt-5 flex justify-between">
								<div>
									<h3 class="font-semibold text-2xl mb-2">${element.name}</h3>
									<p>10/02/2023</p>
								</div>
								<div class="mt-3">
									<button
										data-modal-target="static-modal"
										data-modal-toggle="static-modal"
										class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										type="button"
									>
										See More
									</button>
								</div>
							</div>
						</div>`
                    card.appendChild(cardDiv);
                    toggleSpinner(false);
    });
}
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
	const searchField = document.getElementById("input-search");
	dataLoad(dataLimit);
};
//click show more button
document.getElementById("show-more-btn").addEventListener("click", () => {
	processSearch();
});

dataLoad(5);