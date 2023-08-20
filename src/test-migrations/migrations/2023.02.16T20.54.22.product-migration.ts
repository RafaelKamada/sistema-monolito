import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('products', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        purchasePrice: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        salesPrice: {
            type: DataTypes.NUMBER,
            allowNull: true
        },
        stock: {
            type: DataTypes.NUMBER,
            allowNull: true
        }
    });

    await sequelize.getQueryInterface().createTable('clients', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        document: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        complement: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

    await sequelize.getQueryInterface().createTable('orders', {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        client_id: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        products: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('products');
    await sequelize.getQueryInterface().dropTable('clients');
    await sequelize.getQueryInterface().dropTable('orders');
};