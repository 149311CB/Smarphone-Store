USE master
Go

DROP DATABASE Smartphone
Go

-- CREATE NEW DB
 CREATE DATABASE Smartphone
 Go

Use Smartphone
Go

-- CRETATE NEW TABLE
CREATE TABLE roms(
	_id varchar(10) NOT NULL PRIMARY KEY,
	Rom int NOT NULL
)
Go

CREATE TABLE rams(
	_id varchar(10) NOT NULL PRIMARY KEY,
	Ram int NOT NULL
)
Go

CREATE TABLE waranties(
	_id varchar(10) NOT NULL PRIMARY KEY,
	WarantyType nvarchar(50) NOT NULL,
	WarantyTime int NOT NULL,
)

CREATE TABLE specs(
	_id varchar(10) NOT NULL PRIMARY KEY,
	name nvarchar(50) NOT NULL,
	model nvarchar(50) NOT NULL,
	romId varchar(10) NOT NULL FOREIGN KEY REFERENCES roms(_id), -- Will have it own table
	ramId varchar(10) NOT NULL FOREIGN KEY REFERENCES rams(_id), -- Will have it own table
	manufactor nvarchar(25) NOT NULL,
	discountId varchar(10) NOT NULL,
	make nvarchar(25) NOT NULL,
	backCam nvarchar(255) NOT NULL,
	frontCam nvarchar(255) NOT NULL,
	gpu nvarchar(50) NOT NULL,
	chipset nvarchar(50) NOT NULL,
	display nvarchar(255) NOT NULL,
	resolution varchar(50) NOT NULL,
	size varchar(50) NOT NULL,
	simNumber int NOT NULL,
	battery varchar(50) NOT NULL,
	charger nvarchar(25) NOT NULL,
	warantyId varchar(10) NOT NULL FOREIGN KEY REFERENCES waranties(_id),
	price decimal NOT NULL,
)
Go

CREATE TABLE users(
	_id varchar(10) NOT NULL PRIMARY KEY,
	fullName nvarchar(50),
	phoneNumber int,
	email varchar(100),
	sex binary,
	birthday DateTime,
	Password varchar(50),
)
Go

CREATE TABLE addresses(
	_id varchar(10) NOT NULL PRIMARY KEY,
	receiverName nvarchar(50) NOT NULL,
	receiverPhone varchar(25) NOT NULL,
	city nvarchar(50) NOT NULL,
	district nvarchar(50) NOT NULL,
	subDistrict nvarchar(50) NOT NULL,
	addressDetail nvarchar(255) NOT NULL,
	addressType nvarchar(50) NOT NULL,
	isPrimary binary NOT NULL,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
)

CREATE TABLE paymentMethods(
	_id varchar(10) NOT NULL PRIMARY KEY,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
	paymentType nvarchar(50) NOT NULL,
	provider nvarchar(50)
)
Go

CREATE TABLE discounts(
	_id varchar(10) NOT NULL PRIMARY KEY,
	discountType nvarchar(25) NOT NULL,
	discountPercent int NOT NULL,
	minPrice decimal NOT NULL,
	discountStart DateTime NOT NULL,
	activeTime int NOT NULL,
	paymentMethodId varchar(10) NOT NULL FOREIGN KEY REFERENCES paymentMethods(_id),
)
Go


CREATE TABLE orders(
	_id varchar(10) NOT NULL PRIMARY KEY,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
	total decimal NOT NULL,
	paymentMethodId varchar(10) NOT NULL FOREIGN KEY REFERENCES paymentMethods(_id),
	addressId varchar(10) NOT NULL FOREIGN KEY REFERENCES addresses(_id),
	createAt Datetime NOT NULL,
	idPaid binary NOT NULL
)
Go

CREATE TABLE orderDetail(
	_id varchar(10) NOT NULL PRIMARY KEY,
	orderId varchar(10) NOT NULL FOREIGN KEY REFERENCES orders(_id),
	specId varchar(10) NOT NULL FOREIGN KEY REFERENCES specs(_id),
	quantity int NOT NULL
)

CREATE TABLE ratings(
	_id varchar(10) NOT NULL PRIMARY KEY,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
	specId varchar(10) NOT NULL FOREIGN KEY REFERENCES specs(_id),
	rating int NOT NULL,
	comment nvarchar(255)
)