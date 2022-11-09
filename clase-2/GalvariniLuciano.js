class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `El nombre del usuario es: ${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return `${this.nombre} tiene ${this.mascotas.length} mascotas`;
  }

  addBook(nombre, autor) {
    const book = {
      nombre: nombre,
      autor: autor,
    };
    this.libros.push(book);
  }

  getBookNames() {
    const books = [];

    this.libros.map((libro) => {
      return books.push(libro.nombre);
    });

    return books;
  }
}

const usuario = {
  nombre: "Luciano",
  apellido: "Galvarini",
  libros: [
    {
      nombre: "El señor de los anillos",
      autor: "J. R. R. Tolkien",
    },
  ],
  mascotas: ["perro"],
};

const user = new Usuario(
  usuario.nombre,
  usuario.apellido,
  usuario.libros,
  usuario.mascotas
);

// 1
console.log(user.getFullName());
// 2
user.addMascota("gato");
// 3
console.log(user.countMascotas());
// 4
user.addBook("Harry Potter", "J. K. Rowling");
// 5
console.log(user.getBookNames());
