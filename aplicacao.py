from bs4 import BeautifulSoup
from datetime import datetime, date

import json
import re
import requests
import time

#from configura_log import configura_log
#from lambda_facil import loga_event_context
#from lambda_facil.lambda_proxy_integration import Status, Erro , excecao_lambda_proxy_integration, erro, status
#from logging import info

from modulos.dynamo import colocaItem
from modulos.dynamo import obtemItems
from modulos.estruturaDados import estruturaValor

#configura_log()

#@loga_event_context
#@excecao_lambda_proxy_integration
def obtemDolarDiario(event: dict, context:dict):
    #info('Coletando dados dólar atual...')

    url = 'https://www.remessaonline.com.br/cotacao/cotacao-dolar?utm_id=8906755110&matchtype=b&placement=&adgroupid=91232327898&loc_interest_ms=&loc_physical_ms=1001566&network=g&target=&adposition=&utm_term=%2Bdolar&utm_source=google&utm_medium=cpc&utm_campaign=RM_Search_Desk_Cotacao_RLSA_PF&utm_content=550570645366&hsa_net=adwords&hsa_grp=91232327898&hsa_mt=b&hsa_tgt=kwd-20079543618&hsa_kw=%2Bdolar&hsa_src=g&hsa_acc=4754839251&hsa_cam=8906755110&hsa_ver=3&hsa_ad=550570645366&gclid=Cj0KCQjw7JOpBhCfARIsAL3bobceQOgv5jEzyhjuRgp0X5MCXUeCUxHYC2vj7s30bkEdJklUoVqE4hoaAvpTEALw_wcB'
    headers = {'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}

    site = requests.get(url, headers=headers)
    soup = BeautifulSoup(site.content, 'html.parser')

    valorDolar = soup.find(class_='style__Text-sc-1a6mtr6-2 ljisZu').get_text().strip()

    if(valorDolar):
        valorFormatado = estruturaValor(valorDolar)
        timestamp = int(datetime.now().timestamp())

        colocaItem(timestamp, valorFormatado)

        print(f'Data:{timestamp}, MOEDA:BRL , Valor:{valorFormatado}')

        resposta = 'Dólar atual adquirido com sucesso!'
        return resposta

    else:
        raise Exception('Não foi possível adquirir o Dólar tente novamente mais tarde')      

def obtemDolarPorData(event: dict, context:dict):
    #info('Obtendo Doláres...')

    print(f'evento: {event}')

    corpo = json.loads(event['body'])

    maiorData = int(corpo["body"]["dataMaior"])
    menorData = int(corpo["body"]["dataMenor"])  

    print(f'DATAS: {maiorData}, {menorData}')

    itemsObtidos = obtemItems(maiorData, menorData)

    print(f'itemsObtidos: {itemsObtidos}')

    if itemsObtidos:
        itemsFormatados = []

        for item in itemsObtidos:
            data = date.fromtimestamp(int(item['DataHora']))

            formatacao = {
                "Data": str(data),
                "Moeda": item['Moeda'],
                "Valor": item['Valor']
            }
            itemsFormatados.append(formatacao)

        print(f'DADOS: {itemsFormatados}')

        return  {
        'statusCode': 200,
        'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
        'body': json.dumps(itemsFormatados)
        }

    else: 
       resposta = 'Nenhum item obtido do banco de dados'
       return resposta