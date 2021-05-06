DROP DATABASE Smartphone
Go

-- CREATE NEW DB
 CREATE DATABASE Smartphone
 Go

Use Smartphone
Go

-- CRETATE NEW TABLE
CREATE TABLE Roms(
	Id varchar(10) NOT NULL PRIMARY KEY,
	Rom int NOT NULL
)
Go

CREATE TABLE Rams(
	Id varchar(10) NOT NULL PRIMARY KEY,
	Ram int NOT NULL
)
Go

CREATE TABLE Manufactors(
	Id varchar(10) NOT NULL PRIMARY KEY,
	Name nvarchar(50) NOT NULL
)

CREATE TABLE Waranties(
	Id varchar(10) NOT NULL PRIMARY KEY,
	WarantyType nvarchar(50) NOT NULL,
)

CREATE TABLE Specs(
	Id varchar(10) NOT NULL PRIMARY KEY,
	Name nvarchar(50) NOT NULL,
	Model nvarchar(50) NOT NULL,
	ManufactorId varchar(10) NOT NULL FOREIGN KEY REFERENCES Manufactors(Id),
	Make nvarchar(25) NOT NULL,
	Backcam nvarchar(255) NOT NULL,
	Frontcam nvarchar(255) NOT NULL,
	Gpu nvarchar(50) NOT NULL,
	Chipset nvarchar(50) NOT NULL,
	Display nvarchar(255) NOT NULL,
	Resolution varchar(50) NOT NULL,
	Size varchar(50) NOT NULL,
	SimNumber int NOT NULL,
	Battery varchar(50) NOT NULL,
	Charger nvarchar(25) NOT NULL,
	RomId varchar(10) NOT NULL FOREIGN KEY REFERENCES Roms(Id), -- Will have it own table
	RamId varchar(10) NOT NULL FOREIGN KEY REFERENCES Rams(Id), -- Will have it own table
	WarantyId varchar(10) NOT NULL FOREIGN KEY REFERENCES Waranties(Id),
	WarantyTime int NOT NULL,
	SKU varchar(25),
	Price decimal NOT NULL,
)
Go

CREATE TABLE PaymentMethods(
	Id varchar(10) NOT NULL PRIMARY KEY,
	PaymentName nvarchar(50) NOT NULL,
)
Go

CREATE TABLE DiscountTypes(
	Id varchar(10) NOT NULL PRIMARY KEY,
	DiscountType nvarchar(50) NOT NULL,
)
Go

CREATE TABLE Coupons(
	Id varchar(10) NOT NULL PRIMARY KEY,
	MinPrice decimal,
	PaymentMethodId varchar(10) FOREIGN KEY REFERENCES PaymentMethods(Id)
)
Go

CREATE TABLE DisCounts(
	Id varchar(10) NOT NULL PRIMARY KEY,
	SpecId varchar(10) NOT NULL FOREIGN KEY REFERENCES Specs(Id),
	DiscountTypeId varchar(10) NOT NULL FOREIGN KEY REFERENCES DiscountTypes(Id),
	DiscountPercent int NOT NULL,
	DiscountStart DateTime NOT NULL,
	DiscountEnd DateTime NOT NULL,
	CouponId varchar(10) FOREIGN KEY REFERENCES Coupons(Id),
)
Go

CREATE TABLE Sales(
	Id varchar(10) NOT NULL PRIMARY KEY,
	SpecId varchar(10) NOT NULL FOREIGN KEY REFERENCES Specs(Id),
	DiscountId varchar(10) FOREIGN KEY REFERENCES Discounts(Id),
	StartTime DateTime NOT NULL,
	EndTime DateTime NOT NULL,
	SaleNumber int NOT NULL
)

CREATE TABLE Users(
	Id varchar(10) NOT NULL PRIMARY KEY,
	FullName nvarchar(50),
	PhoneNumber int,
	Email varchar(100),
	Sex binary,
	Birthday DateTime,
	Password varchar(50),
)
Go

CREATE TABLE AddressTypes(
	Id varchar(10) NOT NULL PRIMARY KEY,
	AddressType nvarchar(50) NOT NULL,
)

CREATE TABLE Addresses(
	Id varchar(10) NOT NULL PRIMARY KEY,
	ReceiverName nvarchar(50) NOT NULL,
	ReceiverPhone int NOT NULL,
	City nvarchar(50) NOT NULL,
	District nvarchar(50) NOT NULL,
	SubDistrict nvarchar(50) NOT NULL,
	AddressDetail nvarchar(255) NOT NULL,
	AddressTypeId varchar(10) FOREIGN KEY REFERENCES AddressTypes(Id),
	IsPrimary binary NOT NULL,
	UserId varchar(10) NOT NULL FOREIGN KEY REFERENCES Users(Id),
)

CREATE TABLE Orders(
	Id varchar(10) NOT NULL PRIMARY KEY,
	UserId varchar(10) NOT NULL FOREIGN KEY REFERENCES Users(Id),
)
Go

CREATE TABLE OrderDetail(
	Id varchar(10) NOT NULL PRIMARY KEY,
	OrderId varchar(10) NOT NULL FOREIGN KEY REFERENCES Orders(Id),
	SpecId varchar(10) NOT NULL FOREIGN KEY REFERENCES Specs(Id),
	SpecNumber int NOT NULL,
	DiscountId varchar(10) FOREIGN KEY REFERENCES Discounts(Id),
	AddressId varchar(10) NOT NULL FOREIGN KEY REFERENCES Addresses(Id)
)

CREATE TABLE Ratings(
	Id varchar(10) NOT NULL PRIMARY KEY,
	UserId varchar(10) NOT NULL FOREIGN KEY REFERENCES Users(Id),
	SpecId varchar(10) NOT NULL FOREIGN KEY REFERENCES Specs(Id),
	Rating int NOT NULL,
	Comment nvarchar(255)
)



