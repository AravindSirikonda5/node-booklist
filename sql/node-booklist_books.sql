CREATE TABLE books (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  author varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

INSERT INTO books VALUES (1,'War and Peace','Lev Nikolayevich Tolstoy'),(2,'Les Miserables','Victor Hugo'),(3,'The Time Machine','H. G. Wells'),(4,'A Journey into the Center of the Earth','Jules Verne'),(5,'The Dark World','Henry Kuttner'),(6,'The Wind in the Willows','Kenneth Grahame');
