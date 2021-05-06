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
	name nvarchar(Max),
	value int NOT NULL,
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE rams(
	_id varchar(10) NOT NULL PRIMARY KEY,
	name nvarchar(Max),
	value int NOT NULL,
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE waranties(
	_id varchar(10) NOT NULL PRIMARY KEY,
	warantyType nvarchar(50) NOT NULL,
	warantyTime int NOT NULL,
	createdAt DateTime NOT NULL
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
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE users(
	_id varchar(10) NOT NULL PRIMARY KEY,
	fullName nvarchar(50),
	phoneNumber int,
	email varchar(100),
	gender binary,
	birthday DateTime,
	Password varchar(50),
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE city(
	_id varchar(10) NOT NULL PRIMARY KEY,
	name nvarchar(Max),
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE district(
	_id varchar(10) NOT NULL PRIMARY KEY,
	name nvarchar(Max),
	cityId varchar(10) NOT NULL FOREIGN KEY REFERENCES city(_id),
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE ward(
	_id varchar(10) NOT NULL PRIMARY KEY,
	name nvarchar(Max),
	level nvarchar(Max),
	districtId varchar(10) NOT NULL FOREIGN KEY REFERENCES district(_id),
	createdAt DateTime NOT NULL
)
Go


CREATE TABLE addresses(
	_id varchar(10) NOT NULL PRIMARY KEY,
	receiverName nvarchar(50) NOT NULL,
	receiverPhone varchar(25) NOT NULL,
	cityId varchar(10) NOT NULL FOREIGN KEY REFERENCES city(_id),
	district varchar(10) NOT NULL FOREIGN KEY REFERENCES district(_id),
	ward varchar(10) NOT NULL FOREIGN KEY REFERENCES ward(_id),
	addressDetail nvarchar(255) NOT NULL,
	addressType nvarchar(50) NOT NULL,
	isPrimary binary NOT NULL,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE paymentMethods(
	_id varchar(10) NOT NULL PRIMARY KEY,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
	paymentType nvarchar(50) NOT NULL,
	provider nvarchar(50),
	createdAt DateTime NOT NULL
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
	createdAt DateTime NOT NULL
)
Go

CREATE TABLE payment(
	_id varchar(10) NOT NULL PRIMARY KEY,
	paymentMethodId varchar(10) NOT NULL FOREIGN KEY REFERENCES paymentMethods(_id),
	paymentAmount Decimal NOT NULL,
	paymentAt DateTime NOT NULL,
	isPaid binary NOT NULL
)

CREATE TABLE orders(
	_id varchar(10) NOT NULL PRIMARY KEY,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
	total decimal NOT NULL,
	addressId varchar(10) NOT NULL FOREIGN KEY REFERENCES addresses(_id),
	status nvarchar(Max) NOT NULL,
	paymentId varchar(10) NOT NULL FOREIGN KEY REFERENCES payment(_id),
	createAt Datetime NOT NULL
)
Go

CREATE TABLE orderDetail(
	_id varchar(10) NOT NULL PRIMARY KEY,
	orderId varchar(10) NOT NULL FOREIGN KEY REFERENCES orders(_id),
	specId varchar(10) NOT NULL FOREIGN KEY REFERENCES specs(_id),
	quantity int NOT NULL,
	createdAt DateTime NOT NULL
)

CREATE TABLE ratings(
	_id varchar(10) NOT NULL PRIMARY KEY,
	userId varchar(10) NOT NULL FOREIGN KEY REFERENCES users(_id),
	specId varchar(10) NOT NULL FOREIGN KEY REFERENCES specs(_id),
	rating int NOT NULL,
	comment nvarchar(255),
	createdAt DateTime NOT NULL
)
