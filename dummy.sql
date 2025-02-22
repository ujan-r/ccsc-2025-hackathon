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
	Attributes   Char(128)     NOT NULL
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

# Add floors for Collier-Scripps
INSERT INTO Level(BuildingID, LevelName) VALUES (12, 'Lower Level');
INSERT INTO Level(BuildingID, LevelName) VALUES (12, 'Level 1');
INSERT INTO Level(BuildingID, LevelName) VALUES (12, 'Level 2');
INSERT INTO Level(BuildingID, LevelName) VALUES (12, 'Level 3');

# Add rooms to Collier Scripps
INSERT INTO Room(LevelID, RoomName) VALUES (1, 'Lower Level Common Area');
INSERT INTO Room(LevelID, RoomName) VALUES (1, 'Lower Level Hallway');
INSERT INTO Room(LevelID, RoomName) VALUES (2, 'Level 1 Hallway');
INSERT INTO Room(LevelID, RoomName) VALUES (2, 'Room 114');
INSERT INTO Room(LevelID, RoomName) VALUES (2, 'Room 133');
INSERT INTO Room(LevelID, RoomName) VALUES (3, 'Level 2 Hallway');
INSERT INTO Room(LevelID, RoomName) VALUES (4, 'Level 3 Hallway');
INSERT INTO Room(LevelID, RoomName) VALUES (4, 'Room 320');

# Add objects to Collier Scripps
INSERT INTO Object(RoomID, ObjectType, Attributes) VALUES (1, 'Sink', '');

