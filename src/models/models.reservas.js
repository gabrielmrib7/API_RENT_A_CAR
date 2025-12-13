export class Reserva {
  constructor({ id = null, clienteId = null, carroId = null, dataInicio = '', dataFim = '', dias = 0, precoTotal = 0, status = 'ativa', created_at = null, updated_at = null } = {}) {
    this.id = id;
    this.clienteId = clienteId;
    this.carroId = carroId;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.dias = dias;
    this.precoTotal = precoTotal;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  validate() {
    const errors = [];
    if (!this.clienteId) errors.push('Cliente é requerido');
    if (!this.carroId) errors.push('Carro é requerido');
    if (!this.dataInicio) errors.push('Data de início é requerida');
    if (!this.dataFim) errors.push('Data de fim é requerida');
    if (this.dias < 1) errors.push('Dias deve ser maior que 0');
    if (this.precoTotal < 0) errors.push('Preço total inválido');
    if (!['ativa', 'finalizada', 'cancelada'].includes(this.status)) errors.push('Status inválido');

    if (errors.length) {
      const err = new Error('Dados da reserva inválidos');
      err.details = errors;
      throw err;
    }
    return true;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Reserva(row);
  }

  toDb() {
    return {
      clienteId: this.clienteId,
      carroId: this.carroId,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
      dias: this.dias,
      precoTotal: this.precoTotal,
      status: this.status,
    };
  }
}
