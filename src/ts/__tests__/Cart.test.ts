import Book from '../domain/Book';
import Movie from '../domain/Movie';
import MusicAlbum from '../domain/MusicAlbum';
import Cart from '../service/Cart';

test('new card should be empty', () => {
    const cart = new Cart();
    expect(cart.items.length).toBe(0);
});

test('use function add', () => {
    const cart = new Cart();
    const data = new Movie(123, 'The Avengers', 500, 2012, 'США', 'Avengers Assemble!', 'фантастика', 137);
    cart.add(data);
    expect(cart.items).toEqual([{
        id: 123,
        name: 'The Avengers',
        price: 500,
        year: 2012,
        country: 'США',
        tagline: 'Avengers Assemble!',
        genre: 'фантастика',
        duration: 137
    }]);
});

test('use function calculatePrice', () => {
    const cart = new Cart();
    const data1 = new Movie(123, 'The Avengers', 500, 2012, 'США', 'Avengers Assemble!', 'фантастика', 137);
    const data2 = new Book(235, 'War and Piece', 'Leo Tolstoy', 700, 1000);
    const data3 = new MusicAlbum(455, 'Master of Puppets', 'Metallica', 300);
    cart.add(data1);
    cart.add(data2);
    cart.add(data3);
    expect(cart.calculatePrice()).toBe(1500);
});

test('use function calculatePriceDiscount', () => {
    const cart = new Cart();
    const data1 = new Movie(123, 'The Avengers', 500, 2012, 'США', 'Avengers Assemble!', 'фантастика', 137);
    const data2 = new Book(235, 'War and Piece', 'Leo Tolstoy', 700, 1000);
    const data3 = new MusicAlbum(455, 'Master of Puppets', 'Metallica', 300);
    cart.add(data1);
    cart.add(data2);
    cart.add(data3);
    expect(cart.calculatePriceDiscount(5)).toBe(1425);
});

test('use function deleteId', () => {
    const cart = new Cart();
    const data1 = new Movie(123, 'The Avengers', 500, 2012, 'США', 'Avengers Assemble!', 'фантастика', 137);
    const data2 = new Book(235, 'War and Piece', 'Leo Tolstoy', 700, 1000);
    const data3 = new MusicAlbum(455, 'Master of Puppets', 'Metallica', 300);
    cart.add(data1);
    cart.add(data2);
    cart.add(data3);
    cart.deleteId(455)
    expect(cart.items.length).toBe(2);
    expect(cart.items).toEqual([{
      id: 123,
      name: 'The Avengers',
      price: 500,
      year: 2012,
      country: 'США',
      tagline: 'Avengers Assemble!',
      genre: 'фантастика',
      duration: 137
    },
    {
      id: 235,
        name: 'War and Piece',
        author: 'Leo Tolstoy',
        price: 700,
        pages: 1000
    }]);
});

test('use function deleteId with unknown ID', () => {
    const cart = new Cart();
    const data1 = new Movie(123, 'The Avengers', 500, 2012, 'США', 'Avengers Assemble!', 'фантастика', 137);
    const data2 = new Book(235, 'War and Piece', 'Leo Tolstoy', 700, 1000);
    const data3 = new MusicAlbum(455, 'Master of Puppets', 'Metallica', 300);
    cart.add(data1);
    cart.add(data2);
    cart.add(data3);
    expect(() => {cart.deleteId(500)}).toThrow('Unknown ID');
});