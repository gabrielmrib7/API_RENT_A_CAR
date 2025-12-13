/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema
    .createTable('carros', function(table) {
      table.increments('id').primary();
      table.string('marca').notNullable();
      table.string('modelo').notNullable();
      table.integer('ano').notNullable();
      table.string('placa').notNullable().unique();
      table.decimal('precoDiario').notNullable();
      table.boolean('disponivel').notNullable().defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('clientes', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('telefone');
      table.string('endereço');
      table.timestamps(true, true);
    })
    .createTable('reservas', function(table) {
      table.increments('id').primary();
      table.integer('clienteId').unsigned().notNullable();
      table.integer('carroId').unsigned().notNullable();
      table.date('dataInicio').notNullable();
      table.date('dataFim').notNullable();
      table.integer('dias').notNullable();
      table.decimal('precoTotal').notNullable();
      table.enum('status', ['ativa', 'finalizada', 'cancelada']).defaultTo('ativa');
      table.timestamps(true, true);
      
      // Foreign keys
      table.foreign('clienteId').references('id').inTable('clientes').onDelete('CASCADE');
      table.foreign('carroId').references('id').inTable('carros').onDelete('CASCADE');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema
    .dropTableIfExists('reservas')
    .dropTableIfExists('clientes')
    .dropTableIfExists('carros');
}