SHOW DATABASES; 

CREATE DATABASE trivia;
USE trivia;

CREATE TABLE Score (
	id_usuario int NOT NULL AUTO_INCREMENT,
	usuario VARCHAR (32) NOT NULL,
	score int NOT NULL,
	PRIMARY KEY (id_usuario)
	);

INSERT INTO Score (usuario, score) VALUES ('manu', 10);
INSERT INTO Score (usuario, score) VALUES ('leo', 4);
INSERT INTO Score (usuario, score) VALUES ('joao', 1);
INSERT INTO Score (usuario, score) VALUES ('lucas', 1);
INSERT INTO Score (usuario, score) VALUES ('maria', 1);
INSERT INTO Score (usuario, score) VALUES ('andre', 1);
INSERT INTO Score (usuario, score) VALUES ('jose', 1);
INSERT INTO Score (usuario, score) VALUES ('carol', 1);
INSERT INTO Score (usuario, score) VALUES ('rafael', 1);
INSERT INTO Score (usuario, score) VALUES ('gabi', 1);
INSERT INTO Score (usuario, score) VALUES ('pedro', 1);

UPDATE Score SET usuario=? WHERE id_tarefa=?

