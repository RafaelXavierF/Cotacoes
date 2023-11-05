function selecionarBotaoGrafico(event){
    switch(event.value){

        case 'hoje':
          hoje();
          break

        case '5d':
            cincoDias();
            break

        case '1s':
            umaSemana();
            break

        case '1m':
            umMes();
            break
    }
}

function hoje(){
    vertical = [5.09 , 5.10, 5.3, 5.5, 5.5, 5.5, 5.10, 5,5, 5.09 , 5.10, 5.3, 5.5, 
      5.5, 5.5, 5.10, 5,5, 5.09 , 5.10, 5.3, 5.1, 4.5, 3.5, 5.50, 4,4]
    horizontal = ['01:00','02:00','03:00','04:00','05:00','06:00', '07:00','08:00','09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:59']
        
    const myChart = new Chart("myChart", {
        type: "line",
        data: {
          labels: horizontal,
          datasets: [{
            pointRadius: 1,
            fill:true,
            backgroundColor: 'pink',
            borderColor: 'rgba(255,0,0,0.5)',
            data: vertical
          }]
        },    
        options: {
          scales:{
            yAxes:[{
              display:true,
              ticks:{
                beginAtZero: true,
                            max: 6.00,
                            min:2
              }
            }]
          },
          responsive: false,
          legend: {display: false},
          title: {
            display: true,
            text: "Variação Dólar",
            fontSize: 16
          },

        },
      });

    return myChart
}

function cincoDias(){
  var dataAtual = new Date().getTime()    
  var timestempCincoDias = dataAtual - 432000

  realizaRequisicao(dataAtual, timestempCincoDias)
  .then((resposta) =>{
  listaSimulada = resposta

  horizontal = [];
  vertical = [];

  for(item in listaSimulada){
      dolar = parseFloat(listaSimulada[item]['Valor']);
      data = Date.parse(listaSimulada[item]['DataHora'])

      dia = data.getDay()
      mes = data.getMonth()
      ano = data.getFullYear()

      data = dia+'/'+mes+'/'+ano
      horizontal.push(data);
      vertical.push(dolar);
  }
      
  const myChart = new Chart("myChart", {
      type: "line",
      data: {
        labels: horizontal,
        datasets: [{
          fill: true,
          pointRadius: 1,
          backgroundColor: 'pink',
          borderColor: "rgba(255,0,0,0.5)",
          data: vertical
        }]
      },    
      options: {
        scales:{
          yAxes:[{
            display:true,
            ticks:{
              beginAtZero: true,
                          max: 6.00,
                          min:2
            }
          }]
        },
        responsive: false,
        legend: {display: false},
        title: {
          display: true,
          text: "Variação Dólar",
          fontSize: 16
        }
      },
    });

  return myChart
  })
  .catch((erro) =>{
    console.log('erro:' + erro)
  })

    
    
}

function umaSemana(){
    // var dataAtual = new Date().getTime()
    // var menorData = dataAtual - 604800   
    
        horizontal = [];
        vertical = [];
    
        for(item in listaSimulada){
            dolar = parseFloat(listaSimulada[item]['Valor']);
    
            dia = listaSimulada[item]['DataHora'].getDay()
            mes = listaSimulada[item]['DataHora'].getMonth()
            ano = listaSimulada[item]['DataHora'].getFullYear()
    
            data = dia+'/'+mes+'/'+ano
            horizontal.push(data);
            vertical.push(dolar);
        }
            
        const myChart = new Chart("myChart", {
            type: "line",
            data: {
              labels: horizontal,
              datasets: [{
                fill: true,
                pointRadius: 1,
                backgroundColor: 'pink',
                borderColor: "rgba(255,0,0,0.5)",
                data: vertical
              }]
            },    
            options: {
              scales:{
                yAxes:[{
                  display:true,
                  ticks:{
                    beginAtZero: true,
                                max: 6.00,
                                min:2
                  }
                }]
              },
              responsive: false,
              legend: {display: false},
              title: {
                display: true,
                text: "Variação Dólar",
                fontSize: 16
              }
            },
            config: {
                type: 'line',
                options: {
                  indexAxis: 'y',
                  scales: {
                    x: {
                        type:'Time',
                        time:{
                            unit: 'day',
                            parse: 'dd, MM, yyyy'
                        },
                      beginAtZero: true
                    }
                  }
                }
              }
          });
    
        return myChart
}

function umMes(){
    // var dataAtual = new Date().getTime()
    // var menorData = dataAtual - 25920000
     
        horizontal = [];
        vertical = [];
    
        for(item in listaSimulada){
            dolar = parseFloat(listaSimulada[item]['Valor']);
    
            dia = listaSimulada[item]['DataHora'].getDay()
            mes = listaSimulada[item]['DataHora'].getMonth()
            ano = listaSimulada[item]['DataHora'].getFullYear()
    
            data = dia+'/'+mes+'/'+ano
            horizontal.push(data);
            vertical.push(dolar);
        }
            
        const myChart = new Chart("myChart", {
            type: "line",
            data: {
              labels: horizontal,
              datasets: [{
                fill: true,
                backgroundColor: 'pink',
                pointRadius: 1,
                borderColor: "rgba(255,0,0,0.5)",
                data: vertical
              }]
            },    
            options: {
              scales:{
                yAxes:[{
                  display:true,
                  ticks:{
                    beginAtZero: true,
                                max: 6.00,
                                min:2
                  }
                }]
              },
              responsive: false,
              legend: {display: false},
              title: {
                display: true,
                text: "Variação Dólar",
                fontSize: 16
              }
            },
            config: {
                type: 'line',
                options: {
                  indexAxis: 'y',
                  scales: {
                    x: {
                        type:'Time',
                        time:{
                            unit: 'day',
                            parse: 'dd, MM, yyyy'
                        },
                      beginAtZero: true
                    }
                  }
                }
              }
          });
    
        return myChart
}

async function realizaRequisicao(maiorData, menorData){
  var url = 'https://40j1t5n11i.execute-api.us-west-2.amazonaws.com/desenvolvimento/obtemdolardata/' + maiorData + '/' + menorData

  const conexao = await fetch(url, {

  method: "POST",
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
      "pathParameters": {
        "dataMaior": "1698412717",
        "dataMenor": "1697045874"
      },
      "body": {
        "dataMaior": "1698412717",
        "dataMenor": "1697045874"
    }
  })
});
  console.log(conexao)

  const resposta = await conexao.json();

  return resposta;

}