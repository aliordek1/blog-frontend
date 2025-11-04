@blog
Feature: Blog Yazısı Yönetimi
  Bir kullanıcı olarak, web sitesine giriş yapıp
  yeni blog yazıları oluşturabilmeli ve
  bu yazıları anasayfada görebilmeliyim.

Scenario: Başarılı bir şekilde yeni blog yazısı oluşturma
  Given kullanıcı "http://localhost:3000/" anasayfayı ziyaret eder
  When kullanıcı "Yeni Yazı Oluştur" linkine tıklar
  And kullanıcı "Başlık" alanına "İlk Blog Yazım" yazar
  And kullanıcı "İçerik" alanına "Bu benim ilk Cypress testim." yazar
  And kullanıcı "Yazıyı Kaydet" butonuna basar
  Then kullanıcı "Yazı başarıyla oluşturuldu." mesajını görmelidir
  And kullanıcı "http://localhost:3000/" adresine yönlendirilmelidir
  And kullanıcı "İlk Blog Yazım" başlığını anasayfada görmelidir 