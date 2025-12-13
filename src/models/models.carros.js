// Aqui definimos o modelo de dados para Carro

export class Carro {
  constructor({ id = null, marca = '', modelo = '', ano = null, placa = '', precoDiario = 0, disponivel = true, created_at = null, updated_at = null } = {}) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.placa = placa;
    this.precoDiario = precoDiario;
    this.disponivel = disponivel;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  validate() {
    const errors = [];
    if (!this.marca || typeof this.marca !== 'string') errors.push('Marca é requerida');
    if (!this.modelo || typeof this.modelo !== 'string') errors.push('Modelo é requerido');
    if (!this.ano || this.ano < 1886) errors.push('Ano inválido');
    if (!this.placa || typeof this.placa !== 'string') errors.push('Placa é requerida');
    if (typeof this.precoDiario !== 'number' || this.precoDiario < 0) errors.push('Preço diário inválido');

    if (errors.length) {
      const err = new Error('Dados do carro inválidos');
      err.details = errors;
      throw err;
    }
    return true;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Carro(row);
  }

  toDb() {
    return {
      marca: this.marca,
      modelo: this.modelo,
      ano: this.ano,
      placa: this.placa,
      precoDiario: this.precoDiario,
      disponivel: this.disponivel ? 1 : 0,
    };
  }
}
