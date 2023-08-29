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
  console.log('isShowAll:', isShowAll)
  console.log('sortDate:', sortDate)

  if (!isShowAll) {
    tools = tools.slice(0, 8)
  }

  tools.forEach(tool => {
    console.log(tool)
    const toolDiv = document.createElement('div');
    toolDiv.classList = `card bg-base-100 shadow-xl`;
    toolDiv.innerHTML = `
        <figure><img src="${tool?.image || 'https://i.ibb.co/ZxLFw0X/download-1.jpg'}" alt="AI related image" /></figure>
        <div class="card-body">
          <h2><span>Features: <br></span>${tool?.features?.map((feature, i) => `${i + 1}. ${feature}`).join(' <br> ')}</h2>
          <hr>
          <h2 class="text-xl font-bold">${tool.name}</h2>
          <p><i class="fa-regular fa-calendar"></i> ${tool.published_in}</p>
        </div>
        
        `;
    cardContainer.appendChild(toolDiv)

  })




}

const handleShowAll = () => {
  loadData(true)
}

const shortByDate = () => {
  sortDate = !sortDate;  // Toggle the sortDate value
  loadData(false, sortDate);  // Call loadData with isShowAll=false and the updated sortDate value
}


loadData()