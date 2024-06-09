-- Create money table
CREATE TABLE money (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    unit varchar(255) NOT NULL,
    value float NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS payments;
-- Create payments table with foreign key to money table
CREATE TABLE payments (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    value decimal(19,2) NOT NULL,
    name varchar(100) DEFAULT NULL,
    number varchar(19) DEFAULT NULL,
    expiration varchar(7) DEFAULT NULL,
    code varchar(3) DEFAULT NULL,
    status varchar(255) NOT NULL,
    payment_mode bigint(20) NOT NULL,
    order_id bigint(20) NOT NULL,
    money_id bigint(20),  -- Column for the foreign key reference
    PRIMARY KEY (id),
    FOREIGN KEY (money_id) REFERENCES money(id)  -- Foreign key constraint
);

