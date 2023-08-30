// set sortDate value false globally at the initial stage 
let sortDate = false; 
const loadData = async (isShowAll, sortDate) => {
  const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
  const data = await res.json();
  const tools = data.data.tools;
  if(!!sortDate || isShowAll){
    tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
  }
  showData(tools, isShowAll, sortDate)
}

// show all data in the UI 

const showData = (tools, isShowAll, sortDate) => {

  // append div 
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';

  // display show all button 
  const seeMoreButton = document.getElementById('btn-see-more');
  if (tools.length > 8 && !isShowAll) {
    seeMoreButton.classList.remove('hidden')
  }
  else {
    seeMoreButton.classList.add('hidden')
  }
//  slice if not show all 
  if (!isShowAll) {
    tools = tools.slice(0, 8)
  }

  tools.forEach(tool => {
    console.log(tool)
    const toolDiv = document.createElement('div');
    toolDiv.classList = `card bg-base-100 shadow-xl`;
    toolDiv.innerHTML = `
        <figure><img onclick="handleSingleDetails('${tool.id}')" src="${tool?.image || 'https://i.ibb.co/ZxLFw0X/download-1.jpg'}" alt="AI related image" /></figure>
        <div class="card-body">
          <h2><span>Features: <br></span>${tool?.features?.map((feature, i) => `${i + 1}. ${feature}`).join(' <br> ')}</h2>
          <hr>
          <h2 class="text-xl font-bold">${tool.name}</h2>
          <p><i class="fa-regular fa-calendar"></i> ${tool.published_in}</p>
        </div>
        
        `;

        // append to the container div 
    cardContainer.appendChild(toolDiv)

  })

  // loadingspinner false 
   toggleLoadingSpinner(false)

}
// handle show all button 

const handleShowAll = () => {
  toggleLoadingSpinner(true)
  loadData(true);
  

}

// sort by date by clicking sortByDate button 
const shortByDate = () => {
  sortDate = !sortDate;  // Toggle the sortDate value
  loadData(false, sortDate);  // Call loadData with isShowAll=false and the updated sortDate value
}

// loading spinner 
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
      loadingSpinner.classList.remove('hidden')
    }else{
      loadingSpinner.classList.add('hidden')
    }
   
}

const handleSingleDetails =async (id) =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
   const data = await res.json();
   const items = data.data
   console.log(items)
   displaySingleDetails(items);
}

const displaySingleDetails = (items) =>{
  const singleDetailsContainer = document.getElementById('single-details-container');
  singleDetailsContainer.innerHTML =`
  
   <div class="flex flex-row gap-4">
   <div class="flex-1 border-2 border-red-400 h-[500px]">
   <h3 class="text-xl font-semibold mb-8">${items.description}</h3>
   <div class="flex flex-row justify-center items-center gap-4">
   <p>${items.pricing.map(perPrice =>`<P class="shadow-lg p-4">${perPrice.price}</p>`)}</p>
   </div>
   </div>
   <div class="flex-1 bg-red-400">
   </div>
   
   </div>
  `



  const myModal4 =document.getElementById('my_modal_4')
  myModal4.showModal();

}

loadData()