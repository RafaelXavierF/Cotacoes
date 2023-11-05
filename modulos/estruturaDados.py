import re

def estruturaValor(valor):
    valor = re.sub('Reais', '', valor)
    valorFormatado = re.sub(',', '.', valor)

    print(valorFormatado)
    return valorFormatado
