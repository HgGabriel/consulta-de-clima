const form = document.querySelector("#search-form > form")
const input: HTMLInputElement | null = document.querySelector("#input-localizacao")
const sectionTempoInfos = document.querySelector("#tempo-info")

form?.addEventListener('submit', async (event) => {
  event.preventDefault()

  if (!input||!sectionTempoInfos) return


  
  const localizacao = input.value

  if(localizacao.length < 3) {
    alert('Local não existe')
    return
  }

  if(localizacao.toUpperCase() == "ISRAEL"  ){
    alert("Digite um local que exista.")
    return
  }

  try {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=8133cc17ca8af17c6334eaf0d140916e&lang=pt_br&units=metric`)

    const dados = await resposta.json()
    
    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    }
    
    sectionTempoInfos.innerHTML = `
    <div class="tempo-dados">
            <h2>${infos.local}</h2>
      
            <span>${infos.temperatura}°</span>
          </div>
    
          <img src="${infos.icone}">
          `
    
  } catch (err) {
    console.log("Erro nos dados da obtenção da Api", err)
    alert("Local não encontrado")
  }

  input.value = ''
})