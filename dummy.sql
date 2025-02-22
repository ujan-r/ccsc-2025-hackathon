CREATE TABLE Building (
	ID           Integer       NOT NULL PRIMARY KEY AUTOINCREMENT,
	BuildingName Char(32)      NOT NULL
);

CREATE TABLE Level (
	ID           Integer       NOT NULL PRIMARY KEY AUTOINCREMENT,
	BuildingID   Integer       NOT NULL,
	LevelName    Char(32)      NOT NULL,
	FOREIGN KEY  (BuildingID)  REFERENCES Building (ID)
);

CREATE TABLE Room (
	ID           Integer       NOT NULL PRIMARY KEY AUTOINCREMENT,
	LevelID      Integer       NOT NULL,
	RoomName     Char(32)      NOT NULL
);

/****************************************************************************/
/* ID               Unique ID of the object                                 */
/* RoomID           ID of associated room.                                  */
/* ObjectType       Type of object.                                         */
/* Attributes       Attributes about the object of interest.                */
/****************************************************************************/
CREATE TABLE Object (
	ID           Integer       NOT NULL PRIMARY KEY AUTOINCREMENT,
	RoomID       Integer       NOT NULL,
	ObjectType   Char(64)      NOT NULL,
	Attributes   Char(128)     NOT NULL,
);

INSERT INTO Building(BuildingName) VALUES ('Carpenter Residence Hall');
INSERT INTO Building(BuildingName) VALUES ('Crawford Residence Hall');
INSERT INTO Building(BuildingName) VALUES ('Goodwin-Kirk Residence Hall');
INSERT INTO Building(BuildingName) VALUES ('Herriott Residence Hall');
INSERT INTO Building(BuildingName) VALUES ('Jewett Residence Hall');
INSERT INTO Building(BuildingName) VALUES ('Morehouse Residence Hall');
INSERT INTO Building(BuildingName) VALUES ('Stalnaker Residence Hall');

INSERT INTO Building(BuildingName) VALUES ('Carnegie Hall');
INSERT INTO Building(BuildingName) VALUES ('Cartwright Hall');
INSERT INTO Building(BuildingName) VALUES ('Cline Hall of Pharmacy and Science');
INSERT INTO Building(BuildingName) VALUES ('Cole Hall');
INSERT INTO Building(BuildingName) VALUES ('Collier-Scripps Hall');
INSERT INTO Building(BuildingName) VALUES ('Cowles Library');
INSERT INTO Building(BuildingName) VALUES ('Fitch Hall');
INSERT INTO Building(BuildingName) VALUES ('Harmon Fine Arts Center');
INSERT INTO Building(BuildingName) VALUES ('Harvey Ingham Hall');
INSERT INTO Building(BuildingName) VALUES ('Howard Hall');
INSERT INTO Building(BuildingName) VALUES ('Hubbell Dining Hall');
INSERT INTO Building(BuildingName) VALUES ('Medbury Hall');
INSERT INTO Building(BuildingName) VALUES ('Meredith Hall');
INSERT INTO Building(BuildingName) VALUES ('Old Main');
INSERT INTO Building(BuildingName) VALUES ('Olin Hall');
INSERT INTO Building(BuildingName) VALUES ('Olmsted Center');
INSERT INTO Building(BuildingName) VALUES ('Opperman Hall');
INSERT INTO Building(BuildingName) VALUES ('Science Connector Building');


INSERT INTO Level(BuildingID, LevelName) VALUES (12, 'Lower Level');

