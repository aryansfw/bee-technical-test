# Bee Technical Test

oleh Aryan Shafa Wardana

## Teknologi yang Digunakan

<ol>
<li><strong>Next.js</strong></li>

Next.js merupakan framework React yang digunakan untuk membangun aplikasi full-stack. React digunakan dalam pembentukan komponen dan antarmuka pengguna. Sementara itu, Next.js digunakan untuk fitur tambahan dan optimisasi. Selain itu, Next.js menangani konfigurasi tingkat rendah (low-level), sehingga aplikasi dapat dikembangkan dan dideploy dengan cepat. Meskipun Next.js digunakan untuk membangun aplikasi full-stack, framework ini sering digunakan hanya untuk mengembangkan frontend aplikasi.

Versi 15.3.5 menyediakan Next.js menggunakan fitur App Router, yang mendukung penggunaan komponen server. Implementasi integrasi api, yang terdiri dari pengambilan data (GET), pengiriman data (POST), pengubahan data (PUT/PATCH), dan penghapusan data (DELETE), memanfaatkan fitur server actions yang dapat menangani operasi tersebut dalam server.

Berikut adalah struktur direktori yang digunakan dalam project ini:

```
.
├── public/
└── src/
    ├── actions/
    ├── app/
    ├── lib/
    ├── schemas/
    ├── types/
    ├── ui/
    └── middleware.ts
```

Penjelasan masing-masing folder sebagai berikut.

<ul>
    <li> `public/`: Folder yang berisi aset-aset statis seperti gambar, favicon, dan svg.</li>
    <li> `src/`: Folder utama berisi source code aplikasi.</li>
    <ul>
        <li>`actions/`: Folder berisi definisi fungsi-fungsi server action yang digunakan dalam interaksi form, CRUD, dan pemanggilan API.</li>
        <li>`app/`: Folder utama dalam routing dan rendering halaman dalam App Router Next.js, yang berisi layout, halaman (`page.tsx`), route groups, dan komponennya.</li>
        <li>`lib/`: Folder yang berisi fungsi pembantu (_helper functions_) seperti utilitas.</li>
        <li> `schemas/`: Berisi definisi skema yang digunakan dalam validasi data - `types/`: Menampung tipe-tipe Typescript yang digunakan, seperti tipe `User` dan tipe respons API. </li>
        <li>`ui/`: Berisi komponen-komponen antarmuka pengguna (_user interface_) seperti tombol, input, tabel, dan navbar.</li>
        <li>`middleware.ts`: File yang berisi middleware untuk menangani intercept request. Digunakan dalam rerouting pengguna ketika mengakses bagian website yang tidak diperbolehkan. Misalnya, pengguna yang belum login mengakses homepage.</li>
    </ul>
</ul>

<li><strong>Tailwind CSS</strong></li>

Tailwind CSS adalah framework CSS utility-first yang memudahkan proses styling komponen antarmuka pengguna secara efisien dan konsisten. Pendekatan utility-first memungkinkan pengembangan yang cepat menggunakan kelas-kelas yang siap dipakai langsung dalam source code React. Selain itu, kelas-kelas ini menghasilkan penggunaan elemen desain yang konsisten.

Dalam project ini, Tailwind CSS digunakan untuk pembuatan layout, styling tombol, input, tabel, dan elemen UI lainnya. Konfigurasi Tailwind dapat ditambahkan, tetapi saya menggunakan kelas-kelas yang sudah disediakan dari framework tersebut, seperti kelas untuk warna, padding, margin, dan ukuran.

<li><strong>TypeScript</strong></li>

TypeScript adalah bahasa pemrograman yang merupakan dibangun di atas JavaScript dan menambahkan fitur static typing. Dengan TypeScript, kita dapat menentukan tipe data pada variabel, parameter, dan hasil fungsi, sehingga dapat mengurangi potensi bug akibat kesalahan tipe data sejak proses pengembangan.

Pada project ini, TypeScript digunakan untuk mendefinisikan tipe data pada komponen, fungsi, dan API response. Folder `src/types/` berisi berbagai tipe yang digunakan, seperti tipe `User` dan tipe respons API. Penggunaan TypeScript membantu menjaga konsistensi struktur data dan meningkatkan kejelasan source code.

<li><strong>Zod</strong></li>

Zod adalah library validasi skema TypeScript yang digunakan untuk memastikan data yang diterima sesuai dengan struktur dan tipe yang diharapkan. Alur penggunaan mulai dari mendefinisikan skema data, lalu melakukan validasi input dari form, yang dilakukan secara otomatis. Jika data tidak sesuai skema, Zod akan mengembalikan error sesuai kesalahan pada data input.

Dalam project ini, Zod digunakan untuk validasi data pada form, sehingga data yang masuk ke server sudah terjamin validitasnya sebelum diproses lebih lanjut. Skema Zod didefinisikan di folder `src/schemas/` dan diimpor sesuai kebutuhan pada server action atau komponen form.

<li><strong>React Hot Toast</strong></li>

React Hot Toast adalah library notifikasi untuk React yang memungkinkan menampilkan pesan toast. Dalam project ini, React Hot Toast digunakan untuk memberikan umpan balik instan kepada pengguna, seperti notifikasi sukses saat data berhasil disimpan atau pesan error ketika terjadi kesalahan.

</ol>

## Langkah Instalasi dan Penjalanan

Berikut adalah langkah-langkah untuk instalasi dan menjalankan project.

<ol>

<li>Instal Node.js versi terbaru</li>

Node.js dapat diinstal melalui laman [https://nodejs.org/en/download](https://nodejs.org/en/download)

<li>Clone repository ke dalam perangkat Anda.</li>

```console
$ git clone https://github.com/aryansfw/bee-technical-test.git
```

<li> Buka folder project di terminal </li>

```console
$ cd bee-technical-test
```

<li> Install dependency yang dibutuhkan oleh aplikasi </li>

```console
$ npm install
```

<li> Build project </li>

```console
$ npm run build
```

<li> Jalankan aplikasi </li>

```console
$ npm run start
```

<li> Buka aplikasi di browser </li>

Aplikasi bisa diakses di [http://localhost:3000](http://localhost:3000)

</ol>

## Fitur-fitur yang diimplementasikan

Berikut adalah fitur-fitur yang diimplementasikan dalam project ini:

1. **Autentikasi Pengguna**

   Pengguna dapat melakukan login menggunakan kredensial yang valid. Sistem akan melakukan validasi input dan menampilkan pesan error jika data tidak sesuai. Setelah login, pengguna dapat mengakses halaman homepage.

2. **Manajemen Data User**
   Pengguna dapat melihat daftar user dalam bentuk tabel yang responsif. Data user diambil dari API dan ditampilkan secara dinamis.

3. **CRUD User**

   - **Create:** Pengguna dapat menambahkan user baru melalui form. Validasi data dilakukan menggunakan Zod sebelum data dikirim ke server.
   - **Read:** Daftar user dapat dilihat pada halaman `/users`.
   - **Update:** Pengguna dapat mengedit data user yang sudah ada. Form edit akan terisi otomatis dengan data user yang dipilih.
   - **Delete:** Pengguna dapat menghapus user dari daftar. Setelah penghapusan, data akan diperbarui secara otomatis.

4. **Notifikasi Interaktif**

   Setiap aksi seperti menambah, mengubah, atau menghapus user akan menampilkan notifikasi (toast) menggunakan React Hot Toast, sehingga pengguna mendapatkan umpan balik secara instan.

5. **Validasi Data Otomatis**

   Semua input pada form divalidasi secara otomatis menggunakan Zod untuk memastikan data yang masuk sudah sesuai skema yang diharapkan.

6. **Proteksi Akses Halaman**

   Middleware digunakan untuk membatasi akses ke halaman tertentu. Pengguna yang belum login tidak dapat mengakses halaman utama dan akan diarahkan ke halaman login.

7. **Desain Responsif dan Konsisten**

   Seluruh antarmuka pengguna didesain responsif dan konsisten menggunakan Tailwind CSS, sehingga aplikasi nyaman digunakan di berbagai perangkat.

8. **Pengelolaan State dan Server Actions**

   Pengelolaan data dan interaksi dengan API dilakukan menggunakan fitur server actions Next.js, sehingga proses pengambilan, pengiriman, dan pembaruan data berjalan efisien dan aman.

Sebagai catatan tambahan, Open API yang dipakai ([https://reqres.in/api](https://reqres.in/api)) menyediakan CRUD yang tidak konsisten. Contohnya, data user yang diambil terdiri dari `email`, `first_name`, `last_name`, dan `avatar`. Sedangkan untuk create dan update user, digunakan data `name` dan `job`.
