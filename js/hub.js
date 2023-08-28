const loadData = async () =>{
  const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
  const data = await res.json();
  const tools = data.data.tools;
  showData(tools)
}

const showData = tools =>{

    // append div 
    const cardContainer = document.getElementById('card-container')
    tools.forEach(tool =>{
        console.log(tool)
        const toolDiv = document.createElement('div');
        toolDiv.classList = `card bg-base-100 shadow-xl`;
        toolDiv.innerHTML =`
        <figure><img src="${tool.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2><span>Features: <br></span>-${tool?.features?.map(feature => feature).join(' <br> -')}</h2>
          <hr>
          <h2 class="text-xl font-bold">${tool.name}</h2>
          <p><i class="fa-regular fa-calendar"></i> ${tool.published_in}</p>
        </div>
        
        `;
        cardContainer.appendChild(toolDiv)

    })
    
      

    }

loadData()