import boto3
from boto3.dynamodb.conditions import Key, Attr

def colocaItem(data, valor):
    dynamodb = boto3.resource('dynamodb')
    tabela = dynamodb.Table('DolarRafael')

    tabela.put_item(
    Item={
            'DataHora': data,
            'Moeda': 'BRL',
            'Valor': valor
    
        }
    )
    print('Item inserido com sucesso.')

def obtemItems(dataLimiteMaior, dataLimiteMenor):

    dynamodb = boto3.resource('dynamodb')
    tabela = dynamodb.Table('DolarRafael')

    resposta = tabela.scan(
        FilterExpression=Attr('Moeda').eq('BRL') & Attr('DataHora').lte(dataLimiteMaior) & Attr('DataHora').gte(dataLimiteMenor)
    )
    items = resposta['Items']

    return items
    