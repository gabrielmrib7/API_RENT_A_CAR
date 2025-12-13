export class Cliente {
  constructor({ id = null, nome = '', email = '', telefone = '', endereço = '', senha = '', created_at = null, updated_at = null } = {}) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.endereço = endereço;
    this.senha = senha;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  validate() {
    const errors = [];
    if (!this.nome || typeof this.nome !== 'string') errors.push('Nome é requerido');
    if (!this.email || !this.email.includes('@')) errors.push('Email inválido');
    if (this.senha && this.senha.length < 6) errors.push('Senha deve ter pelo menos 6 caracteres');

    if (errors.length) {
      const err = new Error('Dados do cliente inválidos');
      err.details = errors;
      throw err;
    }
    return true;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Cliente(row);
  }

  toDb() {
    return {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      endereço: this.endereço,
      senha: this.senha,
    };
  }
}
